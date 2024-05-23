import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';

const InputField = ({isPassword, label, setValue, value, hasError, icon}) => {
  useEffect(() => {
    console.log('value:  ' + value);
  }, [value]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#e9e8e8',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginBottom: 20,
      }}>
      {icon}
      {isPassword ? (
        <TextInput
          placeholder={label}
          style={{flex: 1, fontSize: 16}}
          value={value}
          secureTextEntry={true}
          onChangeText={text => {
            setValue(text);
          }}
        />
      ) : (
        <TextInput
          placeholder={label}
          style={{flex: 1, fontSize: 16}}
          value={value}
          onChangeText={text => {
            setValue(text);
          }}
        />
      )}
      {hasError ? <Text style={{color: 'red'}}>{hasError}</Text> : null}
    </View>
  );
};

export default InputField;
