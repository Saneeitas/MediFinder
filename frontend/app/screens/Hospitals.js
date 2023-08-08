import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const HOSPITALS = [
  {
    id: 1,
    name: 'Aminu Kano Hospital',
    latitude: 11.96316,
    longitude: 8.55072,
  },
  {
    id: 2,
    name: 'Federal Medical Centre, Katsina',
    latitude: 12.9875022,
    longitude: 7.5780216,
  },
  {
    id: 3,
    name: 'DoctorPlus Hospital',
    latitude: 12.9664669,
    longitude: 7.616847,
  },
  // Add more hospitals here...
];

export default function Hospitals() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hospitals, setHospitals] = useState([]);
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
      //console.log(coords)

      // Sort the hospitals by distance from the user's current location
      HOSPITALS.sort((a, b) => {
        const aDistance = calculateDistance(coords.latitude, coords.longitude, a.latitude, a.longitude);
        const bDistance = calculateDistance(coords.latitude, coords.longitude, b.latitude, b.longitude);
        return aDistance - bDistance;
      });

      setHospitals(HOSPITALS);

       // Find the nearest hospital to the user's current location
      let nearestDistance = Infinity;
      let nearestHospital = null;
      HOSPITALS.forEach(hospital => {
        const distance = calculateDistance(coords.latitude, coords.longitude, hospital.latitude, hospital.longitude);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestHospital = hospital.name;
        }
      });

      setNearestHospital(nearestHospital);
    })();
  }, []);

  if (errorMsg) {
    return <Text >{errorMsg}</Text>
  } else if (!location) {
    return <View style={ styles.container }><Text style={{fontWeight:"bold"}}>Loading...</Text></View>;
  } else {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>List of Hospital</Text>
        <FlatList
          data={hospitals}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={ styles.hospital }>
              <TouchableOpacity>
              <Text>{item.name}</Text>
              <Text>{calculateDistance(location.latitude, location.longitude, item.latitude, item.longitude)} km away</Text>
            </TouchableOpacity>
            </View>
          )}
        />

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
