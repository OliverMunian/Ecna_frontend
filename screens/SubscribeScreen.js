import { StyleSheet, Text, View, TextInput} from 'react-native'

export default function SubscribeScreen() {


  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text>Inscription</Text>
        </View>
        <View style={styles.divinput}>
            <Text style={styles.txt}>Nom d'utilisateur</Text>
            <TextInput placeholder="Nom d'utilisateur"/>
        </View>
        <View style={styles.divinput}>
            <Text style={styles.txt}>Adresse mail</Text>
            <TextInput placeholder="Adresse mail"/>
        </View>
        <View style={styles.divinput}>
            <Text style={styles.txt}>Type de véhicule</Text>
            <TextInput placeholder="Type de véhicule"/>
        </View>
        <View style={styles.divinput}>
            <Text style={styles.txt}>N° de téléphone</Text>
            <TextInput placeholder="N° de téléphone"/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  divinput:{
    color: 'white',
  },
  txt:{
    color:'white',
  },
});
