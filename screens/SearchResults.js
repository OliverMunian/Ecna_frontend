import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import { useSelector , useDispatch } from "react-redux";
import Fiche_intervention from "../components/Fiche_intervention";
import SearchBar from '../components/SearchBar';
import GV from "../assets/grosVolume.png";
import MV from "../assets/moyenVolume.png";
import VSLsrc from "../assets/VSL.png";


export default function SearchResults({navigation}) {
    const GVuri = Image.resolveAssetSource(GV).uri;
    const MVuri = Image.resolveAssetSource(MV).uri;
    const VSLuri = Image.resolveAssetSource(VSLsrc).uri;
    const imagesData = { Gros: GVuri, Classique: MVuri, VSL: VSLuri };
    
    const searchResult = useSelector((state) => state.searchResult.value)
    const searchResultDisplay = searchResult.map((inter,i) => {
    // Mise en format de la date
    const day = new Date(inter.date).getDate();
    const month = new Date(inter.date).getMonth();
    const year = new Date(inter.date).getFullYear();
    let date = month + "/" + day + "/" + year;
    // Création des elements JSX avec le composant
    if (inter.vehicule === null) {
      return (
        <Fiche_intervention
          key={i}
          lastName={inter.patient.lastName}
          firstName={inter.patient.firstName}
          departure={inter.departure}
          arrival={inter.arrival}
          date={date}
          dispatched={inter.vehicule}
        />
      );
    } else {
      return (
        <Fiche_intervention
          key={i}
          lastName={inter.patient.lastName}
          firstName={inter.patient.firstName}
          departure={inter.departure}
          arrival={inter.arrival}
          date={date}
          dispatched={inter.vehicule}
          plaque={inter.vehicule.plaque}
          type={imagesData[inter.vehicule.type]}
        />
      );
    }
    })

    return (
      <View style={styles.container}>
        <View >
          {searchResultDisplay}
        </View> 
        <SearchBar screenName={'SearchResults'} />
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