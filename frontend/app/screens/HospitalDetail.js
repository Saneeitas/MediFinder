import axios from "axios";
axios.default;
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function HospitalDetail({ route }) {
    const id = route.params.userId;
    // console.log(id)
    const [hospitalDetail, setHospitalDetail] = useState("")

    useEffect(() => {
        getUserById();
    }, [HospitalDetail]);

    const getUserById = () => {
        axios.get(`http://192.168.43.124:3000/api/find/${id}`)
        .then(function (response) {
            // handle success
            setHospitalDetail(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

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
          {/* {hospitalDetail.services.map((service, index) => (
              <Text style={ styles.text } key={ index }>{ service }</Text>
            
          )) } */}
       </View>
        </>
      )}
      
        </View> 
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary, 
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
        fontWeight: "bold",   
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        color: colors.secondary
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 1,
        color: colors.tertiary,
    // Add other desired styles
    },
    
    
})

export default HospitalDetail;