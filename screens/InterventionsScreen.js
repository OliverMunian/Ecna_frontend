import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native'
import { useEffect, useState } from 'react';
import Fiche_intervention from '../components/Fiche_intervention';

export default function InterventionsScreen() {
  const [interventions, setInerventions] = useState([]);
    const BACKEND_ADRESS = 'http://10.3.0.43:3000';

    useEffect(() => {
        fetch(`${BACKEND_ADRESS}/interventions/find`)
            .then(response => response.json())
            .then(allInterventions => {
              
                setInerventions(allInterventions.Intervention);
            });
    }, []);
    const handleInter = () =>{
        console.log("test")
    }
    console.log('interventions',interventions)
    const intervention = interventions.map((inter, i) => {
        const day = new Date(inter.date).getDate();
        const month = new Date(inter.date).getMonth();
        const year = new Date(inter.date).getFullYear();
        let date = month + "/" + day + "/" + year;
        return <Fiche_intervention key={i} lastName={inter.patient.lastName} firstName={inter.patient.firstName} 
        departure={inter.departure} arrival={inter.arrival} date={date} 
        plaque={inter.plaque} vehicule={inter.vehicule}/>
        })
        return (
          <View style={styles.container}>
              <Text style={styles.title}>Interventions</Text>
              <View style={styles.line} />
              <ScrollView
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  endFillColor="#000"
                  overScrollMode="never">
                  {intervention}
              </ScrollView>
          </View>
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
  title:{
    color:'white',
    fontSize: 40,
    marginTop: 60,
    marginLeft: 10,
    fontWeight: "bold",
},
  line:{
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
},
});
