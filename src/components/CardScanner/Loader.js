import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import {BaseColor} from '../../config/theme';

/**
 * loader for polpular products home
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const HomeLoader = ({}) => {
  return (
    <View
      style={{
        height: '85%',
        marginBottom: 13,
        borderWidth: 1,
        margin: 14,
        borderColor: BaseColor.whiteBackground,
        borderRadius: 8,
        padding: 10,
      }}>
      <Placeholder Animation={Fade}>
        <View>
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />

          <PlaceholderLine style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
        </View>
      </Placeholder>
    </View>
  );
};
export default HomeLoader;
