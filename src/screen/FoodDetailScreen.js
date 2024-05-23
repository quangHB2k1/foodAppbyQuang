import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart} from '../redux/action/authAction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../contants';
import {Space} from '../components/index';
import {windowHeight, windowWidth} from '../ultis/display';
const FoodDetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const selectedfood = route.params.selectedfood;
  console.log('Img : ' + JSON.stringify(selectedfood));
  const cart = useSelector(state => state.user.cart);
  const [unit, setUnit] = useState(selectedfood.unit);
  const ChangeUnit = number => {
    const updatedFood = {...selectedfood, unit: number};
    setUnit(number);
    selectedfood.unit = number;
    dispatch(updateCart(updatedFood));
  };
  useEffect(() => {
    StatusBar.setHidden(true, 'slide');

    return () => {
      StatusBar.setHidden(false, 'slide');
    };
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      foodUnit = cart.find(food => food.foodId === selectedfood.foodId);
      if (foodUnit) {
        selectedfood.unit = foodUnit.unit;
        setUnit(foodUnit.unit);
      } else {
        selectedfood.unit = 0;
        setUnit(0);
      }
    } else {
      selectedfood.unit = 0;
      console.log('unit2 : ' + selectedfood.unit);
      setUnit(0);
    }
  }, [cart]);
  const Button = ({IconName, isPluss}) => {
    let number = 0;
    if (isPluss) {
      number = selectedfood.unit + 1;
    } else if (!isPluss && selectedfood.unit > 0) {
      number = selectedfood.unit - 1;
    }
    return (
      <TouchableOpacity
        onPress={() => ChangeUnit(number)}
        style={styles.caculateBtn}>
        <Icon size={30} name={IconName} color="#000" />
      </TouchableOpacity>
    );
  };
  const CustomSize = ({iselected, size}) => {
    return (
      <View
        key={size}
        style={[
          styles.sizeBox,
          {backgroundColor: iselected ? '#f58d1d' : '#C0C0C0'},
        ]}>
        <Text
          style={{
            color: '#121223',
            fontSize: 16,
          }}>
          {'10”'}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.backgroundImg}
        source={{uri: selectedfood.Img}}>
        <View style={styles.header}>
          <Text
            onPress={() => navigation.goBack()}
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            Close
          </Text>
        </View>
      </ImageBackground>
      <Text
        style={{
          color: '#181c2e',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 7,
          marginLeft: 25,
        }}>
        {selectedfood.nameFood}
      </Text>
      <View style={styles.micheline}>
        <Icon name="favorite" size={24} color="#FFAB6D" />
        <Text
          style={{
            marginLeft: 12,
            color: '#181c2e',
            fontSize: 15,
            flex: 1,
          }}>
          Micheline
        </Text>
      </View>
      <View style={styles.starTimeBox}>
        <Icon name="star" size={24} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            marginRight: 37,
          }}>
          {'4.7'}
        </Text>
        <Icon name="local-shipping" size={24} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            marginRight: 37,
          }}>
          {'free'}
        </Text>
        <Icon name="alarm" size={24} color="#FFAB6D" />
        <Text
          style={{
            color: '#181c2e',
            fontSize: 16,
            marginLeft: 10,
            marginRight: 37,
          }}>
          {'20 min'}
        </Text>
      </View>
      <Space Size={25} />
      <Text style={styles.description}>
        "Phở, a Vietnamese noodle soup, delights with aromatic broth, rice
        noodles, and tender meats, creating a harmonious, flavorful culinary
        experience."
      </Text>
      <View style={styles.sizeContainer}>
        <Text
          style={{
            color: '#a0a5ba',
            fontSize: 20,
            marginRight: 16,
          }}>
          Size:
        </Text>
        <CustomSize size={1} />
        <CustomSize size={2} iselected={true} />
        <CustomSize size={3} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('cart')}
        style={{position: 'absolute', bottom: windowHeight * 0.45, right: 10}}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require('../assests/images/Cart.png')}
        />
      </TouchableOpacity>
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginRight: 4,
              flex: 1,
              letterSpacing: 1.5,
              fontWeight: 'bold',
            }}>
            {selectedfood.price}D
          </Text>

          <View style={styles.caculateBox}>
            <Button IconName={'add'} isPluss={true} />
            <Text style={{fontSize: 17, borderBottomWidth: 1}}>{unit}</Text>
            <Button IconName={'remove'} isPluss={false} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
  },
  backgroundImg: {
    flexDirection: 'row',
    borderRadius: 30,
    flex: 0.7,
    backgroundColor: 'red',
    marginBottom: 28,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  micheline: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 20,
    marginHorizontal: 24,
  },
  starTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  description: {
    fontSize: 14,
    marginBottom: 29,
    marginHorizontal: 24,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    alignItems: 'center',
  },
  sizeBox: {
    width: 48,
    alignItems: 'center',
    borderRadius: 110,
    paddingVertical: 18,
    marginRight: 10,
  },
  caculateBox: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.FABEBOOK_BLUE,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 14,
    elevation: 20,
  },
  caculateBtn: {
    borderWidth: 1,
    elevation: 2,
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: windowWidth,
    backgroundColor: '#292F3F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});
