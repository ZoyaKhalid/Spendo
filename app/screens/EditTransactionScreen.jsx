import { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EditTransactionScreen({ route, navigation }) {
  const { id } = route.params;
  const { transactions, setTransactions } = useContext(AppContext);

  const transaction = transactions.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount.toString());
    } else {
      Alert.alert('Error', 'Transaction not found');
      navigation.goBack();
    }
  }, [transaction]);

  const handleUpdate = () => {
    const updated = transactions.map(t =>
      t.id === id ? { ...t, title, amount: parseFloat(amount) } : t
    );
    setTransactions(updated);
    Alert.alert('Updated', 'Transaction updated successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={34} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Transaction</Text>
        <View style={{ width: 30 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Form Content */}
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter transaction title"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#00897B',
    height: 150,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 50,
    paddingHorizontal: 20,
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
    flex: 1,
  },
  label: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 5,
    color: '#3E7C78',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3E7C78',
    paddingVertical: 15,
    borderRadius: 10,
    
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
