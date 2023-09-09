import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {// Customize button styling
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  text: {
    color: 'green', // Customize text styling
    fontSize: 18,
  },
});

export default NextButton;
