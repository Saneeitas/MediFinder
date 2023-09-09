import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import NextButton from './NextButton';

const data = [
  {
    image: require('../assets/hos.png'),
    information: 'MediFinder',
    data : 'Nearest hospital finder mobile application'
  },
  {
    image: require('../assets/1.jpg'),
    information: 'Your Location',
    data: 'Allow to access this device location to know where you are'
  },
  {
    image: require('../assets/2.jpg'),
    information: 'Locations of hospitals',
    data: 'Find out nearest hospital and connect with them'
  },
];

const HomeScreen = ({ navigation }) => {
    const handleNext = () => {
      navigation.navigate('Nearby Hospital'); // Change 'NextPage' to the name of your next screen
    };
  
    return (
        <View style={styles.container}>
          {/* Swiper */}
          <View style={styles.swiperContainer}>
            <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={5} showsPagination={true}>
              {data.map((item, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.text}>{item.information}</Text>
                  <Text>{item.data}</Text>
                </View>
              ))}
            </Swiper>
          </View>
    
          {/* Button */}
          <NextButton onPress={handleNext} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white'
      },
      swiperContainer: {
        flex: 1,
        justifyContent: 'center', // Center the swiper vertically
      },
      wrapper: {},
      slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
      },
      button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'blue', // Customize button styling
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white', // Customize text styling
        fontSize: 18,
      },
    });

export default HomeScreen;
