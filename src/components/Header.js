import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../contants/index';
import SearchBar from './searchBar';
import Space from './Space';
const Header = ({onPress, title}) => {
  return (
    <View style={styles.headerContainer}>
      <Icon
        onPress={onPress}
        name="arrow-back-ios-new"
        style={{
          elevation: 3,

          backgroundColor: 'gray',
        }}
        size={30}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: 40,
          textAlign: 'center',
          flex: 1,
        }}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
export default Header;
