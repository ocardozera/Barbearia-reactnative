import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const MyImageButton = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }]}
      onPress={props.customClick}>

      <Text style={styles.text}>
        {props.title}
        <Icon
            style={styles.icon}
            name={props.btnIcon}
            size={20}
            color='white'
        />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 17,
  },
  icon: {
    paddingBottom: 5,
  }
});

export default MyImageButton;