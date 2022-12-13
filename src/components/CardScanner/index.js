import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Text} from '..';
import TextRecognition from 'react-native-text-recognition';
import {styles} from './styles';
import {
  getCardType,
  getCountry,
  getDate,
  getGender,
} from '../../utils/stringOperations';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const Index = props => {
  const {type} = props;
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
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhoto = async type => {
    {
      console.log(type);
    }
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
    try {
      var photo = await camera.current.takePhoto({
        flash: 'off',
      });
      // Vibration.vibrate(100);
      const result = await TextRecognition.recognize(photo.path);

      console.log(result, 'result');

      if (type === 'ID') {
        const mrzData = [];
        var temp = '';
        for (let i = 0; i < result.length; i++) {
          if (result[i].includes('<')) {
            mrzData.push(result[i].replace(/ /gm, ''));
          }
        }
        // console.log(mrzData.length, 'lenth');

        setResult(result);
        setScan(false);
        setScanResult(true);

        if (mrzData.length > 0) {
          setDType(mrzData[0]?.slice(0, 1));

          if (dType === 'I') {
            setSubType(mrzData[0]?.slice(1, 2));
            setCountry(mrzData[0]?.slice(2, 5));
            setDocNum(mrzData[0]?.slice(5, 14));
            setDob(mrzData[1]?.slice(0, 6));
            setGender(mrzData[1]?.slice(7, 8));
            setValid(mrzData[1]?.slice(8, 14));
            setNationality(mrzData[1]?.slice(15, 18));
            const last = mrzData[2]?.split('<<');
            setLastName(last[0]);
            setFirstName(last[1]);
          } else if (dType === 'P' || dType === 'V') {
            setSubType(mrzData[0]?.substring(1, 2));
            setCountry(mrzData[0]?.substring(2, 5));
            const last = mrzData[0]?.split('<<');
            setLastName(last[1]);
            setFirstName(last[0].substring(5));
            setPassNum(mrzData[1]?.substring(0, 9));
            setNationality(mrzData[1]?.substring(10, 13));
            setDob(mrzData[1]?.substring(13, 19));
            setGender(mrzData[1]?.substring(20, 21));
            setValid(mrzData[1]?.substring(21, 27));
            setPersonalNum(mrzData[1]?.substring(28, 42));
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
      }
    } catch (e) {
      console.log(e, 'e');
    }
  };
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  const replaceInvalid = (value, replacewith) => {
    return value.replace(/</gm, replacewith).replace(/cc|«/gm, '');
    // .replaceAll('<', replacewith)
    // .replaceAll('cc', '')
    //
    // .replaceAll('«', '');
  };
  return device != null && hasPermission ? (
    <ScrollView>
      {type === 'OCR' ? (
        <Fragment>
          {ScanResult && !scan && (
            <Fragment>
              <Text style={styles.textTitle1}>Result</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {docType}</Text>

                <Text>
                  Result :
                  {result.map(item => {
                    return item;
                  })}
                </Text>
                <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                  <View style={styles.buttonWrapper}>
                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                      Click to scan again
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
          {!ScanResult && (
            <View style={{height: deviceHeight, backgroundColor: 'black'}}>
              <Camera
                style={{height: deviceHeight / 1.3}}
                device={device}
                ref={camera}
                isActive={true}
                photo={true}
              />
              <TouchableOpacity
                onPress={() => takePhoto('OCR')}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Scan</Text>
              </TouchableOpacity>
            </View>
          )}
        </Fragment>
      ) : (
        <>
          <Fragment>
            {ScanResult && !scan && (
              <Fragment>
                <Text style={styles.textTitle1}>Result</Text>

                <View
                  style={ScanResult ? styles.scanCardView : styles.cardView}>
                  {!error ? (
                    <>
                      {/* <Text>RawData : {result}</Text> */}
                      <Text></Text>
                      <Text>
                        {`Doc Type : ${
                          dType && dType.length > 0 ? getCardType(dType) : ''
                        }`}
                      </Text>
                      <Text>
                        {`Sub Type : ${
                          subType && subType.length > 0
                            ? replaceInvalid(subType, '')
                            : ''
                        }`}
                      </Text>
                      <Text>
                        {`Country : ${
                          country && country.length > 0
                            ? getCountry(replaceInvalid(country, ''))
                            : ''
                        }`}
                      </Text>
                      <Text>
                        {`First Name : ${
                          firstName && firstName.length > 0
                            ? replaceInvalid(firstName, ' ')
                            : ''
                        }`}
                      </Text>
                      <Text>
                        {` Last Name : ${
                          lastName && lastName.length > 0
                            ? replaceInvalid(lastName, ' ')
                            : ''
                        }`}
                      </Text>
                      <Text>{`Document Num : ${
                        documentNum && documentNum.length > 0
                          ? replaceInvalid(documentNum, '')
                          : ''
                      }`}</Text>
                      <Text>{`Passport Num : ${
                        passportNum && passportNum.length > 0
                          ? replaceInvalid(passportNum, '')
                          : ''
                      }`}</Text>
                      <Text>{`Nationality : ${
                        nationality && nationality.length > 0
                          ? getCountry(replaceInvalid(nationality, ''))
                          : ''
                      }`}</Text>
                      <Text>{`Dob : ${
                        dob && dob.length > 0
                          ? getDate(replaceInvalid(dob, ''))
                          : ''
                      }`}</Text>
                      <Text>{`Gender : ${
                        gender && gender.length > 0 ? getGender(gender) : ''
                      }`}</Text>
                      <Text>{`Expiry : ${
                        validity && validity.length > 0
                          ? getDate(replaceInvalid(validity, ''))
                          : ''
                      }`}</Text>
                      <Text>{`Personal Num : ${
                        personalNum && personalNum.length > 0
                          ? replaceInvalid(personalNum, '')
                          : ''
                      }`}</Text>
                    </>
                  ) : (
                    <Text style={{color: 'red'}}>Not Scanned Properly</Text>
                  )}
                  <TouchableOpacity
                    onPress={scanAgain}
                    style={styles.buttonScan}>
                    <View style={styles.buttonWrapper}>
                      <Text
                        style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                        Click to scan again
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
            {!ScanResult && (
              <View
                style={{
                  height: deviceHeight,
                  backgroundColor: 'rgba(210, 215, 211, 1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Camera
                  style={{height: 140, width: deviceWidth}}
                  device={device}
                  ref={camera}
                  isActive={true}
                  photo={true}
                />
                <TouchableOpacity
                  onPress={() => takePhoto('ID')}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Scan</Text>
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        </>
      )}
    </ScrollView>
  ) : (
    <View style={{backgroundColor: 'black'}}></View>
  );
};
export default Index;
