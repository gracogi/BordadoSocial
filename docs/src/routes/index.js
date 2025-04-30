import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import Feed from "../pages/Principal/Feed/index";
import Add from "../pages/Principal/Add/index";
import Perfil from "../pages/Principal/Perfil/index";
//import TelaPrincipal from "../pages/TelaPrincipal";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
      <Stack.Navigator>
    
          <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Feed"
              component={Feed}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Add"
              component={Add}
              options={{headerShown: false}}
          />
           <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={{headerShown: false}}
          />

      </Stack.Navigator>
  )
}