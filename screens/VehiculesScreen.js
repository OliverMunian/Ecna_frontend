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

const GVuri = Image.resolveAssetSource(GV).uri;
const MVuri = Image.resolveAssetSource(MV).uri;
const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

export default function VehiculeScreen({ navigation }) {
  const dispatch = useDispatch();
  const vehicules = useSelector((state) => state.vehicules.value);
  const BACKEND_ADRESS = "http://10.3.0.43:3000";
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

  // Création des elements JSX
  const vehiculesDisplay = vehicules.map((data, i) => {
    if (data.etat === "En ligne") {
      return (
        <TouchableOpacity key={i} onPress={() => handlePress(data.plaque)}>
          <FicheVehicule
            plaque={data.plaque}
            etat={data.etat}
            color="green"
            type={imagesData[data.type]}
          />
        </TouchableOpacity>
      );
    } else if (data.etat === "En cours d'intervention") {
      return (
        <TouchableOpacity key={i} onPress={() => handlePress(data.plaque)}>
          <FicheVehicule
            plaque={data.plaque}
            etat={data.etat}
            color="orange"
            type={imagesData[data.type]}
          />
        </TouchableOpacity>
      );
    } else if (data.etat === "Indisponible") {
      return (
        <TouchableOpacity key={i} onPress={() => handlePress(data.plaque)}>
          <FicheVehicule
            plaque={data.plaque}
            etat={data.etat}
            color="red"
            type={imagesData[data.type]}
          />
        </TouchableOpacity>
      );
    } else if (data.etat === "Hors ligne") {
      return (
        <TouchableOpacity key={i} onPress={() => handlePress(data.plaque)}>
          <FicheVehicule
            plaque={data.plaque}
            etat={data.etat}
            color="black"
            type={imagesData[data.type]}
          />
        </TouchableOpacity>
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.titreBox}>
      <Text style={styles.titre}>
         Véhicules
      </Text>
      <TouchableOpacity style={styles.btn} onPress={() => handleAdd()}>
        <Text>
          Ajouter
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.box}>{vehiculesDisplay}</View>
      <View style={styles.trait} />
    </View>
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
    fontWeight:'bold',
    fontStyle:'italic',
  },
  titreBox: {
    marginTop:130,
    marginBottom: 20,
    borderBottomColor: 'grey',
    borderWidth:1,
  },
  btn: {
    width: 130,
    height: 60,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
});
