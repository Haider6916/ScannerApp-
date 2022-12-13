// import ImageCropPicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

export const cameraPicker = async (cameraType = 'back') => {
  // return await launchCamera({
  //   // maxWidth: 400,
  //   // maxHeight: 400,
  //   cameraType: cameraType,
  //   mediaType: 'photo',
  //   // quality: 1,
  // });
  return ImagePicker.openCamera({
    width: 200,
    height: 100,
    cropping: false,
    mediaType: 'photo',
    useFrontCamera: cameraType === 'back' ? false : true,
  });
};

export const galleryPicker = async () => {
  // return await launchImageLibrary({
  //   // maxWidth: 400,
  //   // maxHeight: 400,
  //   mediaType: 'photo',
  //   // quality: 1,
  //   includeExtra: true,
  //   selectionLimit: 1,
  // });
  return ImagePicker.openPicker({
    cropping: false,
    mediaType: 'photo',
    compressImageQuality: 0.95,
    multiple: false,
    writeTempFile: false,
  });
};
