import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";


export default function carouselDashboard(props) {
  // Récupération des assets
  const imagesData = { Gros: GVuri, Classique: MVuri, VSL: VSLuri };
  const vehiculesDispo = useSelector((state) => state.vehiculesDispo.value);

  // Message à afficher dans le cas ou aucun véhicule n'est associé au compte
  if (vehiculesDispo.length === 0) {
    return (
      <View>
        <Text style={styles.errorText}>Pas de vehicules disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 200,
    height: 200,
  },
  errorText: {
    color: 'white',
    fontSize : 20
  }
});
