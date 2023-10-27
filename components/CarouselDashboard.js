import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, useWindowDimensions, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CarouselItem from './CarouselItem'
import VehiculeDashBoard from './VehiculeDashBoard'
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";


export default function carouselDashboard() {
  const GVuri = Image.resolveAssetSource(GV).uri;
  const MVuri = Image.resolveAssetSource(MV).uri;
  const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
  const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };

  const vehiculesDispo = useSelector((state) => state.vehiculesDispo.value);
  console.log(vehiculesDispo)
  // const vehiculesDispoDisplay = vehiculesDispo.map((data, i) => {
  //   return (
  //     <VehiculeDashBoard
  //       key={i}
  //       type={imagesData[data.type]}
  //       plaque={data.plaque}
  //     />
  //   );
  // });
  return (
    <View>
        <FlatList data={vehiculesDispo} renderItem={({item}) => <VehiculeDashBoard item={item} type={imagesData[item.type]} plaque={item.plaque}  />}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    width: 100,
    height: 100,
  },
});
