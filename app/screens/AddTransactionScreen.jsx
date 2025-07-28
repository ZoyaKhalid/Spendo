import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';

export default function AddTransactionScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Income');
  const { transactions, setTransactions } = useContext(AppContext);
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please enter both title and amount.');
      return;
    }

    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      // Send to Firebase
      const response = await fetch(
        'https://lec-20-default-rtdb.firebaseio.com/transactions.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransaction),
        }
      );

      if (!response.ok) throw new Error('Failed to save transaction to Firebase');

      // Update local context state
      setTransactions([...transactions, newTransaction]);

      Alert.alert('Success', 'Transaction saved successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={37} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        {/* Title */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Income/Expense Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              type === 'Income' && styles.toggleSelected,
            ]}
            onPress={() => setType('Income')}
          >
            <Text
              style={[
                styles.toggleText,
                type === 'Income' && styles.toggleTextSelected,
              ]}
            >
              Income ₨
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              type === 'Expense' && styles.toggleSelected,
            ]}
            onPress={() => setType('Expense')}
          >
            <Text
              style={[
                styles.toggleText,
                type === 'Expense' && styles.toggleTextSelected,
              ]}
            >
              Expense ₨
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3E7C78',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#00897B',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  toggleSelected: {
    borderColor: '#00897B',
    backgroundColor: '#D1F2EB',
  },
  toggleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#888',
  },
  toggleTextSelected: {
    color: '#2E7D32',
  },
  saveBtn: {
    backgroundColor: '#00897B',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
