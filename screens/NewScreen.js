import { StyleSheet, Text, View } from 'react-native'
import Formulaire_interventions from '../components/Formulaire_intervention';

export default function NewScreen() {


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Formulaire_interventions/>
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
