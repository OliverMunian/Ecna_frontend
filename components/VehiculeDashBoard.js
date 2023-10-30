import { View , Text , StyleSheet ,Image , TouchableOpacity } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";




export default function VehiculeDashBoard (item) {
const [update,setUpdate] = useState([])
const handleSet = () => {
    setUpdate({plaque:item.plaque,interToken:item.interToken})
}
console.log('update',update)
console.log(item)
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.image} onPress={() => handleSet()}>
            <Image style={styles.image} source={{uri : item.type}}/>
            <View style={styles.bottom}>
            <FontAwesome name='circle' size={(fontSize=10)} color='green' />
            <Text style={styles.txt}>
                {item.plaque}
            </Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
        height:200,
        width:200,
        borderRadius:20,
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