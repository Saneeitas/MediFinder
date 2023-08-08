import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from "axios"


export default function ThirdTabScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [hospitalslist, setHospitalsList] = useState([]);
  const [nearestHospital, setNearestHospital] = useState(null);

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    getHospitals();
  }, []);

  useEffect(() => {
    if (hospitalslist.length > 0 && location) {
      // Find the nearest hospital to the user's current location
      let nearestDistance = Infinity;
      let nearestHospital = null;
      hospitalslist.forEach(hospital => {
        const distance = calculateDistance(location.latitude, location.longitude, hospital.coordinates.latitude, hospital.coordinates.longitude);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestHospital = hospital.name;
        }
      });

      setNearestHospital(nearestHospital);
    }
  }, [hospitalslist, location]);

  const getHospitals = () => {
    axios.get('http://192.168.43.124:3000/api/find')
      .then(function (response) {
        // handle success
        setHospitalsList(response.data)
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setErrorMsg('Failed to fetch hospitals data. Please try again later.');
      });
  }

  if (errorMsg) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>{ errorMsg }</Text>
         <TouchableOpacity onPress={getHospitals}><Text>Try Again</Text></TouchableOpacity>
      </View>
    );
  } else if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (isLoading) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={ styles.container }>
        <View style={ styles.container }>
           <Text>Nearest hospital to your location is:</Text>
          <Text style={{fontWeight:"bold"}}> {nearestHospital}</Text>
        </View>
      </View>
    );
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d.toFixed(1);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    fontWeight: "bold",
    fontSize: 20
  },
  hospital: {
    // padding: 10,
    // paddingTop: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // width: '100%',

    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    maxHeight: 200,
    overflow: 'scroll',
  },

});

