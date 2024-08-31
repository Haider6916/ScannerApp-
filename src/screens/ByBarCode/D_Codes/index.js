import React from 'react';
import {View} from 'react-native';
import {Scan} from '../../../components';

const DCode = ({navigation}) => {
  return (
    <View>
      <Scan codeType="BAR" navigation={navigation} />
    </View>
  );
};

export default DCode;
