import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FicheVehicule(props) {
  return (
    <View style={styles.view} >
        <View style={styles.container}>
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
            <View style={styles.imageView}>
                <Image style={styles.image} source={{ uri: props.type }} />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    view:{
        borderBottomColor:'grey',
        paddingBottom: 10,
        borderWidth:1,
    },
    container: {
        marginTop:10,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        height: 100,
        width: "100%",
    },
  plaque: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
  },
  etat: {
    paddingLeft: 10,
    fontSize: 13,
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
    width: 100,
  },
  imageView: {
    paddingRight: 10,
  },
});
