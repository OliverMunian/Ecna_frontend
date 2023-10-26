import { View , Text , StyleSheet ,Image } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function VehiculeDashBoard (props) {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri : props.type}}/>
            <View style={styles.bottom}>
            <FontAwesome name='circle' size={(fontSize=10)} color='green' />
            <Text style={styles.txt}>
                {props.plaque}
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:'100%',
        width:150,
        borderRadius:20,
        marginRight:10,
        marginLeft:10,
    },
    image : {
        height:'80%',
        width:'80%',
        alignItems:'center',
    },
    bottom : {
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center'
    },
    txt:{
        marginLeft:10,
        fontWeight: 'bold'
    },
})