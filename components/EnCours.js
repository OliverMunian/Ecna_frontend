import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
  } from "react-native";
  import { useState } from "react";
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
    const [errorMessage, setErrorMessage] = useState(null);
  
    const user = useSelector((state) => state.user.value);
    const SIREN = useSelector((state) => state.user.value.SIREN);
    const regex = /^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$/i;
  
    // Création des elements JSX à partir du composant Fichevehicule

  
    return (
      <View style={styles.container}>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
  });
  