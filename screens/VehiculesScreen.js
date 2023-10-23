import { StyleSheet, Text, View } from 'react-native';
import { useEffect,useState } from 'react';


export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Text style={styles.txt}>Bienvenue sur la page des vehicules</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'black',
    color:'white',
  },
  txt:{
    color:'white'
  }
});
