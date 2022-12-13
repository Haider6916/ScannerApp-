import {View, StatusBar, Platform, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {History, Home, Splash} from '../screens/common';
import {
  AnyCode,
  DCode,
  DIndustrail,
  DotCode,
  DpmCode,
  D_Retail,
  IDScan,
  OCR,
  QRCode,
  SwissPayment,
} from '../screens/ByBarCode';
import {COMMON, BYBARCODE, BYSCENARIO} from './ROUTES';
import {
  Batch,
  FromFar,
  MultipleCode,
  OneOFMany,
  SplitView,
  TinyCodes,
} from '../screens/ByScenario';
import {BaseColor} from '../config/theme';
// import {navigationRef} from './RootNavigation';
// import * as RootNavigation from './RootNavigation';

// import {createStackNavigator} from '@react-navigation/stack';

const STATUSBAR_HEGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

const MyStatusBar = ({}) => (
  <View>
    <SafeAreaView>
      <StatusBar/>
    </SafeAreaView>
  </View>
);

const Navigator = ({}) => {
  return (
    <>
      <MyStatusBar />
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
          />
          <Stack.Screen
            name={BYBARCODE.ANY_CODE}
            component={AnyCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.D_CODE}
            component={DCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.D_INDUSTRAIL}
            component={DIndustrail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.D_RETAIL}
            component={D_Retail}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
          name={BYBARCODE.DOT_CODE}
          component={DotCode}
          options={{headerShown: false}}
        /> */}
          <Stack.Screen
            name={BYBARCODE.DPM_CODE}
            component={DpmCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.ID_SCAN}
            component={IDScan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.OCR}
            component={OCR}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={BYBARCODE.QR_CODES}
            component={QRCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
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
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
