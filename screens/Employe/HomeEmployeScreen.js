import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addEmployeToStore } from "../../reducers/employe";
import { addtokenEmployeToStore } from "../../reducers/employe";
import { useNavigation } from "@react-navigation/native";

export default function Employee() {
  const employe = useSelector((state) => state.employe.value);
  const img = require("/Users/oliviermalahel/Desktop/Ecna_native/frontend/Ecna_frontend/assets/inter.jpg");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logHandle = () => {
    dispatch(addEmployeToStore(null));
    dispatch(addtokenEmployeToStore(null));
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.divimg}>
        <Image style={styles.img} source={img} resizeMode="cover" />
      </View>
      <LinearGradient
        style={styles.container}
        colors={["#1a2755", "#006a4d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.8 }}
      >
        <View style={styles.box}>
          <Text style={styles.txt}>Ce mois ci: </Text>

          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View style={styles.boxstats}>
              <View style={styles.boxinfos}>
                <Text style={styles.stats}>Nbre de tranports</Text>
                <Text style={styles.statsnbre}>170</Text>
              </View>
              <View style={styles.boxinfos}>
                <Text style={styles.stats}>Nbre d'heures</Text>
                <Text style={styles.statsnbre}>180</Text>
              </View>
              <View style={styles.boxinfos}>
                <Text style={styles.stats}>Kms parcourus</Text>
                <Text style={styles.statsnbre}>687</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => logHandle()} style={styles.logout}>
            <AntDesign
              name="logout"
              size={(fontSize = 30)}
              color="white"
              style={{ transform: [{ rotateY: "180deg" }], top: 0 }}
            />
            <Text style={styles.logoutxt}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  divimg: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 600,
  },
  container: {
    marginTop: -170,
    height: 350,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  box: {
    width: "100%",
    padding:15,
  },
  txt: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  logout: {
    marginBottom:15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutxt: {
    color: "white",
    marginTop: 10,
    fontStyle: "italic",
  },

  /*STATISTIQUES*/
  boxstats: {
    flexDirection: "row",
    justifyContent:'space-between',
    width: "100%",
    height: 150,
    marginTop: 15,
  },
  boxinfos: {
    height: "100%",
  },
  stats: {
    fontSize: 13,
    color: "grey",
  },
  statsnbre: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});
