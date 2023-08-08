import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export default function FirstTabScreen({navigation}) {
  return (
   <ScrollView>
   <View style={ styles.container }>
     
        <TouchableOpacity>
          <Image source={ require('../assets/hos.png') } style={ styles.image } />
          </TouchableOpacity>
        <TouchableOpacity>
          <Text style={ styles.title }>MediFinder</Text>
          </TouchableOpacity>
      <Text style={styles.content}>
        MediFinder is a cutting-edge mobile application, designed to make accessing healthcare services easier and more efficient. Our app utilizes advanced geolocation technology to identify the user's current location and provides a comprehensive list of nearby hospitals.
        </Text>
       <TouchableOpacity>
          <Text style={ styles.subtitle }>Why Us:</Text>
        </TouchableOpacity>
        <Text style={styles.content}>
        We use Real-Time Geolocation with user-Friendly Interface and gives Comprehensive and Up-to-Date Data
        </Text>

        <TouchableOpacity>
          <Text style={ styles.subtitle }>Contact Us:</Text>
        </TouchableOpacity>
        <Text style={ styles.content }>
         <MaterialCommunityIcons name="web" size={24} color="black" /> MediFinder.com
        </Text>
        <Text style={ styles.content }>
          <MaterialCommunityIcons name="gmail" size={24} color="black" /> MediFinder@gmail.com
        </Text>
        

      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    //marginTop: -50,
    width: 350,
    height: 350,
    borderBottomRightRadius: 200,
    marginBottom: 20,
  },
  title: {
    backgroundColor: colors.secondary,
    color: colors.primary,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight:30,
    borderBottomRightRadius: 100,
   
    
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: colors.secondary,
  },
  content: {
    fontSize: 25,
    // fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:8,
    marginRight:5,
    justifyContent: "center",
    alignItems: 'center',
    color: colors.tertiary,
  },
});
