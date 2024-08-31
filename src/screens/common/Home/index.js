import React, {useRef} from 'react';
import {View, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {Text} from '../../../components';
import {useTheme} from '../../../config/theme';
import {COMMON, BYBARCODE} from '../../../navigation/ROUTES';
import Drawer from 'react-native-drawer';
import {
  PrivacyIcon,
  RateIcon,
  ShareIcon,
  SidebarPng,
  QrIcon,
  BarIcon,
  IdIcon,
  OcrIcon,
  FileIcon,
  HistoryIcon,
  Bars,
  HomeBackground,
} from '../../../assets';
import GestureRecognizer from 'react-native-swipe-gestures';

const Home = ({navigation}) => {
  const colors = useTheme();
  const drawerRef = useRef(null);
  const DATA = [
    {
      id: '1',
      name: 'QR Code',
      selected: BYBARCODE.QR_CODES,
      icon: <QrIcon />,
    },
    {
      id: '2',
      name: 'Bar Code',
      selected: BYBARCODE.D_CODE,
      icon: <BarIcon />,
    },
    {
      id: '3',
      name: 'ID Card',
      selected: BYBARCODE.ID_SCAN,
      icon: <IdIcon />,
    },
    {
      id: '4',
      name: 'OCR',
      selected: BYBARCODE.OCR,
      icon: <OcrIcon />,
    },
    {
      id: '5',
      name: 'History',
      selected: COMMON.HISTORY,
      icon: <HistoryIcon />,
    },
    {
      id: '6',
      name: 'ID Files',
      selected: COMMON.IDSCANHISTORY,
      icon: <FileIcon />,
    },
  ];

  /**
   * function to render items
   * @param {*} param0 data of item
   * @returns React Component
   */
  const Item = ({data}) => (
    <TouchableOpacity
      onPress={() => onClicked(data)}
      style={{
        flex: 1,
        backgroundColor: colors.notSelected,
        borderRadius: 24,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 116,
      }}>
      {data.icon}
      <View style={{marginTop: 8}}>
        <Text regular body2>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * function to navigate
   * @param {*} data where to navigate
   */
  const onClicked = data => {
    navigation.navigate(data.selected);
  };

  const openDrawer = () => {
    drawerRef.current.open();
  };

  return (
    <>
      <Drawer
        ref={drawerRef}
        styles={{
          mainOverlay: {
            backgroundColor: 'black',
            opacity: 0,
          },
        }}
        tweenHandler={ratio => ({
          mainOverlay: {
            opacity: ratio / 2,
          },
        })}
        openDrawerOffset={viewport => viewport.width - 250}
        tapToClose={true}
        negotiatePan={true}
        content={<SideBarContent />}>
        <GestureRecognizer onSwipeRight={openDrawer} style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, backgroundColor: colors.whiteBackground}}></View>
            <View style={{flex: 1, backgroundColor: colors.appBlue}}></View>
          </View>

          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}>
            <ImageBackground
              source={HomeBackground}
              style={{
                flex: 1,
                backgroundColor: colors.appBlue,
                borderBottomLeftRadius: 50,
                paddingHorizontal: 16,
                paddingTop: 45,
              }}>
              <TouchableOpacity
                onPress={openDrawer}
                style={{
                  height: 48,
                  width: 48,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 9,
                }}>
                <Bars />
              </TouchableOpacity>
              <View style={{marginTop: 28}}>
                <Text whiteBackground bold header>
                  {`QR Code &\nBarcode Scanner`}
                </Text>
              </View>
            </ImageBackground>
            <View
              style={{
                flex: 1.9,
                backgroundColor: colors.whiteBackground,
                borderTopRightRadius: 50,
                paddingHorizontal: 11,
              }}>
              <View style={{marginTop: 40}}>
                <FlatList
                  data={DATA}
                  numColumns={3}
                  columnWrapperStyle={{
                    marginBottom: 20,
                  }}
                  renderItem={({item}) => <Item data={item} />}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
        </GestureRecognizer>
      </Drawer>
    </>
  );
};

export default Home;

const SideBarContent = () => {
  const colors = useTheme();
  const sideBarData = [
    {
      name: 'Privacy Policy',
      icon: <PrivacyIcon />,
    },
    {
      name: 'Share App',
      icon: <ShareIcon />,
    },
    {
      name: 'Rate Us',
      icon: <RateIcon />,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: colors.whiteBackground}}>
      <View
        style={{
          flex: 0.3,
          backgroundColor: colors.appBlue,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={SidebarPng}
          style={{height: 140, width: 158}}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          marginTop: 33,
        }}>
        <FlatList
          data={sideBarData}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                marginLeft: 37,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: colors.notSelected,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.icon}
              </View>
              <View style={{marginLeft: 16}}>
                <Text textGreyDark regular body2>
                  {item.name}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
