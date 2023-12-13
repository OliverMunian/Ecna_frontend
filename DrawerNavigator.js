import react from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import DashboardScreen from './screens/DashboardScreen'

const Drawer = createDrawerNavigator()

function drawerNavigator(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Password" component={ForgotPasswordScreen} />
        </Drawer.Navigator>
    )

}

export default drawerNavigator