import { StyleSheet, Text, View, TextInput, Button} from 'react-native'
import { TouchableOpacity } from 'react-native';

export default function SubscribeScreen() {


  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.maintitle}>Inscription</Text>
        </View>
        <View style={styles.formulaire}>
          <View style={styles.divinput}>
              <Text style={styles.txt}>Nom d'utilisateur</Text>
              <TextInput style={styles.input} placeholder="Nom d'utilisateur" placeholderTextColor='black'/>
          </View>
          <View style={styles.divinput}>
              <Text style={styles.txt}>Adresse mail</Text>
              <TextInput style={styles.input} placeholder="Adresse mail" placeholderTextColor='black'/>
          </View>
          <View style={styles.divinput}>
              <Text style={styles.txt}>Type de véhicule</Text>
              <TextInput style={styles.input} placeholder="Type de véhicule" placeholderTextColor='black'/>
          </View>
          <View style={styles.divinput}>
              <Text style={styles.txt}>N° de téléphone</Text>
              <TextInput style={styles.input} placeholder="N° de téléphone" placeholderTextColor='black'/>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntxt}> Valider </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  title:{
    width:'100%',
    alignItems:'flex-start'
  },
  maintitle:{
    color: 'white',
    fontSize:25,
    fontWeight:'bold'
  },
  formulaire:{
    width:'100%',
    top: 40,
    alignItems:'center',
    justifyContent:'center'
  },
  divinput:{
    color: 'white',
    width: '80%',
    borderColor:'white',
    height: 20,
    marginBottom:100,
  },
  txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
  },
  input:{
    borderWidth: 1,
    borderColor:'white',
    width: '100%',
    color:'white',
    padding: 20,
    borderRadius:10,
    backgroundColor:'#a19999',
    marginTop: 5
  },
  btn:{
    width:130,
    height:60,
    backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    borderWidth: 1,
    borderColor:'white'
  },
  btntxt:{
    color:'white'
  },
});
