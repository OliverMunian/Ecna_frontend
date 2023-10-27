import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import VehiculeDashBoard from "./VehiculeDashBoard";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";


export default function CarouselItem({ item }) {
  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

  const { width } = useWindowDimensions();

  console.log(item)
   
        return (
            <View style={[styles.container, { width }]}>
              <Text>{item.type}</Text>
            /<Image
                source={imagesData.item.type}
                style={[styles.image, { width, resizeMode: "contain" }]}
            /> 
            <Text style={styles.txt}>Bonjour a tous</Text>
            <View style={{ flex: 0.3 }}>
                <Text>{item.plaque}</Text>
            </View>
            </View>
        );




}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 100,
  },
  image: {
    width: "50%",
    height: 100,
  },
  txt:{
    color:'black',
    fontSize:20
  }
});
