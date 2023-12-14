import { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { addtokenToSotre, addSirenToSotre } from "../reducers/user";
import { addtokenEmployeToStore, addEmployeToStore } from "../reducers/employe";
import { useDispatch } from "react-redux";
import { BlurView } from "expo-blur";
import background from "../assets/ambulance.jpg";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function HomeScreen({ navigation }) {
  const BACKEND_ADRESS = "https://ecna-backend-odpby015w-olivermunian.vercel.app";
  const dispatch = useDispatch();
  const ref_input2 = useRef();

  // Declaration des états
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notFound, setNotFound] = useState(null);

  // Fonction pour sign in
  const handleSubmit = () => {
    fetch(`${BACKEND_ADRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addtokenToSotre(data.token));
          dispatch(addSirenToSotre(data.SIREN));
          setUserName("");
          setPassword("");
          setErrorMessage("");
          navigation.navigate("ChoixDuProfil");
        } else {
          setNotFound(!notFound);
          if (!notFound && username && password) {
            fetch(`${BACKEND_ADRESS}/employe/signin`, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ username: username, password: password }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("ligne 52, HomeScreen :", data);
                dispatch(addtokenEmployeToStore(data.token));
                dispatch(addEmployeToStore(data.username));
                setUserName("");
                setPassword("");
                setNotFound(notFound);
                navigation.navigate("TabNavigator");
                if (!data) {
                  Alert.alert(
                    "Oups !",
                    "Il semblerait que ce compte n'existe pas"
                  );
                }
              });
          } else {
            setNotFound(notFound);
            setErrorMessage("Utilisateur non-existant");
          }
        }
      });
  };

  // Fonction pour naviguer vers la page subscribe
  const navigate = () => {
    navigation.navigate("Subscribe");
  };

  return (
    <View style={styles.containerUn}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
        blurRadius={3}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.bigtitle}>
            <Text style={styles.title}> ECNA </Text>
            <Text style={styles.titleDeux}> Time is now yours</Text>
          </View>
          <View intensity={20} style={styles.view}>
            <TextInput
              onChangeText={(value) => setUserName(value)}
              placeholder="Nom d'utilisateur"
              style={styles.input}
              placeholderTextColor={"white"}
              returnKeyType={"next"}
            />
            <TextInput
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
              placeholder="Mot de passe"
              style={styles.input}
              placeholderTextColor={"white"}
            />
            <Text style={styles.txtError}>{errorMessage}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
              <AntDesign name="login" size={35} color="white" />
              <Text style={styles.btntxt}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate()}>
              <Text style={styles.redirection}>
                Vous n'avez pas encore de compte ? Cliquez ici
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containerUn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  container: {
    top: 300,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    blurRadius: 5,
    height: 850,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  bigtitle: {
    width: "90%",
    alignItems: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 65,
    fontWeight: "bold",
  },
  titleDeux: {
    marginRight: 60,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "left",
  },
  view: {
    marginTop: 35,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  txt: {
    marginBottom: 20,
    color: "white",
  },
  input: {
    backgroundColor: "transparent",
    width: "75%",
    height: 65,
    borderRadius: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "white",
    textAlign: "center",
    color: "white",
  },
  btn: {
    alignItems: "center",
  },
  btntxt: {
    marginTop: 5,
    color: "white",
  },
  redirection: {
    marginTop: 20,
    color: "#00bcf0",
    textDecorationLine: "underline",
  },
  txtError: {
    color: "red",
    marginBottom: 20,
  },
});
