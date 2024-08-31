import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Platform,
  Linking,
  Share,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {styles} from './scanStyle';
import {Text, CustomSwitch} from '..';
import {RNCamera} from 'react-native-camera';
import {insertData} from '../../utils/queries';
import {BarcodeMaskWithOuterLayout} from '@nartc/react-native-barcode-mask';
import Toggle from 'react-native-toggle-element';
import Contacts from 'react-native-contacts';
import {
  Camera,
  Flash,
  Link,
  Shutter,
  CopyFF,
  ShareFF,
  LinkAltFF,
  PhoneCallFF,
  ContactBookFF,
  QrIcon,
  BarIcon,
} from '../../assets';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import {useTheme} from '../../config/theme';

const deviceHeight = Dimensions.get('screen').height;
const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
const CAM_VIEW_WIDTH = Dimensions.get('screen').width;

const leftMargin = 140;
const topMargin = 80;
const frameWidth = 214;
const frameHeight = 194;

const leftMarginBar = 85;
const topMarginBar = 80;
const frameWidthBar = 300;
const frameHeightBar = 120;

const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
const scanAreaY = topMargin / CAM_VIEW_WIDTH;
const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;

const Scan = ({codeType, navigation}) => {
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [toggleValue, setToggleValue] = useState(false);
  const [flash, setFlash] = useState(false);
  const [camType, setCamType] = useState(true);
  const [slectedMode, setSelectedMode] = useState('Auto');

  const ref = useRef(null);

  /**
   * function to insert a record in history
   */
  const insertHistory = () => {
    var type = '';
    var scannedType = '';
    if (codeType === 'QR') {
      scannedType = 'QR Code';
      if (
        result?.data.startsWith('https:') ||
        result?.data.startsWith('http:') ||
        result?.data.startsWith('www')
      )
        type = 'URL';
      else if (
        result?.data.startsWith('+') ||
        result?.data.startsWith('00') ||
        result?.data.startsWith('0') ||
        result?.data.startsWith('tel:') ||
        result?.data.startsWith('tel :')
      )
        type = 'Phone';
      else type = 'Text';
    } else {
      scannedType = 'Bar Code';
      type = 'Text';
    }
    const time = new Date();
    const query = `INSERT INTO History (title,dateTime,scannedType,data) VALUES ('${type}','${time}','${scannedType}','${result?.data}');`;
    if (result !== '') {
      const inserted = insertData(query);
      if (inserted) console.log('inserted data');
    }
  };

  const onSelectSwitch = value => {
    console.log('Selected index: ' + value);
    setSelectedMode(value);
  };

  useEffect(() => {
    if (ScanResult == true) {
      if (slectedMode == 'Auto') {
        insertHistory();
      }
    }
  }, [ScanResult]);
  /** back button conditional action for find id */
  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        codeType !== 'BAR'
          ? ScanResult && !scan
            ? 'Scan Results'
            : 'Scan QR Code'
          : ScanResult && !scan
          ? 'Scan Results'
          : 'Scan Bar Code',
    });
  }, [ScanResult, scan]);
  /**
   * function will called on succes of QR or Bar code Scan
   * @param {*} e
   */
  const onSuccess = e => {
    if (codeType === 'BAR') {
      if (
        Platform.OS === 'ios'
          ? e.type === 'org.ansi.Interleaved2of5 ' ||
            e.type === 'org.iso.Code39' ||
            e.type === 'ITF' ||
            e.type === 'com.intermec.Code93' ||
            e.type === 'org.gs1.EAN-8' ||
            e.type === 'org.gs1.EAN-13' ||
            e.type === 'org.iso.Code128'
          : e.type === 'CODE_39' ||
            e.type === 'CODE_128' ||
            e.type === 'ITF' ||
            e.type === 'CODE_93' ||
            e.type === 'EAN_8' ||
            e.type === 'EAN_13' ||
            e.type === 'UPC_E'
      ) {
        setResult(e);
        setScan(false);
        if (slectedMode === 'Auto') {
          setScanResult(true);
        }
      }
    } else if (codeType === 'QR') {
      if (
        Platform.OS === 'ios'
          ? e.type === 'org.iso.QRCode' ||
            e.type === 'org.iso.Aztec' ||
            e.type === 'org.iso.PDF417' ||
            e.type === 'org.iso.DataMatrix'
          : e.type === 'QR_CODE' ||
            e.type === 'DATA_MATRIX' ||
            e.type === 'AZTEC' ||
            e.type === 'PDF_417'
      ) {
        setResult(e);
        setScan(false);
        if (slectedMode === 'Auto') {
          setScanResult(true);
        }
      }
    } else {
      setScan(false);
      // setScanResult(true);
    }
    console.log(e, 'DATA');
  };

  /**
   * function responsible to scan code again
   */
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  /**
   * function called on press of scan Button
   */
  const onpressed = () => {
    setScanResult(true);
    insertHistory();
  };

  return (
    <Fragment>
      {ScanResult && !scan && (
        <ScanedResult
          ScanResult={ScanResult}
          result={result}
          scanAgain={scanAgain}
          codeType={codeType}
        />
      )}
      {!ScanResult && codeType === 'QR' ? (
        <>
          <View style={{height: '75%'}}>
            <RNCamera
              ref={ref}
              onBarCodeRead={e => onSuccess(e)}
              flashMode={
                flash
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              type={
                camType
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              rectOfInterest={{
                x: scanAreaX,
                y: scanAreaY,
                width: scanAreaWidth,
                height: scanAreaHeight,
              }}
              cameraViewDimensions={{
                width: CAM_VIEW_WIDTH,
                height: CAM_VIEW_HEIGHT,
              }}>
              <View style={{height: '100%'}}>
                <BarcodeMaskWithOuterLayout
                  maskOpacity={0.7}
                  backgroundColor={'#000'}
                  width={frameWidth}
                  height={frameHeight}
                  showAnimatedLine={false}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  height: 32,
                  width: 32,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                  top: 37,
                }}>
                <TouchableOpacity onPress={() => setCamType(!camType)}>
                  <Camera />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  height: 32,
                  width: 32,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                  top: 85,
                }}>
                <TouchableOpacity onPress={() => setFlash(!flash)}>
                  <Flash />
                </TouchableOpacity>
              </View>
            </RNCamera>
          </View>
          <View
            style={{
              height: '25%',
              backgroundColor: '#000',
              alignItems: 'center',
              paddingTop: 15,
            }}>
            <View style={{}}>
              <CustomSwitch
                selectionMode={slectedMode}
                roundCorner={true}
                option1={'Auto'}
                option2={'Manual'}
                onSelectSwitch={onSelectSwitch}
                selectionColor={'#4687EC'}
              />
            </View>
            {slectedMode !== 'Auto' && (
              <TouchableOpacity style={{marginTop: 30}} onPress={onpressed}>
                <Shutter />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View>
          <View style={{height: '75%'}}>
            <RNCamera
              ref={ref}
              onBarCodeRead={e => onSuccess(e)}
              flashMode={
                flash
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              type={
                camType
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              rectOfInterest={{
                x: scanAreaX,
                y: scanAreaY,
                width: scanAreaWidth,
                height: scanAreaHeight,
              }}
              cameraViewDimensions={{
                width: CAM_VIEW_WIDTH,
                height: CAM_VIEW_HEIGHT,
              }}>
              <View style={{height: '100%'}}>
                <BarcodeMaskWithOuterLayout
                  maskOpacity={0.7}
                  backgroundColor={'#000'}
                  width={frameWidthBar}
                  height={frameHeightBar}
                  showAnimatedLine={false}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  height: 32,
                  width: 32,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                  top: 37,
                }}>
                <TouchableOpacity onPress={() => setCamType(!camType)}>
                  <Camera />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  height: 32,
                  width: 32,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                  top: 85,
                }}>
                <TouchableOpacity onPress={() => setFlash(!flash)}>
                  <Flash />
                </TouchableOpacity>
              </View>
            </RNCamera>
          </View>
          <View
            style={{
              height: '25%',
              backgroundColor: '#000',
              alignItems: 'center',
              paddingTop: 15,
            }}>
            <View style={{}}>
              <CustomSwitch
                selectionMode={slectedMode}
                roundCorner={true}
                option1={'Auto'}
                option2={'Manual'}
                onSelectSwitch={onSelectSwitch}
                selectionColor={'#4687EC'}
              />
            </View>
            {slectedMode !== 'Auto' && (
              <TouchableOpacity style={{marginTop: 30}} onPress={onpressed}>
                <Shutter />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </Fragment>
  );
};
export default Scan;
const ScanedResult = ({ScanResult, result, scanAgain, codeType}) => {
  var type = '';
  if (
    result?.data.startsWith('https:') ||
    result?.data.startsWith('http:') ||
    result?.data.startsWith('www')
  )
    type = 'link';
  else if (
    result?.data.startsWith('+') ||
    result?.data.startsWith('00') ||
    result?.data.startsWith('0') ||
    result?.data.startsWith('tel') ||
    result?.data.startsWith('tel:') ||
    result?.data.startsWith('tel :')
  )
    type = 'number';
  else type = 'other';
  return (
    <Fragment>
      {result?.type == null ? (
        <View style={ScanResult ? styles.scanCardView : styles.cardView}>
          <Text>{`Scanned code is not appropriate`}</Text>
          <Text>{`Press the button to Scan Again`}</Text>
          <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
            <View style={styles.buttonWrapper}>
              <Image style={{height: 36, width: 36}}></Image>
              <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                {`Click to scan again`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={ScanResult ? styles.scanCardView : styles.cardView}>
          {codeType === 'QR' ? (
            <>
              {type === 'link' || type === 'number' ? (
                <>{<LinkNumberView type={type} data={result.data} />}</>
              ) : (
                <>
                  <OtherQRView data={result.data} />
                </>
              )}
            </>
          ) : (
            <OtherQRView data={result.data} codeType={codeType} />
          )}
        </View>
      )}
    </Fragment>
  );
};
const LinkNumberView = ({type, data}) => {
  const colors = useTheme();
  const webData = [
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
      name: 'Open',
      icon: <LinkAltFF />,
      onPress: () => openLink(),
    },
  ];
  const phoneData = [
    {
      name: 'Call',
      icon: <PhoneCallFF />,
      onPress: () => openNumber(),
    },
    {
      // {
      //   console.log('call');
      // },
      name: 'Add Contact',
      icon: <ContactBookFF />,
      onPress: () => addContact(),

      // {
      //   console.log('add contact');
      // },
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
  ];

  const copyData = () => {
    Clipboard.setString(data.toString());
    Toast.show('Copied!', Toast.SHORT);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const openLink = () => {
    Linking.openURL(data);
  };

  const openNumber = () => {
    const url = `tel:${data}`;
    Linking.openURL(url).catch(error =>
      console.error('An error occurred', error),
    );
    // Linking.openURL(data);
  };

  const addContact = async () => {
    const phoneNumber = data;
    if (!phoneNumber) {
      return Alert.alert(
        'Invalid QR code',
        'The QR code does not contain a valid phone number',
      );
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to add a contact',
        },
      );

      // const read = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      // {
      //   title: 'Read',
      //   message: 'This app would like to read your contacts',
      // }

      // );

      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        return Alert.alert(
          'Permission Denied',
          'The app does not have permission to add a contact',
        );
      }
    }
    let newNumber = {
      emailAddresses: [
        {
          label: 'work',
          email: '',
        },
      ],
      phoneNumbers: [
        {
          label: 'mobile',
          number: data,
        },
      ],
      familyName: '',
      givenName: '',
    };

    Contacts.openContactForm(newNumber);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.textGrey,
          padding: 26,
        }}>
        <View
          style={{
            flex: 0.4,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.textGreyDark,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 26,
              backgroundColor: colors.notSelected,
              marginRight: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {type === 'link' ? <Link /> : <PhoneCallFF />}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text title3 semibold blackColor>
              {type === 'link' ? `Website` : `Phone`}
            </Text>
            <Text caption1 light textGrey>{`QR Code`}</Text>
          </View>
        </View>
        <View style={{flex: 0.6}}>
          <View style={{flex: 0.4, paddingTop: 10}}>
            <Text body1 medium>
              {data}
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {type === 'link' ? (
              <>
                {webData.map((item, index) => {
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
              </>
            ) : (
              <>
                {phoneData.map((item, index) => {
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
              </>
            )}
          </View>
        </View>
      </View>
      <View style={{flex: 1}}></View>
      <View style={{flex: 1}}></View>
    </>
  );
};

const OtherQRView = ({data, codeType}) => {
  const colors = useTheme();
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
  ];

  const copyData = () => {
    Clipboard.setString(data.toString());
    Toast.show('Copied!', Toast.SHORT);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.textGrey,
          padding: 26,
        }}>
        <View
          style={{
            flex: 0.4,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.textGreyDark,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 26,
              backgroundColor: colors.notSelected,
              marginRight: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {codeType ? (
              <BarIcon height={20} width={20} />
            ) : (
              <QrIcon height={20} width={20} />
            )}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text title3 semibold blackColor>
              {codeType ? `Bar Code Data` : `QR Code Data`}
            </Text>
            <Text caption1 light textGrey>{`Bar Code`}</Text>
          </View>
        </View>
        <View style={{flex: 0.6}}>
          <View style={{flex: 0.6, paddingTop: 10}}>
            <Text body1 medium numberOfLines={3}>
              {data}
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'space-around',
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
      </View>
      <View style={{flex: 1}}></View>
      <View style={{flex: 1}}></View>
    </>
  );
};
