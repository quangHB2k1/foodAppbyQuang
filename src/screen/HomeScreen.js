import {
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../contants/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Space, Categories, RestaurantCard, FoodCard} from '../components/index';
import {
  getAllCategory,
  getAllFood,
  getAllRestaurant,
  getTopFood,
} from '../redux/action/supplyAction';
import {useDispatch, useSelector} from 'react-redux';
import {renderTopFood} from '../service/solvingTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {restaurantList, foodList, categoryList, foodIdList} = useSelector(
    state => state.supply,
  );
  const {userData, login} = useSelector(state => state.user);
  console.log('isss : ' + JSON.stringify(userData));
  useEffect(() => {
    dispatch(getAllRestaurant());
    dispatch(getAllCategory());
    dispatch(getAllFood());
    dispatch(getTopFood());
  }, []);
  const CustomeSearch = () => {
    return (
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('search', foodList)}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="search" size={25} color={'#FF3F00'} />
          <Text
            placeholder="See all food"
            style={{
              marginLeft: 10,
              fontSize: 17,
              color: 'black',
            }}>
            See all food here
          </Text>
        </View>
        <Icon name="tune" size={23} color={Colors.GOOGLE_BLUE} />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={'#fff'}
        translucent
        barStyle={'dark-content'}
      />
      <Space Size={StatusBar.currentHeight} />
      <View style={styles.header}>
        <Image
          style={styles.muImage}
          source={require('../assests/images/Manu.png')}
        />
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            marginRight: 10,
          }}>
          <Text
            style={{
              color: '#fc6e2a',
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 3,
            }}>
            Deliver to
          </Text>
          <Text
            style={{
              fontWeight: '400',
              color: 'gray',
              fontSize: 15,
            }}>
            Cont ty x
          </Text>
        </View>
        <Space flex={1} />
        <Image
          style={{width: 30, height: 30}}
          source={require('../assests/images/LoveIcon.png')}
        />
      </View>
      <Space Size={30} />
      <Text
        style={{
          paddingHorizontal: 24,
          color: 'black',
          fontSize: 16,
          fontWeight: '600',
        }}>
        {userData.userName}, Good Afternoon!
      </Text>
      <Space Size={10} />
      <CustomeSearch />

      <View style={styles.CategoryBox}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            marginRight: 4,
            flex: 1,
            fontWeight: '500',
          }}>
          All Categories
        </Text>
        <Text
          style={{
            color: '#FF7F27',
            fontSize: 18,
            fontWeight: '600',
          }}>
          See All
        </Text>
      </View>
      <Space Size={20} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Space width={10} />}
        style={{paddingHorizontal: 15}}
        horizontal
        data={categoryList}
        renderItem={({item}) => (
          <Categories
            category={item}
            foodList={foodList}
            navigation={navigation}
            index={Math.random() * 4}
          />
        )}
      />
      <Space Size={15} />
      <View style={styles.CategoryBox}>
        <Text style={{flex: 1, color: '#000', fontSize: 20}}>
          Open Restaurant
        </Text>
        <Text
          style={{
            color: '#FF7F27',
            fontSize: 18,
            fontWeight: '600',
          }}>
          See All
        </Text>
      </View>
      <Space Size={10} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          paddingHorizontal: 15,
        }}
        data={restaurantList}
        ItemSeparatorComponent={() => <Space width={10} />}
        renderItem={({item}) => (
          <RestaurantCard
            restaurant={item}
            onPress={() =>
              navigation.navigate('Restaurant', {
                restaurant: item,
                foodList: foodList,
              })
            }
          />
        )}
      />
      <Space Size={15} />
      <View style={styles.CategoryBox}>
        <Text style={{flex: 1, color: '#000', fontSize: 20}}>
          Top 5 food for you
        </Text>
        <Text
          onPress={() => navigation.navigate('search', foodList)}
          style={{
            color: '#FF7F27',
            fontSize: 18,
            fontWeight: '600',
          }}>
          See All
        </Text>
      </View>
      <FlatList
        ListHeaderComponent={() => <Space Size={10} />}
        ItemSeparatorComponent={() => <Space width={10} />}
        style={{
          paddingHorizontal: 15,
        }}
        numColumns={2}
        data={renderTopFood({foodList, foodIdList})}
        renderItem={({item}) => (
          <FoodCard
            onPress={() =>
              navigation.navigate('foodDetail', {
                selectedfood: item,
              })
            }
            item={item}
          />
        )}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 19,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  muImage: {
    backgroundColor: 'gray',
    borderRadius: 100,
    marginRight: 14,
    width: 45,
    height: 45,
  },
  CategoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    marginLeft: 10,
    fontSize: 19,
    lineHeight: 35,
    color: 'gray',
    fontWeight: '800',
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 70,
    marginTop: 20,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: '92%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
  },
});
export default HomeScreen;
