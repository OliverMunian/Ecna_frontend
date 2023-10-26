import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { addpatientToStore } from "../reducers/patients";
import { useSelector } from "react-redux";


export default function OnePatient(){

    const patient = useSelector((state) => state.patients.value);
    console.log('patient screen: '+ patient.lastName)

    return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.title}> Répertoire </Text>
          </View>
          <View>
            <Text style={styles.txt}> {patient.lastName} {patient.firstName}</Text>
          </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    box: {
      marginTop: 130,
    },
    title: {
      color: "white",
      fontSize: 40,
      fontWeight: "bold",
      fontStyle:'italic'
    },
    txt:{
        color: "white",
    },
  });