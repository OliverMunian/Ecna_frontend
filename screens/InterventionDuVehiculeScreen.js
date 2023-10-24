import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Fiche_intervention from "../components/Fiche_intervention";

export default function Interventions({navigation}) {
  const interventions = useSelector((state) => state.vehicules.value.interventions);
  const plaque = useSelector((state) => state.vehicules.value.plaque);
  const interventionsDisplay = interventions.map((data, i) =>{
    return <Fiche_intervention key={i} />
  })
  console.log(interventions.vehicule);

  function back(){
    navigation.navigate('')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.plaque}>{plaque}</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.txt}> Interventions </Text>
      </View>
      <View style={styles.input}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    width: "100%",
    backgroundColor: "black",
  },
  plaque:{
    top: 100,
    marginLeft:20,
    color:'white',
    fontSize: 20,
  },
  box: {
    top: 150,
    width: "100%",
    marginBottom: 25,
    borderBottomColor: "grey",
    borderWidth: 1,
  },
  txt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  input:{
    width:'100%',
    top: 150,
    backgroundColor:'white',
    height:100,
  }
});
