import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../contants';
import {useDispatch, useSelector} from 'react-redux';
import {Space, Header, SearchBar, FoodItem} from '../components/index';
const Searchscreen = ({navigation, route}) => {
  const cart = useSelector(state => state.user.cart);
  const foodList = route.params;
  const [menu, setMenu] = useState(foodList);
  const reLoadMenu = () => {
    if (cart.length > 0) {
      const updatedMenu = foodList.map(food => {
        const cartItem = cart.find(item => item.foodId === food.foodId);
        if (cartItem) {
          food.unit = cartItem.unit;
        } else {
          food.unit = 0;
        }

        return food;
      });
      setMenu(updatedMenu);
    } else {
      const updatedMenu = foodList.map(food => ({...food, unit: 0}));
      setMenu(updatedMenu);
    }
    console.log(JSON.stringify(menu));
  };
  useEffect(() => {
    reLoadMenu();
  }, [cart]);
  const handleSearch = text => {
    console.log(text);
    if (text.trim() === '') {
      reLoadMenu();
    } else {
      const filteredData = menu.filter(food => {
        return food.nameFood.toLowerCase().includes(text.toLowerCase());
      });
      setMenu(filteredData);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent />

      <Space Size={StatusBar.currentHeight} />
      <Header
        title={'search screen'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <SearchBar onSearch={handleSearch} />
      <FlatList
        ListHeaderComponent={() => <Space Size={20} />}
        ListFooterComponent={() => <Space Size={10} />}
        ItemSeparatorComponent={() => <Space Size={20} />}
        style={{
          paddingHorizontal: 15,
        }}
        data={menu}
        renderItem={({item}) => (
          <FoodItem
            onPress={() =>
              navigation.navigate('foodDetail', {
                selectedfood: item,
              })
            }
            selectedfood={item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
});
export default Searchscreen;
