import React from 'react';
import {View} from 'react-native';
import {CardScanner} from '../../../components';

const OCR = ({navigation}) => {
  return (
    <View>
      <CardScanner type={'OCR'} navigation={navigation} />
    </View>
  );
};

export default OCR;
