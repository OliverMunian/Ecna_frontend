import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtokenToSotre , addSirenToSotre } from "../reducers/user";

export default function SubscribeScreen({ navigation }) {
  const BACKEND_ADRESS = "http://10.3.0.43:3000";
  const dispatch = useDispatch()

  // Mise en place états liés aux input
  const [username,setUserName] = useState(null)
  const [password,setPassWord] = useState(null)
  const [email,setEmail] = useState(null)
  const [name,setName] = useState(null)
  const [SIREN,setSIREN] = useState(null)

 // Fonction à déclencher lors de l'appui sur le bouton valider afin de créer un document user et un document entreprise + les lier
  function Subscribe() {
    navigation.navigate("AddVehicule");
    fetch(`${BACKEND_ADRESS}/users/signup`, {
      method:'POST',
      headers:{'Content-type' : 'application/json'},
      body : JSON.stringify({username:username,password:password, email:email, name : name , SIREN : SIREN})
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

// Fonction qui permet de revenir vers l'ecran d'acceuil 
  const navigate = () => {
    navigation.navigate("Home");
  };


  return (
    <View style={styles.container}>
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
        <View style={styles.title}>
          <Text style={styles.maintitle}>Inscription</Text>
        </View>
        <View style={styles.formulaire}>
          <View style={styles.divinput}>
            <Text style={styles.txt}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="black"
              onChangeText={(value) => setUserName(value)}
              value = {username}
            />
          </View>
          <View style={styles.divinput}>
            <Text style={styles.txt}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse mail"
              placeholderTextColor="black"
              onChangeText={(value)=> setEmail(value)}
              value = {email}
            />
          </View>
          <View style={styles.divinput}>
            <Text style={styles.txt}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              placeholderTextColor="black"
              onChangeText={(value) => setPassWord(value)}
              value = {password}
            />
          </View>
          <View style={styles.line}></View>
          <View style={styles.divinput}>
            <Text style={styles.txt}>Nom de l'entreprise</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'entreprise"
              placeholderTextColor="black"
              onChangeText={(value)=>setName(value)}
              value = {name}
            />
          </View>
          <View style={styles.divinput}>
            <Text style={styles.txt}>N° de SIREN</Text>
            <TextInput
              style={styles.input}
              placeholder="N° de SIREN"
              placeholderTextColor="black"
              onChangeText={(value)=>setSIREN(value)}
              value = {SIREN}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => Subscribe()}>
            <Text style={styles.btntxt}> Valider </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    width: "100%",
  },
  titleprevious: {
    top: -55,
    left: 20,
  },
  previous: {
    left: 0,
    color: "white",
    fontWeight: "bold",
  },
  div: {
    width: "100%",
  },
  title: {
    left: 20,
    width: "100%",
    alignItems: "flex-start",
  },
  maintitle: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
  },
  formulaire: {
    width: "100%",
    top: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  divinput: {
    color: "white",
    width: "80%",
    borderColor: "white",
    height: 20,
    marginBottom: 60,
  },
  txt: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    color: "black",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#a19999",
    marginTop: 5,
  },
  btn: {
    width: 130,
    height: 60,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  btntxt: {
    color: "white",
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#a19999",
    height: 0.5,
    width: "85%",
    marginBottom: 10,
  },
});
