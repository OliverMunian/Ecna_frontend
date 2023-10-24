import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";




export default function FicheVehicule (props) {
    return (
    <View>
       
    <View style={styles.trait}/>
    <View style={styles.container}>
        <View style={styles.left}>
            <Text style={styles.plaque}>
                {props.plaque}
            </Text>
            <View style={styles.grpEtat}>
                <FontAwesome name='circle' size={(fontSize=10)} color={props.color} />
                <Text style={styles.etat}>
                {props.etat}
                </Text>
            </View>
        </View>
        <View style={styles.imageView}>
            <Image  style={styles.image} source={{uri : props.type}} />
        </View>
    </View>
    </View>
)
}

const styles = StyleSheet.create({
    plaque : {
        fontSize : 20,
        color : 'black',
        paddingTop : 10,
        paddingLeft: 10,
    },
    container : {
        flexDirection:'row',
        justifyContent:"space-around",
        backgroundColor:'white',
        height:100,
        width:400,
        borderRadius:5,
    },
    etat : {
        paddingLeft:10,
        fontSize : 13,
    },
    left : {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignContent:'space-around',
    },
    grpEtat : {
        flexDirection:'row',
        paddingBottom:10,
        paddingLeft : 10,
        alignItems:'center'
    },
    image : {
        height:100,
        width:100,
    },
    imageView:{
        paddingRight:10
    },
    trait: {
        width:'100%',
        borderBottomColor:'white',
        borderBottomWidth : StyleSheet.hairlineWidth,
        marginBottom:10,
    }

})