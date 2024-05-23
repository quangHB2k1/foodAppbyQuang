import {View, Text} from 'react-native';
import React from 'react';

const Space = ({Size, width, ...extraProps}) => {
  return <View style={{height: Size, width: width, ...extraProps}}></View>;
};

export default Space;
