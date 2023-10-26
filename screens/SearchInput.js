import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from "react-redux";
import Fiche_intervention from "../components/Fiche_intervention";
export default function SearchInput({navigation}) {
    const patients = useSelector((state) => state.patients.value)
    console.log(patients)
    const patient = patients.map((inter,i)=>{
            const day = new Date(inter.interventions.date).getDate();
            const month = new Date(inter.interventions.date).getMonth();
            const year = new Date(inter.interventions.date).getFullYear();
            let date = month + "/" + day + "/" + year;
            return <Fiche_intervention navigation={navigation} key={i} lastName={inter.lastName} firstName={inter.firstName}
              departure={inter.interventions.departure} arrival={inter.interventions.arrival} date={date}/>
          })
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