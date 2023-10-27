import { View , Text , StyleSheet ,Image } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function VehiculeDashBoard (item) {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri : item.type}}/>
            <View style={styles.bottom}>
            <FontAwesome name='circle' size={(fontSize=10)} color='green' />
            <Text style={styles.txt}>
                {item.plaque}
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:200,
        width:200,
        borderRadius:20,
        marginRight:40,
        marginLeft:0,
    },
    image : {
        height:'70%',
        width:'100%',
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