import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to the News App! </Text>

      {/* This View acts as a row container */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="News Updates"
            onPress={() => navigation.navigate('News')}
            color="#1E88E5"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Weather Updates"
            onPress={() =>
              navigation.navigate('Weather')}
            color="#43A047"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Aligns children horizontally
    justifyContent: 'space-between', 
    width: '80%', // Controls how far apart the buttons are
  },
  buttonWrapper: {
    flex: 1, // Makes both buttons take up equal width
    marginHorizontal: 10, // Adds space between the buttons
  },
});

export default HomeScreen;