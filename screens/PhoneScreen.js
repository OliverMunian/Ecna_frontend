import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";

export default function PhoneScreen(props) {
  const [patients, setPatient] = useState([]);

  const BACKEND_ADRESS = "http://10.3.0.23:3000";

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/patients/all`)
      .then((response) => response.json())
      .then((patient) => {
        setPatient(patient.data);
      });
  }, []);
  console.log(patients);

  function hover() {}

  const all = patients.map((patient, i) => {
    patients.sort((a, b) => a.lastName - b.lastName);
    patient.lastName = patient.lastName.toUpperCase();
    return (
      <Patient
        key={i}
        lastName={patient.lastName}
        firstName={patient.firstName}
      />
    );
  });

  return <View style={styles.container}>{all}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
