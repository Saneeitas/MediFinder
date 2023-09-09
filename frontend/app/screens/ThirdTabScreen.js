import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from "axios";
import { Linking } from 'react-native';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

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
          nearestHospital = hospital;
        }
      });

      setNearestHospital(nearestHospital);
    }
  }, [hospitalslist, location]);

  const getHospitals = () => {
    axios.get('http://192.168.67.23:3000/api/find')
      .then(function (response) {
        // handle success
        setHospitalsList(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setErrorMsg('Failed to fetch hospitals data. Please try again later.');
      });
  };

  const openMaps = () => {
    if (nearestHospital && nearestHospital.coordinates) {
      const { latitude, longitude } = nearestHospital.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

 // ...

if (errorMsg) {
  return (
    <View style={styles.container}>
      <Text>{errorMsg}</Text>
      <TouchableOpacity onPress={getHospitals}>
        <Text>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
} else if (!location) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
} else if (isLoading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
} else if (nearestHospital) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Nearest hospital to your location is:</Text>
         <Text style={styles.heading}> {nearestHospital.name}</Text>
          <Text  style={styles.text}>Address: {nearestHospital.address}</Text>
          <Text  style={styles.text}>Phone: {nearestHospital.phone}</Text>
        <TouchableOpacity onPress={openMaps} style={styles.button}>
         <Text style={styles.btnText}>Take Me <Ionicons name="location" size={24} color={colors.primary} /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} else {
  return (
    <View style={styles.container}>
      <Text>No hospitals found.</Text>
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hospital: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderRadius: 30,
    borderColor: '#ccc',
  },
   text: {
        fontSize: 16,
        marginBottom: 5,
        padding: 1,
        color: colors.secondary,
    
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.secondary 
  },
  button: {
    backgroundColor: "#FF6969",
    margin: 30,
    borderRadius: 30,
    padding: 15
  },
  btnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  }
});

