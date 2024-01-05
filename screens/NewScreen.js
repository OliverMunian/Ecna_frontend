import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Formulaire_intervention from "../components/Formulaire_intervention";
import { LinearGradient } from "expo-linear-gradient";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

export default function NewScreen() {
  const navigation = useNavigation();

  const interClassic = ()=>{
    navigation.navigate("InterClassic")
  }
  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.bigtilte}>
        <Text style={styles.titre}>Nouvelle intervention</Text>
        <Text style={styles.tutoriel}>
          Choississez le type d'intervention que vous souhaitez réaliser
        </Text>
      </View>


      {/*CHOIX DE MISSION*/}
      <View style={styles.btn}>
        <View style={styles.divbtn}>
          <TouchableOpacity style={styles.touchable} onPress={interClassic}>
            <Text style={styles.txt}>Classsique</Text>
            <Fontawesome name="wheelchair" size={35} color="white" />
            <Text style={styles.subtxt}>
              Consultation & Transfert
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divbtn}>
        <TouchableOpacity style={styles.touchable}>
            <Text style={styles.txt}>Urgences</Text>
            <SimpleLineIcons name="speedometer" size={35} color="white" />
            <Text style={styles.subtxt}>
              Transfert vers urgences
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divbtn}>
        <TouchableOpacity style={styles.touchable}>
            <Text style={styles.txt}>SAMU</Text>
            <MaterialCommunityIcons name="alarm-light-outline" size={35} color="white" />
            <Text style={styles.subtxt}>
              Mandaté par le centre appel 15
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  //TITRE DE LA PAGE
  bigtilte: {
    width: "100%",
    borderColor: "grey",
    marginTop: 130,
    marginBottom: 20,
  },
  titre: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: 10,
  },
  tutoriel: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
    paddingLeft: 10,
  },
  btn: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  divbtn: {
    marginBottom:40,
    borderTopWidth:0.5,
    borderTopColor: "white",
    width:"70%",
    padding:10,
  },
  touchable:{
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom:10,
  },
  subtxt: {
    color: "white",
    fontStyle: "italic",
    marginTop:10,
  },
});
