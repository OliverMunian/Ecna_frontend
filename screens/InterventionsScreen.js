import { StyleSheet, Text, View } from 'react-native'

export default function InterventionsScreen() {


  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Text>Bienvenue sur la page des interventions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
  },
});
