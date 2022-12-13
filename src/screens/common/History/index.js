import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
const History = ({navigation, route}) => {
  const db = SQLite.openDatabase({
    name: 'Scanner.db',
    location: 'default',
  });
  // https://github.com/DevGate-Consultancy/React-Native-Scanner-App.git
 
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM History', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setItems(temp);

        if (results.rows.length >= 1) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      });
    });
  }, []);

  return (
    <ScrollView
      style={{flex: 1, paddingTop: 22}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Text style={{padding: 10, fontSize: 18, height: 44}}>
              {' '}
              {item.data}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({});

// data={[
//   {key: 'Devin', value: 'dataaa'},
//   {key: 'Dan', value: 'dataaa'},
//   {key: 'Dominic', value: 'dataaa'},
//   {key: 'Jackson', value: 'dataaa'},
//   {key: 'James', value: 'dataaa'},
//   {key: 'Joel', value: 'dataaa'},
//   {key: 'John', value: 'dataaa1'},
//   {key: 'Jillian', value: 'dataaa1'},
//   {key: 'Jimmy', value: 'dataaa1'},
//   {key: 'Julie', value: 'dataaa1'},
// ]}
// renderItem={({item}) => (
//   <View>
//     <Text>{item.key}</Text>
//     <Text style={{padding: 10, fontSize: 18, height: 44}}>
//       {' '}
//       {item.value}
//     </Text>
//   </View>
// )}
