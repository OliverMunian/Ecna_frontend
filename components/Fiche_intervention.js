import {Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity,Image } from 'react-native';
import { useSelector } from "react-redux";
import { useState } from "react";
export default function Fiche_intervention(props) {
    
    const vehicules = useSelector((state) => state.vehicules.value);
    const [modalVisible, setModalVisible] = useState(false);
    const handledispatch = () => {
        vehicules.map((etat_vehicule)=>{
            if(etat_vehicule.etat === "En ligne"){
                props.selectDispatch(etat_vehicule)
                setModalVisible(true)
            }
        })
    }
    const handleClose = () => {
        setModalVisible(false);
      };
    return (
        <View style={styles.intervention}>
            <View>
                <Text style={styles.patient}>{props.lastName} {props.firstName}</Text>
                <Text style={styles.depart_position}>📍 {props.departure}</Text>
                <Text style={styles.arriver_position}>🏁 {props.arrival}</Text>
                <Text style={styles.jour}>{props.date}</Text>
            </View>
        {props.dispatched && (
            <View style={styles.carContainer}>
                <Image style={styles.image} source={{ uri: props.type }} />
                <View style={styles.carInfo}>
                    <Text style={styles.plaque}>{props.plaque}</Text>
                </View>
            </View>
        )}
            {!props.dispatched && (
                <TouchableOpacity style={styles.dispatch} onPress={()=> handledispatch()}>
                    <Text>Dispatch</Text>
                </TouchableOpacity>
            )}
         <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Dispatch Véhicule</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleClose}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginTop: 5,
    },
    dispatch: {
        alignSelf: 'flex-end',
    },
    plaque: {
        marginTop: 10,
    },
    carContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginBottom:10
    },
    image: {
        width: 95,
        height: 80,
    },
    carInfo: {
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        width: 300, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        width: 30,
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 8,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});
