import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React from 'react';
const TinyCodes = ({navigation, route}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'blue',
          textAlign: 'center',
        }}>
        TinyCodes
      </Text>
    </View>
  );
};

export default TinyCodes;

const styles = StyleSheet.create({});
