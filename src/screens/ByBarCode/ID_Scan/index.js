import React from 'react';
import {View} from 'react-native';
import {CardScanner} from '../../../components';

const IDScan = ({navigation}) => {
  return (
    <View>
      <CardScanner type={'ID'} navigation={navigation} />
    </View>
  );
};

export default IDScan;
