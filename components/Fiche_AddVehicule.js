import { View , Text , TextInput , TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import FicheVehicule from "./Fiche_Vehicule";
import { useSelector } from "react-redux";

export default function FicheAddVehicule () {
const [vehicules,setVehicules] = useState([])
const [plaque,setPlaque] = useState(null)
const [type,setType] = useState(null)
const [etat,setEtat] = useState(null)
const user = useSelector((state) => state.user.value)

const vehiculesDisplay = vehicules.map((data,i) => {
    return <FicheVehicule key={i} />
})
    return (
        <View style={styles.container}>
            <View style={styles.vehicules}>

            </View>
            <View style={styles.formulaire}>
                <Text style={styles.txt}>Plaque</Text>
                    <TextInput style={styles.input}>
                </TextInput >
                <Text style={styles.txt}>Type</Text>
                    <TextInput style={styles.input}>
                 </TextInput>
                <Text style={styles.txt}>Etat par défault</Text>
                    <TextInput style={styles.input}>
                </TextInput>
                <TouchableOpacity style={styles.btn}>
                    <Text>
                        Ajouter
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
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