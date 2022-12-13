import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Scan, Text} from '../../../components';

const QRCode = ({navigation, route}) => {
  return (
    <View>
      <Scan codeType="QR" />
    </View>
  );
};

export default QRCode;

const styles = StyleSheet.create({});
