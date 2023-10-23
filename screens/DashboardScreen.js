import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.maintitle}>
        <Text style={styles.h1}> Votre activité </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.title}>
          <FontAwesome name="spinner" size="25" color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}>En cours </Text>
            <FontAwesome name='' size="25" color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size="25" color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Anomalies </Text>
            <FontAwesome name="" size="25" color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="forward" size="25" color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Ultérieures</Text>
            <FontAwesome name="" size="25" color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size="25" color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> SAMU</Text>
            <FontAwesome name="" size="25" color="grey" />
          </View>
        </View>
      </View>
      <View style={styles.available}>
        <View style={styles.secondtitle}>
          <Text style={styles.h2}> Véhicules disponibles </Text>
        </View>
      </View>
    </View>
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
    width: "100%",
    height: "100%",
    left: 30,
    top: 110,
    borderColor: "red",
    borderWidth: 1,
    height: 300,
  },
  maintitle: {
    top: 100,
    fontSize: 55,
    fontWeight: "bold",
    left: 10,
    width: "90%",
  },
  h1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
  },
  divtxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderBottomColor: "grey",
    borderWidth: 1,
    marginLeft: 15,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 5,
  },
  available: {
    width: "100%",
    top: 0,
  },
  h2: {
    fontSize: 25,
    color: "white",
  },
});
