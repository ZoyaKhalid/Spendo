import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';

export default function WalletScreen({navigation}) {
  const [tab, setTab] = useState('Transactions'); // Toggle between tabs
  const { transactions } = useContext(AppContext); // From HomeScreen

  const bills = [
    { id: '1', title: 'Electricity', amount: 'Rs. 2,300', due: '30 July' },
    { id: '2', title: 'Internet', amount: 'Rs. 1,500', due: '28 July' },
    { id: '3', title: 'Gas', amount: 'Rs. 900', due: '5 August' },
  ];

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === 'Income' ? '#2A7C76' : 'crimson' }
        ]}
      >
        {item.type === 'Income' ? '+' : '-'} Rs. {item.amount}
      </Text>
    </View>
  );

  const renderBill = ({ item }) => (
  <View style={styles.billCard}>
    <View>
      <Text style={styles.billTitle}>{item.title}</Text>
      <Text style={styles.billDue}>Due: {item.due}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.billAmount}>{item.amount}</Text>
      <TouchableOpacity 
        style={styles.payButton} 
        onPress={() => navigation.navigate('BillDetails')}
      >
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Wallet</Text>
        </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>
          Rs.{' '}
          {transactions.reduce((sum, t) => sum + (t.type === 'Income' ? t.amount : -t.amount), 0)}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ConnectWallet')}
        >
            <Icon name="add-circle" size={32} color="#2A7C76" />
            <Text style={styles.iconText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('BillDetails')}
        >
          <Ionicons name="send" size={26} color="#2A7C76" />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('BillDetails')}
        >
          <FontAwesome5 name="money-bill-wave" size={26} color="#2A7C76" />
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'Transactions' && styles.activeTab]}
          onPress={() => setTab('Transactions')}
        >
          <Text style={tab === 'Transactions' ? styles.activeTabText : styles.tabText}>
            Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'Bills' && styles.activeTab]}
          onPress={() => setTab('Bills')}
        >
          <Text style={tab === 'Bills' ? styles.activeTabText : styles.tabText}>
            Upcoming Bills
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {tab === 'Transactions' ? (
        transactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet.</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={renderTransaction}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBill}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
  backgroundColor: '#00897B',
  height: 150,
  borderBottomLeftRadius: 60,
  borderBottomRightRadius: 60,
  paddingTop: 50,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 6,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  marginBottom: 20,
},
headerTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
},
  balanceCard: {
    backgroundColor: '#E1F4F3',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#555',
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A7C76',
    marginTop: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 6,
    color: '#2A7C76',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E1F4F3',
    borderRadius: 12,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#2A7C76',
  },
  tabText: {
    color: '#2A7C76',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2FDFD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D0ECEB',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2FDFD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D0ECEB',
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  billDue: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  billAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A7C76',
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  payButton: {
  backgroundColor: '#2A7C76',
  marginTop: 6,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 10,
},
payButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},

});
