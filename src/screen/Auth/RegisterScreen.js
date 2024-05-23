import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../contants/index';
import Space from '../../components/Space';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField from '../../components/InputField';
import CustomButton from '../../components/customButton';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, fireStoreDatabase} from '../../firebase';
import {doc, setDoc} from 'firebase/firestore';
import SimpleToast from 'react-native-simple-toast';
const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const Validate = () => {
    let isValid = true;
    const errors = {};
    if (!email) {
      errors.email = 'Empty email';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email';
      isValid = false;
    } else {
      setError({...error, email: ''});
    }
    //
    if (!userName) {
      errors.userName = 'Empty userName';
      isValid = false;
    } else {
      setError({...error, userName: ''});
    }
    //
    if (!password) {
      errors.password = 'Empty password';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'at least 6 characters long ';
      isValid = false;
    } else {
      setError({...error, password: ''});
    }
    setError(errors);
    return isValid;
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userId = userCredential.user.uid;
        const user = {
          userId,
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        };

        const userRef = doc(fireStoreDatabase, 'users', userId);
        return setDoc(userRef, user);
      })
      .then(() => {
        SimpleToast.show('Successfully');
      })
      .catch(error => {
        SimpleToast.show(error.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Space Size={StatusBar.currentHeight} />
      <Space Size={50} />
      <View style={styles.WelCome}>
        <Text style={styles.WelcomeTitle}>Welcome to</Text>
        <Text
          style={{
            maxWidth: '64%',
            color: Colors.SECONDARY_BLACK,
            fontFamily: 'Roboto-Medium',
            lineHeight: 20,
            textAlign: 'center',
          }}>
          {' '}
          Enter your email, choose a username and password
        </Text>
      </View>
      <InputField
        icon={
          <Icon
            name="person"
            size={22}
            color={'#666'}
            style={{marginRight: 10}}
          />
        }
        label={'User name'}
        setValue={setUserName}
        value={userName}
        hasError={error.userName}
      />
      <InputField
        icon={
          <Icon
            name="email"
            size={22}
            color={'#666'}
            style={{marginRight: 10}}
          />
        }
        label={'email'}
        setValue={setEmail}
        value={email}
        hasError={error.email}
      />
      <InputField
        icon={
          <Icon
            name="phone"
            size={22}
            color={'#666'}
            style={{marginRight: 10}}
          />
        }
        label={'Phone number'}
        setValue={setPhoneNumber}
        value={phoneNumber}
        hasError={error.password}
      />

      <InputField
        icon={
          <Icon
            name="lock"
            size={22}
            color={'#666'}
            style={{marginRight: 10}}
          />
        }
        label={'password'}
        isPassword={true}
        setValue={setPassword}
        value={password}
        hasError={error.password}
      />

      <Space Size={22} />
      <CustomButton
        label={'Register'}
        backgroundColor={Colors.DEFAULT_GREEN}
        onPress={() => {
          Validate() ? handleRegister() : null;
        }}
      />
      <View style={styles.MovetoLogin}>
        <Text>Already have account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={{marginLeft: 7}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.DEFAULT_GREEN,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.OR}>OR</Text>
      <CustomButton
        backgroundColor={Colors.FABEBOOK_BLUE}
        label={'Login With Facebook'}
        Icon={
          <Image
            source={require('../../assests/images/facebook.png')}
            style={{
              height: 20,
              width: 20,
            }}
          />
        }
        onPress={() => {}}
      />
      <CustomButton
        backgroundColor={Colors.GOOGLE_BLUE}
        label={'Login With Facebook'}
        Icon={
          <Image
            source={require('../../assests/images/google.png')}
            style={{
              height: 20,
              width: 20,
            }}
          />
        }
        onPress={() => {}}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  WelCome: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
  },
  WelcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.SECONDARY_BLACK,
  },

  MovetoLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  OR: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 16.8,
    lineHeight: 40,
  },
});
export default RegisterScreen;
