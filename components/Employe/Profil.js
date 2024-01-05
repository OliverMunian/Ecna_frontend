import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector } from "react-redux";


export default function profilConnexion(props) {
  const img = require("../../assets/Unknown.jpg");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={img} resizeMode="cover" />
      <Text style={styles.txt}> {props.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius:'50%',
    justifyContent:'center',
    alignItems: 'center',
    margin:10,
  },
  image:{
    borderRadius:'100%',
    width: 100,
    height: 100,
  },
  txt:{
    color:'white',
    fontSize:20,
  },
});
