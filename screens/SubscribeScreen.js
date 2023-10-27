import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from "react-native";
import AddVehiculesScreen from "./AddVehiculesScreen";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import background from '../assets/ambulance.jpg'

export default function SubscribeScreen({ navigation }) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const BACKEND_ADRESS = "http://10.3.0.13:3000";
  function Subscribe() {
    navigation.navigate("AddVehicule");
    fetch(`${BACKEND_ADRESS}/users/signup`, {
      method:'POST',
      headers:{'Content-type' : 'application/json'},
      body : JSON.stringify({username:username,password:password, email:email})
    })
    .then(response => response.json())
    .then(data => {
      if(data.result){
        dispatch(addtokenToSotre(data.token))
        dispatch(addSirenToSotre(data.SIREN))
        navigation.navigate('AddVehicule');
      } else {
        setErrorMessage(data.error)
      }
    })
  }

  const navigate = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.image} blurRadius={1}>
      <View style={styles.title}>
          <Text style={styles.maintitle}>Inscription</Text>
        </View>
      <View style={styles.titleprevious}>
        <TouchableOpacity
          onPress={() => {
            navigate();
          }}
        >
          <Text style={styles.previous}>Accueil</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.div}>
      <Text style={styles.titleform}>Bienvenue sur Ecna</Text>
      <Text style={styles.titleformun}>Veuillez compléter le formulaire pour continuer</Text>
        <View style={styles.formulaire}>
          <View style={styles.divinput}>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="black"
              onChangeText={(value) => setUserName(value)}
              value={username}
            />
          </View>
          <View style={styles.divinput}>
            <TextInput
              style={styles.input}
              placeholder="Adresse mail"
              placeholderTextColor="black"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
          </View>
          <View style={styles.divinput}>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              placeholderTextColor="black"
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
          </View>
          <View style={styles.line}></View>
          <View style={styles.divinput}>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'entreprise"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.divinput}>
            <TextInput
              style={styles.input}
              placeholder="N° de SIREN"
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => Subscribe()}>
            <Text style={styles.btntxt}> Valider </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems:'center',
    width: "100%",
  },
  image:{
    width:"100%",
    height: '85%',
    top:-250,
  },
  title:{
    alignItems:'center',
    justifyContent:'center',
  },
  maintitle:{
    top:300,
    color:'white',
    fontSize:55,
    fontWeight:'bold',
  },
  div:{
    borderTopLeftRadius:200,
    width:'100%',
    height:'80%',
    backgroundColor:'white',
    top:350,
    justifyContent:'center',
    alignItems:'center',
  },
  titleform: {
    color: "black",
    fontWeight: "bold",
    fontSize:30,
  },
  titleformun:{
    color: "black",
    fontStyle: "italic",
    fontSize:10,
    marginBottom:20,
  },
  formulaire:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  divinput:{
    width: '70%',
    height:40,
    borderRadius:20,
    margin:10,
  },
  input:{
    backgroundColor:'#3f6b9d',
    height:40,
    borderRadius:20,
    placeholderTextColor:'white',
    textAlign:'left',
    paddingLeft:10,
  },
  btn:{
    borderWidth:2,
    borderRadius:20,
    width:'20%',
    alignItems:'center',
    padding:10,
    marginTop:20,
  },
  btntxt:{
    fontWeight:'bold',
  }
});
