import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import FicheAddVehicule from "../components/Fiche_AddVehicule";

export default function AddVehiculesScreen () {
    return (
        <LinearGradient
        style={styles.container}
        colors={["#1a2755", "#9b84ad"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <FicheAddVehicule screenName={'Véhicules'} />
      </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    }
})