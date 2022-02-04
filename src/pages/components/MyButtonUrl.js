import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const MyButtonUrl = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }]}
      onPress={props.customClick}>

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#ffffff',
    marginTop: 25,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 30,
    bottom: 25,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  icon: {
    paddingBottom: 5,
  }
});

export default MyButtonUrl;