import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ConnectWalletScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Cards');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');

  const cards = [
    {
      id: 1,
      name: 'JazzCash Wallet',
      number: '0312-XXXXXXX',
      image: require('../Images/Card1.png'),
    },
    {
      id: 2,
      name: 'EasyPaisa Wallet',
      number: '0345-XXXXXXX',
      image: require('../Images/Card2.png'),
    },
  ];

  const accounts = [
    { id: 1, name: 'Bank Alfalah - 1234' },
    { id: 2, name: 'Meezan Bank - 5678' },
    { id: 3, name: 'HBL Bank - 9012' },
  ];

  const renderAccount = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.accountItem,
        selectedAccountId === item.id && styles.selectedAccount,
      ]}
      onPress={() => setSelectedAccountId(item.id)}
    >
      <Text style={styles.accountText}>{item.name}</Text>
      {selectedAccountId === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#2A7C76" />
      )}
    </TouchableOpacity>
  );

  return (
        activeTab === 'Cards' ? (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    {/* Header */}
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connect Wallet</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Cards' && styles.activeTab]}
          onPress={() => setActiveTab('Cards')}
        >
          <Text style={activeTab === 'Cards' ? styles.activeTabText : styles.tabText}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Accounts' && styles.activeTab]}
          onPress={() => setActiveTab('Accounts')}
        >
          <Text style={activeTab === 'Accounts' ? styles.activeTabText : styles.tabText}>Accounts</Text>
        </TouchableOpacity>
      </View>

      {/* Card Stack */}
      <View style={styles.cardStack}>
        <Image source={cards[1].image} style={[styles.cardImage, styles.cardBehind]} />
        <Image source={cards[0].image} style={styles.cardImage} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Muhammad Umar"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          keyboardType="numeric"
          value={cvv}
          onChangeText={setCvv}
        />
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiry}
          onChangeText={setExpiry}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('TransactionDetail')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
) : (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Connect Wallet</Text>
    </View>

    {/* Tabs */}
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Cards' && styles.activeTab]}
        onPress={() => setActiveTab('Cards')}
      >
        <Text style={activeTab === 'Cards' ? styles.activeTabText : styles.tabText}>Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Accounts' && styles.activeTab]}
        onPress={() => setActiveTab('Accounts')}
      >
        <Text style={activeTab === 'Accounts' ? styles.activeTabText : styles.tabText}>Accounts</Text>
      </TouchableOpacity>
    </View>

    {/* Accounts List and Next Button */}
    <FlatList
      data={accounts}
      renderItem={renderAccount}
      keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
    />

    {/* Next Button */}
    <TouchableOpacity
      style={styles.nextButton}
      onPress={() => navigation.navigate('TransactionDetail')}
    >
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  </View>
)
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#00897B',
    height: 150,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E1F4F3',
    borderRadius: 12,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
    color: '#fff',
    fontWeight: '600',
  },
  cardItem: {
    backgroundColor: '#F2FDFD',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0ECEB',
  },
  cardImage: {
    width: 280,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSub: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2FDFD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D0ECEB',
    alignItems: 'center',
  },
  selectedAccount: {
    backgroundColor: '#E1F4F3',
    borderColor: '#2A7C76',
  },
  accountText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#2A7C76',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    cardStack: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardImage: {
    width: 300,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 12,
    zIndex: 2,
  },
  cardBehind: {
    position: 'absolute',
    top: 25,
    zIndex: 1,
    opacity: 0.6,
  },
  inputGroup: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
});

