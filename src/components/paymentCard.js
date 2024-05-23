import {View, Text, Image} from 'react-native';
import React from 'react';
import Space from './Space';

const PaymentCard = () => {
  return (
    <View>
      <View
        style={{
          borderRadius: 20,
          padding: 4,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 60, height: 60, marginRight: 10}}
          source={require('../assests/images/Paypal.jpg')}
        />
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
              color: '#000',
            }}>
            Paypal
          </Text>
          <Text>faster and safer way to transfer money</Text>
        </View>
      </View>
      <Space Size={10} />
      <View
        style={{
          borderRadius: 20,
          padding: 4,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 60, height: 60, marginRight: 10}}
          source={require('../assests/images/CreditCard.jpg')}
        />
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
              color: '#000',
            }}>
            Credit card
          </Text>
          <Text>faster and safer way to transfer money</Text>
        </View>
      </View>
      <Space Size={10} />
      <View
        style={{
          borderRadius: 20,
          padding: 4,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 60, height: 60, marginRight: 10}}
          source={require('../assests/images/momo.jpg')}
        />
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
              color: '#000',
            }}>
            Mo mo
          </Text>
          <Text>faster and safer way to transfer money</Text>
        </View>
      </View>
      <Space Size={10} />
    </View>
  );
};

export default PaymentCard;
