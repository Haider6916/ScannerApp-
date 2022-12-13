import {Typography} from '../../config/typography';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { BaseColor } from '../../config/theme';

export default function Index(props) {
  const {
    //props style
    header,
    heading,
    title,
    title1,
    title2,
    title3,
    title4,
    small,
    headline,
    body1,
    body2,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    lightGray,
    whiteColor,
    blackColor,
    primaryDark,
    primaryLight,
    textPrimaryBold,
    statusBarGray,
    headerGray,
    faint,
    blueColor,
    bordercolor,
    lowemphasis,
    mediumemphasis,
    highemphasis,
    titleGray,
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
    iserror,
  } = props;

  // const { colors } = useTheme();
  // const font = useFont();

  let textStyle = StyleSheet.flatten([
    header && Typography.header,
    title && Typography.title,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    title4 && Typography.title4,
    heading && Typography.heading,
    small && Typography.small,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,

    //custom for font
    // thin && {fontWeight: FontWeight.thin},
    // ultraLight && {fontWeight: FontWeight.ultraLight},
    // light && {fontWeight: FontWeight.light},
    // regular && {fontWeight: FontWeight.regular},
    // medium && {fontWeight: FontWeight.medium},
    // semibold && {fontWeight: FontWeight.semibold},
    // // bold && {fontWeight: FontWeight.bold},
    // heavy && {fontWeight: FontWeight.heavy},
    // black && {fontWeight: FontWeight.black},
    // default color
    {color: BaseColor.blackColor},
    //custom for color
    lightGray && {color: BaseColor.lightGray},
    whiteColor && {color: BaseColor.whiteColor},
    blackColor && {color: BaseColor.blackColor},
    primaryDark && {color: BaseColor.primaryDark},
    primaryLight && {color: BaseColor.primaryLight},
    textPrimaryBold && {color: BaseColor.textPrimaryBold},
    statusBarGray && {color: BaseColor.statusBarGray},
    headerGray && {color: BaseColor.headerGray},
    bordercolor && {color: BaseColor.bordercolor},
    lowemphasis && {color: BaseColor.lowemphasis},
    faint && {color: BaseColor.faint},
    mediumemphasis && {color: BaseColor.mediumemphasis},
    titleGray && {color: BaseColor.titleGray},
    highemphasis && {color: BaseColor.highemphasis},
    blueColor && {color: BaseColor.blueColor},
    iserror && {color: BaseColor.errorColor},
    //Lato Fonts
    thin && {fontFamily: 'Lato-Thin'},
    light && {fontFamily: 'Lato-Light'},
    regular && {fontFamily: 'Lato-Regular'},
    bold && {fontFamily: 'Lato-Bold'},
    black && {fontFamily: 'Lato-Black'},

    ultraLight && {fontFamily: 'Lato-Hairline'},
    medium && {fontFamily: 'Lato-Medium'},
    heavy && {fontFamily: 'Lato-Heavy'},
    semibold && {fontFamily: 'Lato-Semibold'},
    {
      textAlign,
    },
    style && style,
  ]);

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
