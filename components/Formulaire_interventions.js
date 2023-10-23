import { useState } from 'react';
import { StyleSheet, Text, View , TextInput, TouchableOpacity} from 'react-native';

export default function Formulaire_interventions() {

    const [firstName,setFirstName] = useState(null)
    const [lastName,setLastName] = useState(null)
    const [adress,setAdress] = useState(null)
    const [SSnumber,setSSnumber] = useState(null)
    const [phone,setPhone] = useState(null)
    const [mutuelle,setMutuelle] = useState(null)
    const [valide,setValide] = useState(null)
    const [existe,setExiste] = useState(false)
    const [Departure, setDeparture] = useState(null)
    const [Arrival, setArrival] = useState(null)
    const [error, setError] = useState(null)

    const BACKEND_ADRESS = 'http://10.3.0.13:3000'

    const handlesearch = (SSnumber) => {
        fetch(`${BACKEND_ADRESS}/patients/verify`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({SSnumber: SSnumber})
            })
            .then(response => response.json())
            .then(patientData =>{
            if(patientData.result){
                console.log(setValide(patientData.patient.valide))
                setFirstName(patientData.patient.firstName)
                setLastName(patientData.patient.lastName)
                setAdress(patientData.patient.adress)
                setSSnumber(patientData.patient.SSnumber)
                setPhone(patientData.patient.phone)
                setMutuelle(patientData.patient.mutuelle)
                setValide(patientData.patient.valide)
                setExiste(true)
            }else{
                setError(patientData.error)
            }
        })
    }
    const handleSubmit = () => {
        console.log(existe)
        fetch(`${BACKEND_ADRESS}/interventions/add`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
        {existe: existe, firstName:firstName, 
        lastName: lastName, adress: adress, SSnumber: SSnumber, 
        mutuelle: mutuelle ,valide: valide, phone: phone,
        departure: Departure, arrival: Arrival})
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
    }  
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="firstName"
        onChangeText={(value) => setFirstName(value)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        onChangeText={(value) => setLastName(value)}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="adress"
        onChangeText={(value) => setAdress(value)}
        value={adress}
      />
      <TextInput 
        style={styles.input}
        placeholder="SSnumber"
        onChangeText={(value) => setSSnumber(value)}
        value={SSnumber}
      />
      <TouchableOpacity onPress={() => handlesearch(SSnumber)} style={styles.search}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="phone"
        onChangeText={(value) => setPhone(value)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="valide"
        onChangeText={(value) => setValide(value)}
        value={valide}
      />
      <TextInput
        style={styles.input}
        placeholder="Departure"
        onChangeText={(value) => setDeparture(value)}
        value={Departure}
      />
      <TextInput
        style={styles.input}
        placeholder="Arrival"
        onChangeText={(value) => setArrival(value)}
        value={Arrival}
      />
      <TextInput
        style={styles.input}
        placeholder="mutuelle"
        onChangeText={(value) => setMutuelle(value)}
        value={mutuelle}
      />
      <TouchableOpacity style={styles.search} onPress={()=> handleSubmit()}>
        <Text>Submit</Text>
      </TouchableOpacity>
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
    search:{
        backgroundColor:'white'
    },
    input:{
        flex:1,
        backgroundColor:'white',
        color:'black'
    }
})