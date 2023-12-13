import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { addtokenToSotre, addSirenToSotre, adduserToSotre} from "../reducers/user";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ChoixDuMode() {
  //Récuperation des information de l'utilisateur avec le reducer
  const BACKEND_ADRESS = "http://192.168.1.20:3000";
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [entreprise, setEntreprise] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Choix du Mode: ", data);
        for (let item of data.entreprise) {
          console.log(item.name);
          setEntreprise(item.name);
        }
      });
  }, []);

  const goDashboard = () =>{
    navigation.navigate("UserNavigator")
  }

  const logHandle = () => {
    dispatch(addSirenToSotre(null));
    dispatch(addtokenToSotre(null));
    dispatch(adduserToSotre(null))
    navigation.navigate("Home");
  };
  
  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.6, y: 0.7 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.boxview}>
        <View style={styles.title}>
          <Text style={styles.txt}>
            {" "}
            {entreprise ? entreprise : <Text> Bienvenue </Text>}{" "}
          </Text>
        </View>
        <View style={styles.divsubtxt}>
          <Text style={styles.subtxt}>
            {" "}
            Choississez votre mode d'utlisation
          </Text>
        </View>
        <View style={styles.btn}>
          <View style={styles.divbtn}>
            <TouchableOpacity style={styles.divbtn} onPress={() => goDashboard()}>
              <Text style={styles.txt}>Gérant</Text>
              <Fontawesome name="group" size={35} color="white" />
              <Text style={styles.subtxt}>
                Prenez les commandes de votre flotte
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.divbtn}>
              <Text style={styles.txt}>Unité mobile</Text>
              <MaterialCommunityIcons name="steering" size={35} color="white" />
              <Text style={styles.subtxt}>
                Prenez les commandes d'un véhicule
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => logHandle()}>
          <AntDesign
            name="logout"
            size={(fontSize = 30)}
            color="white"
            style={{ transform: [{ rotateY: "180deg" }], marginBottom: 10 }}
          />
          <Text style={styles.subtxt}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "white",
  },
  boxview: {
    top: 120,
    width: "100%",
  },
  title: {
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  txt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  divsubtxt: {
    marginTop: 10,
    alignItems: "center",
  },
  subtxt: {
    color: "white",
    fontStyle: "italic",
  },

  /*BOUTONS DE REDIRECTIONS*/
  btn: {
    marginTop: 100,
    height: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  divbtn: {
    alignItems: "center",
    justifyContent: "center",
  },

  /*BOUTONS DE DECONNECTION*/
  logout: {
    marginTop: 100,
    flexDirection: "column",
    alignItems: "center",
  },
});
