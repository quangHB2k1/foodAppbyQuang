import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFoodByRes} from '../service/solvingTask';
import {Space, FoodItem} from '../components/index';

const RestaurantScreen = ({navigation, route}) => {
  const cart = useSelector(state => state.user.cart);
  const {restaurant, foodList} = route.params;
  const [menu, setMenu] = useState(
    getFoodByRes(restaurant.restaurantId, foodList),
  );
  useEffect(() => {
    console.log('cart:  ' + JSON.stringify(cart));
    if (cart.length > 0) {
      const updatedMenu = menu.map(food => {
        const cartItem = cart.find(item => item.foodId === food.foodId);
        if (cartItem) {
          food.unit = cartItem.unit;
        } else {
          food.unit = 0;
        }

        console.log('item: ' + food.unit);
        return food;
      });
      for (let i of updatedMenu) {
        console.log('update:  ' + JSON.stringify(i.unit));
      }
      setMenu(updatedMenu);
    } else {
      const updatedMenu = menu.map(food => ({...food, unit: 0}));
      setMenu(updatedMenu);
    }
  }, [cart]);
  useEffect(() => {
    StatusBar.setHidden(true, 'slide');

    return () => {
      StatusBar.setHidden(false, 'slide');
    };
  }, []);
  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: '100%',
          height: 300,
        }}
        source={{uri: restaurant.Image}}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Restaurant Information</Text>
        <Text>{`Location: ${restaurant.address}`}</Text>

        <Text style={styles.Menu}>Menu</Text>

        <FlatList
          ItemSeparatorComponent={() => <Space Size={20} />}
          data={menu}
          renderItem={({item}) => (
            <FoodItem
              onPress={() =>
                navigation.navigate('foodDetail', {
                  selectedfood: item,
                })
              }
              selectedfood={item}
              cart={cart}
            />
          )}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  restaurantName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeBtn: {
    color: 'white',
  },
  content: {
    padding: 16,
  },
  Menu: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RestaurantScreen;
