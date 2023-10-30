import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import FicheVehicule from "./Fiche_Vehicule";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
import { defineListVehicules } from "../reducers/vehicules";
import { defineListVehiculesDispo } from "../reducers/vehiculesDispo";
import { useDispatch } from "react-redux";

export default function FicheAddVehicule(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Import des images des assets et création de l'objet permettant de les dispatch
  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Classique: MVuri, VSL: VSLuri };

  const BACKEND_ADRESS = "http://10.3.0.23:3000";

  // Definition des possibilités des menus déroulants
  const types = ["Gros", "Classique", "VSL"];
  const etats = ["En ligne", "Hors ligne", "Indisponible"];

  // Setup des etats qui stockeront la data recuperée des champs input/menus
  const [vehicules, setVehicules] = useState([]);
  const [plaque, setPlaque] = useState(null);
  const [type, setType] = useState(null);
  const [etat, setEtat] = useState(null);

  const user = useSelector((state) => state.user.value);
  const SIREN = useSelector((state) => state.user.value.SIREN);

  // Fonction qui se declenche lors du clique sur le bouton 'Ajouter' afin de sauvegarder le vehicule en BDD et l'afficher sur la page
  // grace à l'etat vehicules + reset des champs/etats dans le cas ou la sauvegarde est réussie en back
  const handleAdd = () => {
    fetch(`${BACKEND_ADRESS}/vehicules/add`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        plaque: plaque,
        type: type,
        etat: etat,
        SIREN: user.SIREN,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setVehicules([
            ...vehicules,
            { plaque: plaque, type: type, etat: etat },
          ]);
          setPlaque("");
        }
      });
  };

  const handleNext = () => {
    fetch(`${BACKEND_ADRESS}/vehicules/${SIREN}`)
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
    navigation.navigate(props.screenName);
  };

  // Création des elements JSX à partir du composant Fichevehicule
  const vehiculesDisplay = vehicules.map((data, i) => {
    if (data.etat === "En ligne") {
      return (
        <FicheVehicule
          key={i}
          plaque={data.plaque}
          etat={data.etat}
          type={imagesData[data.type]}
          color="green"
        />
      );
    } else if (data.etat === "Hors ligne") {
      return (
        <FicheVehicule
          key={i}
          plaque={data.plaque}
          etat={data.etat}
          type={imagesData[data.type]}
          color="red"
        />
      );
    } else if (data.etat === "Indisponible") {
      return (
        <FicheVehicule
          key={i}
          plaque={data.plaque}
          etat={data.etat}
          type={imagesData[data.type]}
          color="black"
        />
      );
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouveau véhicule </Text>
      <Text style={styles.subtitle}>
        Veuillez compléter les champs suivants pour ajouter un nouveau véhicule
        à votre flotte
      </Text>
      <View style={styles.vehicules}>{vehiculesDisplay}</View>
      <View style={styles.form}>
        <Text style={styles.subtitle}>Ex : AA-123-AA</Text>
        <TextInput
          style={styles.input}
          placeholder="Saissez la plaque d'immatriculation"
          placeholderTextColor="white"
          onChangeText={(value) => setPlaque(value)}
          value={plaque}
        />
        <View style={styles.menuselect}>
          <View style={styles.box}>
            <Text style={styles.txt}>Type de véhicule</Text>
            <SelectDropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              data={types}
              onSelect={(selectedItem, index) => {
                setType(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.txt}>Etat par défault</Text>
            <SelectDropdown
              style={styles.dropdown}
              searchPlaceholder="Select item..."
              data={etats}
              onSelect={(selectedItem, index) => {
                setEtat(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={() => handleAdd()} style={styles.btn}>
            <Text style={styles.txt}>Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleNext()}>
            <Text style={styles.txt}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: "italic",
    color: "white",
    marginLeft: 10,
  },
  vehicules: {
    width: "100%",
    height: 100,
  },
  form: {
    width: "100%",
    alignItems: "center",
    height: 300,
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: "white",
    color: "white",
    height: 40,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  menuselect: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
  },
  txt: {
    color: "white",
  },
  dropdown: {
    width: "60%",
  },
  placeholderStyle: {
    backgroundColor: "transparent",
  },
  btns: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "70%",
  },
  btn: {
    width: "45%",
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    color: "white",
  },
});
