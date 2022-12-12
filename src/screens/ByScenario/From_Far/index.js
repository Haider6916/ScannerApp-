import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
const FromFar = ({
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
        FromFar
      </Text>
    </View>
  );
};

export default FromFar;

const styles = StyleSheet.create({});
