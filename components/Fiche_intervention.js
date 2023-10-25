import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image } from 'react-native';

export default function Fiche_intervention(props) {
    return (
        <View style={styles.intervention}>
            <View>
                <Text style={styles.patient}>{props.lastName} {props.firstName}</Text>
                <Text style={styles.depart_position}>📍 {props.departure}</Text>
                <Text style={styles.arriver_position}>🏁 {props.arrival}</Text>
                <View style={styles.same_line}>
                    <Text style={styles.jour}>{props.date}</Text>
                    {props.dispatched && (
                        // <Image style={styles.image} source={{ uri: props.type }} />
                        <Text style={styles.plaque}>{props.plaque}</Text>
                    )}
                </View>
            </View>
            {!props.dispatched && (
                <TouchableOpacity style={styles.dispatch} onPress={() => handleInter()}>
                    <Text>Dispatch</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    intervention: {
        borderRadius: 8,
        width: 390,
        backgroundColor: 'white',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    depart: {
        marginTop: 4,
        fontSize: 20,
    },
    patient: {
        fontSize: 30,
    },
    depart_position: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    arriver_position: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    jour: {
        fontSize: 20,
        marginBottom: 5,
        marginTop:5,
    },
    same_line: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dispatch: {
        alignSelf: 'flex-end',
    },
    plaque:{
        marginTop:10,
        marginLeft:'52%',
    },
    image:{
        backgroundColor:'blue',
        position:'absolute',
    }
});
