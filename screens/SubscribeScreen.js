import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtokenToSotre, addSirenToSotre } from "../reducers/user";
import { addtokenEmployeToStore, addEmployeToStore } from "../reducers/employe";
import background from "../assets/ambulance.jpg";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SubscribeScreen({ navigation }) {
  const BACKEND_ADRESS = "http://192.168.1.31:3000";
  const dispatch = useDispatch();

  // Mise en place états liés aux input
  const [isChecked, setChecked] = useState(false);
  const [isCheckedBis, setCheckedBis] = useState(false);
  const [statut, setStatut] = useState();
  const [username, setUserName] = useState(null);
  const [password, setPassWord] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [SIREN, setSIREN] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const regexSIREN = /^[0-9]{9}$/; // Permet d'avoir un type précis de SIREN

  function changeStatut() {
    setChecked(!isChecked);
    setCheckedBis(false);
  }
  function changeStatutbis() {
    setCheckedBis(!isCheckedBis);
    setChecked(false);
  }

  // Fonction qui se déclenche lors de l'appui sur le bouton valider afin de créer un document user et un document entreprise + les lier
  function Subscribe() {
    const testSiren = regexSIREN.test(SIREN);
    if (!username || !password || !email) {
      Alert.alert("Oups !", "Vous n'avez pas compléter tous les champs");
    } else if (username && password && email) {
      fetch(`${BACKEND_ADRESS}/employe/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          isAdmin: isAdmin,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
          } else {
            dispatch(addtokenEmployeToStore(data.data.token));
            dispatch(addEmployeToStore(data.data.username));
            setUserName("");
            setEmail("");
            setPassWord("");
            setErrorMessage("");
            navigation.navigate("Employe");
          }
        });
    } else if (testSiren) {
      setIsAdmin(!isAdmin);
      fetch(`${BACKEND_ADRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          name: name,
          isAdmin: isAdmin,
          SIREN: SIREN,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addtokenToSotre(data.token));
            dispatch(addSirenToSotre(data.SIREN));
            navigation.navigate("AddVehicule");
          } else {
            setErrorMessage(data.error);
          }
        });
    } else {
      setErrorMessage(`Le SIREN n'est pas valide ou faux`);
    }
  }

  // Fonction qui permet de revenir vers l'ecran d'acceuil
  const navigate = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
        blurRadius={1}
      >
        <TouchableOpacity onPress={() => navigate()}>
          <View style={styles.divprevious}>
            <MaterialIcons
              name="arrow-back-ios"
              size={(fontSize = 25)}
              color="white"
            />
            <Text style={styles.previous}>Connexion</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.maintitle}>Inscription</Text>
        </View>
        <View style={styles.titleprevious}></View>
        <LinearGradient
          style={styles.div}
          colors={["#1a2755", "#1D94AE"]}
          start={{ x: 0.9, y: 0.2 }}
          end={{ x: 0.5, y: 1 }}
        >
          <ScrollView
            keyboardDismissMode="on-drag"
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            endFillColor="#000"
            overScrollMode="never"
          >
            <View style={styles.titlediv}>
              <Text style={styles.titleform}>Bienvenue sur Ecna</Text>
              <Text style={styles.titleformun}>
                Veuillez compléter le formulaire pour continuer
              </Text>
            </View>
            <KeyboardAwareScrollView style={styles.keyboardscrollview}>
              <Text style={styles.txtError}>{errorMessage}</Text>
              <View style={styles.formulaire}>
                <View style={styles.divinput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="white"
                    onChangeText={(value) => setUserName(value)}
                    value={username}
                  />
                </View>
                <View style={styles.divinput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Adresse mail"
                    placeholderTextColor="white"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                  />
                </View>
                <View style={styles.divinput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(value) => setPassWord(value)}
                    value={password}
                  />
                </View>
                <Text style={styles.txt}>
                  Êtes-vous gérant d'une société ? Si, oui cochez la case
                </Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={() => changeStatut()}
                  color={isChecked ? "#00FF00" : undefined}
                />
                {isChecked ? (
                  <>
                    <View style={styles.divinput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Nom de l'entreprise"
                        placeholderTextColor="white"
                        onChangeText={(value) => setName(value)}
                        value={name}
                      />
                    </View>
                    <View style={styles.divinput}>
                      <Text style={styles.note}>
                        Veuillez saisir le n° de SIREN de votre société
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="N° de SIREN"
                        placeholderTextColor="white"
                        onChangeText={(value) => setSIREN(value)}
                        value={SIREN}
                      />
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => Subscribe()}>
                <AntDesign name="login" size={35} color="white" />
                <Text style={styles.btntxt}>Valider</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  divprevious: {
    top: 250,
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginLeft: 10,
  },
  txt: {
    color: "white",
    fontStyle: "italic",
  },
  checkbox: {
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "white",
  },
  previous: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "85%",
    top: -250,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
  },
  maintitle: {
    top: 300,
    color: "white",
    fontSize: 55,
    fontWeight: "bold",
  },
  div: {
    borderTopLeftRadius: 180,
    width: "100%",
    height: "100%",
    top: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardscrollview: {
    width: "100%",
    top: 100,
  },
  titlediv: {
    top: 100,
  },
  titleform: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  titleformun: {
    color: "white",
    fontStyle: "italic",
    fontSize: 10,
    marginBottom: 20,
  },
  formulaire: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  divinput: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  note: {
    color: "white",
    fontStyle: "italic",
    fontSize: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "transparent",
    height: 40,
    borderRadius: 10,
    textAlign: "left",
    paddingLeft: 10,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
  },
  btn: {
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  btntxt: {
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
  },
  txtError: {
    color: "red",
  },
});
