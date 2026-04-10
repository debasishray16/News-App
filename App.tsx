
import * as React from 'react';
import {useNavigation , NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Components/HomeScreen';
import NewsScreen from './src/Components/NewsScreen';
import WeatherScreen from './src/Components/WeatherScreen';


const Stack = createStackNavigator()



export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Main Page' }} />
        <Stack.Screen name="News" component={NewsScreen} options={{ title: 'Latest News' }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather Updates' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}