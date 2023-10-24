import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import FicheVehicule from '../components/Fiche_Vehicule';
import GV from "../assets/grosVolume.jpg"
import MV from '../assets/moyenVolume.jpg'
import VSLsrc from '../assets/VSL.jpg'

const GVuri = Image.resolveAssetSource(GV).uri
const MVuri = Image.resolveAssetSource(MV).uri
const VSLuri = Image.resolveAssetSource(VSLsrc).uri
const imagesData = {grosVolume:GVuri,moyenVolume:MVuri,VSL:VSLuri}


export default function MapScreen() {

const [vehicules,setVehicules] = useState([])
const BACKEND_ADRESS = 'http://10.3.0.13:3000'
const SIREN = useSelector((state) => state.user.value.SIREN)

// Récupération des données des véhicules associées au SIREN du user connecté
useEffect(() => {
  fetch(`${BACKEND_ADRESS}/vehicules/${SIREN}`)
  .then(response => response.json())
  .then(vehiculesData => {
    // console.log(vehiculesData.vehicules)
    setVehicules(vehiculesData.vehicules)
  })
},[])

// Création des elements JSX 
const vehiculesDisplay = vehicules.map((data,i) => {
  if(data.etat === 'En ligne'){
    return <FicheVehicule key={i} plaque={data.plaque} etat={data.etat} color='green' type={imagesData[data.type]} />
  } else if (data.etat === 'En cours d\'intervention'){
    return <FicheVehicule key={i} plaque={data.plaque} etat={data.etat} color='orange' type ={imagesData[data.type]}/>
  } else if (data.etat === 'Indisponible'){
    return <FicheVehicule key={i} plaque={data.plaque} etat={data.etat} color='red' type={imagesData[data.type]}/>
  } else if (data.etat === 'Hors ligne'){
    return <FicheVehicule key={i} plaque={data.plaque} etat={data.etat} color='black' type={imagesData[data.type]}/>
  }
})

  return (
    <View style={styles.container}>
      <View style={styles.titreBox}>
      <Text style={styles.titre}>
         Véhicules
      </Text>
      </View>
      <View style={styles.box}>
      {vehiculesDisplay}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'black',
  },
  titre:{
    color:'white',
    fontSize : 34,
    marginLeft:20,
  },
  titreBox : {
    flex:1/10,
    marginTop : 30,
    marginBottom:5,
  }
});
