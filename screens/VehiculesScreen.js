import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FicheVehicule from "../components/Fiche_Vehicule";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
import { addInterPlaque } from "../reducers/interVehicules";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GVuri = Image.resolveAssetSource(GV).uri;
const MVuri = Image.resolveAssetSource(MV).uri;
const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

const getColorByEtat = (etat) => {
  switch (etat) {
    case "En ligne":
      return "green";
    case "En cours d'intervention":
      return "orange";
    case "Indisponible":
      return "red";
    case "Hors ligne":
      return "black";
    default:
      return "black";
  }
};
export default function VehiculeScreen({ navigation }) {
  const dispatch = useDispatch();
  const vehicules = useSelector((state) => state.vehicules.value);
  const BACKEND_ADRESS = "http://192.168.1.14:3000";
  const SIREN = useSelector((state) => state.user.value.SIREN);

  // Update du reducer lorsqu'on clique sur un composant véhicule afin de stocker la liste des interventions dans le reducer
  function handlePress(plaque) {
    fetch(`${BACKEND_ADRESS}/vehicules/interventions/${plaque}`)
      .then((response) => response.json())
      .then((interventionsData) => {
        dispatch(
          addInterPlaque({
            plaque: plaque,
            interventions: interventionsData.interventions,
          })
        );
        navigation.navigate("Interventionduvehicule");
      });
  }

  const handleAdd = () => {
    navigation.navigate("AddVehiculeBis");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#9b84ad"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.titreBox}>
        <Text style={styles.titre}>Véhicules</Text>
        <TouchableOpacity style={styles.btn} onPress={() => handleAdd()}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={(fontSize = 40)}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        overScrollMode="never"
      >
        <View style={styles.box}>
          {vehicules.map((data, i) => (
            <FicheVehicule
              key={i}
              plaque={data.plaque}
              etat={data.etat}
              color={getColorByEtat(data.etat)}
              type={imagesData[data.type]}
              onDispatch={(plaque) => handlePress(plaque)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.trait} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  titre: {
    color: "white",
    fontSize: 34,
    marginLeft: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  titreBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 130,
    marginBottom: 20,
  },
  btn: {
    width: 50,
    height: 50,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icone: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
});
