import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fiche_intervention from "../components/Fiche_intervention";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
import { defineListInter } from "../reducers/interventions";
import { LinearGradient } from "expo-linear-gradient";

export default function InterventionsScreen() {
  const dispatch = useDispatch()
  const BACKEND_ADRESS = "http://10.3.0.13:3000";
  const [dispatchedVehicules , setDispatchedVehicules] = useState ([])
  
  const user = useSelector((state) => state.user.value)
  const interventions = useSelector((state) => state.interventions.value)
  console.log('interventions',interventions)

  // Import images ambulance
  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

  // Récupération des interventions du back et dispatch dans le reducer
  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/interventions/${user.SIREN}`)
      .then((response) => response.json())
      .then((interData) => {
        dispatch(defineListInter(interData.interventions));
      });
  }, []);
  
  const selectDispatch = (dispatchedVehicule) => {
    setDispatchedVehicules((prevDispatchedVehicules) => [
      ...prevDispatchedVehicules,
      dispatchedVehicule,
    ]);
  };
  console.log(dispatchedVehicules);
  const displayInterventions = interventions.map((inter, i) => {
    // Mise en format de la date
    const day = new Date(inter.date).getDate();
    const month = new Date(inter.date).getMonth();
    const year = new Date(inter.date).getFullYear();
    let date = month + "/" + day + "/" + year;
    // Création des elements JSX avec le composant
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
          selectDispatch={selectDispatch}
        />
      );
    } else {
      return (
        <Fiche_intervention
          key={i}
          lastName={inter.patient.lastName}
          firstName={inter.patient.firstName}
          departure={inter.departure}
          arrival={inter.arrival}
          date={date}
          dispatched={inter.vehicule}
          plaque={inter.vehicule.plaque}
          type={imagesData[inter.vehicule.type]}
        />
      );
    }
  });

  return (
    <LinearGradient
    style={styles.container}
    colors={["#1a2755", "#9b84ad"]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
  >
      <Text style={styles.title}>Interventions</Text>
      <View style={styles.line} />
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        overScrollMode="never"
      >
        {displayInterventions}
      </ScrollView>
   </LinearGradient>
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
    fontStyle: "italic",
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
