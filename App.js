import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import VehiculesScreen from './screens/VehiculesScreen';
import NewScreen from './screens/NewScreen';
import InterventionsScreen from './screens/InterventionsScreen'
import PhoneScreen from './screens/PhoneScreen'
import DashboardScreen from './screens/DashboardScreen'



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Véhicules') {
          iconName = 'truck';
        } else if (route.name === 'New') {
          iconName = 'plus';
        } else if (route.name === 'Interventions') {
          iconName = 'flag-checkered'
        }else if (route.name === 'Repertoire') {
          iconName = 'phone';
        } else if (route.name === 'Accueil') {
          iconName = 'home';
        }
        

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#0000BB',
      tabBarInactiveTintColor: '#FFFF',
      tabBarStyle:{
        backgroundColor:'black',
        borderColor:'black'   
      },
      headerShown: false,
    })}>
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
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}