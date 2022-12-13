import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '../../../components';

const DotCode = ({
  navigation,
  route,
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'blue',
          textAlign: 'center',
        }}>
        DotCode
      </Text>
    </View>
  );
};

export default DotCode;

const styles = StyleSheet.create({});
