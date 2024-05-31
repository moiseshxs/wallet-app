import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button, Pressable } from 'react-native';
import Tabs from './tabs';
import Loading from '../pages/loading';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function StackRoutes() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: true }}>

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

      <Stack.Screen
        name='Loading'
        component={Loading}
        options={{
          title: 'Loading',
          headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
          headerTintColor: 'black',
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
