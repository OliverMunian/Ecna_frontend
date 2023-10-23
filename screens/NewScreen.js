import { StyleSheet, Text, View } from 'react-native'

export default function MapScreen() {


  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Text>Bienvenue sur le page pour demarrer une nouvelle intervention</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height:'100%',
    backgroundColor:'black',
  },
  box: {
    flex: 1,
    width: '100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backGroundColor:'#000000',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
