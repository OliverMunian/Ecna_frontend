import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Employee() {
  const employe = useSelector((state) => state.employe.value);
  const navigation = useNavigation();
  const BACKEND_ADRESS = "http://192.168.1.31:3000";
  const [mail, setMail] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [streetName, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/employe/${employe.token}`)
      .then((response) => response.json())
      .then((data) => {
        setMail(data.email);
        setUserLastName(data.userlastname);
        setPhone(data.tel);
        setNumberStreet(data.numberstreet);
        setStreetName(data.streetname);
        setPostalCode(data.postalcode);
        setCity(data.city);
      });
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#006a4d"]}
      start={{ x: 0.6, y: 0.2 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.divimg}>
        <Image style={styles.img} source={img} resizeMode="cover" />
      </View>
      <Text style={styles.txt}>
        {employe.username} {userLastName}
        {"\n"}
      </Text>
      <Text style={styles.subtitletxt}>
        {" "}
        Actuellement en contrat à durée inderterminé chez Ambulances Bleues
      </Text>
      <View style={styles.boxtitle}>
        <Text style={styles.title}>Informations personnelles</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.titletxt}> Adresse mail</Text>
        <Text style={styles.subtitletxt}> 📨 {mail}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.titletxt}> Numéro de téléphone </Text>
        <Text style={styles.subtitletxt}>
          {" "}
          📞 {phone ? phone : <Text>Aucun numéro renseigné</Text>}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.titletxt}> Adresse postale</Text>
        <Text style={styles.subtitletxt}>
          {" "}
          📍{numberStreet} {streetName}, {postalCode}, {city}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "left",
    padding: 15,
  },
  img: {
    marginTop: 80,
    width: 130,
    borderWidth: 1,
    height: 130,
    borderColor: "white",
    borderRadius: 100,
  },
  txt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  boxtitle: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  box: {
    marginTop: 15,
  },
  titletxt: {
    fontSize: 20,
    color: "white",
  },
  subtitletxt: {
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 15,
    color: "white",
  },
});
