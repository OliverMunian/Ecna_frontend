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
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addEmployeToStore } from "../../reducers/employe";
import { addtokenEmployeToStore } from "../../reducers/employe";
import { useNavigation } from "@react-navigation/native";

export default function Employee() {
  const employe = useSelector((state) => state.employe.value);
  console.log("ligne 21, EmployeScreen: ", employe);
  // const img = require("/Users/oliviermalahel/Desktop/Ecna_native/frontend/Ecna_frontend/assets/Unknown.jpg");
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
        <Text style={styles.txt}>Calendrier </Text>
        <Text style={styles.subtxt}>Retrouvez toutes vos horaires effectués, ainsi que votre planning</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  box: {
    flex: 1,
    width: "95%",
    marginTop: 100,
    marginLeft:5,
  },
  subtxt:{
    color:"white",
    fontStyle:"italic",
    fontSize:15,
  }
});
