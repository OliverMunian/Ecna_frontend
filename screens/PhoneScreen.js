import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Patient from '../components/Patient'
import { addpatientToStore } from "../reducers/patient";
import { useDispatch , useSelector } from "react-redux";
import { defineListPatients } from "../reducers/listPatients";

export default function PhoneScreen({navigation}) {

const BACKEND_ADRESS = "http://10.3.0.43:3000";
const dispatch = useDispatch()
const user = useSelector((state) => state.user.value)

// A l'initialisation du composant récupération de la liste de tous les patients associés au user connecté
useEffect(() => {
    fetch(`${BACKEND_ADRESS}/patients/all/${user.token}`)
      .then((response) => response.json())
      .then((patientData) => {
       // Fonction qui permet de trier les patients par ordre alphabétique
        function sortPatients (a,b) {
          if(a.lastName<b.lastName){
            return -1
          } else if(a.lastName>b.lastName) {
            return 1
          }
          return 0
        }
        const sorted = patientData.patients.sort(sortPatients)
      // Dispatch dans le reducer
        dispatch(defineListPatients(sorted))
      });
  }, []);
  
const patients = useSelector((state) => state.listPatients.value)

// Fonction qui permet de récuperer les informations du patient et de naviguer vers la page qui affiche les informations
// patients en fonction de son numero de securité sociale
  const handleClick = (SSnumber) => {
  const infoPatient = patients.filter((e) => e.SSnumber === SSnumber)
  dispatch(addpatientToStore(infoPatient[0]))
   navigation.navigate('Infosdupatient')
  }
 
const patientsDisplay = patients.map((patient, i) => {
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
      {patientsDisplay}
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
