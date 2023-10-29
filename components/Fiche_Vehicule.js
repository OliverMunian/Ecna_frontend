import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { defineListVehicules, updateEtatVehicule } from "../reducers/vehicules";
import { BlurView } from "expo-blur";

export default function FicheVehicule(props) {
  const dispatch = useDispatch();
  const BACKEND_ADRESS = "http://192.168.1.14 :3000";
  const user = useSelector((state) => state.user.value);
  const etats = ["En ligne", "Hors ligne", "Indisponible"];
  const [etat, setEtat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleDispatch = () => {
    if (props.onDispatch) {
      props.onDispatch(props.plaque);
    }
  };
  const modalview = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const handleAdd = () => {
    fetch(`${BACKEND_ADRESS}/vehicules/update/${props.plaque}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        etat: etat,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`${BACKEND_ADRESS}/vehicules/${user.SIREN}`)
          .then((response) => response.json())
          .then((vehiculesData) => {
            dispatch(defineListVehicules(vehiculesData.vehicules));
          });
      });
  };
  return (
    <BlurView intensity={50} style={styles.view}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDispatch}>
          <View style={styles.left}>
            <Text style={styles.plaque}>{props.plaque}</Text>
            <View style={styles.grpEtat}>
              <FontAwesome
                name="circle"
                size={(fontSize = 10)}
                color={props.color}
              />
              <Text style={styles.etat}>{props.etat}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalview}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: props.type }} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Modifier</Text>
            <SelectDropdown
              data={etats}
              onSelect={(selectedItem, index) => {
                setEtat(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.option}
            />
            <TouchableOpacity onPress={() => handleAdd()} style={styles.button}>
              <Text style={styles.txt}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.txt}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  view: {
    borderBottomColor: "grey",
    marginBottom: 20,
    paddingBottom: 10,
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    height: 100,
    width: "100%",
  },
  plaque: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
  },
  etat: {
    paddingLeft: 10,
    fontSize: 13,
    color: "white",
  },
  left: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-around",
  },
  grpEtat: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 140,
  },
  imageView: {
    paddingLeft: 70,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
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
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  txt: {
    color: "white",
  },
  option: {
    borderRadius: 10,
  },
});
