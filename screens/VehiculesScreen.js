import { StyleSheet, Text, View } from 'react-native';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';


export default function MapScreen() {

const [vehicules,setVehicules] = useState([])
const BACKEND_ADRESS = 'http://10.3.0.43:3000'
const SIREN = useSelector((state) => state.user.value.SIREN)

// Récupération des données des véhicules associées au SIREN du user connecté
useEffect(() => {
  fetch(`${BACKEND_ADRESS}/vehicules/${SIREN}`)
  .then(response => response.json())
  .then(vehiculesData => {
    console.log(vehiculesData)
    setVehicules(vehiculesData.vehicules)
  })
},[])
// Création des elements JSX 
const vehiculeDisplay = vehicules.map((data,i) => {
  return <View key={i} style={styles.vehicule}>
    <Text style={styles.vehiculestxt}>
      {data.plaque}
      </Text>
      <Text style={styles.vehiculestxt}>
      {data.etat}
      </Text>
    
  </View>
})
console.log(vehicules)

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Text style={styles.txt}>Bienvenue sur la page des vehicules</Text>
      <View style={styles.vehiculeBox}>
      {vehiculeDisplay}
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'black',
    color:'white',
  },
  txt:{
    color:'white'
  },
  vehiculestxt:{
    color:'black',
    justifyContent:'space-between'
  },
  vehicule:{
    height:40,
    width:'80%',
    backgroundColor:'white',
  },
  vehiculeBox:{
    flexDirection:'row',
  }
});
