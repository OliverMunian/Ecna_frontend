import { StyleSheet, Text, View } from 'react-native'

export default function MapScreen() {


  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Text>Bienvenue sur le dashboard</Text>
      <Text  style={styles.txt}>En cours </Text>
      <Text style={styles.txt}>Anomalies</Text>
      <Text style={styles.txt}>A venir</Text>
      <Text style={styles.txt}>SAMU</Text>

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
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'white',
  },
});
