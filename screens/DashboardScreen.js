import { StyleSheet, Text, View, TouchableOpacity,Alert , Image, ScrollView} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect , useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { defineListVehicules } from "../reducers/vehicules";
import VehiculeDashBoard from "../components/VehiculeDashBoard";
import GV from "../assets/grosVolume.png"
import MV from '../assets/moyenVolume.png'
import VSLsrc from '../assets/VSL.png'


export default function DashboardScreen() {
const dispatch = useDispatch();
const vehicules = useSelector((state) => state.vehicules.value)
const [vehiculesDispo,setVehiculesDispo] = useState([])
const BACKEND_ADRESS = 'http://10.3.0.43:3000'
const SIREN  = useSelector((state) => state.user.value.SIREN)
const GVuri = Image.resolveAssetSource(GV).uri
const MVuri = Image.resolveAssetSource(MV).uri
const VSLuri = Image.resolveAssetSource(VSLsrc).uri
const imagesData = {Gros:GVuri,Moyen:MVuri,VSL:VSLuri}

// A l'initialisation du dashboard, dispatch de l'ensemble des véhicules correspondant au SIREN dans le reducer user
useEffect(() => {
  fetch(`${BACKEND_ADRESS}/vehicules/${SIREN}`)
  .then(response => response.json())
  .then(data => {
    if(data.result){
      dispatch(defineListVehicules(data.vehicules))
      setVehiculesDispo(data.vehicules.filter(e => e.etat === 'En ligne'))
    }
  })
},[])

const vehiculesDispoDisplay = vehiculesDispo.map((data,i) => {
  return (<VehiculeDashBoard key={i} type={imagesData[data.type]} plaque={data.plaque} />)
})

function next(){
    Alert.alert("Oups !", "Aucun véhicule a afficher pour le moment !")
    // alert('Aucun véhicule poour le moment')
  }


  return (
    <View style={styles.container}>
      <View style={styles.maintitle}>
        <Text style={styles.h1}> Votre activité </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.title}>
          <FontAwesome name="spinner" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}>En cours </Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Anomalies </Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="forward" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> Ultérieures</Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
        <View style={styles.title}>
          <FontAwesome name="" size={(fontSize = 25)} color="#0c2ce7" />
          <View style={styles.divtxt}>
            <Text style={styles.txt}> SAMU</Text>
            <FontAwesome name="" size={(fontSize = 25)} color="grey" />
          </View>
        </View>
      </View>
      <View style={styles.available}>
        <View style={styles.secondtitle}>
          <Text style={styles.h2}> Véhicules disponibles </Text>
        </View>
      </View>
      <ScrollView style={styles.vehicles}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        endFillColor="#000"
        >
        {vehiculesDispoDisplay}
      </ScrollView>
      <View style={styles.lecteur}>
        <View style={styles.encours}>
        </View>
        <View style={styles.suivant}>
          <TouchableOpacity onPress={() =>next()}>
            <FontAwesome name="forward" size={(fontSize = 25)} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  box: {
    width: "100%",
    height: "100%",
    left: 15,
    top: 110,
    height: 300,
  },
  maintitle: {
    top: 100,
    fontSize: 55,
    fontWeight: "bold",
    left: 10,
    width: "90%",
  },
  h1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 20,
  },
  divtxt: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderBottomColor: "grey",
    borderWidth: 1,
    marginLeft: 15,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 5,
  },
  available: {
    width: "100%",
    left: 15,
    top: 80,
    // borderBottomColor: "grey",
    borderWidth: 1,
  },
  h2: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  vehicles: {
    width: "100%",
    top: 100,
    height: 150,
    borderWidth: 1,
    flexDirection:'row'
  },
  onevehicle: {
    width: "45%",
    height: 140,
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 20,
  },
  lecteur: {
    flexDirection: "row",
    top: 145,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    marginLeft: "2.5%",
  },
  encours: {
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  suivant: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
});
