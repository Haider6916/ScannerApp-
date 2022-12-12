import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React, {useEffect} from 'react';
import {COMMON} from '../../../navigation/ROUTES';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'Scanner.db', location: 'default'});

const Splash = ({navigation, route}) => {
  useEffect(() => {
    createTable();
    setTimeout(() => {
      navigation.replace(COMMON.HOME);
    }, 4000);
  }, []);

  const createTable = async () => {
    // create table if not exists
    console.log('db create--------------');

    const query = `CREATE TABLE IF NOT EXISTS History (
      "title" TEXT ,
      "data" TEXT ,
      );`;

    (await db).executeSql(query);
  };
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
