import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { defineListInter } from "../reducers/interventions";
import { defineListPatients } from "../reducers/listPatients";

export default function Formulaire_interventions({ navigation }) {
  const BACKEND_ADRESS = "http://10.3.0.43:3000";
  const dispatch = useDispatch();
  // Recuperation des informations du user du reducer
  const user = useSelector((state) => state.user.value);

  // Etats relatif aux inputs du formulaire
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [adress, setAdress] = useState(null);
  const [SSnumber, setSSnumber] = useState(null);
  const [phone, setPhone] = useState(null);
  const [mutuelle, setMutuelle] = useState(null);
  const [valide, setValide] = useState(null);
  const [existe, setExiste] = useState(false);
  const [Departure, setDeparture] = useState(null);
  const [Arrival, setArrival] = useState(null);
  const [error, setError] = useState(null);
  const [errorStyle, setErrorStyle] = useState({});

  // Fonction qui se declenche lors du clique sur Search pour permettre de vérifier s'il existe un patient avec ce numero de securité
  // sociale dans la BDD, si oui préremplir les champs dédiés aux informations patients, si non renvoyer un message d'erreur
  const handlesearch = (SSnumber) => {
    fetch(`${BACKEND_ADRESS}/patients/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SSnumber: SSnumber }),
    })
      .then((response) => response.json())
      .then((patientData) => {
        if (patientData.result) {
          setFirstName(patientData.patient.firstName);
          setLastName(patientData.patient.lastName);
          setAdress(patientData.patient.adress);
          setSSnumber(patientData.patient.SSnumber);
          setPhone(patientData.patient.phone);
          setMutuelle(patientData.patient.mutuelle);
          setValide(patientData.patient.valide);
          setExiste(true);
          navigation.navigate("TabNavigator");
        } else {
          setError(patientData.error);
          setErrorStyle({ color: "white", fontSize: 10 });
        }
      });
  };

  // Fonction qui se declenche lors du clique sur le bouton submit qui ajoute si necessaire le patient dans la BDD, et l'intervention quoi
  // qu'il arrive. Permet également de récuperer la liste des interventions/patients et de mettre à jour le reducer
  const handleSubmit = () => {
    // add inter/patient
    fetch(`${BACKEND_ADRESS}/interventions/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        existe: existe,
        firstName: firstName,
        lastName: lastName,
        adress: adress,
        SSnumber: SSnumber,
        mutuelle: mutuelle,
        valide: valide,
        phone: phone,
        departure: Departure,
        arrival: Arrival,
        SIREN: user.SIREN,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // mise à jour du reducer interventions
        fetch(`${BACKEND_ADRESS}/interventions/${user.SIREN}`)
          .then((response) => response.json())
          .then((interData) => {
            if (interData.result) {
              dispatch(defineListInter(interData.interventions));
            }
        // mise à jour du reducer patients
          })
          .then(() => {
            fetch(`${BACKEND_ADRESS}/patients/all/${user.token}`)
              .then((response) => response.json())
              .then((patientData) => {
                if (patientData.result) {
                  dispatch(defineListPatients(patientData.patients));
                }
              });
          });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Creation Intervention</Text>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="black"
          onChangeText={(value) => setFirstName(value)}
          value={firstName}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="black"
          onChangeText={(value) => setLastName(value)}
          value={lastName}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Adresse</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          placeholderTextColor="black"
          onChangeText={(value) => setAdress(value)}
          value={adress}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Sécurité Sociale</Text>
        <View style={styles.divplaceholder}>
          <TextInput
            style={styles.inputplaceholder}
            placeholder="Sécurité Sociale"
            placeholderTextColor="black"
            onChangeText={(value) => setSSnumber(value)}
            value={SSnumber}
          />
          <View>
            <TouchableOpacity
              onPress={() => handlesearch(SSnumber)}
              style={styles.search}
            >
              <Text style={styles.txt}>Search</Text>
            </TouchableOpacity>
            <Text style={errorStyle}>{error}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          placeholderTextColor="black"
          onChangeText={(value) => setPhone(value)}
          value={phone}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Patient Valide</Text>
        <TextInput
          style={styles.input}
          placeholder="Valide"
          placeholderTextColor="black"
          onChangeText={(value) => setValide(value)}
          value={valide}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Départ</Text>
        <TextInput
          style={styles.input}
          placeholder="Départ"
          placeholderTextColor="black"
          onChangeText={(value) => setDeparture(value)}
          value={Departure}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Arrivée</Text>
        <TextInput
          style={styles.input}
          placeholder="Arrivée"
          placeholderTextColor="black"
          onChangeText={(value) => setArrival(value)}
          value={Arrival}
        />
      </View>
      <View style={styles.divinput}>
        <Text style={styles.txt}>Mutuelle</Text>
        <TextInput
          style={styles.input}
          placeholder="Mutuelle"
          placeholderTextColor="black"
          onChangeText={(value) => setMutuelle(value)}
          value={mutuelle}
        />
      </View>
      <TouchableOpacity style={styles.search} onPress={() => handleSubmit()}>
        <Text style={styles.txt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  titre: {
    marginTop: 50,
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  search: {
    width: 100,
    height: 40,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
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
  txt: {
    color: "white",
  },
  divinput: {
    color: "white",
    width: "80%",
    borderColor: "white",
    height: 20,
    marginBottom: 60,
  },
  divplaceholder: {
    marginTop: 5,
    flexDirection: "row",
    width: "80%",
  },
  inputplaceholder: {
    borderRadius: 10,
    backgroundColor: "#a19999",
    color: "black",
    width: "80%",
    borderColor: "white",
    height: 40,
    marginBottom: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});
