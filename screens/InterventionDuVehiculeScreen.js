import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeInterPlaque } from "../reducers/interVehicules";
import Fiche_intervention from "../components/Fiche_intervention";

export default function Interventions({ navigation }) {
  const dispatch = useDispatch();
  const interventions = useSelector(
    (state) => state.interVehicules.value.interventions
  );
  const plaque = useSelector((state) => state.interVehicules.value.plaque);
  const interventionsDisplay = interventions.map((data, i) => {
    const day = new Date(data.date).getDate();
    const month = new Date(data.date).getMonth();
    const year = new Date(data.date).getFullYear();
    let date = month + "/" + day + "/" + year;
    console.log("ici la data : ", data);
    return (
      <Fiche_intervention
        key={i}
        lastName={data.patient.lastName}
        firstName={data.patient.firstName}
        departure={data.departure}
        arrival={data.arrival}
        date={date}
      />
    );
  });
  console.log(interventions.vehicule);

  function back() {
    navigation.navigate("Véhicules");
    dispatch(removeInterPlaque());
    console.log("retour la page précédente", interventions);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => back()}>
        <Text style={styles.plaque}>{plaque}</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.txt}> Interventions </Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.inter}>{interventionsDisplay}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "black",
  },
  plaque: {
    top: 100,
    marginLeft: 20,
    color: "white",
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
  input: {
    width: "100%",
    top: 150,
    height: 150,
    color: "black",
  },
  inter: {
    color: "black",
  },
});
