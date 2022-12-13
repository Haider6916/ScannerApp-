import React from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {Text} from '../../../components';
import {COMMON, BYBARCODE, BYSCENARIO} from '../../../navigation/ROUTES';

const Home = ({navigation, route}) => {
  const DATA = [
    {
      id: '1',
      name: 'QR Codes',
      selected: BYBARCODE.QR_CODES,
    },
    {
      id: '2',
      name: 'Bar Code',
      selected: BYBARCODE.D_CODE,
    },
    {
      id: '3',
      name: 'OCR',
      selected: BYBARCODE.OCR,
    },
    {
      id: '4',
      name: 'ID Scanning',
      selected: BYBARCODE.ID_SCAN,
    },
    {
      id: '5',
      name: 'History',
      selected: COMMON.HISTORY,
    },
  ];

  const Item = ({data}) => (
    <Pressable
      onPress={() => onClicked(data)}
      style={{
        flex: 1,
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text whiteColor style={{fontSize: 14}}>
        {data.name}
      </Text>
    </Pressable>
  );
  const onClicked = data => {
    navigation.navigate(data.selected);
  };

  return (
    <View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Home;
