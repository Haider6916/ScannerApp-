import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Onboarding1,
  Onboarding2,
  Onboarding3,
  SplashPng,
} from '../../../assets';
import {COMMON} from '../../../navigation/ROUTES';
import {createTable} from '../../../utils/queries';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../../config/theme';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '../../../components';

let createHistoryTable = `CREATE TABLE IF NOT EXISTS "History" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT ,
  "dateTime" TEXT ,
  "scannedType" TEXT,
  "data" TEXT 
);`;
const {height, width} = Dimensions.get('screen');

const Splash = ({navigation, route}) => {
  const colors = useTheme();
  const onboardingRef = useRef(null);

  const [onboarding, setOnboarding] = useState(false);
  const [onBoardingDone, setOnBoardingDone] = useState(false);

  useEffect(() => {
    createTable(createHistoryTable, 'History');
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@onBoardingDone');
      console.log(value, 'cache');
      if (value !== null) {
        setTimeout(() => {
          console.log(onBoardingDone, 'onBoardingDone');
          setOnBoardingDone(true);
          navigation.replace(COMMON.HOME);
        }, 4000);
      } else {
        setTimeout(() => {
          setOnboarding(true);
          setOnBoardingDone(false);
        }, 4000);
      }
    } catch (e) {
      // error reading value
    }
  };

  const onNavigate = async () => {
    try {
      await AsyncStorage.setItem('@onBoardingDone', 'true');
      navigation.replace(COMMON.HOME);
    } catch (e) {
      // saving error
    }
  };

  const goNext = () => {
    onboardingRef.current.goNext();
  };

  return (
    <>
      {onboarding && !onBoardingDone ? (
        <Onboarding
          ref={onboardingRef}
          bottomBarColor={colors.whiteBackground}
          bottomBarHeight={100}
          containerStyles={{backgroundColor: colors.whiteBackground}}
          SkipButtonComponent={() => {
            return (
              <TouchableOpacity
                onPress={onNavigate}
                style={{marginLeft: 16, marginBottom: 50}}>
                <Text textGrey body1 regular>
                  {`Skip`}
                </Text>
              </TouchableOpacity>
            );
          }}
          imageContainerStyles={{paddingBottom: 0, marginBottom: 50}}
          titleStyles={{
            marginBottom: 8,
            paddingBottom: 0,
            fontSize: 20,
            fontFamily: 'Roboto-Bold',
          }}
          subTitleStyles={{
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
            color: 'rgba(163, 163, 163, 1)',
            paddingHorizontal: 12,
          }}
          NextButtonComponent={() => {
            return (
              <TouchableOpacity
                onPress={goNext}
                style={{
                  marginRight: 16,
                  backgroundColor: colors.appBlue,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}>
                <Text whiteColor body1 medium>
                  {`Next`}
                </Text>
              </TouchableOpacity>
            );
          }}
          DoneButtonComponent={() => {
            return (
              <TouchableOpacity
                onPress={onNavigate}
                style={{
                  marginRight: 16,
                  backgroundColor: colors.appBlue,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}>
                <Text whiteColor body1 medium>
                  {`Get Started`}
                </Text>
              </TouchableOpacity>
            );
          }}
          DotComponent={item => {
            return (
              <View
                style={{
                  backgroundColor: item.selected
                    ? colors.appBlue
                    : colors.notSelected,
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  marginHorizontal: 3,
                  marginBottom: 50,
                }}>
                <Text>.</Text>
              </View>
            );
          }}
          bottomBarHighlight={true}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Onboarding1 height={300} />,
              title: 'Easy To Use',
              subtitle:
                'The intuitive design and simple navigation make it easy to scan codes and access information quickly.',
            },
            {
              backgroundColor: '#fff',
              image: <Onboarding2 height={300} />,
              title: 'Exactly',
              subtitle: `With our app's precise scanning capabilities, you can trust that you'll always receive the correct information from every code you scan.`,
            },
            {
              backgroundColor: '#fff',
              image: <Onboarding3 height={300} />,
              title: 'Fast & Convenient',
              subtitle:
                'fast scanning speed and ability to scan codes from any angle make it a convenient tool for quickly accessing information on-the-go.',
            },
          ]}
        />
      ) : (
        <LinearGradient
          colors={[colors.appBlue, colors.appBlueLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <ImageBackground
              source={SplashPng}
              style={{height: 228, width: 176}}
            />
          </View>
        </LinearGradient>
      )}
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({});
