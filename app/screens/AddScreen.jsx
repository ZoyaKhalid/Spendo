import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function AddScreen({ navigation }) {
  const { transactions, setTransactions } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Income');

  const handleAdd = () => {
    if (!title || !amount) return;
    const newTx = { title, amount: parseFloat(amount), type };
    setTransactions([...transactions, newTx]);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Type (Income/Expense)" value={type} onChangeText={setType} style={styles.input} />
      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#EAF8ED' },
  header: { fontSize: 20, marginBottom: 10, color: '#2E7D32', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', marginBottom: 10, padding: 10, borderRadius: 8 },
  button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
