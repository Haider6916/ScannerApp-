import {View, StatusBar, Platform, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {History, Home, IDScan_History, Splash} from '../screens/common';
import {
  DCode,
  IDScan,
  OCR,
  QRCode,
} from '../screens/ByBarCode';
import {COMMON, BYBARCODE} from './ROUTES';
import {useTheme} from '../config/theme';
import Result from '../screens/common/Result';

const Stack = createNativeStackNavigator();

const MyStatusBar = ({color}) => (
  <View>
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={color} />
      {/* statusBarBlue */}
    </SafeAreaView>
  </View>
);

const Navigator = ({}) => {
  const colors = useTheme();
  return (
    <>
      <MyStatusBar color={colors.statusBarBlue} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={COMMON.SPLASH}>
          <Stack.Screen
            name={COMMON.SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.HOME}
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.HISTORY}
            component={History}
            options={{headerShown: false}}
            // options={{
            //   title: 'History',
            //   headerStyle: {
            //     backgroundColor: colors.appBlue,
            //   },
            //   headerTitleAlign: 'center',
            //   headerTintColor: colors.whiteBackground,
            //   headerTitleStyle: {
            //     fontFamily: 'Roboto-Bold',
            //     fontSize: 20,
            //   },
            // }}
          />
          {/* <Stack.Screen
            name={BYBARCODE.ANY_CODE}
            component={AnyCode}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name={BYBARCODE.D_CODE}
            component={DCode}
            options={{
              title: 'Scan Bar Code',
              headerStyle: {
                backgroundColor: colors.appBlue,
              },
              headerTitleAlign: 'center',
              headerTintColor: colors.whiteBackground,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              },
            }}
          />
          {/* <Stack.Screen
            name={BYBARCODE.D_INDUSTRAIL}
            component={DIndustrail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.D_RETAIL}
            component={D_Retail}
            options={{headerShown: false}}
          /> */}
          {/* <Stack.Screen
          name={BYBARCODE.DOT_CODE}
          component={DotCode}
          options={{headerShown: false}}
        /> */}
          {/* <Stack.Screen
            name={BYBARCODE.DPM_CODE}
            component={DpmCode}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name={BYBARCODE.ID_SCAN}
            component={IDScan}
            options={{
              title: 'Scan ID Card',
              headerStyle: {
                backgroundColor: colors.appBlue,
              },
              headerTitleAlign: 'center',
              headerTintColor: colors.whiteBackground,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name={BYBARCODE.OCR}
            component={OCR}
            options={{
              title: 'OCR',
              headerStyle: {
                backgroundColor: colors.appBlue,
              },
              headerTitleAlign: 'center',
              headerTintColor: colors.whiteBackground,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name={BYBARCODE.QR_CODES}
            component={QRCode}
            options={{
              title: 'Scan QR Code',
              headerStyle: {
                backgroundColor: colors.appBlue,
              },
              headerTitleAlign: 'center',
              headerTintColor: colors.whiteBackground,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              },
            }}
          />
           <Stack.Screen
            name={COMMON.IDSCANHISTORY}
            component={IDScan_History}
            options={{headerShown: false}}
            // options={{
            //   title: 'History',
            //   headerStyle: {
            //     backgroundColor: colors.appBlue,
            //   },
            //   headerTitleAlign: 'center',
            //   headerTintColor: colors.whiteBackground,
            //   headerTitleStyle: {
            //     fontFamily: 'Roboto-Bold',
            //     fontSize: 20,
            //   },
            // }}
          />
           <Stack.Screen
            name={COMMON.Result}
            component={Result}
            // options={{headerShown: false}}
            options={{
              title: 'Scan Results',
              headerStyle: {
                backgroundColor: colors.appBlue,
              },
              headerTitleAlign: 'center',
              headerTintColor: colors.whiteBackground,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              },
            }}
          />
          {/* <Stack.Screen
            name={BYBARCODE.SWISS_PAYMENT}
            component={SwissPayment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.BATCH}
            component={Batch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.FROM_FAR}
            component={FromFar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.MULTIPLE_CODE}
            component={MultipleCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.ONE_OF_MANY}
            component={OneOFMany}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.SPLIT_VIEW}
            component={SplitView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYSCENARIO.TINY_CODES}
            component={TinyCodes}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
