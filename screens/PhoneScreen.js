import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { addpatientToStore } from "../reducers/patient";
import { useDispatch , useSelector } from "react-redux";

export default function PhoneScreen({navigation}) {
  const dispatch = useDispatch()
  const [patients, setPatients] = useState([]);
  const patient = useSelector((state) => state.patient.value)
  console.log(patient)

  const BACKEND_ADRESS = "http://10.3.0.13:3000";

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/patients/all`)
      .then((response) => response.json())
      .then((patientData) => {
        function sortPatients (a,b) {
          if(a.lastName<b.lastName){
            return -1
          } else if(a.lastName>b.lastName) {
            return 1
          }
          return 0
        }
        const sorted = patientData.data.sort(sortPatients)
        setPatients(sorted)
      });
  }, []);

  const handleClick = (SSnumber) => {
    fetch(`${BACKEND_ADRESS}/patients/unique/${SSnumber}`)
    .then(response => response.json())
    .then(patientData => {
      if(patientData.result){
        dispatch(addpatientToStore(patientData.data))
        navigation.navigate('Infosdupatient')
      }
    })
  }
 
  const all = patients.map((patient, i) => {
    patients.sort((a, b) => b.lastName - a.lastName);
    patient.lastName = patient.lastName.toUpperCase();
    return (
      <TouchableOpacity key={i} onPress={() => handleClick(patient.SSnumber)}>
        <Patient
          lastName={patient.lastName}
          firstName={patient.firstName}
          SSNumber={patient.SSnumber}
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
  box: {
     marginTop: 130,
  },
  title: {
     color: "white",
     fontSize: 40,
     fontWeight: "bold",
    fontStyle:'italic'
  },
});
