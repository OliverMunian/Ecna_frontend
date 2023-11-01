import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtokenToSotre, addSirenToSotre } from "../reducers/user";
import background from "../assets/ambulance.jpg";
import { LinearGradient } from "expo-linear-gradient";

export default function SubscribeScreen({ navigation }) {
  const BACKEND_ADRESS = "https://ecna-backend-odpby015w-olivermunian.vercel.app";
  const dispatch = useDispatch();

  // Mise en place états liés aux input
  const [username, setUserName] = useState(null);
  const [password, setPassWord] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [SIREN, setSIREN] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null)

  const regex = /[0-9]+/i;
  // Fonction à déclencher lors de l'appui sur le bouton valider afin de créer un document user et un document entreprise + les lier
  function Subscribe() {
    const testSiren = regex.test(SIREN)
    if(testSiren){
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
    }
    else {
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
      <TouchableOpacity>
        <Text style={{top: 250,
    color: "white",
    fontSize: 25,
    fontWeight: "bold"}} onPress={() => navigate()}>
          RETOUR
        </Text>
      </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.maintitle}>Inscription</Text>
        </View>
        <View style={styles.titleprevious}>
        </View>
        <LinearGradient
          style={styles.div}
          colors={["#1a2755", "#1D94AE"]}
          start={{ x: 0.6, y: 0.7 }}
          end={{ x: 0.5, y: 1 }}
        >
          <Text style={styles.titleform}>Bienvenue sur Ecna</Text>
          <Text style={styles.titleformun}>
            Veuillez compléter le formulaire pour continuer
          </Text>
          <Text style={styles.txtError}>
          {errorMessage}
          </Text>
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
            <View style={styles.line}></View>
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
              <TextInput
                style={styles.input}
                placeholder="N° de SIREN"
                placeholderTextColor="white"
                onChangeText={(value) => setSIREN(value)}
                value={SIREN}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => Subscribe()}>
              <Text style={styles.btntxt}> Valider </Text>
            </TouchableOpacity>
          </View>
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
    borderTopLeftRadius: 200,
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    top: 370,
    justifyContent: "center",
    alignItems: "center",
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
  },
  divinput: {
    width: "70%",
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  input: {
    backgroundColor: "transparent",
    height: 40,
    borderRadius: 20,
    textAlign: "left",
    paddingLeft: 10,
    borderColor: "white",
    borderWidth: 1,
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
  txtError : {
    color : 'red'
  }
});
