import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defineListVehicules } from "../reducers/vehicules";
import CarouselDashboard from "../components/CarouselDashboard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import VehiculeDashBoard from "../components/VehiculeDashBoard";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
import { defineListVehiculesDispo } from "../reducers/vehiculesDispo";
import { defineListPatients } from "../reducers/listPatients";
import { defineListInter } from "../reducers/interventions";
import { updateSearchResults } from "../reducers/searchResult";
import { LinearGradient } from "expo-linear-gradient";
// Bottom Sheet
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function DashboardScreen({ navigation }) {
  // Bottom Sheet
  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "85%"];
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");

  function handlePressModal() {
    BottomSheetModalRef.current?.present();
    setValue(value);
  }

  const dispatch = useDispatch();
  const BACKEND_ADRESS = "http://10.3.0.23:3000";
  const user = useSelector((state) => state.user.value);
  const interventions = useSelector((state) => state.interventions.value);
  const recherche = useSelector((state) => state.searchQuery.value);

  // A l'initialisation du dashboard, dispatch de toutes les informations
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
        if (patientData.result) {
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
        }
      });
    // Fetch des vehicules correspondant au SIREN
    fetch(`${BACKEND_ADRESS}/interventions/${user.SIREN}`)
      .then((response) => response.json())
      .then((interData) => {
        if (interData.result) {
          dispatch(defineListInter(interData.interventions));
        }
      });
  }, []);

  // Fonction qui se declenche lors du search
  const handleSearch = () => {
    const pattern = new RegExp(recherche, "i");
    const searchQuery = interventions.filter(
      (inter) =>
        inter.patient.lastName.match(pattern) ||
        inter.patient.firstName.match(pattern)
    );
    dispatch(updateSearchResults(searchQuery));
    navigation.navigate("SearchResults");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.maintitle}>
        <Text style={styles.h1}> Véhicules disponibles </Text>
        <CarouselDashboard></CarouselDashboard>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.title} onPress={handlePressModal}>
          <FontAwesome name="spinner" size={(fontSize = 25)} color="white" />
          <Text style={styles.txt}>En cours </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.title}
          onPress={handlePressModal}
          value="samu"
        >
          <MaterialCommunityIcons
            name="alarm-light-outline"
            size={(fontSize = 25)}
            color="white"
          />
          <Text style={styles.txt}>SAMU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={handlePressModal}>
          <MaterialCommunityIcons
            name="skip-next"
            size={(fontSize = 25)}
            color="white"
          />
          <Text style={styles.txt}>Ultérieures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={handlePressModal}>
          <MaterialIcons
            name="dangerous"
            size={(fontSize = 25)}
            color="white"
          />
          <Text style={styles.txt}>Anomalies</Text>
        </TouchableOpacity>
      </View>
      {/* BARRE DE RECHERCHE */}
      <View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={200}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SearchBar />
        </KeyboardAvoidingView>
      </View>
      <BottomSheetModalProvider>
        <View visible={modalVisible}>
          <StatusBar style={styles.statusbar} />
          <BottomSheetModal
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            blurRadius={1}
            backgroundStyle={{
              borderRadius: 30,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <View style={styles.modalcontain}>
              <Text style={styles.txtmodal}>
                Faire appraitre les composants
              </Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
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
    top: -30,
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "black",
    textDecorationLine: "underline",
  },
  // LISTE ICONES
  icons: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  //ICONES
  title: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "20%",
    marginTop: 50,
  },
  //TITRES DES ICONES
  txt: {
    marginTop: 5,
    fontSize: 13,
    color: "white",
    marginBottom: 5,
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
  //BottomSheet Modal
  statusbar: {
    width: 30,
  },
  containermodal: {
    flex: 1,
    borderColor: "red",
    borderWidth: 1,
    height: 500,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalcontain: {
    alignItems: "center",
  },
  txtmodal: {
    color: "white",
    fontSize: 35,
  },
});
