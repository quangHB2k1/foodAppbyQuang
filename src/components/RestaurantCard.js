import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../contants';
const RestaurantCard = ({restaurant, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Container}>
      <Image style={styles.image} source={{uri: restaurant.Image}} />
      <Text
        style={{
          color: '#181c2e',
          fontSize: 20,
          marginBottom: 6,
          paddingLeft: 10,
        }}>
        {restaurant.name}
      </Text>
      <Text
        style={{
          color: '#a0a5ba',
          fontSize: 14,
          marginBottom: 14,
          paddingLeft: 10,
        }}>
        Address: {restaurant.address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          paddingLeft: 10,
          paddingBottom: 10,
        }}>
        <Icon name="star" size={20} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
            marginRight: 20,
          }}>
          100
        </Text>
        <Icon name="local-shipping" size={20} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 14,
            marginLeft: 5,
            marginRight: 20,
          }}>
          Free
        </Text>
        <Icon name="alarm" size={20} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 14,
            flex: 1,
            marginLeft: 5,
          }}>
          20 min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderRadius: 10,
    shadowColor: '#00000008',
    shadowOpacity: 0.03999999910593033,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 20,
    elevation: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 288,
    height: 162,
    borderRadius: 10,
    margin: 5,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#000',
  },
  adress: {
    marginLeft: 8,
    fontSize: 14,
    color: 'grey',
    lineHeight: 20,
  },
  starBox: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
});

export default RestaurantCard;
