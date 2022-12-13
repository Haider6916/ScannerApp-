import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React, {useEffect} from 'react';
import {COMMON} from '../../../navigation/ROUTES';
import { createTable } from '../../../utils/queries';

let createHistoryTable = `CREATE TABLE IF NOT EXISTS "History" (
  "title" TEXT ,
  "data" TEXT 
);`;

const Splash = ({navigation, route}) => {
  useEffect(() => {
    createTable(createHistoryTable, 'History');
    setTimeout(() => {
      navigation.replace(COMMON.HOME);
    }, 4000);
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
