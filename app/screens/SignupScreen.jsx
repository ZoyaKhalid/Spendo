import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../Images'; // path should point to your image file

const FIREBASE_API_KEY =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAi6oPe8nTux98XbwHmXVKOhxp4PVgekJQ';


export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }


    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    const userData = { name, email, goal };
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    Alert.alert('Welcome!', `Account created for ${name}`);
    navigation.replace('HomeTabs');
    try {
      const response = await fetch(FIREBASE_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

   
      const result = await response.json();
      console.log("Signup Response:", result);

      if (response.ok && result.idToken) {
        Alert.alert("Success", `Welcome, ${name}`);
        navigation.replace("Dashboard");
      } else {
        Alert.alert("Signup Failed", result.error?.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.SignUp} style={styles.logo} />
      <View style={{ marginBottom: 15 }} /> 

      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.paragraph}>Create your account</Text>

      <View style={styles.inputWrapper}>
        {/* Name */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#3E7C78" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#3E7C78" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={10} color="#3E7C78" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View
          style={[
            styles.inputContainer,
            !passwordsMatch && { borderColor: 'red' },
          ]}
        >
          <Icon
            name="lock-outline"
            size={10}
            color={passwordsMatch ? '#3E7C78' : 'red'}
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {!passwordsMatch && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        {/* Goal */}
        <View style={styles.inputContainer}>
          <Icon name="flag" size={10} color="#3E7C78" style={styles.icon} />
          <TextInput
            placeholder="Expense Goal (Optional)"
            style={styles.input}
            value={goal}
            onChangeText={setGoal}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          <Text style={styles.linkGray}>Already have an account? </Text>
          <Text style={styles.linkColor}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#3E7C78',
    marginBottom: 5,
  },
  paragraph: {
    color: '#3E7C78',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#3E7C78',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  linkGray: {
    color: '#777',
  },
  linkColor: {
    color: '#3E7C78',
    fontWeight: 'bold',
  },
});


