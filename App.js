import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import HomeScreen from "./screens/HomeScreen";
import SubscribeScreen from "./screens/SubscribeScreen";
import VehiculesScreen from "./screens/VehiculesScreen";
import NewScreen from "./screens/NewScreen";
import SearchResults from "./screens/SearchResults";
import InterventionsScreen from "./screens/InterventionsScreen";
import PhoneScreen from "./screens/PhoneScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddVehiculesScreen from "./screens/AddVehiculesScreen";
import AddVehiculesScreenBis from "./screens/AddVehiculesScreenBis";
import PatientScreen from "./screens/PatientScreen";
import InterventionDuVehiculeScreen from "./screens/InterventionDuVehiculeScreen";
import CodePin from "./screens/CodePin";
import EmployeScreen from "./screens/Employe/EmployeScreen";
import ProfileScreen from "./screens/Employe/ProfileScreen";
import CalendarScreen from "./screens/Employe/CalendarScreen";
import StatsScreen from "./screens/Employe/StatsScreen";
import HomeEmployeScreen from "./screens/Employe/HomeEmployeScreen";
import WayMode from "./screens/WayMode";
import NewInterventionClassic from "./screens/NewInterventionClassic";
import HomeEmploye from './screens/UnitMobile/HomeEmploye'
import user from "./reducers/user";
import employe from "./reducers/employe";
import vehicules from "./reducers/vehicules";
import patient from "./reducers/patient";
import interVehicules from "./reducers/interVehicules";
import interventions from "./reducers/interventions";
import listPatients from "./reducers/listPatients";
import vehiculesDispo from "./reducers/vehiculesDispo";
import vehiculesEnCours from "./reducers/vehiculesEnCours";
import searchResult from "./reducers/searchResult";
import searchQuery from "./reducers/searchQuery";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Alert } from "react-native";

const store = configureStore({
  reducer: {
    user,
    employe,
    vehicules,
    patient,
    interVehicules,
    interventions,
    listPatients,
    vehiculesDispo,
    searchResult,
    searchQuery,
    vehiculesEnCours,
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Profil") {
            return (
              <MaterialCommunityIcons name="account" size={31} color={color} />
            );
          } else if (route.name === "Calendrier") {
            return <FontAwesome name="calendar" size={28} color={color} />;
          } else if (route.name === "Stats") {
            iconName = "line-graph";
            return <Entypo name="line-graph" size={30} color={color} />;
          } else if (route.name === "Accueil") {
            iconName = "home";
            return <AntDesign name="home" size={30} color={color} />;
          }

          return <FontAwesome name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#FFFF",
        tabBarStyle: {
          backgroundColor: "#006a4d",
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeEmployeScreen} />
      <Tab.Screen name="Calendrier" component={CalendarScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const UserNavigator = () => {
  const user = useSelector((state) => state.user.value);
  if (user.token) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Véhicules") {
              return (
                <MaterialCommunityIcons
                  name="car-emergency"
                  size={31}
                  color={color}
                />
              );
            } else if (route.name === "New") {
              iconName = "plus-circle";
            } else if (route.name === "Interventions") {
              return (
                <MaterialCommunityIcons
                  name="heart-pulse"
                  size={31}
                  color={color}
                />
              );
            } else if (route.name === "Répertoire") {
              iconName = "phone";
            } else if (route.name === "Accueil") {
              iconName = "home";
              return <AntDesign name="home" size={30} color={color} />;
            }

            return <FontAwesome name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#FFFF",
          tabBarStyle: {
            backgroundColor: "#1D94AE",
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 0,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={DashboardScreen} />
        <Tab.Screen name="Véhicules" component={VehiculesScreen} />
        <Tab.Screen name="New" component={NewScreen} />
        <Tab.Screen name="Interventions" component={InterventionsScreen} />
        <Tab.Screen name="Répertoire" component={PhoneScreen} />
      </Tab.Navigator>
    );
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Subscribe" component={SubscribeScreen} />
          <Stack.Screen name="AddVehicule" component={AddVehiculesScreen} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen
            name="AddVehiculeBis"
            component={AddVehiculesScreenBis}
          />
          <Stack.Screen
            name="Interventionduvehicule"
            component={InterventionDuVehiculeScreen}
          />
          <Stack.Screen name="CodePin" component={CodePin} />
          <Stack.Screen name="ChoixDuProfil" component={WayMode} />
          <Stack.Screen name="ChoixduVéhicule" component={HomeEmploye} />
          <Stack.Screen
            name="InterClassic"
            component={NewInterventionClassic}
          />
          <Stack.Screen name="Infosdupatient" component={PatientScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="UserNavigator" component={UserNavigator} />
          <Stack.Screen name="Employe" component={EmployeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
