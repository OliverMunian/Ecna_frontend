import { StyleSheet, Text, View } from 'react-native'

export default function MapScreen() {

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === 'granted') {
//         Location.watchPositionAsync({ distanceInterval: 10 },
//           (location) => {
//             setCurrentPosition(location.coords);
//           });
//       }
//     })();
//   }, []);

//   const handleLongPress = (e) => {
//     setTempCoordinates(e.nativeEvent.coordinate);
//     setModalVisible(true);
//   };

//   const handleNewPlace = () => {
//     dispatch(addPlace({ name: newPlace, latitude: tempCoordinates.latitude, longitude: tempCoordinates.longitude }));
//     fetch('https://locapic-chi.vercel.app/places')
//     .then(response => response.json())
//     .then(data =>{
//       const newPlace  = new place({
//         nickname: req.body.nickname,
//         name
//       })
//     })
//     setModalVisible(false);
//     setNewPlace('');
//   };

//   const handleClose = () => {
//     setModalVisible(false);
//     setNewPlace('');
//   };



//   const markers = user.places.map((data, i) => {
//     return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
//   });

  return (
    <View style={styles.container}>

      <View style={styles.box}>
      <Text style={styles.txt}>Bienvenue sur la page des vehicules</Text>
    </View>
      {/* <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder="New place" onChangeText={(value) => setNewPlace(value)} value={newPlace} style={styles.input} />
            <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView onLongPress={(e) => handleLongPress(e)} mapType="hybrid" style={styles.map}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
        {markers}
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'black',
    color:'white',
  },
  txt:{
    color:'white'
  }
});
