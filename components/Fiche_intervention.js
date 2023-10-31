import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import CarouselDashboard from "./CarouselDashboard";
import { VirtualizedList } from "react-native-web";

export default function Fiche_intervention(props) {
  const vehicules = useSelector((state) => state.vehicules.value);
  const [modalVisible, setModalVisible] = useState(false);
  const BACKEND_ADRESS = "http://10.3.0.13:3000";

  const handleDispatch = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleUpdate = () => {
    fetch(`${BACKEND_ADRESS}/interventions/dispatch`, {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : JSON.stringify({plaque : props.plaque, interToken : props.interToken })
    })
  }

  return (
    <BlurView intensity={50} style={styles.intervention}>
      <View>
        <Text style={styles.patient}>
          {props.lastName} {props.firstName}
        </Text>
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
        <TouchableOpacity
          style={styles.dispatch}
          onPress={() => handleDispatch()}
        >
          <Text>Dispatch</Text>
        </TouchableOpacity>
      )}
      {/*Modal de dispatch*/}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        style={styles.modal}
      >
        <View style={styles.centeredView}>
          <View style={styles.centeredViewtwo}>
            <BlurView intensity={50} style={styles.modalView}>
              <View style={styles.close}>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons
                    name="close-circle"
                    size={(fontSize = 25)}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>
                Attribuez un véhicule pour la prochaine intervention
              </Text>
              <View style={styles.carousel}>
                <CarouselDashboard interToken={props.interToken} />
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.button}>
                <Text style={styles.txt}>Ok</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      </Modal>
    </BlurView>
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
    backgroundColor: "transparent",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  depart: {
    marginTop: 4,
    fontSize: 20,
  },
  patient: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  depart_position: {
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
  },
  arriver_position: {
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
  },
  jour: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
    color: "white",
  },
  dispatch: {
    alignSelf: "flex-end",
  },
  plaque: {
    marginTop: 10,
  },
  carContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    width: 95,
    height: 80,
  },
  carInfo: {
    marginLeft: 10,
  },

  //MODALE DISPATCH
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    opacity: "10%",
    overflow: "hidden",
  },
  centeredViewtwo: {
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    width: "80%",
  },
  modalView: {
    backgroundColor: "transparent",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
  },
  close: {
    width: "100%",
    marginBottom: 10,
  },
  modalText: {
    textAlign:'center',
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  carousel:{
    justifyContent: "center",
    alignItems:'center',
    width:'100%',
  },
  txt: {
    color: "white",
  },
});
