import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider as PaperProvider } from 'react-native-paper';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

function TransactionItem({ item, index, onEdit, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.itemTopRow}>
        <Text style={styles.itemText}>
          {item.title} - ₨ {item.amount} ({item.type})
        </Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Text style={styles.menuIcon}>⋮</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => { setMenuVisible(false); onEdit(index); }} title="Edit" />
        </Menu>
      </View>
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { transactions, deleteTransaction } = useContext(AppContext);
  const [userName, setUserName] = useState('');

  const income = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const { name } = JSON.parse(userData);
        setUserName(name);
      }
    };
    loadUser();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Header Background */}
        <View style={styles.headerBackground}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.name}>{userName}</Text>
            </View>
            
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₨ {income - expense}</Text>
          <View style={styles.incomeExpenseRow}>
            <View style={styles.incomeExpenseBox}>
              <Text style={styles.label}>Income</Text>
              <Text style={styles.value}>₨ {income}</Text>
            </View>
            <View style={styles.incomeExpenseBox}>
              <Text style={styles.label}>Expenses</Text>
              <Text style={styles.value}>₨ {expense}</Text>
            </View>
          </View>
        </View>

   
  {transactions.length > 0 && (
  <View style={styles.transactionHistoryHeader}>
    <Text style={styles.transactionHistoryTitle}>Transaction History</Text>
    <TouchableOpacity onPress={() => navigation.navigate('History')}>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
)}


        <FlatList
          style={{ marginTop: 20 }}
          data={transactions}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item, index }) => (
            <TransactionItem
              item={item}
              index={index}
              onEdit={(i) => navigation.navigate('Edit', { index: i })}
              onDelete={(id) => deleteTransaction(id)}
            />
          )}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBackground: {
    backgroundColor: '#2A7C76',
    height: 160,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceCard: {
    backgroundColor: '#3EA488',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginTop: -40,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#fff',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  incomeExpenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeExpenseBox: {
    flex: 0.48,
  },
  label: {
    color: '#C8E6C9',
    fontSize: 17,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    fontWeight:'bold',
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#333',
    flex: 1,
    fontSize: 18,
  },
  itemDate: {
    fontSize: 15,
    color: 'gray',
    marginTop: 4,
  },
  menuIcon: {
    fontSize: 27,
    paddingHorizontal: 8,
    color: '#3EA488',
  },
  transactionHistoryHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 8,
  marginTop: 20,
  borderRadius: 10,
  marginHorizontal: 20,
  
},
transactionHistoryTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},
seeAll: {
  fontSize: 16,
  color: 'grey',
},

});
