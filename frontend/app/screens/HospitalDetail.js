import axios from "axios";
axios.default;
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import colors from '../config/colors';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {API_ENDPOINT} from '@env'

function HospitalDetail({ route }) {
    const id = route.params.userId;
    // console.log(id)
    const [hospitalDetail, setHospitalDetail] = useState("")

    useEffect(() => {
        getUserById();
    }, [HospitalDetail]);

    const getUserById = () => {
        axios.get(`${API_ENDPOINT}/api/find/${id}`)
        .then(function (response) {
            // handle success
            setHospitalDetail(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

    const openMaps = () => {
        if (hospitalDetail && hospitalDetail.coordinates) {
          const { latitude, longitude } = hospitalDetail.coordinates;
          const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          Linking.openURL(url);
        }
      };

return (
    <View style={ styles.container }> 
           {hospitalDetail && (
            <>
        <View style={ styles.HospitalContainer }>
          <Text style={ styles.hospital }>{ hospitalDetail.name }</Text>
        </View>
          <View style={ styles.OtherContainer }>
          <Text style={styles.text}><Entypo name="location" size={16} color="black" /> Address: {hospitalDetail.address}</Text>
          <Text style={styles.text}><FontAwesome name="phone-square" size={16} color="black" /> Phone: {hospitalDetail.phone}</Text>
          <Text style={styles.text}><Entypo name="back-in-time" size={16} color="black" /> Hours: {hospitalDetail.hours.weekdays}, { hospitalDetail.hours.weekends }</Text>
        <Text style={ styles.text }><MaterialIcons name="medical-services" size={16} color="black" />Services: {hospitalDetail.services.join(', ')}</Text>
        <TouchableOpacity onPress={openMaps} style={styles.button}>
         <Text style={styles.btnText}>Navigate to hospital<Ionicons name="location" size={24} color={"white"} /></Text>
        </TouchableOpacity>

        
       </View>
        </>
      )}
      
        </View> 
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white", 
    },
    HospitalContainer: {
        alignItems: "center",
        justifyContent: "center", 
        marginTop:150,
    },
    OtherContainer: {
        marginTop: 10,
        marginLeft:80
    },
    hospital: {
        fontSize: 30,
           
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        color: "black"
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        padding: 1,
        color: colors.tertiary,
    // Add other desired styles
    },
    button: {
    backgroundColor: '#FF6969',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 50,
    width: '70%',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default HospitalDetail;