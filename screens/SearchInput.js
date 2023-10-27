import { StyleSheet, Text, View , Image} from 'react-native'
import { useSelector } from "react-redux";
import Fiche_intervention from "../components/Fiche_intervention";
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";
export default function SearchInput({navigation}) {
    const GVuri = Image.resolveAssetSource(GV).uri;
    const MVuri = Image.resolveAssetSource(MV).uri;
    const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
    const imagesData = { Gros: GVuri, Moyen: MVuri, VSL: VSLuri };
    const patients = useSelector((state) => state.patien.value)
    const patient = patients.map((inter, i) => {
      console.log(inter.interventions)
      const day = new Date(inter.interventions.date).getDate();
      const month = new Date(inter.interventions.date).getMonth();
      const year = new Date(inter.interventions.date).getFullYear();
      let date = month + "/" + day + "/" + year;
      if(inter.interventions.vehicule === null){
        return (
          <Fiche_intervention
          key={i}
          lastName={inter.lastName}
          firstName={inter.firstName}
          departure={inter.interventions.departure}
          arrival={inter.interventions.arrival}
          date={date}
          dispatched = {inter.interventions.vehicule}
          // selectDispatch={selectDispatch}
        />
        )
      } else 
      {
        return (
          <Fiche_intervention
          key={i}
          lastName={inter.lastName}
          firstName={inter.firstName}
          departure={inter.interventions.departure}
          arrival={inter.interventions.arrival}
          date={date}
          dispatched = {inter.interventions.vehicule}
          plaque = {inter.interventions.vehicule.plaque}
          type={imagesData[inter.interventions.vehicule.type]}
        />
      );
    }});
    return (
        <View style={styles.container}>
            {patient}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  box: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backGroundColor: "#000000",
  },
  txt: {
    color:'white',
    fontWeight: "bold",
    fontSize: 20,
  },
});