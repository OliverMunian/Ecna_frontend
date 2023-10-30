import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { addpatientToStore } from "../reducers/patient";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

export default function OnePatient() {
  const patient = useSelector((state) => state.patient.value);
  console.log(patient);
  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.6, y: 0.7 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={styles.title}>
        {patient.lastName} {patient.firstName}
      </Text>
      <View style={styles.line} />
      <Text style={styles.info_patient}>Fiche patient</Text>
      <Text style={styles.info_titre}>Adresse postale</Text>
      <Text style={styles.info}>📍{patient.adress}</Text>
      <Text style={styles.info_titre}>Téléphone mobile</Text>
      <Text style={styles.info}>📞{patient.phone}</Text>
      <Text style={styles.info_titre_secu}>Numéro de sécurité sociale:</Text>
      <Text style={styles.info_secu}>{patient.SSnumber}</Text>
      <Text style={styles.info_titre}>informations complémentaires</Text>
      <Text style={styles.info_com}>Patient: {patient.valide}</Text>
      <Text style={styles.info_com}>Mutuelle: {patient.mutuelle}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  title: {
    marginTop: 100,
    color: "white",
    fontSize: 40,
  },
  info: {
    marginTop: 5,
    color: "rgba(193, 193, 193, 0.95)",
    fontSize: 16,
    marginBottom: 20,
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  info_titre: {
    color: "#E0E0E0",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  info_patient: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 25,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  info_titre_secu: {
    color: "rgb(195, 153, 2)",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  info_secu: {
    color: "#3EB049",
    marginTop: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  info_com: {
    marginTop: 10,
    color: "#DD0000",
    fontSize: 16,
    marginBottom: 5,
  },
});
