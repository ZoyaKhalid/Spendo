import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';

export default function HistoryScreen({ navigation }) {
  const { transactions, setTransactions } = useContext(AppContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleDelete = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
    setSuccessMessage('History deleted successfully');

    setTimeout(() => {
      setSuccessMessage('');
    }, 2000); 
  };

  const isWithinLastWeek = (date) => {
    return moment().diff(moment(date), 'days') <= 7;
  };

  const isWithinLastMonth = (date) => {
    return moment().diff(moment(date), 'days') <= 30;
  };

  const filteredTransactions = transactions.filter((item) => {
    switch (selectedFilter) {
      case 'Last Week':
        return isWithinLastWeek(item.date);
      case 'Last Month':
        return isWithinLastMonth(item.date);
      case 'Money Add':
        return item.type === 'Income';
      default:
        return true;
    }
  });

  const renderFilterButton = (label) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === label && styles.filterButtonSelected,
      ]}
      onPress={() => setSelectedFilter(label)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === label && styles.filterButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={37} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 32 }} /> 
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter By</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {renderFilterButton('All')}
            {renderFilterButton('Last Week')}
            {renderFilterButton('Last Month')}
            {renderFilterButton('Money Add')}
          </View>
        </ScrollView>
      </View>

      {/* View History Title */}
      {transactions.length > 0 && (
        <Text style={styles.viewHistoryText}>View History</Text>
      )}

      {/* Success Message */}
      {successMessage !== '' && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      {/* If No History */}
      {transactions.length === 0 ? (
        <View style={styles.noHistoryBox}>
          <Text style={styles.noHistoryText}>No history!</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View style={styles.itemContent}>
                <Text style={styles.text}>
                  {/* {item.title} - ₨ {item.amount} ({item.type}) */}
                  {(item.title || 'No title')} - ₨ {(item.amount || 0)} ({item.type || 'N/A'})
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E7C78',
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#3E7C78',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  filterButtonSelected: {
    backgroundColor: '#3E7C78',
  },
  filterButtonText: {
    color: '#3E7C78',
    fontWeight: 'bold',
  },
  filterButtonTextSelected: {
    color: '#fff',
  },
  viewHistoryText: {
    fontSize: 20,
    color: '#3E7C78',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  successBox: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  successText: {
    color: '#155724',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  text: {
    color: '#3E7C78',
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
 deleteBtn: {
  borderColor: '#a94442',
  borderWidth: 2,          
  borderRadius: 20,
  paddingVertical: 5,
  paddingHorizontal: 12,
  marginLeft: 10,
},
  deleteText: {
    color: '#a94442',
    fontWeight: 'bold',
    fontSize: 13,
  },
  noHistoryBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     
  },
  noHistoryText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '500',
  },
});
