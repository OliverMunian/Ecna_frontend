import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import SubscribeScreen from "./screens/SubscribeScreen";
import VehiculesScreen from "./screens/VehiculesScreen";
import NewScreen from "./screens/NewScreen";
import InterventionsScreen from "./screens/InterventionsScreen";
import PhoneScreen from "./screens/PhoneScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddVehiculesScreen from "./screens/AddVehiculesScreen";
import InterventionDuVehiculeScreen from "./screens/InterventionDuVehiculeScreen";
import user from "./reducers/user";
import vehicules from "./reducers/vehicules";
import patients from "./reducers/patients";


import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FicheAddVehicule from "./components/Fiche_AddVehicule";

const store = configureStore({
  reducer: { user, vehicules, patients},
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Véhicules") {
            iconName = "ambulance";
          } else if (route.name === "New") {
            iconName = "plus";
          } else if (route.name === "Interventions") {
            iconName = "flag-checkered";
          } else if (route.name === "Repertoire") {
            iconName = "phone";
          } else if (route.name === "Accueil") {
            iconName = "home";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0c2ce7",
        tabBarInactiveTintColor: "#FFFF",
        tabBarStyle: {
          backgroundColor: "black",
          borderColor: "black",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={DashboardScreen} />
      <Tab.Screen name="Véhicules" component={VehiculesScreen} />
      <Tab.Screen name="New" component={NewScreen} />
      <Tab.Screen name="Interventions" component={InterventionsScreen} />
      <Tab.Screen name="Repertoire" component={PhoneScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Subscribe" component={SubscribeScreen} />
          <Stack.Screen name="AddVehicule" component={AddVehiculesScreen} />
          <Stack.Screen name="Interventionduvehicule" component={InterventionDuVehiculeScreen}/>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
