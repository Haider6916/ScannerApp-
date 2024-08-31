import {useTheme} from '../../config/theme';
import {BaseStyle} from '../../config/styles';
import React, {forwardRef, useRef, useEffect} from 'react';
import {TextInput, View, Animated} from 'react-native';
import styles from './styles';
import {Text} from '..';

const Index = forwardRef((props, ref) => {
  const {
    style,
    onChangeText,
    placeholder,
    isPlaceholder = true,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    inputStyle,
    iconLeft,
    isPrefix,
    ...attrs
  } = props;

  const colors = useTheme();

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  /** when input is focused */
  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  /** blur handler of input */
  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  /** function to animate placeholder */
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  /** function to animate back placeholder */
  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  /** value of Y in animation */
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  /** animation styles */
  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
    position: 'absolute',
    left: value !== '' ? (isPrefix ? -40 : 10) : iconLeft ? 38 : 15,
    backgroundColor: colors.whiteBackground,
    paddingHorizontal: value !== '' ? 5 : 0,
  };

  return (
    <View style={[BaseStyle.textInput, style]}>
      {iconLeft}
      {isPlaceholder && (
        <Animated.View style={[animStyle]}>
          <Text
            regular
            style={{
              fontSize: value === '' ? 16 : 10,
              color: colors.textGreyDark,
            }}>
            {placeholder}
          </Text>
        </Animated.View>
      )}
      <TextInput
        ref={ref}
        style={[styles.input, {color: colors.blackColor}, inputStyle]}
        onChangeText={text => onChangeText(text)}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.textGrey}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      {icon}
    </View>
  );
});
export default Index;
