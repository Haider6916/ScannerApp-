import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import React from 'react';
const History = ({navigation, route}) => {
  return (
    <View style={{flex: 1, paddingTop: 22}}>
      <FlatList
        data={[
          {key: 'Devin', value: 'dataaa'},
          {key: 'Dan', value: 'dataaa'},
          {key: 'Dominic', value: 'dataaa'},
          {key: 'Jackson', value: 'dataaa'},
          {key: 'James', value: 'dataaa'},
          {key: 'Joel', value: 'dataaa'},
          {key: 'John', value: 'dataaa1'},
          {key: 'Jillian', value: 'dataaa1'},
          {key: 'Jimmy', value: 'dataaa1'},
          {key: 'Julie', value: 'dataaa1'},
        ]}
        renderItem={({item}) => (
          <View>
            <Text>{item.key}</Text>
            <Text style={{padding: 10, fontSize: 18, height: 44}}>
              {' '}
              {item.value}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
