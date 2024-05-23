import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateCart} from '../redux/action/authAction';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FoodItem = ({selectedfood, onPress, cart, isRemove}) => {
  const [unit, setUnit] = useState(selectedfood.unit);
  const dispatch = useDispatch();
  const ChangeUnit = number => {
    const updatedFood = {...selectedfood, unit: number};
    selectedfood.unit = number;
    setUnit(number);
    dispatch(updateCart(updatedFood));
  };
  const Button = ({IconName, isPluss}) => {
    let number = 0;
    if (isPluss) {
      number = selectedfood.unit + 1;
    } else if (!isPluss && selectedfood.unit > 0) {
      number = selectedfood.unit - 1;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          ChangeUnit(number);
        }}
        style={styles.caculateBtn}>
        <Icon size={20} name={IconName} color="#000" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{flex: 1, flexDirection: 'row'}}>
        <Image style={styles.image} source={{uri: selectedfood.Img}} />
        <View style={styles.contentItem}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: '400',
            }}>
            {selectedfood.nameFood}
          </Text>
          <Text style={{color: '#000', fontSize: 13}}>
            Qty: {selectedfood.unit}
          </Text>
          <Text style={{color: '#000', fontSize: 13, fontWeight: 500}}>
            ${selectedfood.price}
          </Text>
        </View>
      </TouchableOpacity>
      {!isRemove ? (
        <>
          <View style={styles.caculateBox}>
            <Button IconName={'add'} isPluss={true} />
            <Text style={{fontSize: 16, borderBottomWidth: 1}}>
              {selectedfood.unit}
            </Text>
            <Button IconName={'remove'} isPluss={false} />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.delBtn}
            onPress={() => {
              if (cart.length > 0) {
                const delFood = {
                  ...selectedfood,
                  unit: 0,
                };

                dispatch(updateCart(delFood));
              } else {
                return;
              }
            }}>
            <Icon name={'delete'} size={35} color={'green'} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default FoodItem;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 81,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FED718',
    borderRadius: 10,
    alignSelf: 'center',

    elevation: 11,
  },
  image: {
    width: 67,
    height: 59,
    borderRadius: 5,
    resizeMode: 'cover',

    marginLeft: 12,
  },
  contentItem: {
    marginLeft: 11,
    flex: 1,
    padding: 3,
  },
  caculateBox: {
    width: 120,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 18,
    flexDirection: 'row',
    marginRight: 20,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  caculateBtn: {
    elevation: 5,
    backgroundColor: '#F4900C',
    //borderWidth: 1,
    elevation: 100,
    width: 31,
    height: 31,

    alignItems: 'center',
    justifyContent: 'center',
  },
  delBtn: {
    padding: 10,
  },
});
