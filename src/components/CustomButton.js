import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../contants';

const CustomButton = ({label, Icon, onPress, backgroundColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {Icon !== undefined ? (
        <View
          style={{
            backgroundColor: Colors.DEFAULT_WHITE,
            padding: 4,
            position: 'absolute',
            left: 35,
            borderRadius: 35,
          }}>
          {Icon}
        </View>
      ) : null}

      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
          flex: 1,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
