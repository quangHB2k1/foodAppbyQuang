import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../contants';
const FoodCard = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Container}>
      <Image style={styles.image} source={{uri: item.Img}} />
      <Text
        style={{
          color: '#000',
          fontSize: 16,
          lineHeight: 20 * 1.4,
          fontWeight: '400',
        }}>
        {item.nameFood}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 15 * 1.4}}>best food </Text>
      <Text
        style={{
          color: Colors.DEFAULT_YELLOW,
          fontSize: 16,

          fontWeight: '600',
        }}>
        {item.price}D
      </Text>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  Container: {
    flex: 0.5,

    height: 200,
    alignItems: 'center',
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    margin: 5,
  },
  image: {
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    borderRadius: 10,
    height: 85,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    marginTop: 11,
    color: '#0D0D0D',
    fontSize: 18,
    fontWeight: '700',
  },
  price: {
    fontSize: 13.5,
    color: 'red',
    lineHeight: 15,
  },
});
