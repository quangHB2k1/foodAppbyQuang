import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Space from '../components/Space';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logOut} from '../redux/action/authAction';

const UserProfile = props => {
  const dispatch = useDispatch();
  const {userData, login} = useSelector(state => state.user);
  const CustomSetingBar = ({iconName, color, title, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 12,
          marginHorizontal: 24,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginBottom: 20,
          alignItems: 'center',
          elevation: 4,
        }}>
        <Icon name={iconName} size={26} color={'#ED1C24'} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            flex: 1,
            fontWeight: '600',
          }}>
          {title}
        </Text>
        <Icon size={26} name="chevron-right" />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar translucent />
      <Space Size={StatusBar.currentHeight} />
      <View style={styles.inforContainer}>
        <Image
          style={styles.image}
          source={require('../assests/images/user_avatar.png')}
        />
        <Text
          style={{
            marginTop: 15,
            color: '#000',
            fontSize: 20,
            fontWeight: '600',
          }}>
          {userData.userName}
        </Text>
        <Text
          style={{
            fontSize: 14.1,
          }}>
          120 quan nhân thanh xuân hà noi
        </Text>
      </View>
      <Text
        style={{
          fontWeight: '700',
          paddingLeft: 24,
          lineHeight: 25 * 1.4,
        }}>
        PREFERENCES
      </Text>
      <CustomSetingBar iconName={'public'} title={'Language'} />
      <CustomSetingBar iconName={'payments'} title={'payment details'} />
      <CustomSetingBar iconName={'shopping-cart-checkout'} title={'my cart'} />
      <CustomSetingBar iconName={'notifications'} title={'notification'} />
      <CustomSetingBar iconName={'mail'} title={'inbox'} />
      <CustomSetingBar
        iconName={'logout'}
        title={'Log outs'}
        onPress={() => {
          dispatch(logOut());
        }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inforContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
});
export default UserProfile;
