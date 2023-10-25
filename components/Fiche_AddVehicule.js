import { View , Text , TextInput , TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import FicheVehicule from "./Fiche_Vehicule";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'
import GV from "../assets/grosVolume.png"
import MV from '../assets/moyenVolume.png'
import VSLsrc from '../assets/VSL.png'
import { defineListVehicules } from "../reducers/vehicules";
import { useDispatch } from "react-redux";


export default function FicheAddVehicule ({screenName}) {
const navigation = useNavigation()
const dispatch = useDispatch()
// Import des images des assets et création de l'objet permettant de les dispatch
const GVuri = Image.resolveAssetSource(GV).uri
const MVuri = Image.resolveAssetSource(MV).uri
const VSLuri = Image.resolveAssetSource(VSLsrc).uri
const imagesData = {Gros:GVuri,Moyen:MVuri,VSL:VSLuri}

const BACKEND_ADRESS = 'http://10.3.0.43:3000'

// Definition des possibilités des menus déroulants
const types = ['Gros', 'Moyen', 'VSL']
const etats = ['En ligne','Hors ligne','Indisponible']

// Setup des etats qui stockeront la data recuperée des champs input/menus
const [vehicules,setVehicules] = useState([])
const [plaque,setPlaque] = useState(null)
const [type,setType] = useState(null)
const [etat,setEtat] = useState(null)

const user = useSelector((state) => state.user.value)
const SIREN  = useSelector((state) => state.user.value.SIREN)

// Fonction qui se declenche lors du clique sur le bouton 'Ajouter' afin de sauvegarder le vehicule en BDD et l'afficher sur la page
// grace à l'etat vehicules + reset des champs/etats dans le cas ou la sauvegarde est réussie en back
const handleAdd = () => {
    fetch(`${BACKEND_ADRESS}/vehicules/add` , {
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({plaque:plaque,type:type,etat:etat,SIREN:user.SIREN})
    })
    .then(response=>response.json())
    .then(data => {
        if(data.result){
            setVehicules([...vehicules,{plaque:plaque,type:type,etat:etat}])
            setPlaque('')
        }
    })
}

const handleNext = () => {
    fetch(`${BACKEND_ADRESS}/vehicules/${SIREN}`)
    .then(response => response.json())
    .then(data => {
      if(data.result){
        dispatch(defineListVehicules(data.vehicules))
      }
    })
    navigation.navigate(screenName)
}

// Création des elements JSX à partir du composant Fichevehicule
const vehiculesDisplay = vehicules.map((data,i) => {
    if(data.etat === 'En ligne'){
        return (<FicheVehicule key={i} plaque={data.plaque} etat={data.etat} type={imagesData[data.type]} color='green'/>)
    } else if(data.etat === 'Hors ligne'){
        return (<FicheVehicule key={i} plaque={data.plaque} etat={data.etat} type={imagesData[data.type]} color='orange'/>)
    } else if(data.etat === 'Indisponible'){
        return (<FicheVehicule key={i} plaque={data.plaque} etat={data.etat} type={imagesData[data.type]} color='red'/>)
    }
})
    return (
        <View style={styles.container}>
            <View style={styles.vehicules}>
               {vehiculesDisplay}
            </View>
            <View style={styles.formulaire}>
                <Text style={styles.txt}>Plaque</Text>
                    <TextInput style={styles.input} onChangeText={(value) => setPlaque(value)} value={plaque}/>
                <Text style={styles.txt}>Type</Text>
                    <SelectDropdown
                        data={types}
                        onSelect={(selectedItem,index) => {
                            setType(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem,index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item,index) => {
                            return item
                        }}
                    />
                <Text style={styles.txt}>Etat par défault</Text>
                    <SelectDropdown
                        data={etats}
                        onSelect={(selectedItem,index) => {
                            setEtat(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem,index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item,index) => {
                            return item
                        }}
                    />
                <TouchableOpacity onPress={()=>handleAdd()} style={styles.btn}>
                    <Text>
                        Ajouter
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => handleNext()}>
                    <Text>
                        Suite
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'black'
    },
    input : {
        borderWidth: 1,
        borderColor: "white",
        width: "100%",
        color: "black",
        height: 40,
        borderRadius: 10,
        backgroundColor: "#a19999",
        marginTop: 5,
    },
    txt : {
        color:'white'
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
    formulaire: {
        width: "100%",
        top: 40,
        alignItems: "center",
        justifyContent: "center",
      }
})