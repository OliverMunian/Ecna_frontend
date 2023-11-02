import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtokenToSotre, addSirenToSotre } from "../reducers/user";
import background from "../assets/ambulance.jpg";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

export default function SubscribeScreen({ navigation }) {
  const BACKEND_ADRESS =
    "https://ecna-backend-odpby015w-olivermunian.vercel.app";
  const dispatch = useDispatch();

  // Mise en place états liés aux input
  const [username, setUserName] = useState(null);
  const [password, setPassWord] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [SIREN, setSIREN] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const regexSIREN = /^[0-9]{9}$/; // Permet d'avoir un type précis de SIREN
  // Fonction qui se déclenche lors de l'appui sur le bouton valider afin de créer un document user et un document entreprise + les lier
  function Subscribe() {
    const testSiren = regexSIREN.test(SIREN);
    if (testSiren) {
      fetch(`${BACKEND_ADRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          name: name,
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
      <View style={{ height: 400, width: "100%", position: "absolute" }}>
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
              <Text style={styles.previous}>Retour</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.maintitle}>Inscription</Text>
          </View>
        </ImageBackground>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        contentContainerStyle={{
          borderWidth: 3,
          borderColor: "green",
        }}
        style={styles.keyboardscrollview}
      >
        <LinearGradient
          style={styles.div}
          colors={["#1a2755", "#1D94AE"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View
            style={{
              height: "100%",
              paddingTop: 80,
              paddingLeft: 60,
              paddingRight: 60,
              alignItems:'center'
            }}
          >
            <Text style={styles.titleform}>Bienvenue sur Ecna</Text>
            <Text style={styles.titleformun}>
              Veuillez compléter le formulaire pour continuer
            </Text>

            <Text style={styles.txtError}>{errorMessage}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="white"
              onChangeText={(value) => setUserName(value)}
              value={username}
            />

            <TextInput
              style={styles.input}
              placeholder="Adresse mail"
              placeholderTextColor="white"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />

            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={(value) => setPassWord(value)}
              value={password}
            />

            <View style={styles.line}></View>

            <TextInput
              style={styles.input}
              placeholder="Nom de l'entreprise"
              placeholderTextColor="white"
              onChangeText={(value) => setName(value)}
              value={name}
            />

            <TextInput
              style={styles.input}
              placeholder="N° de SIREN"
              placeholderTextColor="white"
              onChangeText={(value) => setSIREN(value)}
              value={SIREN}
            />

            <TouchableOpacity style={styles.btn} onPress={() => Subscribe()}>
              <Text style={styles.btntxt}> Valider </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  divprevious: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginLeft: 10,
  },
  previous: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
  },
  maintitle: {
    color: "white",
    fontSize: 55,
    fontWeight: "bold",
  },
  div: {
    borderTopLeftRadius: 180,
    backgroundColor: "white",
  },
  keyboardscrollview: {
    top: 250,
    height: 600,
    width: "100%",
    position: "absolute",
    borderWidth: 3,
    borderColor: "red",
  },
  titlediv: {
    position: "absolute",
    top: 50,
  },
  titleform: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf:'center'
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
  },
  divinput: {
    width: "70%",
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  input: {
    backgroundColor: "transparent",
    margin: 5,
    height: 40,
    borderRadius: 20,
    textAlign: "left",
    paddingLeft: 10,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
  },
  btn: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    width: "30%",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  btntxt: {
    fontWeight: "bold",
    color: "white",
  },
  txtError: {
    color: "red",
  },
});
