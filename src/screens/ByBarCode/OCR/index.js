import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CardScanner} from '../../../components';

const OCR = ({navigation, route}) => {
  return (
    <View>
      <CardScanner type={'OCR'} />
    </View>
  );
};

export default OCR;
