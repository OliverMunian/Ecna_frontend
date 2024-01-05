import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PinCode from "../components/PinCode";

export default function CodePin() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.6, y: 0.7 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.title}>
        <Text style={styles.txt}>Saisissez le code</Text>
      </View>
      <View>
        <PinCode />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    marginBottom: 100,
  },
  txt: {
    fontSize: 20,
    color: "white",
  },
});
