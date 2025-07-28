import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    const trimmed = feedback.trim();

    if (trimmed.length === 0) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    const feedbackEntry = {
      message: trimmed,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        'https://lec-20-default-rtdb.firebaseio.com/feedbacks.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackEntry),
        }
      );

      if (!response.ok) throw new Error('Failed to send feedback to Firebase');

      setFeedback('');
      setSuccess('Thank you for sharing your feedback!');

      Alert.alert('Submitted', 'Your feedback was sent successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'Failed to send feedback');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Message Box */}
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>We'd love to hear your thoughts!</Text>
      </View>

      {/* Centered Feedback Form */}
      <View style={styles.centerContent}>
        <TextInput
          placeholder="Write your feedback here..."
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {success !== '' && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{success}</Text>
          </View>
        )}
      </View>
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
  messageBox: {
    marginTop: -40,
    alignItems: 'center',
    marginBottom: 10,
  },
  messageText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
    height: 120,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3E7C78',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  successBox: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
  },
  successText: {
    color: '#155724',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
