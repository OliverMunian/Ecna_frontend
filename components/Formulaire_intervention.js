import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { defineListInter } from "../reducers/interventions";
import { defineListPatients } from "../reducers/listPatients";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { min } from "react-native-reanimated";

export default function Formulaire_interventions(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const BACKEND_ADRESS =
    "  https://ecna-backend-odpby015w-olivermunian.vercel.app";
  const etats = ["Valide", "Invalide"];

  // Recuperation des informations du user du reducer
  const user = useSelector((state) => state.user.value);

  // Etats relatif aux inputs du formulaire
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [street, setStreet] = useState(null);
  const [streetNumber, setStreetNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [SSnumber, setSSnumber] = useState(null);
  const [phone, setPhone] = useState(null);
  const [mutuelle, setMutuelle] = useState(null);
  const [valide, setValide] = useState(null);
  const [existe, setExiste] = useState(false);
  const [Departure, setDeparture] = useState(null);
  const [Arrival, setArrival] = useState(null);
  const [copy, setCopy] = useState("");

  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [hours, setHours] = useState(false);
  const [minutes, setMinutes] = useState(false);
  const [mode, setMode] = useState(null);

  const [error, setError] = useState(null);
  const [errorStyle, setErrorStyle] = useState({});
  const [colorPlaceholder, setcolorPlaceholder] = useState(false);
  const fields = [
    firstName,
    lastName,
    street,
    streetNumber,
    city,
    postalCode,
    phone,
    valide,
    Departure,
    Arrival,
  ];
  const fullAdress = [streetNumber, street, city, postalCode];

  //Fonction pour selectionner la date dans le menu déroulant
  const showDatePicker = (mode) => {
    setDatePickerVisible(true);
    setMode(mode);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    console.log(date);
    setDate(date);
    if (mode === "time") {
      const schedule = date.getHours();
      const minutes = date.getMinutes();
      setHours(schedule);
      setMinutes(minutes);
    }
    hideDatePicker();
  };

  const onChange = (event, selecteddate) => {
    // on cancel set date value to previous date
    if (event.type === "dismissed") {
      console.log(selecteddate);
      return;
    }
    setDate(selecteddate);
  };

  // const formDate = (rawDate) => {
  //   let date = new Date(rawDate);

  //   let fullYear = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();
  //   console.log(day);

  //   return `${day}-${month}-${fullYear}`;
  // };

  // Fonction qui se declenche lors du clique sur Search pour permettre de vérifier s'il existe un patient avec ce numero de securité
  // sociale dans la BDD, si oui préremplir les champs dédiés aux informations patients, si non renvoyer un message d'erreur
  const handlesearch = (SSnumber) => {
    fetch(`${BACKEND_ADRESS}/patients/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SSnumber: SSnumber, token: user.token }),
    })
      .then((response) => response.json())
      .then((patientData) => {
        if (patientData.result) {
          setFirstName(patientData.patient.firstName);
          setLastName(patientData.patient.lastName);
          setAdress(patientData.patient.adress);
          setSSnumber(patientData.patient.SSnumber);
          setPhone(patientData.patient.phone);
          setMutuelle(patientData.patient.mutuelle);
          setValide(patientData.patient.valide);
          setExiste(true);
          setcolorPlaceholder(true);
          setError("");
        } else {
          setError(patientData.error);
          setErrorStyle({ color: "red", fontSize: 10 });
          setFirstName("");
          setLastName("");
          setStreet("");
          setStreetNumber("");
          setCity("");
          setPostalCode("");
          setAdress("");
          setPhone("");
          setMutuelle("");
          setValide("");
          setExiste(false);
          setDeparture("");
          setArrival("");
        }
      });
  };

  // Fonction qui se declenche lors du clique sur le bouton submit qui ajoute si necessaire le patient dans la BDD, et l'intervention quoi
  // qu'il arrive. Permet également de récuperer la liste des interventions/patients et de mettre à jour le reducer
  const handleSubmit = () => {
    // Verification que le numero de securité sociale est du bon format
    const regexSSNFrance = /^(1|\\2)[0-9]{15}$/;
    const regexNumberFrance = /^(0|\\+33)[1-9][0-9]{8}/;
    const testSSnumber = regexSSNFrance.test(SSnumber);
    if (fields) {
      fetch(`${BACKEND_ADRESS}/interventions/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existe: existe,
          firstName: firstName,
          lastName: lastName,
          streetNumber: streetNumber,
          street: street,
          city: city,
          postalCode: postalCode,
          SSnumber: SSnumber,
          mutuelle: mutuelle,
          valide: valide,
          phone: phone,
          departure: Departure,
          arrival: Arrival,
          SIREN: user.SIREN,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setFirstName("");
          setLastName("");
          setStreetNumber("");
          setStreet("");
          setCity("");
          setPostalCode("");
          setSSnumber("");
          setPhone("");
          setMutuelle("");
          setValide("");
          setExiste(false);
          setDeparture("");
          setArrival("");
          // mise à jour du reducer interventions
          fetch(`${BACKEND_ADRESS}/interventions/${user.SIREN}`)
            .then((response) => response.json())
            .then((interData) => {
              if (interData.result) {
                dispatch(defineListInter(interData.interventions));
              }
              // mise à jour du reducer patients
            })
            .then(() => {
              fetch(`${BACKEND_ADRESS}/patients/all/${user.token}`)
                .then((response) => response.json())
                .then((patientData) => {
                  if (patientData.result) {
                    console.log(patientData.patients);
                    console.log(patientData.patients.adress);
                    dispatch(defineListPatients(patientData.patients));
                    navigation.navigate(props.screenName, {
                      screen: "Interventions",
                    });
                  }
                });
            });
        });
    } else {
      setError("Sécurité Sociale non valide");
    }
  };

  function pasteDeparture() {
    if (streetNumber && street && city && postalCode) {
      console.log("ok");
      setDeparture(
        streetNumber + " " + street + ", " + city + " " + postalCode
      );
    } else {
      Alert.alert(
        "Oups !",
        "Pour copier l'adresse du patient veuillez d'abord remplir les champs requis "
      );
    }
  }

  function pasteArrival() {
    if (streetNumber && street && city && postalCode) {
      console.log("ok");
      setArrival(streetNumber + " " + street + ", " + city + " " + postalCode);
    } else {
      Alert.alert(
        "Oups !",
        "Pour copier l'adresse du patient veuillez d'abord remplir les champs requis "
      );
    }
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={["#1a2755", "#1D94AE"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.bigtilte}>
        <Text style={styles.titre}>Intervention classique</Text>
        <Text style={styles.tutoriel}>
          Remplissez les champs ci-dessous pour ajouter une nouvelle
          intervention
        </Text>
      </View>

      <ScrollView
        // horizontal={false}
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={this.onContentSizeChange}
        endFillColor="#000"
        overScrollMode="never"
        style={{ width: "100%" }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.scrollview}>
            <View style={styles.infospatient}>
              <View style={styles.viewsoustitre}>
                <Text style={styles.soustitre}>Informations patient</Text>
              </View>
              <View style={styles.nomprenom}>
                <TextInput
                  style={styles.nom}
                  placeholder="Nom"
                  placeholderTextColor="white"
                  onChangeText={(value) => setLastName(value)}
                  value={lastName}
                />
                <TextInput
                  style={styles.prenom}
                  placeholder="Prénom"
                  placeholderTextColor="white"
                  onChangeText={(value) => setFirstName(value)}
                  value={firstName}
                />
              </View>
              <View style={styles.numeroetrue}>
                <TextInput
                  style={styles.numerorue}
                  keyboardType="numeric"
                  placeholder="N° de rue"
                  placeholderTextColor="white"
                  onChangeText={(value) => setStreetNumber(value)}
                  value={streetNumber}
                />
                <TextInput
                  style={styles.rue}
                  placeholder="Rue"
                  placeholderTextColor="white"
                  onChangeText={(value) => setStreet(value)}
                  value={street}
                />
              </View>
              <View style={styles.divtownpostal}>
                <TextInput
                  style={styles.ville}
                  placeholder="Ville"
                  placeholderTextColor="white"
                  onChangeText={(value) => setCity(value)}
                  value={city}
                />
                <TextInput
                  style={styles.postalcode}
                  keyboardType="numeric"
                  placeholder="Code postal"
                  maxLength={5}
                  placeholderTextColor="white"
                  onChangeText={(value) => setPostalCode(value)}
                  value={postalCode}
                />
              </View>

              {/* SÉCURITÉ SOCIALE */}
              <View style={styles.divinput}>
                <View style={styles.divplaceholder}>
                  {!error && !colorPlaceholder ? (
                    <TextInput
                      style={styles.inputplaceholder}
                      keyboardType="numeric"
                      type="number"
                      placeholder="Sécurité Sociale"
                      placeholderTextColor="white"
                      onChangeText={(value) => setSSnumber(value)}
                      value={SSnumber}
                      maxLength={15}
                    />
                  ) : error ? (
                    <TextInput
                      style={{
                        borderRadius: 10,
                        backgroundColor: "red",
                        width: "80%",
                        borderColor: "white",
                        height: 40,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: "white",
                        paddingLeft: 10,
                      }}
                      placeholder="Sécurité Sociale"
                      placeholderTextColor="white"
                      onChangeText={(value) => setSSnumber(value)}
                      value={SSnumber}
                      maxLength={15}
                    />
                  ) : (
                    <TextInput
                      style={{
                        borderRadius: 10,
                        backgroundColor: "green",
                        width: "80%",
                        borderColor: "white",
                        height: 40,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: "white",
                        paddingLeft: 10,
                      }}
                      placeholder="Sécurité Sociale"
                      placeholderTextColor="white"
                      onChangeText={(value) => setSSnumber(value)}
                      value={SSnumber}
                      maxLength={15}
                    />
                  )}
                  <View>
                    <TouchableOpacity
                      onPress={() => handlesearch(SSnumber)}
                      style={styles.search}
                    >
                      <Text style={styles.txt}>Search</Text>
                    </TouchableOpacity>
                    <Text style={errorStyle}>{error}</Text>
                  </View>
                </View>
              </View>

              {/* Telephone + Valide */}
              <View style={[styles.small]}>
                <TextInput
                  style={styles.telephone}
                  keyboardType="numeric"
                  placeholder="Téléphone"
                  placeholderTextColor="white"
                  onChangeText={(value) => setPhone(value)}
                  value={phone}
                  maxLength={10}
                />
                {/* DropDown */}
                <SelectDropdown
                  defaultButtonText="Patient  ▾"
                  buttonStyle={styles.dropdown}
                  buttonTextStyle={styles.dropText}
                  dropdownStyle={styles.card_drop}
                  placeholderStyle={styles.placeholderStyle}
                  data={etats}
                  onSelect={(selectedItem, index) => {
                    setValide(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>

              <View style={styles.divinput}>
                <TextInput
                  style={styles.input}
                  placeholder="Mutuelle"
                  placeholderTextColor="white"
                  onChangeText={(value) => setMutuelle(value)}
                  value={mutuelle}
                />
              </View>
            </View>
            <View style={styles.infospatient}>
              <View style={styles.viewsoustitre}>
                <Text style={styles.soustitre}>Détails intervention</Text>
              </View>
              <View style={styles.divinputcopy}>
                <TextInput
                  style={styles.destination}
                  placeholder="Lieu de départ"
                  placeholderTextColor="white"
                  onChangeText={(value) => setDeparture(value)}
                  value={Departure}
                />
                <TouchableOpacity
                  style={styles.copy}
                  onPress={() => pasteDeparture()}
                >
                  <Fontisto name="paste" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.divinputcopy}>
                <TextInput
                  style={styles.destination}
                  placeholder="Lieu d'arrivée"
                  placeholderTextColor="white"
                  onChangeText={(value) => setArrival(value)}
                  value={Arrival}
                />
                <TouchableOpacity
                  style={styles.copy}
                  onPress={() => pasteArrival()}
                >
                  <Fontisto name="paste" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/*SELECTIONNER UNE DATE DE PRISE EN CHARGE*/}
              <View style={styles.selectdate}>
                <TextInput
                  style={styles.destination}
                  value={
                    date
                      ? date.toLocaleDateString()
                      : "Aucune date séléctionnée"
                  }
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 20,
                    color: "white",
                  }}
                ></Text>
                <TouchableOpacity
                  style={styles.copy}
                  onPress={() => showDatePicker("date")}
                >
                  <FontAwesome name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* HEURE DE PRISE EN  CHARGE*/}
              <View style={styles.selectdate}>
                <TextInput
                  style={styles.destination}
                  value={
                    hours && minutes
                      ? `${hours}:${minutes}`
                      : "Heure de prise en charge"
                  }
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 20,
                    color: "white",
                  }}
                ></Text>
                <TouchableOpacity
                  style={styles.copy}
                  onPress={() => showDatePicker("time")}
                >
                  <MaterialIcons name="schedule" size={20} color="white" />
                </TouchableOpacity>
                {datePickerVisible && Platform.OS == "ios" && (
                  <DateTimePickerModal
                    isVisible={datePickerVisible}
                    minuteInterval={5}
                    textColor="#307ff8"
                    mode={mode}
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    // maximumDate={new Date("2045-1-1")}
                    // minimumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    confirmTextIOS="Confirmer"
                    cancelTextIOS="Annuler"
                  />
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.search} onPress={() => handleSubmit()}>
          <Text style={styles.txt}>Créer</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  //TITRE DE LA PAGE
  bigtilte: {
    width: "100%",
    borderColor: "grey",
    marginTop: 130,
    marginBottom: 20,
  },
  titre: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: 10,
  },
  tutoriel: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
    paddingLeft: 10,
  },

  //SCROLLVIEW
  infospatient: {
    width: "100%",
    alignItems: "center",
  },
  viewsoustitre: {
    width: "100%",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    justifyContent: "flex-start",
  },
  soustitre: {
    color: "white",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  txt: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    color: "white",
    height: 40,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginTop: 5,
    paddingLeft: 10,
  },
  destination: {
    borderWidth: 1,
    borderColor: "white",
    width: "70%",
    color: "white",
    height: 40,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginTop: 10,
    paddingLeft: 10,
    marginRight: 15,
  },
  nomprenom: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
  prenom: {
    width: "45%",
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
  },
  nom: {
    width: "45%",
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    height: 40,
    marginRight: "5%",
    borderRadius: 10,
    paddingLeft: 10,
  },
  numeroetrue: {
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  numerorue: {
    borderRadius: 10,
    width: "25%",
    borderColor: "white",
    height: 40,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 10,
    color: "white",
  },
  rue: {
    borderRadius: 10,
    width: "74%",
    borderColor: "white",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 10,
    color: "white",
  },
  divinput: {
    color: "white",
    width: "85%",
    borderColor: "white",
    height: 20,
    marginBottom: 40,
  },
  divtownpostal: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  ville: {
    color: "white",
    width: "68%",
    borderColor: "white",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 10,
  },
  postalcode: {
    color: "white",
    width: "30%",
    borderColor: "white",
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 10,
  },
  divinputcopy: {
    flexDirection: "row",
    alignItems: "center",
  },
  copy: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 7,
    paddingTop: 7,
  },
  small: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "85%",
    marginBottom: 10,
  },
  telephone: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    height: 40,
    width: "45%",
    color: "white",
  },
  dropdown: {
    width: "50%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    height: 40,
  },
  dropText: {
    color: "white",
  },
  valide: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "45%",
  },
  divplaceholder: {
    marginTop: 5,
    flexDirection: "row",
    width: "80%",
  },
  search: {
    width: 110,
    height: 40,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 5,
    marginBottom: 70,
  },
  inputplaceholder: {
    borderRadius: 10,
    backgroundColor: "#a19999",
    width: "80%",
    borderColor: "white",
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 10,
  },
  datePicker: {
    height: 120,
    marginTop: 10,
    backgroundColor: "white",
  },
  btndate: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
  },
  btndatecncl: {
    borderWidth: 2,
    borderColor: "white",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 30,
    margin: 10,
  },
  datecncl: {
    color: "white",
    fontWeight: "bold",
  },
  selectdate: {
    flexDirection: "row",
    alignItems: "center",
  },
});
