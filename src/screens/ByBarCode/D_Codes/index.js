import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Scan, Text} from '../../../components';

const DCode = ({
  navigation,
  route,
}) => {
  return (
    <View>
      <Scan codeType ='BAR'  />
    </View>
  );
};

export default DCode;

const styles = StyleSheet.create({});
