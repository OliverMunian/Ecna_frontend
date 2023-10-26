import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Fiche_intervention from "../components/Fiche_intervention";

export default function InterventionsScreen() {
  const [interventions, setInerventions] = useState([]);
  const BACKEND_ADRESS = "http://10.3.0.23:3000";

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/interventions/find`)
      .then((response) => response.json())
      .then((allInterventions) => {
        console.log(allInterventions);
        setInerventions(allInterventions.Intervention);
      });
  }, []);
  const intervention = interventions.map((inter, i) => {
    const day = new Date(inter.date).getDate();
    const month = new Date(inter.date).getMonth();
    const year = new Date(inter.date).getFullYear();
    let date = month + "/" + day + "/" + year;
    if (inter.vehicule === null) {
      return (
        <Fiche_intervention
          key={i}
          lastName={inter.patient.lastName}
          firstName={inter.patient.firstName}
          departure={inter.departure}
          arrival={inter.arrival}
          date={date}
          dispatched={inter.vehicule}
        />
      );
    } else
      return (
        <Fiche_intervention
          key={i}
          lastName={inter.patient.lastName}
          firstName={inter.patient.firstName}
          departure={inter.departure}
          arrival={inter.arrival}
          date={date}
          plaque={inter.vehicule.plaque}
          vehicule={inter.vehicule}
        />
      );
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interventions</Text>
      <View style={styles.line} />
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        overScrollMode="never"
      >
        {intervention}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 35,
    marginTop: 130,
    marginLeft: 10,
    fontWeight: "bold",
    fontStyle:'italic',
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
