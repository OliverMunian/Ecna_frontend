import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, useWindowDimensions, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import VehiculeDashBoard from './VehiculeDashBoard'
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";


export default function carouselDashboard() {
  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Classique: MVuri, VSL: VSLuri };

  const vehiculesDispo = useSelector((state) => state.vehiculesDispo.value);
  
  return (
    <View style={styles.container}>
        <FlatList data={vehiculesDispo} 
        renderItem={({item}) => <VehiculeDashBoard item={item} type={imagesData[item.type]} plaque={item.plaque}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        boucnes={false}
        style={styles.flatList}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    width:200,
    height: 200,
  },
});
