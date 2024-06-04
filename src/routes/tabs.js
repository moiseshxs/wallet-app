import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inicio from '../pages/home';
import Inserir from '../pages/inserir';
import Historico from '../pages/historico';

import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#980BDA',
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: '#272727',
          tabBarLabelPosition: 'below-icon',
          paddingBottom: 3,
          borderTopWidth: 0,

          shadowColor: '#000',
          shadowOpacity: 0.30,
          shadowOffset: {
            width: 0,
            height: 0,
          }
        }
      }}>

      <Tab.Screen
        name='Inicio'
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => <Octicons name='home' color={color} size={size} />,
          tabBarLabel: 'Inicio',
        }}
      />

      <Tab.Screen
        name='Inserir'
        component={Inserir}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  bottom: 15,
                  backgroundColor: '#980BDA',
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',

                  shadowColor: '#000',
                  shadowOpacity: 0.30,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  }
                }}
              >
                <Entypo name='plus' color={'#FFF'} size={30} />
              </View>
            )
          },
          tabBarLabel: 'Inserir',

        }}
      />

      <Tab.Screen
        name='Historico'
        component={Historico}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='google-analytics' color={color} size={size} />,
          tabBarLabel: 'Historico',
        }}
      />
    </Tab.Navigator>
  );
}
