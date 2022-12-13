import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CardScanner} from '../../../components';

const IDScan = ({navigation, route}) => {
  return (
    <View>
      <CardScanner type={'ID'} />
    </View>
  );
};

export default IDScan;

const styles = StyleSheet.create({});
