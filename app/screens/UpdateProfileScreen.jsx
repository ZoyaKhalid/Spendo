import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';

export default function UpdateProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { setUserName } = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        setName(parsed.name || '');
        setGoal(parsed.goal || '');
        setEmail(parsed.email || '');
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
  const user = await AsyncStorage.getItem('user');
  console.log('Loaded User:', user);
    if (user) {
      const parsed = JSON.parse(user);
      parsed.name = name;
      parsed.goal = goal;
      parsed.email = email;
      await AsyncStorage.setItem('user', JSON.stringify(parsed));
      if (setUserName) setUserName(name);
      Alert.alert('Saved', 'Your profile has been updated!');
      showSuccessMessage();
    }
  };

  const showSuccessMessage = () => {
    setShowMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowMessage(false));
      }, 2000);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Profile</Text>
        <View style={{ width: 32 }} /> 
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar */}
      {showMessage && (
        <Animated.View style={[styles.snackbar, { opacity: fadeAnim }]}>
          <Text style={styles.snackbarText}>Changes saved successfully</Text>
        </Animated.View>
      )}
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
  form: {
    padding: 25,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    color: '#3E7C78',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
     fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00897B',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
  snackbar: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: '#4BB543',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  zIndex: 100,
},
snackbarText: {
  color: '#fff',
  fontSize: 16,
}
});
