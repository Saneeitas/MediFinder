import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from "axios"
import colors from '../config/colors';
import { Entypo } from '@expo/vector-icons';
import {API_ENDPOINT} from '@env'


export default function SecondTabScreen({ navigation }) {
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
      // Sort the hospitals by distance from the user's current location
      hospitalslist.sort((a, b) => {
        const aDistance = calculateDistance(location.latitude, location.longitude, a.coordinates.latitude, a.coordinates.longitude);
        const bDistance = calculateDistance(location.latitude, location.longitude, b.coordinates.latitude, b.coordinates.longitude);
        return aDistance - bDistance;
      });

      setHospitals(hospitalslist);

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
    axios.get(`${API_ENDPOINT}/api/find`)
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
    return <Text >{errorMsg}</Text>
  } else if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  } else if (isLoading) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  } else {
    return (
      <View style={ styles.container }>
       <Text style={ styles.header }> <Entypo name="list" size={16} color="white" /> List of Nearby Hospital</Text> 
        
        <FlatList
          data={hospitals}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={ styles.hospital }>
              <TouchableOpacity onPress={ () => navigation.navigate("Hospital Information", {
                userId: item._id,
              }) }>
                <Text style={ styles.name }>{ item.name }</Text>
                <Text style={ styles.distance }>
                  <Entypo name="location-pin" size={16} color="black" />
                  { calculateDistance(location.latitude, location.longitude,
                    item.coordinates.latitude, item.coordinates.longitude)
                  } km away </Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: "white",
    
  },
  header: {
    padding: 2,
    marginBottom: 4,
    borderBottomColor: '#ccc',
    width: '100%',
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "#FF6969",
    borderRadius: 5
  
  },
  hospital: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    maxHeight: 200,
    overflow: 'scroll',
    backgroundColor: "transparent",

  },
  name: {
    color: '#2C2C2C',
    fontSize: 30,
    // fontWeight: "bold"
  },
  distance: {
    color: "green",
  }

});
