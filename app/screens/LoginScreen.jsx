import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../Images';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

//   if (email === 'test@example.com' && password === '123456') {
//     Alert.alert('Welcome!', `Logged in as ${email}`);
//     navigation.replace('HomeTabs'); // SAME AS Signup
//   } else {
//     Alert.alert('Login Failed', 'Incorrect credentials');
//   }
// };

 try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAi6oPe8nTux98XbwHmXVKOhxp4PVgekJQ`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        navigation.replace('HomeTabs');
      } else {
        const errorMsg = data.error?.message || 'Login failed';
        Alert.alert('Login Failed', errorMsg);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
     <Image source={images.Login} style={styles.logo} />


      {/* Heading */}
      <Text style={styles.header}>Login</Text>
      <Text style={styles.paragraph}>Please Sign In to continue.</Text>

      {/* Inputs */}
      <View style={styles.inputWrapper}>
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

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#3E7C78" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>
          <Text style={styles.linkGray}>Don't have an account? </Text>
          <Text style={styles.linkColor}>Sign up</Text>
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
    marginBottom: 30,
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
