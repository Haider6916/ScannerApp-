import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useLayoutEffect,
} from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {ScannerResult, Text} from '..';
import TextRecognition from 'react-native-text-recognition';
import {styles} from './styles';
import {insertData} from '../../utils/queries';
import {CopyFF, Save, ShareFF, Shutter} from '../../assets';
import {BarcodeMaskWithOuterLayout} from '@nartc/react-native-barcode-mask';
import {BaseColor, useTheme} from '../../config/theme';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import {onPress} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import ImageResizer from 'react-native-image-resizer';
import HomeLoader from './Loader';
import IDLoader from './IDLoader';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const Index = props => {
  const {type, navigation} = props;
  const colors = useTheme();
  const [hasPermission, setHasPermission] = useState(false);
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [docType, setDocType] = useState('');
  const [dType, setDType] = useState('');
  const [subType, setSubType] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentNum, setDocNum] = useState('');
  const [passportNum, setPassNum] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [validity, setValid] = useState('');
  const [personalNum, setPersonalNum] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flash, setFlash] = useState('off');
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  /** back button conditional action for find id */
  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        type !== 'OCR'
          ? ScanResult && !scan
            ? 'Results'
            : 'Scan ID Card'
          : ScanResult && !scan
          ? 'Results'
          : 'OCR',
    });
  }, [ScanResult, scan]);

  /**
   * function to insert a record in history
   */
  const insertHistory = res => {
    const idResult = {
      documentType: dType,
      subType: subType,
      country: country,
      firstName: firstName,
      lastName: lastName,
      documentNum: documentNum,
      passportNum: passportNum,
      nationality: nationality,
      dob: dob,
      gender: gender,
      validity: validity,
      personalNum: personalNum,
    };
    const time = new Date();
    const query = `INSERT INTO History (title,dateTime,scannedType,data) VALUES ('${
      dType === 'I' ? 'ID Card' : dType === 'P' ? 'Passport' : 'OCR Text'
    }','${time}','${
      dType === 'I' ? 'ID' : dType === 'P' ? 'Passport' : 'OCR'
    }','${
      dType === 'I'
        ? JSON.stringify(idResult)
        : dType === 'P'
        ? JSON.stringify(idResult)
        : res
    }');`;
    if (res !== '') {
      const inserted = insertData(query);
      if (inserted) console.log('inserted data');
      console.log('====================================');
      console.log(dType);
      console.log('====================================');
    }
  };

  /**
   * function will click a picture and read mrz for ID, Visa or Passport
   * @param {*} type type OCR | ID
   */
  const takePhoto = async type => {
    setDType('');
    setLastName('');
    setFirstName('');
    setPassNum('');
    setNationality('');
    setDob('');
    setGender('');
    setValid('');
    setPersonalNum('');
    setSubType('');
    setCountry('');
    setDocNum('');

    setError(false);

    const mrzData = [];
    try {
      var photo = await camera.current.takePhoto({
        flash: flash, //off ,onn
      });

      const resizedImage = await ImageResizer.createResizedImage(
        photo.path,
        800,
        800,
        'JPEG',
        90,
      );
      const result = await TextRecognition.recognize(resizedImage.path);
      console.log('====================================');
      console.log(result);
      console.log('====================================');

      if (type === 'ID') {
        var temp = '';
        for (let i = 0; i < result.length; i++) {
          if (result[i].includes('<')) {
            mrzData.push(
              result[i]
                .replace(/ /gm, '')
                .replace(/«/gm, '<')
                .replace(/<K/gm, '<<'),
            );
          }
        }
        const data = mrzData.length == 1 ? mrzData[0].split('\n') : mrzData;
        console.log(data, 'data');
        console.log(mrzData, 'mrzData');

        if (data.length > 0) {
          setResult(result);
          setScan(false);
          setScanResult(true);
          const temp = data[0]?.slice(0, 1);
          setDType(temp);
          console.log(temp, 'dType');
          if (temp === 'I') {
            setSubType(data[0]?.slice(1, 2));
            setCountry(data[0]?.slice(2, 5));
            setDocNum(data[0]?.slice(5, 14));
            setDob(data[1]?.slice(0, 6));
            setGender(data[1]?.slice(7, 8));
            setValid(data[1]?.slice(8, 14));
            setNationality(data[1]?.slice(15, 18));
            const last = data[2]?.split('<<');
            setLastName(last.length > 0 && last[0]);
            setFirstName(last.length > 1 && last[1]);
          } else if (temp === 'P' || temp === 'V') {
            setSubType(data[0]?.substring(1, 2));
            setCountry(data[0]?.substring(2, 5));
            const last = data[0]?.split('<<');
            setLastName(last[1]);
            setFirstName(last[0].substring(5));
            setPassNum(data[1]?.substring(0, 9));
            setNationality(data[1]?.substring(10, 13));
            setDob(data[1]?.substring(13, 19));
            setGender(data[1]?.substring(20, 21));
            setValid(data[1]?.substring(21, 27));
            setPersonalNum(data[1]?.substring(28, 42));
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else {
        setDocType('OCR');
        setResult(result);
        setScan(false);
        setScanResult(true);
        // !error && insertHistory(result);
      }
    } catch (e) {
      console.log(e, 'e');
    }
  };

  /**
   * function responsible for scan again process
   */
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  /**
   * function will remove invalid values from mrz
   * @param {*} value from which extra data to be removed
   * @param {*} replacewith replacement string
   * @returns clean and formatted value
   */
  const replaceInvalid = (value, replacewith) => {
    return value.replace(/</gm, replacewith).replace(/cc|«/gm, '');
  };

  const btnData = [
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
    {
      name: 'Save',
      icon: <Save />,
      onPress: () => saveData(),
    },
  ];

  const copyData = () => {
    Clipboard.setString(result.toString());
    Toast.show('Copied!', Toast.SHORT);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: `${result}`,
      });
    } catch (error) {
      Toast.show(error.message, Toast.SHORT);
      console.log(error.message);
    }
  };

  const saveData = async () => {
    insertHistory(result);
    Toast.show('Saved!', Toast.SHORT);
  };

  return device != null && hasPermission ? (
    <View>
      {type === 'OCR' ? (
        <>
          {isLoading && <HomeLoader />}
          <Fragment>
            {ScanResult && !scan && (
              <>
                {/* {isLoading &&
              <View style={{height:deviceHeight,justifyContent:'center',alignItems:'center'}}>
                <Text>Loding, Please Wait...</Text>
             <ActivityIndicator size="large" color="black"  /></View>} */}
                <View>
                  <View
                    style={{
                      height: '85%',
                      marginBottom: 13,
                      borderWidth: 1,
                      margin: 14,
                      borderColor: BaseColor.textGrey,
                      borderRadius: 8,
                    }}>
                    <ScrollView
                      contentContainerStyle={
                        ScanResult ? styles.scanCardView : styles.cardView
                      }
                      // style={ScanResult ? styles.scanCardView : styles.cardView}
                    >
                      <Text>
                        {result.map(item => {
                          return item;
                        })}
                      </Text>
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      // flex: 0.9,
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {btnData.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={item.onPress}
                          key={index.toString()}>
                          <View
                            style={{
                              height: 44,
                              width: 44,
                              borderRadius: 22,
                              backgroundColor: colors.appBlue,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.icon}
                          </View>
                          <Text body2 regular blackColor>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </>
            )}

            {!ScanResult && !isLoading && (
              <View style={{height: deviceHeight, backgroundColor: 'black'}}>
                <Camera
                  style={{height: deviceHeight}}
                  device={device}
                  ref={camera}
                  isActive={true}
                  photo={true}
                />

                <TouchableOpacity
                  style={{position: 'absolute', bottom: '17%', right: '37%'}}
                  onPress={() => {
                    takePhoto('OCR'), setIsLoading(true);
                  }}>
                  <Shutter />
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        </>
      ) : (
        <>
          {isLoading && <IDLoader />}
          <Fragment>
            {ScanResult && !scan && (
              <>
                {/* {isLoading &&
                <View style={{height:deviceHeight,justifyContent:'center',alignItems:'center'}}>
                  <Text>Loding, Please Wait...</Text>
               <ActivityIndicator size="large" color="black"  /></View>} */}
                <View
                  style={ScanResult ? styles.scanCardView : styles.cardView}>
                  {!error ? (
                    <ScannerResult
                      dType={dType}
                      setDType={setDType}
                      subType={subType}
                      setSubType={setSubType}
                      country={country}
                      setCountry={setCountry}
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      documentNum={documentNum}
                      setDocNum={setDocNum}
                      passportNum={passportNum}
                      setPassNum={setPassNum}
                      nationality={nationality}
                      setNationality={setNationality}
                      dob={dob}
                      setDob={setDob}
                      gender={gender}
                      setGender={setGender}
                      validity={validity}
                      setValid={setValid}
                      personalNum={personalNum}
                      setPersonalNum={setPersonalNum}
                      saveData={() => {
                        insertHistory(result);
                        Toast.show('Saved!', Toast.SHORT);
                        setScan(true);
                        setScanResult(false);
                      }}
                      openCamAgain={scanAgain}
                    />
                  ) : (
                    <>
                      <Text
                        style={{color: 'red'}}>{`Not Scanned Properly`}</Text>
                      <TouchableOpacity
                        onPress={scanAgain}
                        style={styles.buttonScan}>
                        <View style={styles.buttonWrapper}>
                          <Text
                            style={{
                              ...styles.buttonTextStyle,
                              color: '#2196f3',
                            }}>
                            {`Click to scan again`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            )}
            {!ScanResult && !isLoading && (
              <View
                style={{
                  height: deviceHeight,
                  backgroundColor: colors.whiteBackground,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Camera
                  style={{height: deviceHeight, width: deviceWidth}}
                  device={device}
                  ref={camera}
                  isActive={true}
                  photo={true}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: '23%',
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                  }}>
                  <Text body2 style={{color: 'white', textAlign: 'center'}}>
                    exclusively scans machine-readable zones on passports,
                    visas, and other official documents for quick and accurate
                    extraction of data.
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                  }}>
                  <BarcodeMaskWithOuterLayout
                    maskOpacity={0.7}
                    backgroundColor={'#000'}
                    width={300}
                    height={120}
                    showAnimatedLine={false}
                  />
                </View>
                {/* </Camera> */}
                <TouchableOpacity
                  style={{position: 'absolute', bottom: '17%', right: '37%'}}
                  onPress={() =>
                    setTimeout(function () {
                      takePhoto('ID'), setIsLoading(true);
                    }, 1000)
                  }>
                  <Shutter />
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        </>
      )}
    </View>
  ) : (
    <></>
  );
};
export default Index;
