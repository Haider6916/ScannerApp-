import React from 'react';
import {View} from 'react-native';
import {Scan} from '../../../components';

const QRCode = ({navigation}) => {
  return (
    <View>
      <Scan codeType="QR" navigation={navigation} />
    </View>
  );
};

export default QRCode;
