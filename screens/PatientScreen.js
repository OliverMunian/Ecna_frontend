import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function OnePatient({ navigation }) {
  const patient = useSelector((state) => state.patient.value);
  console.log(patient);
  function back() {
    navigation.navigate("Répertoire");
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.6, y: 0.7 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.boxview}>
        <TouchableOpacity onPress={() => back()}>
          <View style={styles.previous}>
            <MaterialIcons
              name="arrow-back-ios"
              size={(fontSize = 25)}
              color="white"
            />
            <Text style={styles.txtback}>Répertoire</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infopatient}>
          <View style={styles.nametitle}>
            <Text style={styles.title}>
              {patient.lastName} {patient.firstName}
            </Text>
          </View>
          <View style={styles.complement}>
            <Text style={styles.info_titre}>Adresse postale</Text>
            <Text style={styles.info}>
              📍{patient.address.streetNumber} {patient.address.street}, {"\n"}{" "}
              {patient.address.city} {patient.address.postalCode}
            </Text>
            <Text style={styles.info_titre}>Téléphone mobile</Text>
            <Text style={styles.info}>📞 {patient.phone}</Text>
            <Text style={styles.info_titre_secu}>
              Numéro de sécurité sociale:
            </Text>
            <Text style={styles.info_secu}>{patient.SSnumber}</Text>
            <Text style={styles.info_titre}>Informations complémentaires</Text>
            <Text style={styles.info_com}>Patient: {patient.valide}</Text>
            <Text style={styles.info_com}>Mutuelle: {patient.mutuelle}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxview: {
    marginTop: 100,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  //BOUTON DE RETOUR
  previous: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
  txtback: {
    color: "white",
    fontSize: 20,
  },
  //INFOS DU PATIENT
  infopatient: {
    top: 50,
  },
  nametitle: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    marginLeft: 10,
  },
  complement: {
    top: 20,
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight:'bold',
  },
  info: {
    marginTop: 5,
    color: "white",
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
