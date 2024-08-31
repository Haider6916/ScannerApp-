import React from 'react';
import {View} from 'react-native';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';

/**
 * loader for polpular products home
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const IDLoader = ({}) => {
  return (
    <>
      <Placeholder Animation={Fade}>
        <View style={{marginVertical: 20, marginHorizontal: 15}}>
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
          <PlaceholderLine
            style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 60}}
          />
        </View>
      </Placeholder>
    </>
  );
};
export default IDLoader;
