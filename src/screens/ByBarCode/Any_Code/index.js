import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Scan, Text} from '../../../components';

const AnyCode = ({
  navigation,
  route,
}) => {
  return (
    <View>
      <Scan />
    </View>
  );
};

export default AnyCode;

const styles = StyleSheet.create({});
