import { StyleSheet, Text, View } from 'react-native'
import Fiche_intervention from '../components/Fiche_intervention';

export default function InterventionsScreen() {


  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Fiche_intervention/>
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
