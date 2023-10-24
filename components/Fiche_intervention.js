import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

export default function Fiche_intervention(){
    const [interventions,setInerventions] = useState([])
    const BACKEND_ADRESS = 'http://10.3.0.13:3000'

    useEffect(()=>{
        fetch(`${BACKEND_ADRESS}/interventions/find`)
        .then(response=> response.json())
        .then(allInterventions =>{
            setInerventions(allInterventions.Intervention)
        })
    },[])
    const intervention = interventions.map((inter) =>{
        const day = new Date(inter.date).getDate()
        const month = new Date(inter.date).getMonth()
        const year = new Date(inter.date).getFullYear()
        let date = month + "/" + day + "/" + year;
        return (
            <>
            <View style={styles.intervention}>
                <Text style={styles.patient}>{inter.patient.lastName}{inter.patient.firstName}</Text>
                <Text style={styles.depart_position}>📍 {inter.departure}</Text>
                <Text style={styles.arriver_position}>🏁 {inter.arrival}</Text>
                <View style={styles.same_line}>
                    <View></View>
                    <Text style={styles.jour}>{date}</Text>
                    <Text>{inter.vehicule.plaque}</Text>
                </View>
            </View>
            </>
        )
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interventions</Text>
            <View style={styles.line}/>
            <ScrollView  
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            endFillColor="#000"
            overScrollMode="never">
                {intervention}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    title:{
        color:'white',
        fontSize: 40,
        marginTop: 60,
        marginLeft: 10,
        fontWeight: "bold",
    },
    line:{
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    intervention:{
        borderRadius:8,
        width: 390,
        backgroundColor: 'white',
        marginTop: 20,
        alingItems:'flex-start',
    },
    depart:{
        marginTop:4,
        fontSize:20,
    },
    patient:{
        marginLeft:10,
        fontSize: 30,
    },
    depart_position:{
        marginLeft:10,
        fontSize:20,
        fontStyle: 'italic'
    },
    arriver_position:{
        marginLeft:10,
        fontSize:20,
        fontStyle: 'italic'
    },
    jour:{
        marginTop:4,
        fontSize:20,
        marginRight: 10,
        marginBottom: 5,
    },
    same_line:{
        flexDirection:'row',
        justifyContent: 'space-between'
    }
})