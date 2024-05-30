import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import { Button, Pressable } from 'react-native';
import Tabs from './tabs';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function StackRoutes() {
const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: true}}>

      <Stack.Screen 
        name='Home'
        component={Tabs}
        options={{
          title: 'Inicio',
          headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
          headerTintColor: 'black',
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
