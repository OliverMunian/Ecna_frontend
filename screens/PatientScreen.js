import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { addpatientToStore } from "../reducers/patient";
import { useSelector } from "react-redux";


export default function OnePatient(){
const patient = useSelector((state) => state.patient.value);

    return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.title}> {patient.lastName} {patient.firstName} </Text>
          </View>
          <View>
            <Text>
              Fiche patient 
            </Text>
            <Text style={styles.txt}> Adresse postale </Text>
            <Text style={styles.txt}>
              {patient.adress}
            </Text>
            <Text>
              Numéro de telephone : 
            </Text>
            <Text>
              {patient.phone}
            </Text>
            <Text style={styles.txt}>
              Numéro de Securité Sociale :
            </Text>
            <Text style={styles.txt}>
              {patient.SSnumber}
            </Text>
          </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      marginTop: 130,
    },
    title: {
     // color: "white",
      fontSize: 40,
      fontWeight: "bold",
    },
    txt:{
      //  color: "white",
    },
  });