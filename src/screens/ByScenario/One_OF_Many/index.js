import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '../../../components';

const OneOFMany = ({navigation, route}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'blue',
          textAlign: 'center',
        }}>
        OneOFMany
      </Text>
    </View>
  );
};

export default OneOFMany;

const styles = StyleSheet.create({});
