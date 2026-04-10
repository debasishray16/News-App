import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { WEATHER_API_KEY } from '@env';


const WeatherScreen = ({  navigation }) => {
  const [weatherData, setWeatherData] = useState(null); // Changed to null for easier conditional checks
  const [loading, setLoading] = useState(false);

  const {lat, lon} = {lat : '34', lon : '56'}; // Destructure lat and lon from route params, with fallback
  // const API_KEY = '0093a72c975dfd0abc2d43dd629f209c';


  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
      );
      const data = await response.json();
      console.log('Fetched weather data: ', data); // Log the fetched data
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <View style={styles.container}>
      <Button
        title="Fetch Weather"
        onPress={fetchWeather}
        color="#2196F3"
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 40 }}
        />
      ) : weatherData ? (
        /* Since weatherData is a single object, we use a View or ScrollView 
           instead of FlatList (which is for lists of items).
        */
        <ScrollView style={styles.weatherCard}>
          <View style={styles.weatherItem}>
            <Text style={styles.weatherTitle}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <Text style={styles.weatherDescription}>
              Condition: {weatherData.weather[0].description}
            </Text>
            <Text style={styles.weatherContent}>Temperature: {weatherData.main.temp}°C</Text>
            <Text style={styles.weatherContent}>Feels Like: {weatherData.main.feels_like}°C</Text>
            <Text style={styles.weatherContent}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={styles.weatherContent}>Pressure: {weatherData.main.pressure} hPa</Text>
            <Text style={styles.weatherContent}>Wind Speed: {weatherData.wind.speed} m/s</Text>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>
          No weather data fetched yet. Press button!
        </Text>
      )}

      <Button
        title="Back to Home"
        onPress={() => navigation.popToTop()}
        color="#2196F3"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  weatherCard: { marginTop: 20 },
  weatherItem: { 
    padding: 20, 
    borderRadius: 10, 
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee' 
  },
  weatherTitle: { fontWeight: 'bold', fontSize: 22, marginBottom: 10, color: '#333' },
  weatherDescription: { color: '#666', fontSize: 16, marginBottom: 10, textTransform: 'capitalize' },
  weatherContent: { color: '#0c339e', fontSize: 16, marginBottom: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default WeatherScreen;