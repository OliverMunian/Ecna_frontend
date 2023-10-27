import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Patient(props) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text style={styles.txt}>
            {props.lastName} {props.firstName}
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "left",
    marginLeft: 15,
    justifyContent: "flex-start",
    width: "100%",
  },
  box: {
    width: "90%",
    top: 40,
    marginBottom: 25,
    borderRadius:10,
    borderWidth:1,
    borderColor:'grey',
    borderWidth: 1,
    paddingTop:5,
    paddingBottom:5,
  },
  txt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft:10,
  },
});
