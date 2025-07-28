import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../Images';

export default function ProfileMenuScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        setName(parsed.name || '');
        setEmail('@' + (parsed.email?.split('@')[0] || ''));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Logged out', 'You have been logged out.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={37} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 28 }} /> 
      </View>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={images.Avatar} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('UpdateProfile')}
        >
          <Icon name="edit" size={28} color="#3E7C78" style={styles.icon} />
          <Text style={styles.optionText}>Profile Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('History')}
        >
          <Icon name="history" size={28} color="#3E7C78" style={styles.icon} />
          <Text style={styles.optionText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Feedback')}
        >
          <Icon name="feedback" size={28} color="#3E7C78" style={styles.icon} />
          <Text style={styles.optionText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Icon name="info" size={28} color="#3E7C78" style={styles.icon} />
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.logout]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={28} color="#D32F2F" style={styles.icon} />
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00897B',
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  email: {
    fontSize: 20,
    color: '#4DB6AC',
    fontWeight: '500',
  },
  menu: {
    paddingHorizontal: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    color: '#3E7C78',
    fontWeight: '600',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
});
