import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import CarouselDashboard from "../../components/CarouselDashboard";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profil from "../../components/Employe/Profil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MobileUnit(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [firstConnection, setFirstConnection] = useState(false);
  const [secondConnection, setSecondConnection] = useState(false);
  const [error, setError] = useState("");
  const [plaque, setPlaque] = useState("");
  const [type, setType] = useState("");

  const BACKEND_ADRESS = "http://192.168.1.31:3000";
  const vehiculesDispo = useSelector((state) => state.vehiculesDispo.value);

  const choseMode = () => {
    if (firstConnection || secondConnection) {
      Alert.alert("Deconnexion", "Tous les profils doivent être déconnecter");
    } else {
      navigation.navigate("ChoixDuProfil");
    }
  };

  const definePlq = (plq) => {
    console.log(plq)
    setPlaque(plq);
    if (plq === "Gros") {
      console.log('GV choisi')
      setType("Gros");
    } else if (plq === "VSL") {
      console.log('vsl choisi: ' + plaque + ' ' + plq)
      setType("VSL");
    } else {
      setType("");
    }
  };

  const onBoard = () => {
    console.log(plaque);
    console.log(type);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeWindow = () => {
    setError("");
    setModalVisible(false);
  };

  const firstDeconnexion = () => {
    setFirstConnection(false);
    setFirstUser(null);
    setUserName(null);
  };
  const secondDeconnexion = () => {
    setSecondConnection(false);
    setSecondUser(null);
    setUserName(null);
  };

  const handleSubmit = () => {
    if (firstConnection) {
      fetch(`${BACKEND_ADRESS}/employe/signin`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(plaque);
            console.log(type);
            setSecondUser(data.username);
            setError("");
            setSecondConnection(true);
            closeWindow();
          } else if (!data.result) {
            console.log(data);
            setError("Mauvais identifiant ou mot de passe");
          }
        });
    } else {
      fetch(`${BACKEND_ADRESS}/employe/signin`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setFirstUser(data.username);
            setError("");
            closeWindow();
            setPassword("");
            setFirstConnection(true);
          } else if (!data.result) {
            console.log(data);
            setError("Mauvais identifiant ou mot de passe");
          }
        });
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Sélectionner votre véhicule</Text>
        <Text style={styles.subtitle}>
          Choisissez votre véhicule, puis cliquez dessus pour le séléctioner,
          enfin connectez-vous à votre profil pour passer en ligne{" "}
        </Text>
      </View>
      <View style={styles.car}>
        <CarouselDashboard
          definePlq={definePlq}
          click={true}
          selected={plaque}
        />
      </View>
      <View style={styles.connectionprofile}>
        {firstConnection || secondConnection ? (
          <Text style={styles.subtitle}>
            Cliquez sur votre profil pour vous déconnecter
          </Text>
        ) : (
          ""
        )}
        <View style={styles.profiles}>
          {firstConnection && (
            <TouchableOpacity onPress={firstDeconnexion}>
              <Profil username={firstUser} />
            </TouchableOpacity>
          )}
          {secondConnection && (
            <TouchableOpacity onPress={secondDeconnexion}>
              <Profil username={secondUser} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.connexion}>
        {firstConnection && plaque && type == "Gros" ? (
          <TouchableOpacity style={styles.btn} onPress={showModal}>
            <AntDesign name="login" size={35} color="white" />
            <Text style={styles.subtitle}>Connection</Text>
          </TouchableOpacity>
        ) : firstConnection && type == "VSL" ? (
          <TouchableOpacity style={styles.btn} onPress={onBoard}>
            <MaterialCommunityIcons name="steering" size={35} color="white" />
            <Text style={styles.subtitle}>Monter à bord du véhicule</Text>
          </TouchableOpacity>
        ) : firstConnection && secondConnection && plaque && type == "Gros" ? (
          <TouchableOpacity style={styles.btn} onPress={onBoard}>
            <MaterialCommunityIcons name="steering" size={35} color="white" />
            <Text style={styles.subtitle}>Monter à bord du véhicule</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={showModal}>
            <AntDesign name="login" size={35} color="white" />
            <Text style={styles.subtitle}>Connection</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.waymode}>
        <TouchableOpacity onPress={() => choseMode()} style={styles.btn}>
          <Ionicons
            name="exit-outline"
            size={(fontSize = 35)}
            color="white"
            style={{ transform: [{ rotateY: "180deg" }], top: 0 }}
          />
          <Text style={styles.subtitle}>Choix du mode</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.centeredViewtwo}>
            <BlurView intensity={50} style={styles.blurview}>
              <View style={styles.closebtn}>
                <TouchableOpacity onPress={closeWindow}>
                  <Ionicons
                    name="close-circle"
                    size={(fontSize = 25)}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.txt}>Saisissez vos identifiants</Text>
              <View style={styles.inputs}>
                <TextInput
                  onChangeText={(value) => setUserName(value)}
                  placeholder="Votre identifiant"
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <TextInput
                  onChangeText={(value) => setPassword(value)}
                  placeholder="Mot de passe"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
              <Text style={styles.error}>{error}</Text>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <AntDesign name="login" size={35} color="white" />
                <Text style={styles.subtitle}>Connexion</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  box: {
    marginTop: 130,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  subtitle: {
    fontStyle: "italic",
    fontSize: 15,
    color: "white",
  },
  car: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  connectionprofile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  profiles: {
    flexDirection: "row",
  },
  connexion: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    top: 10,
    alignItems: "center",
  },
  waymode: {
    top: 50,
  },

  /* Modal */
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    opacity: "10%",
    overflow: "hidden",
  },
  centeredViewtwo: {
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    width: "85%",
    height: 270,
  },
  blurview: {
    backgroundColor: "transparent",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    height: 270,
    flexDirection: "column",
  },
  closebtn: {
    width: "100%",
    alignItems: "flex-end",
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
  },
  inputs: {
    top: 20,
    width: "90%",
    margin: 10,
    alignItems: "center",
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 30,
    color: "white",
    width: "50%",
    textAlign: "center",
  },
  error: {
    fontSize: 15,
    color: "red",
  },
});
