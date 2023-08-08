import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from "axios"


export default function SecondTabScreen({ navigation }) {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [hospitalslist, setHospitalsList] = useState([]);
  const [nearestHospital, setNearestHospital] = useState(null);

   useEffect(() => {
        getHospitals();
    }, []);

    const getHospitals = () => {
        axios.get('http://192.168.43.124:3000/api/find')
        .then(function (response) {
            // handle success
          setHospitalsList(response.data)
        })
        .catch(function (error) {
            // handle error
            setErrorMsg('Failed to fetch hospitals data. Please try again later.');
        })

    }

  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    

      // Sort the hospitals by distance from the user's current location
      hospitalslist.sort((a, b) => {
        const aDistance = calculateDistance(coords.latitude, coords.longitude, a.coordinates.latitude, a.coordinates.longitude);
        const bDistance = calculateDistance(coords.latitude, coords.longitude, b.coordinates.latitude, b.coordinates.longitude);
        return aDistance - bDistance;
      });

       setHospitals(hospitalslist);

       // Find the nearest hospital to the user's current location
      let nearestDistance = Infinity;
      let nearestHospital = null;
      hospitalslist.forEach(hospital => {
        const distance = calculateDistance(coords.latitude, coords.longitude, hospital.coordinates.latitude, hospital.coordinates.longitude);
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
  } else if (!hospitals) {
    return <View style={ styles.container }><Text style={{fontWeight:"bold"}}>Search Hospitals...</Text></View>;
  } else {
    return (
      <View style={ styles.container }>
        {/* <Text style={ styles.header }>List of Hospital</Text>  */}
        {/* {console.log(hospitalslist)} */ }
        <FlatList
          data={hospitals}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={ styles.hospital }>
              <TouchableOpacity onPress={ () => navigation.navigate("Details", {
                userId: item._id
              }) }>
                <Text>{ item.name }</Text>
                <Text>
                  { calculateDistance(location.latitude, location.longitude,
                    item.coordinates.latitude, item.coordinates.longitude)
                  } km away</Text>
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
