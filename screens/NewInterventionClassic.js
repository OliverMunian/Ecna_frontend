import { StyleSheet, Text, View } from "react-native";
import Formulaire_intervention from "../components/Formulaire_intervention";
import { LinearGradient } from "expo-linear-gradient";

export default function NewScreen() {
  return (
    <LinearGradient
    style={styles.container}
    colors={["#1a2755", "#1D94AE"]}
    start={{ x: 0.5, y: 0.5 }}
    end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.box}>
        <Formulaire_intervention screenName={"UserNavigator"} />
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
  box: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backGroundColor: "#000000",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
