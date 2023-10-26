import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { addpatientToStore } from '../reducers/patients';
import { useDispatch  } from 'react-redux';

export default function PhoneScreen({navigate}) {
  const dispatch = useDispatch()
  const [patients, setPatient] = useState([]);

  const BACKEND_ADRESS = "http://10.3.0.13:3000";

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/patients/all`)
      .then((response) => response.json())
      .then((patient) => {
        setPatient(patient.data);
      });
  }, []);
  console.log(patients);

  function hover() {
    console.log();
    dispatch(addpatientToStore())
    navigation.navigate()
  }

  const all = patients.map((patient, i) => {
    patients.sort((a, b) => a.lastName - b.lastName);
    patient.lastName = patient.lastName.toUpperCase();
    return (
      <TouchableOpacity onPress={() => hover()}>
        <Patient
          key={i}
          lastName={patient.lastName}
          firstName={patient.firstName}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}> Répertoire </Text>
      </View>
      {all}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  box:{
    marginTop:100,
  },
  title:{
    color:'white',
    fontSize:40,
    fontWeight:'bold'
  },
});
