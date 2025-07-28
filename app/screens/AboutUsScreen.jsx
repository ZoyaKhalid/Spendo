import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AboutUsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} ></View> 
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to Spendo 💼</Text>

          <Text style={styles.paragraph}>
            Our Spendo is a beautifully designed mobile app that helps you track your income, spending,
            and manage your financial life with ease.
          </Text>

          <Text style={styles.paragraph}>
            Whether you're a student, a professional, or managing a family keeping your expenses
            in check is essential. Our app makes it simple and quick.
          </Text>

          <Text style={styles.paragraph}>
            Built with ❤️ by passionate developers using React Native and Expo, this app was designed to be
            clean, lightweight, and powerful just like modern finance tools should be.
          </Text>

          <Text style={styles.paragraph}>
            We believe that money should be managed, not feared. Stay in control, stay smart with Expense Tracker.
          </Text>

          <Text style={styles.footer}>Thank you for using our app! 🌿</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00897B',
    height: 180,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
    fontWeight: '450',
  },
  footer: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
});
