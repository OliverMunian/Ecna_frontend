import { useState } from 'react';
import { StyleSheet, Text, View , TextInput, TouchableOpacity} from 'react-native';

export default function Formulaire_interventions() {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [adress,setAdress] = useState('')
    const [SSnumber,setSSnumber] = useState(Number())
    const [phone,setPhone] = useState(Number())
    const [mutuelle,setMutuelle] = useState('')
    const [valide,setValide] = useState(false)
    const [existe,setExiste] = useState(false)
    const [error, setError] = useState('')
    
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
                setFirstName(patientData.patient.firstName)
                setLastName(patientData.patient.lastName)
                setAdress(patientData.patient.adress)
                setSSnumber(patientData.patient.SSnumber)
                setPhone(patientData.patient.phone)
                setMutuelle(patientData.patient.mutuelle)
            }else{
                setError(data.error)
            }
        })
        // fetch(`${BACKEND_ADRESS}/add`,{
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({existe})
        // })
        // .then(response => response.json())
        // .then(data =>{
        // if(data.result){
        // dispatch((name))
        // }
        // })
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
        keyboardType="numeric"
        onChangeText={(value) => setSSnumber(value)}
        value={SSnumber}
      />
      <TouchableOpacity onPress={() => handlesearch(SSnumber)} style={styles.search}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="phone"
        keyboardType="numeric"
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
        placeholder="mutuelle"
        onChangeText={(value) => setMutuelle(value)}
        value={mutuelle}
      />

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
        color:'white'
    }
})