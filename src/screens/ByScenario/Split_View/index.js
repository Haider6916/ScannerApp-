import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React from 'react';

const SplitView = ({navigation, route}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'blue',
          textAlign: 'center',
        }}>
        SplitView
      </Text>
    </View>
  );
};

export default SplitView;

const styles = StyleSheet.create({});
