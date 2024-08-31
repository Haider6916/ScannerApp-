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
  Dots,
  Download,
  HeeaderDots,
  IdIcon,
  LinkBlue,
  Ocr,
  OcrIcon,
  Options,
  PhoneBlue,
  TextIcon,
  Trash,
  Trash2,
} from '../../../assets';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Popover from 'react-native-popover-view';
import {COMMON} from '../../../navigation/ROUTES';

const db = SQLite.openDatabase({
  name: 'Scanner.db',
  location: 'default',
});

const IDScan_History = ({navigation}) => {
  const colors = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM History WHERE  scannedType = ? OR scannedType = ? order by id DESC',
        ['ID', 'Passport'],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
          //   console.log(items)
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
        'DELETE FROM History WHERE  scannedType = ? OR scannedType = ?',
        ['ID', 'Passport'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Toast.show('Deleted', Toast.SHORT);
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

  const logPressed = item => {
    // console.log(JSON.parse(item.data));
    // console.log(JSON.parse(item.data))
    console.log(JSON.parse(item.data));
    const itemData = JSON.parse(item.data);
    navigation.navigate(COMMON.Result, {
      data: item,
      dataa: itemData,
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

        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Text whiteBackground title3>
            ID Files
          </Text>
        </View>
        {/* <View
          style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
          <HeeaderDots />
        </View> */}
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
      </View>
      <View style={{flex: 1, padding: 15}}>
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)', //colors.textGrey,
              }}
              onPress={() => logPressed(item)}>
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
                  {item.title === 'Text' && <TextIcon />}
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
                  {item.title}
                </Text>
                <Text regular caption1 textGrey>
                  {moment(item.dateTime).format('DD/MM/YYYY, hh:mm:ss A')}
                </Text>
                <Text regular caption1 textGrey>
                  {item.scannedType}
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
              {/* <Pressable
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => DotsPressed(item)}>
              <Dots />
            </Pressable> */}
              {/* <Popover
                from={
                  <Pressable
                    style={{
                      flex: 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Dots />
                  </Pressable>
                }
                verticalOffset={-10}
                popoverStyle={{height: 30, width: 90}}
                arrowSize={{width: 0, height: 0}}
                placement={'bottom'}>
                <View style={{marginTop: 3}}> */}
              {/* <Pressable
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      borderBottomWidth: 0.4,
                      marginHorizontal: 8,
                      paddingBottom: 8,
                      marginBottom: 10,
                      borderColor: 'rgba(150, 150, 150, 0.6)',
                    }}
                    onPress={() => Download(item)}>
                    <View
                      style={{
                        marginRight: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Download />
                    </View>
                    <Text style={{color: 'rgba(150, 150, 150, 0.6)'}}>
                      Export
                    </Text>
                  </Pressable> */}
              {/* <Pressable
                    style={{flexDirection: 'row'}}
                    onPress={() => DotsPressed(item)}>
                    <View
                      style={{
                        marginRight: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 9,
                      }}>
                      <Trash />
                    </View>

                    <Text style={{color: 'rgba(150, 150, 150, 0.6)'}}>
                      Delete
                    </Text>
                  </Pressable>
                </View> */}
              {/* <Pressable style={{flexDirection:'row',marginTop:3}} onPress={() => DotsPressed(item)}>
         
        </Pressable> */}
              {/* </Popover> */}

              {/**/}
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default IDScan_History;
