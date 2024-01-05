import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addEmployeToStore } from "../../reducers/employe";
import { addtokenEmployeToStore } from "../../reducers/employe";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Employee() {
  const employe = useSelector((state) => state.employe.value);
  // const img = require("/Users/oliviermalahel/Desktop/Ecna_native/frontend/Ecna_frontend/assets/Unknown.jpg");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const BACKEND_ADRESS = "http://192.168.1.31:3000";
  const [userLastName, setUserLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [streetName, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const fields = [
    userLastName,
    phone,
    numberStreet,
    streetName,
    postalCode,
    city,
  ];

  const logIn = () => {
    fetch(`${BACKEND_ADRESS}/employe/${employe.token}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userlastname: userLastName,
        tel: phone,
        numberstreet: numberStreet,
        streetname: streetName,
        postalcode: postalCode,
        city: city,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("EmployeScreen, ligne 60", data);
        if (data.error) {
          Alert.alert(
            "Mmmh...",
            "Il semblerait qu'il y ait un probème, veuillez réssayer ultérieurement"
          );
        } else {
          setUserLastName("");
          setPhone("");
          setNumberStreet("");
          setStreetName("");
          setPostalCode("");
          navigation.navigate("TabNavigator");
        }
      });
  };

  const logHandle = () => {
    dispatch(addEmployeToStore(null));
    dispatch(addtokenEmployeToStore(null));
    navigation.navigate("Home");
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#006a4d"]}
      start={{ x: 0.6, y: 0.2 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.box}>
        <View style={styles.title}>
          <Text style={styles.txt}>Bonjour {employe.username}</Text>
          <Text style={styles.subtxt}>
            ECNA vous souhaite la bienvenue{"\n"}
            {"\n"}
            Veuillez compléter les informations suivantes afin de compléter
            votre profil
          </Text>
          <View style={styles.divimg}>
            {/* <Image style={styles.img} source={img} /> */}
          </View>
          <View style={styles.inputInfos}>
            <KeyboardAwareScrollView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.KeyboardAwareScrollView}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.divinkeyboard}>
                  <TextInput
                    keyboardDismissMode="on-drag"
                    placeholder="Nom de famille"
                    style={styles.input}
                    onChangeText={(value) => setUserLastName(value)}
                    value={userLastName}
                  />
                  <TextInput
                    keyboardType="numeric"
                    keyboardDismissMode="on-drag"
                    placeholder="Numero de téléphone"
                    maxLength={10}
                    style={styles.input}
                    onChangeText={(value) => setPhone(value)}
                    value={phone}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="N°de Rue"
                    style={styles.input}
                    onChangeText={(value) => setNumberStreet(value)}
                    value={numberStreet}
                  />
                  <TextInput
                    placeholder="Nom de rue"
                    style={styles.input}
                    onChangeText={(value) => setStreetName(value)}
                    value={streetName}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Code Postal"
                    maxLength={5}
                    style={styles.input}
                    onChangeText={(value) => setPostalCode(value)}
                    value={postalCode}
                  />
                  <TextInput
                    placeholder="Ville"
                    style={styles.input}
                    onChangeText={(value) => setCity(value)}
                    value={city}
                  />
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>

            {userLastName && phone ? (
              <TouchableOpacity style={styles.btn} onPress={logIn}>
                <AntDesign name="login" size={35} color="white" />
                <Text style={styles.subtxt}>Valider</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => logHandle()} style={styles.btn}>
                <AntDesign
                  name="logout"
                  size={(fontSize = 30)}
                  color="white"
                  style={{ transform: [{ rotateY: "180deg" }], top: 0 }}
                />
                <Text style={styles.subtxt}>Déconnexion</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View></View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    width: "100%",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
  },
  subtxt: {
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 15,
    color: "white",
  },
  divimg: {
    marginTop: 50,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },

  /*KEYBOARD*/
  inputInfos: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  KeyboardAwareScrollView: {
    width: "100%",
  },
  divinkeyboard: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "60%",
    marginTop: 15,
    padding: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logout: {
    justifyContent: "center",
  },
});
