import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Text} from '../../../components';
import {cameraPicker} from '../../../utils/imageSelection';

const Batch = ({navigation, route}) => {
  /**
   * open camera and click image for profile
   */
  const openCamera = async () => {
    setTimeout(() => {
      cameraPicker('back')
        .then(async image => {
          console.log(image.path, 'path');
        })
        .catch(err => {
          console.log(err, 'error');
        });
    }, 500);
  };
  /**
   *  camera permission check and open camera
   */
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'get permission',
            message: 'Allow Cam',
            buttonNegative: 'No',
            buttonPositive: 'Yes',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
        }
      } catch (err) {
        console.log(err, 'err');
      }
    } else {
      openCamera();
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={requestCameraPermission}
        style={{backgroundColor: 'red'}}>
        <Text
          style={{
            fontSize: 16,
            color: 'blue',
            textAlign: 'center',
          }}>
          open
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Batch;

const styles = StyleSheet.create({});
