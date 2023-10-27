import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineListVehicules } from "../reducers/vehicules";
import VehiculeDashBoard from "../components/VehiculeDashBoard";
import SearchBar from "../components/SearchBar";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
import { defineListVehiculesDispo } from "../reducers/vehiculesDispo";
import { defineListPatients } from "../reducers/listPatients";
import { defineListInter } from "../reducers/interventions";
import { updateSearchResults } from "../reducers/searchResult";
import { LinearGradient } from "expo-linear-gradient";

export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const BACKEND_ADRESS = "http://10.3.0.43:3000";

  const vehiculesDispo = useSelector((state) => state.vehiculesDispo.value);
  const user = useSelector((state) => state.user.value);
  const interventions = useSelector((state) => state.interventions.value)
  const recherche = useSelector((state) => state.searchQuery.value)

  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

  // A l'initialisation du dashboard, dispatch de toutes les info
  useEffect(() => {
  // Fetch des vehicules correspondant au siren
    fetch(`${BACKEND_ADRESS}/vehicules/${user.SIREN}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(defineListVehicules(data.vehicules));
          dispatch(
            defineListVehiculesDispo(
              data.vehicules.filter((e) => e.etat === "En ligne")
            )
          );
        }
      });
// Fetch des patients correspondant au token      
    fetch(`${BACKEND_ADRESS}/patients/all/${user.token}`)
      .then((response) => response.json())
      .then((patientData) => {
        // Fonction qui permet de trier les patients par ordre alphabétique
        function sortPatients(a, b) {
          if (a.lastName < b.lastName) {
            return -1;
          } else if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        }
        const sorted = patientData.patients.sort(sortPatients);
        // Dispatch dans le reducer
        dispatch(defineListPatients(sorted));
      });
// Fetch des vehicules correspondant au SIREN
     fetch(`${BACKEND_ADRESS}/interventions/${user.SIREN}`)
      .then((response) => response.json())
      .then((interData) => {
        dispatch(defineListInter(interData.interventions));
      })
  }, []);

  const vehiculesDispoDisplay = vehiculesDispo.map((data, i) => {
    return (
      <VehiculeDashBoard
        key={i}
        type={imagesData[data.type]}
        plaque={data.plaque}
      />
    );
  });

  function next() {
    Alert.alert("Oups !", "Aucun véhicule a afficher pour le moment !");
    // alert('Aucun véhicule poour le moment')
  }

  const handleSearch = () => {
    const pattern = new RegExp(recherche,'i')
    const searchQuery = interventions.filter(inter => inter.patient.lastName.match(pattern) || inter.patient.firstName.match(pattern))
    dispatch(updateSearchResults(searchQuery))
    navigation.navigate('SearchResults')
  };



  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#9b84ad"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.maintitle}>
        <Text style={styles.h1}> Véhicules disponibles </Text>
      </View>
      <View>
        {/* <Text style={styles.h1}> Votre activité </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.title}>
          <FontAwesome name="spinner" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}>En cours </Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Anomalies </Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="forward" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Ultérieures</Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> SAMU</Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
      </View>
      <View style={styles.available}>
        <View style={styles.secondtitle}>
          <Text style={styles.h2}> Véhicules disponibles </Text>
        </View> */}
      </View>

      {/* SCROLL HORIZONTAL */}
      {/* <SafeAreaView>
        <ScrollView
          style={styles.vehicles}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          endFillColor="#000"
        >
          {vehiculesDispoDisplay}
        </ScrollView>
      </SafeAreaView> */}

      {/* LECTEUR CAROUSEL */}
      {/* <View style={styles.lecteur}>
        <View style={styles.encours}></View>
        <View style={styles.suivant}>
          <TouchableOpacity onPress={() => next()}>
            <FontAwesome name="forward" size={(fontSize = 25)} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}
      {/* BARRE DE RECHERCHE */}
      <SearchBar/>
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.verifyButton}
        >
          <Text>🔍</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "100%",
    left: 15,
    top: 110,
    height: 300,
  },
  maintitle: {
    fontSize: 55,
    fontWeight: "bold",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    width: "100%",
    backgroundColor: "white",
    height: 450,
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    top: -100,
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "black",
    textDecorationLine: "underline",
  },
  title: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
  },
  divtxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderBottomColor: "grey",
    borderWidth: 1,
    marginLeft: 15,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 5,
  },
  available: {
    width: "100%",
    left: 15,
    top: 80,
    borderWidth: 1,
  },
  h2: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  vehicles: {
    width: "100%",
    flexDirection: "row",
    top: 100,
    height: 120,
    borderWidth: 1,
    flexDirection: "row",
  },
  onevehicle: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 20,
  },
  lecteur: {
    flexDirection: "row",
    top: 165,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    marginLeft: "2.5%",
  },
  encours: {
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  suivant: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  verifyButton: {
    width: "100%",
    top: 70,
    alignSelf: "center",
    right: 0,
    marginRight: 0,
    marginLeft : 500
  },
});
