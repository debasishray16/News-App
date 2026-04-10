import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NEWS_API_KEY } from '@env'; // Import the key here
import { Linking, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsScreen = ({ navigation }) => {
  const [newsData, setnewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const API_KEY = '026689bd8ecb409e8f3c5c04fec8b954';
  const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data.status === 'ok') {
        console.log('Fetched news data: ', data.articles); // Log the fetched data
        setnewsData(data.articles);
      } else {
        Alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetch data: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Button
        title="Fetch News"
        onPress={fetchNews}
        color="#2196F3"
        borderWidth={2}
        style={{ borderRadius: 10 }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 40, size: 20 }}
        />
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          } // Added optional chaining and index fallback
          renderItem={({ item }) => (
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              <Text style={styles.newsContent}>{item.content}</Text>

              <Pressable onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.newsUrl}>Link to News</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No news fetched yet. Press button!
            </Text>
          }
        />
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
  newsItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    marginVertical: 2,
  },
  newsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },
  newsDescription: { color: '#000000', fontSize: 12 },
  newsContent: { color: '#0c339e', fontSize: 12, textAlign: 'justify' },
  newsUrl: {
    color: '#2196F3',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
});

export default NewsScreen;
