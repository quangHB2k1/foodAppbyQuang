import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFoodByCate} from '../service/solvingTask';

const Categories = ({category, foodList, navigation, index}) => {
  const color = ['#FF91CB', '#FF7F27', '#ddfbf3', '#EE8AF8', '##880015'];
  const [hexColor, setHexColor] = useState(Math.floor(index));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHexColor(prevcolor => (prevcolor + 1) % 4);
    }, 550);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    console.log('set by cate : ' + JSON.stringify());
  }, [category, foodList]);
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'search',
            getFoodByCate(category.categoryId, foodList),
          )
        }
        style={[styles.button, {backgroundColor: color[hexColor]}]}>
        <Image style={styles.img} source={{uri: category.Img}} />
        <Text style={{marginLeft: 5}}>{category.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    elevation: 3,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 13,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 25,
    height: 25,
  },
});
export default Categories;
