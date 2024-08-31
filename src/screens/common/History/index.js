import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../../../components';
import SQLite from 'react-native-sqlite-storage';
import {useTheme} from '../../../config/theme';
import {
  Back,
  BAR,
  HeeaderDots,
  IdIcon,
  LinkBlue,
  Ocr,
  Options,
  PhoneBlue,
  QR,
  Trash,
  Trash2,
} from '../../../assets';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {COMMON} from '../../../navigation/ROUTES';
import Popover from 'react-native-popover-view';
// import Swipeout from 'react-native-swipeout-mod';

const db = SQLite.openDatabase({
  name: 'Scanner.db',
  location: 'default',
});

const History = ({navigation}) => {
  const colors = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM History  WHERE scannedType = ? OR scannedType = ? OR scannedType = ? order by id DESC',
        ['OCR', 'Bar Code', 'QR Code'],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
        },
      );
    });
  }, [items]);

  const DotsPressed = items => {
    console.log(items);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM History WHERE id = ?',
        [items.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Toast.show('Deleted', Toast.SHORT);
          }
        },
      );
    });
  };

  const DeleteAll = () => {
    console.log(items);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM History WHERE scannedType = ? OR scannedType = ? OR scannedType = ?',
        ['OCR', 'Bar Code', 'QR Code'],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log('Results', results.rowsAffected);
          } else {
            if (results.rowsAffected > 0) {
              Toast.show('Deleted', Toast.SHORT);
            }
          }
        },
      );
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Delete All',
      'Are you sure you want to delete all the records ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'Cancel',
        },
        {text: 'Yes', onPress: () => DeleteAll()},
      ],
    );

  const onPressed = item => {
    navigation.navigate(COMMON.Result, {
      data: item,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: 62,
          backgroundColor: colors.appBlue,
          padding: 15,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 0.34, justifyContent: 'center'}}
          onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Text whiteBackground title3>
            History
          </Text>
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Options />
        </View>
        {items.length > 0 ? (
          <Popover
            from={
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <HeeaderDots />
              </TouchableOpacity>
            }
            verticalOffset={2}
            popoverStyle={{height: 33, width: 97}}
            arrowSize={{width: 0, height: 0}}
            placement={'bottom'}>
            <View style={{marginTop: 5}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                // onPress={() => DeleteAll()}
                onPress={createTwoButtonAlert}>
                <View
                  style={{
                    marginRight: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 6,
                  }}>
                  <Trash />
                </View>

                <Text>Delete All</Text>
              </TouchableOpacity>
            </View>
          </Popover>
        ) : (
          <Popover
            from={
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <HeeaderDots />
              </TouchableOpacity>
            }
            verticalOffset={2}
            popoverStyle={{height: 33, width: 97}}
            arrowSize={{width: 0, height: 0}}
            placement={'bottom'}>
            <View style={{marginTop: 5}}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginRight: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 6,
                  }}>
                  <Trash />
                </View>

                <Text style={{color: 'rgba(150, 150, 150, 0.6)'}}>
                  Delete All
                </Text>
              </TouchableOpacity>
            </View>
          </Popover>
        )}
        {/* <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <HeeaderDots />
        </View> */}
      </View>
      <View style={{flex: 1, padding: 15}}>
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              // right={[
              //   {
              //     text: 'Delete',
              //     backgroundColor: 'red',
              //     color: 'white',
              //     backgroundColor: 'rgba(203,36,36,1)',
              //     autoClose: true,
              //     onPress: () => DotsPressed(item),
              //   },
              // ]}
              // backgroundColor={colors.whiteBackground}
              // sensitivity={500}
              onPress={() => onPressed(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.1)', //colors.textGrey,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 22,
                      backgroundColor: colors.notSelected,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.scannedType === 'Bar Code' &&
                      item.title === 'Text' && <BAR />}
                    {item.scannedType === 'QR Code' &&
                      item.title === 'Text' && <QR />}
                    {item.title === 'Phone' && <PhoneBlue />}
                    {item.title === 'URL' && <LinkBlue />}
                    {item.title === 'ID Card' && (
                      <IdIcon height={20} width={20} />
                    )}
                    {item.title === 'OCR Text' && <Ocr />}
                    {item.title === 'Passport' && (
                      <IdIcon height={20} width={20} />
                    )}
                  </View>
                </View>
                <View style={{flex: 0.9, marginLeft: 10}}>
                  <Text body1 semibold textGreyDark>
                    {item.scannedType}
                  </Text>
                  <Text regular caption1 textGrey>
                    {moment(item.dateTime).format('DD/MM/YYYY, hh:mm:ss A')}
                  </Text>
                  <Text regular caption1 textGrey>
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => DotsPressed(item)}>
                  <Trash2 />
                </TouchableOpacity>
                {/* <Popover
      from={(
        <Pressable style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }} >
          <Dots />
        </Pressable>
      )}
      verticalOffset={ -15 } 
      popoverStyle={ {height:30,width:90,}}
      arrowSize={{width: 0, height: 0 }}
      placement={'bottom'}
      >
        <Pressable style={{flexDirection:'row',marginTop:3}} onPress={() => DotsPressed(item)}>
          <View style={{marginRight:7,justifyContent:'center',alignItems:'center',marginLeft:9}}><Trash/></View>
          
        <Text>Delete</Text>
        </Pressable>
      
    </Popover> */}

                {/**/}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default History;
