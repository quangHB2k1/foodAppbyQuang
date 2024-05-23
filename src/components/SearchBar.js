import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../contants';
const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState(null);
  const hanleSearch = () => {
    onSearch(searchText);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Icon name="search" size={25} color={'#FF3F00'} />
        <TextInput
          placeholder="Search"
          style={{
            fontSize: 15,
            color: 'black',
          }}
          onChangeText={text => {
            setSearchText(text);
          }}
          onEndEditing={hanleSearch}
        />
      </View>
      <Icon name="tune" size={23} color={Colors.GOOGLE_BLUE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 60,
    marginTop: 20,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default SearchBar;
