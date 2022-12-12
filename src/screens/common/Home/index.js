import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {COMMON, BYBARCODE, BYSCENARIO} from '../../../navigation/ROUTES';

const Home = ({navigation, route}) => {
  const DATA = [
    // {
    //   id: '1',
    //   name: '1D Retail',
    //   selected: BYBARCODE.D_RETAIL,
    // },
    // {
    //   id: '2',
    //   name: '1D Industrail',
    //   selected: BYBARCODE.D_INDUSTRAIL,
    // },
    {
      id: '3',
      name: 'QR Codes',
      selected: BYBARCODE.QR_CODES,
    },
    {
      id: '4',
      name: 'Bar Code',
      selected: BYBARCODE.D_CODE,
    },
    // {
    //   id: '5',
    //   name: 'Any Code',
    //   selected: BYBARCODE.ANY_CODE,
    // },
    // {
    //   id: '6',
    //   name: 'Dpm Codes',
    //   selected: BYBARCODE.DPM_CODE,
    // },
    {
      id: '7',
      name: 'OCR',
      selected: BYBARCODE.OCR,
    },
    {
      id: '8',
      name: 'ID Scanning',
      selected: BYBARCODE.ID_SCAN,
    },
    {
      id: '9',
      name: 'History',
      selected: COMMON.HISTORY,
    },
    // {
    //   id: '10',
    //   name: 'Dot Code',
    //   selected: BYBARCODE.DOT_CODE,
    // },
  ];

  const DATA2 = [
    {
      id: '1',
      name: 'Multiple Codes/ Label Scanning',
      selected: BYSCENARIO.MULTIPLE_CODE,
    },
    {
      id: '2',
      name: 'Batch/ Inventory',
      selected: BYSCENARIO.BATCH,
    },
    {
      id: '3',
      name: 'One Of Many Codes',
      selected: BYSCENARIO.ONE_OF_MANY,
    },
    {
      id: '4',
      name: 'Tiny Codes',
      selected: BYSCENARIO.TINY_CODES,
    },
    {
      id: '5',
      name: 'Split View',
      selected: BYSCENARIO.SPLIT_VIEW,
    },
    {
      id: '6',
      name: 'From Far Away',
      selected: BYSCENARIO.FROM_FAR,
    },
    {
      id: '7',
      name: 'History',
      selected: COMMON.HISTORY,
    },
  ];
  const Item = data => (
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
      <Text style={{fontSize: 14}}>{data.name}</Text>
    </Pressable>
  );
  const onClicked = data => {
    navigation.navigate(data.selected);
  };

  return (
    <View>
      <View>
        {/* <Text
          style={{
            fontSize: 16,
            color: 'blue',
            textAlign: 'center',
          }}>{`SELECT SCANNER BY BARCODE`}</Text> */}
        <FlatList
          data={DATA}
          // numColumns={3}
          // columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      {/* <View>
        <Text
          style={{
            fontSize: 16,
            color: 'blue',
            textAlign: 'center',
          }}>{`SELECT SCANNER BY SCENARIO`}</Text>
        <FlatList
          data={DATA2}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={({item}) => <Item data={item} />}
          keyExtractor={(item: IUser) => item.id}
        />
      </View> */}
    </View>
  );
};

export default Home;
