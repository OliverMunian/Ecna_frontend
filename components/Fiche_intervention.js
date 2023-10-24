import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function Fiche_intervention(props){
        return (
            <View style={styles.intervention}>
                <Text style={styles.patient}>{props.lastName}{props.firstName}</Text>
                <Text style={styles.depart_position}>📍 {props.departure}</Text>
                <Text style={styles.arriver_position}>🏁 {props.arrival}</Text>
                <View style={styles.same_line}>
                    <View></View>
                    <Text style={styles.jour}>{props.date}</Text>
                    {props.vehicule && (
                        <Text>{props.plaque}</Text>
                    )}
                    {!props.vehicule && (
                        <TouchableOpacity style={styles.dispatch} onPress={()=> handleInter()}>
                            <Text>Dispatch</Text>
                        </TouchableOpacity>  
                    )}
                </View>
            </View>
        );
    };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
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
        marginBottom: 5,

    },
    same_line:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginRight:10
    }
})