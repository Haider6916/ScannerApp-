import React, {Fragment, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
  Vibration,
  Platform,
  Linking,
  Pressable,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {styles} from './scanStyle';
import {Text} from '..';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {navigationRef} from '../../navigation/RootNavigation';
import { insertData } from '../../utils/queries';

const deviceHeight = Dimensions.get('screen').height;

const Scan = ({codeType}) => {
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
  const CAM_VIEW_WIDTH = Dimensions.get('screen').width;

  const leftMargin = 200;
  const topMargin = 80;
  const frameWidth = 200;
  const frameHeight = 250;

  const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
  const scanAreaY = topMargin / CAM_VIEW_WIDTH;
  const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
  const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;

  const insertRecent = () => {
    const query = `INSERT INTO History (title,data) VALUES ('${result?.type}','${result?.data}');`;
    if (result !== '') {
      const inserted = insertData(query);
      if (inserted) console.log('inserted data');
    }
  };


  const takePhoto = async () => {
    try {
      await ref.current.onBarCodeRead().then(pic => {
        console.log(pic, 'pic');
      });

      // Vibration.vibrate(100);
    } catch (e) {
      console.log(e, '----------e----------');
    }
  };

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
        setScanResult(true);
      }
      // else {
      //   setScan(false);
      //   // Alert.alert(e)
      //   setScanResult(true);org.ansi.Interleaved2of5    org.iso.Code39 'com.intermec.Code93',  org.iso.DataMatrix', org.gs1.EAN-8,  org.gs1.EAN-13,  org.iso.QRCode,
      // org.iso.Aztec,  org.iso.PDF417, org.iso.Code128
      // }
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
        // setScanResult(true);
      }

      // else {
      //   setScan(false);
      //   // Alert.alert(e)
      //   setScanResult(true)
      // }
    } else {
      setScan(false);
      // setScanResult(true);
    }
    console.log(e, 'DATA');
    //  "aztec" | "code128" | "code39" | "code39mod43" | "code93" | "ean13" | "ean8" |
    // "pdf417" | "qr" | "upc_e" | "interleaved2of5" | "itf14" | "datamatrix" | DATA_MATRIX
  };
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };
  const onpressed = () => {
    setScanResult(true);
    insertRecent();
  };
  return (
    <View style={styles.scrollViewStyle}>
      <Fragment>
        {ScanResult && !scan && (
          <Fragment>
            <Text style={styles.textTitle1}>Result</Text>
            {result?.type == null ? (
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Scanned code is not appropriate</Text>
                <Text>Press the button to Scan Again</Text>
                <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                  <View style={styles.buttonWrapper}>
                    <Image style={{height: 36, width: 36}}></Image>
                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                      Click to scan again
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result?.type}</Text>
                {result?.data.startsWith('https:') ? (
                  <Pressable
                    onPress={() => Linking.openURL(result.data)}
                    style={{flexDirection: 'row'}}>
                    <Text>{`Result : `}</Text>
                    <Text style={{color: '#2196f3'}}>{result?.data}</Text>
                  </Pressable>
                ) : (
                  <Text>Result : {result?.data}</Text>
                )}
                <Text>RawData: {result?.rawData}</Text>
                <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                  <View style={styles.buttonWrapper}>
                    <Image style={{height: 36, width: 36}}></Image>
                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                      Click to scan again
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        )}
        {!ScanResult && codeType === 'QR' ? (
          <View>
            <RNCamera
              ref={ref}
              style={{height: deviceHeight}}
              onBarCodeRead={e => onSuccess(e)}
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
              <View
                style={{
                  position: 'absolute',
                  top: leftMargin,
                  right: topMargin,
                  width: frameWidth,
                  height: frameHeight,
                  borderWidth: 2,
                  borderColor: 'red',
                  opacity: 0.5,
                }}
              />
              <TouchableOpacity
                onPress={onpressed}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#DCDCDC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                  marginTop: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Scan
                </Text>
              </TouchableOpacity>
            </RNCamera>
          </View>
        ) : (
          <View>
            <RNCamera
              ref={ref}
              style={{height: deviceHeight}}
              onBarCodeRead={e => onSuccess(e)}
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
              <View
                style={{
                  position: 'absolute',
                  top: leftMargin,
                  right: topMargin,
                  width: frameWidth,
                  height: frameHeight,
                  borderWidth: 2,
                  borderColor: 'red',
                  opacity: 0.5,
                }}
              />
            </RNCamera>
          </View>
        )}
      </Fragment>
    </View>
  );
};
export default Scan;
