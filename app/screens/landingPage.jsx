import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable'; // ✅ for animations
import images from '../Images';
  

const { height, width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Section with Background Shape and Logo Animation */}
      <View style={styles.topSection}>
        <View style={styles.purpleBackground} />
        
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          delay={300}
          source={images.Money}
          style={styles.logo}
        />
      </View>

      {/* Bottom Section with Animated Text and Buttons */}
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={800}
        style={styles.bottomSection}
      >
        <Text style={styles.heading}>Spend Smarter{'\n'}Save More</Text>

        <Animatable.View animation="fadeIn" delay={1200}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeIn" delay={1500}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: height * 0.65, // slightly reduced to make room for bottom
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleBackground: {
    position: 'absolute',
    top: -120, 
    width: width * 1.8, 
    height: height * 0.75, 
    backgroundColor: '#A3CFC7',
    transform: [{ rotate: '18deg' }],
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  logo: {
    width: 360,
    height: 360,
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: 40,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40, // pull up slightly under the shape
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E7C78',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3E7C78',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginText: {
    color: '#777',
    fontSize: 16,
  },
  loginLink: {
    color: '#3E7C78',
    fontWeight: 'bold',
  },
});

