import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Share,
  Linking,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useTheme} from '../../../config/theme';
import {
  ContactBookFF,
  CopyFF,
  Link,
  LinkAltFF,
  PhoneBlue,
  PhoneCallFF,
  ShareFF,
  TextIcon,
} from '../../../assets';
import Clipboard from '@react-native-community/clipboard';
import {Text} from '../../../components';
import Toast from 'react-native-simple-toast';
import Contacts from 'react-native-contacts';
import {
  getCardType,
  getCountry,
  getDate,
  getGender,
} from '../../../utils/stringOperations';

const Result = ({navigation, route}) => {
  const colors = useTheme();
  const previousPageData = route.params.data;
  const parseData = route?.params?.dataa;
  console.log(previousPageData);
  console.log(parseData);

  const deviceWidth = Dimensions.get('screen').width;
  const PersnonalNum = parseData?.personalNum;
  const FirstName = parseData?.firstName;
  const lastName = parseData?.lastName;
  const PassportNum = parseData?.passportNum;
  const DocumnetNum = parseData?.documentNum;

  const btnData = [
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
  ];
  const btnPhone = [
    {
      name: 'Call',
      icon: <PhoneCallFF />,
      onPress: () => openNumber(),
    },
    {
      name: 'Add Contact',
      icon: <ContactBookFF />,
      onPress: () => addContact(),
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
  ];
  const btnUrl = [
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
    {
      name: 'Open',
      icon: <LinkAltFF />,
      onPress: () => openLink(),
    },
  ];
  const btnText = [
    {
      name: 'Copy',
      icon: <CopyFF />,
      onPress: () => copyData(),
    },
    {
      name: 'Share',
      icon: <ShareFF />,
      onPress: () => shareData(),
    },
  ];

  const idData = [
    {
      name: 'DocType:',
      Text: getCardType(parseData?.documentType),
    },
    {
      name: 'Country:',
      Text: getCountry(parseData?.country),
    },
    {
      name: 'First Name:',
      Text: FirstName?.replace(/[^a-zA-Z ]/g, ''),
    },
    {
      name: 'Last Name:',
      Text: lastName?.replace(/[^a-zA-Z ]/g, ''),
    },
    {
      name: 'Doc Number:',
      Text: DocumnetNum?.replace(/[^a-zA-Z0-9 ]/g, ''),
    },
    {
      name: 'Passport Number:',
      Text: PassportNum?.replace(/[^a-zA-Z0-9 ]/g, ''),
    },
    {
      name: 'Nationality:',
      Text: getCountry(parseData?.nationality),
    },
    {
      name: 'Date of Birth',
      Text: getDate(parseData?.dob),
    },
    {
      name: 'Gender',
      Text: getGender(parseData?.gender),
    },
    {
      name: 'Expiry',
      Text: getDate(parseData?.validity),
    },
    {
      name: 'Personal Number',
      Text: PersnonalNum?.replace(/[^a-zA-Z0-9 ]/g, ''),
    },
  ];

  const copyData = () => {
    Clipboard.setString(previousPageData.data.toString());
    Toast.show('Copied!', Toast.SHORT);
  };

  const copyparseData = () => {
    Clipboard.setString(
      'DocType: ' +
        getCardType(parseData?.documentType) +
        '\n' +
        'Country: ' +
        getCountry(parseData?.country) +
        '\n' +
        'First Name: ' +
        FirstName?.replace(/[^a-zA-Z ]/g, '') +
        '\n' +
        'Last Name: ' +
        lastName?.replace(/[^a-zA-Z ]/g, '') +
        '\n' +
        'Doc Number: ' +
        DocumnetNum?.replace(/[^a-zA-Z0-9 ]/g, '') +
        '\n' +
        'Passport Number: ' +
        PassportNum?.replace(/[^a-zA-Z0-9 ]/g, '') +
        '\n' +
        'Nationality: ' +
        getCountry(parseData?.nationality) +
        '\n' +
        'Date of Brth: ' +
        getDate(parseData?.dob) +
        '\n' +
        'Gender: ' +
        getGender(parseData?.gender) +
        '\n' +
        'Expiry: ' +
        getDate(parseData?.validity) +
        '\n' +
        'Personal Number: ' +
        PersnonalNum.replace(/[^a-zA-Z0-9 ]/g, ''),
    );

    Toast.show('Copied!', Toast.SHORT);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: previousPageData.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const openLink = () => {
    Linking.openURL(previousPageData.data);
  };

  const openNumber = () => {
    const url = `tel:${previousPageData.data}`;
    Linking.openURL(url).catch(error =>
      console.error('An error occurred', error),
    );
    // Linking.openURL(data);
  };

  const addContact = async () => {
    const phoneNumber = previousPageData.data;
    if (!phoneNumber) {
      return Alert.alert(
        'Invalid QR code',
        'The QR code does not contain a valid phone number',
      );
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to add a contact',
        },
      );

      // const read = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      // {
      //   title: 'Read',
      //   message: 'This app would like to read your contacts',
      // }

      // );

      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        return Alert.alert(
          'Permission Denied',
          'The app does not have permission to add a contact',
        );
      }
    }
    let newNumber = {
      emailAddresses: [
        {
          label: 'work',
          email: '',
        },
      ],
      phoneNumbers: [
        {
          label: 'mobile',
          number: previousPageData.data,
        },
      ],
      familyName: '',
      givenName: '',
    };

    Contacts.openContactForm(newNumber);
  };

  return (
    <>
      {previousPageData.title === 'Phone' ? (
        <View style={{marginTop: 14, marginHorizontal: 16}}>
          <View>
            <View style={{padding: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  marginBottom: 11,
                }}>
                <View
                  style={{
                    height: 52,
                    width: 52,
                    backgroundColor: colors.notSelected,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <PhoneBlue />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Text semibold title3>
                    {previousPageData.title}
                  </Text>
                  <Text caption1 light>
                    {previousPageData.scannedType}
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 40}}>
                <Text numberOfLines={3} body1 medium>
                  {previousPageData.data}
                </Text>
              </View>
              <View
                style={{
                  // flex: 0.9,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                }}>
                {btnPhone.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={item.onPress}
                      key={index.toString()}>
                      <View
                        style={{
                          height: 44,
                          width: 44,
                          borderRadius: 22,
                          backgroundColor: colors.appBlue,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        {item.icon}
                      </View>
                      <Text body2 regular blackColor>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      ) : previousPageData.title === 'OCR Text' ? (
        <View>
          <View
            style={{
              height: '85%',
              marginBottom: 13,
              borderWidth: 1,
              margin: 14,
              borderColor: colors.textGrey,
              borderRadius: 8,
            }}>
            <ScrollView
              contentContainerStyle={{
                width: deviceWidth,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                paddingHorizontal: 30,
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              // style={ScanResult ? styles.scanCardView : styles.cardView}
            >
              <Text>{previousPageData.data}</Text>
            </ScrollView>
          </View>
          {/* <View
                style={{
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  paddingHorizontal: 60,
                }}>
                <Pressable
                  onPress={() => copyData(result)}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 22,
                    backgroundColor: colors.appBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Copy />
                </Pressable>
                <Pressable
                  onPress={() => shareData(result)}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 22,
                    backgroundColor: colors.appBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ShareI />
                </Pressable>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 22,
                    backgroundColor: colors.appBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Save />
                </View>
              </View> */}
          <View
            style={{
              // flex: 0.9,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {btnData.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={item.onPress}
                  key={index.toString()}>
                  <View
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 22,
                      backgroundColor: colors.appBlue,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.icon}
                  </View>
                  <Text body2 regular blackColor>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ) : previousPageData.title === 'URL' ? (
        <View style={{marginTop: 14, marginHorizontal: 16}}>
          <View>
            <View style={{padding: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  marginBottom: 11,
                }}>
                <View
                  style={{
                    height: 52,
                    width: 52,
                    backgroundColor: colors.notSelected,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Link />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Text semibold title3>
                    {previousPageData.title}
                  </Text>
                  <Text caption1 light>
                    {previousPageData.scannedType}
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 40}}>
                <Text numberOfLines={3} body1 medium>
                  {previousPageData.data}
                </Text>
              </View>
              <View
                style={{
                  // flex: 0.9,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                }}>
                {btnUrl.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={item.onPress}
                      key={index.toString()}>
                      <View
                        style={{
                          height: 44,
                          width: 44,
                          borderRadius: 22,
                          backgroundColor: colors.appBlue,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        {item.icon}
                      </View>
                      <Text body2 regular blackColor>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      ) : previousPageData.title === 'ID Card' ? (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 33,
            marginTop: 20,
            flexGrow: 1,
          }}>
          {idData.map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  paddingBottom: 14,
                  paddingTop: 14,
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                }}>
                <Text>{item.name}</Text>
                <Text body2 regular blackColor>
                  {item.Text}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={{
              height: 49,
              width: 128,
              backgroundColor: 'rgba(70, 135, 236, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              alignSelf: 'center',
              marginTop: 50,
            }}
            onPress={copyparseData}>
            <Text appBlue>Copy Data</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : previousPageData.title === 'Passport' ? (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 33,
            marginTop: 20,
            flexGrow: 1,
          }}>
          {idData.map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  paddingBottom: 14,
                  paddingTop: 14,
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                }}>
                <Text>{item.name}</Text>
                <Text body2 regular blackColor>
                  {item.Text}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={{
              height: 49,
              width: 128,
              backgroundColor: 'rgba(70, 135, 236, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              alignSelf: 'center',
              marginTop: 50,
            }}
            onPress={copyparseData}>
            <Text appBlue>Copy Data</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{marginTop: 14, marginHorizontal: 16}}>
          <View>
            <View style={{padding: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  marginBottom: 11,
                }}>
                <View
                  style={{
                    height: 52,
                    width: 52,
                    backgroundColor: colors.notSelected,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextIcon />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Text semibold title3>
                    {previousPageData.title}
                  </Text>
                  <Text caption1 light>
                    {previousPageData.scannedType}
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 40}}>
                <Text body1 medium>
                  {previousPageData.data}
                </Text>
              </View>
              <View
                style={{
                  // flex: 0.9,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                }}>
                {btnText.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={item.onPress}
                      key={index.toString()}>
                      <View
                        style={{
                          height: 44,
                          width: 44,
                          borderRadius: 22,
                          backgroundColor: colors.appBlue,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        {item.icon}
                      </View>
                      <Text body2 regular blackColor>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Result;
