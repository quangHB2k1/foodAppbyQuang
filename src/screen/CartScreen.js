import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getFinalAmount, sendingOrder} from '../service/solvingTask';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DelCartItem} from '../redux/action/authAction';
import {Alert} from 'antd';
import {
  PaymentCard,
  Header,
  Space,
  CustomButton,
  FoodItem,
} from '../components/index';
import {Colors} from '../contants';
import {windowHeight, windowWidth} from '../ultis/display';
const CartScreen = ({navigation}) => {
  console.log(windowHeight);
  console.log(windowWidth);

  const {userData, cart} = useSelector(state => state.user);
  const {restaurantList, foodList} = useSelector(state => state.supply);
  const [cartbyRestaurant, setCartbyRestaurant] = useState([]);
  const dispatch = useDispatch();
  const sortingCart = () => {
    const newCart = cart.reduce((accumulator, item) => {
      const key = item.restaurantId;
      const value = {
        foodId: item.foodId,
        unit: item.unit,
        nameFood: item.nameFood,
        restaurantId: item.restaurantId,
        price: item.price,
        Img: item.Img,
      };

      if (accumulator[key]) {
        accumulator[key].push(value);
      } else {
        accumulator[key] = [value];
      }

      return accumulator;
    }, {});

    const finalCart = Object.keys(newCart).map(key => {
      const resCart = {};
      resCart[key] = newCart[key];
      return resCart;
    });
    return finalCart;
  };
  useEffect(() => {
    if (cart.length > 0) {
      sortingCart().map(item => {});
      setCartbyRestaurant(sortingCart());
    } else {
      setCartbyRestaurant([]);
    }
  }, [cart]);
  const orderClick = () => {
    console.log(userData);
    sendingOrder(cartbyRestaurant, userData)
      .then(res => {
        <Alert message={res.message} type="success" />;
        dispatch(DelCartItem());
      })
      .catch(err => {
        <Alert message={err.message} type="error" />;
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        translucent
        barStyle={'dark-content'}
      />
      <Space Size={StatusBar.currentHeight} />
      <Header onPress={() => navigation.goBack()} title={'My Cart'} />

      {cartbyRestaurant.length > 0 ? (
        <>
          <ScrollView>
            {cartbyRestaurant.map(item => (
              <View
                style={{
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontWeight: '500',
                    marginTop: 10,
                  }}>
                  {
                    restaurantList.find(
                      restaurant =>
                        restaurant.restaurantId === Object.keys(item)[0],
                    ).name
                  }
                </Text>
                <FlatList
                  style={styles.resCard}
                  data={Object.values(item)[0]}
                  ListHeaderComponent={() => <Space Size={6} />}
                  ListFooterComponent={() => <Space Size={10} />}
                  ItemSeparatorComponent={() => <Space Size={10} />}
                  renderItem={({item}) => (
                    <FoodItem
                      isRemove={true}
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
              </View>
            ))}
            <Space Size={20} />
            <Space Size={10} borderTopWidth={1} marginHorizontal={15} />
            <View style={styles.paymentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  Payment method
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#F5CA48',
                  }}>
                  Add new
                </Text>
              </View>
              <PaymentCard />
            </View>
            <Space Size={20} />
            <Space Size={10} borderTopWidth={1} marginHorizontal={15} />

            <View style={styles.itemTotal}>
              <Text style={styles.totalText}>Item total</Text>
              <Text style={styles.totalAmount}>{50000}D</Text>
            </View>
            <View style={styles.itemTotal}>
              <Text style={styles.totalText}>Discount</Text>
              <Text style={styles.totalAmount}>0%</Text>
            </View>
            <View style={styles.itemTotal}>
              <Text style={[styles.totalText, {color: Colors.GOOGLE_BLUE}]}>
                Delivery
              </Text>
              <Text
                style={[
                  styles.totalAmount,
                  {fontWeight: 'bold', color: Colors.GOOGLE_BLUE},
                ]}>
                Free
              </Text>
            </View>
            <Space Size={20} />
            <Space Size={10} borderTopWidth={1} marginHorizontal={15} />
            <View style={styles.itemTotal}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.GOOGLE_BLUE,
                  fontSize: 20,
                }}>
                Total
              </Text>
              <Text
                style={[
                  styles.totalAmount,
                  {fontWeight: 'bold', color: Colors.GOOGLE_BLUE},
                ]}>
                {getFinalAmount(cart)}
              </Text>
            </View>
            <Space Size={10} />
            <CustomButton
              onPress={() => orderClick()}
              label={'Order Now'}
              Icon={
                <Icon
                  size={25}
                  color={Colors.FABEBOOK_BLUE}
                  name="shopping-cart-checkout"
                />
              }
              backgroundColor={Colors.FABEBOOK_BLUE}
            />
          </ScrollView>
        </>
      ) : (
        <>
          <View style={styles.emptyCart}>
            <Image
              style={styles.emptyImg}
              resizeMode="contain"
              source={require('../assests/images/empty_cart.png')}
            />
            <Text style={{fontSize: 20, color: '#000', lineHeight: 30 * 1.4}}>
              Go ahead and order some tasty food
            </Text>
            <CustomButton
              label={'Go home'}
              backgroundColor={'#143e2f'}
              onPress={() => navigation.navigate('home')}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    height: '90%',
    width: 10,
    margin: 6,
    borderRadius: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.5,
  },
  resCard: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  paymentContainer: {
    paddingHorizontal: 15,
  },
  itemTotal: {
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: '#000',
    fontSize: 17,
    lineHeight: 15 * 1.4,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 20,
    lineHeight: 15 * 1.4,
    color: '#000',
  },
});
