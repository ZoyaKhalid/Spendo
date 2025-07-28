import React, { useContext } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function ChartScreen() {
  const { transactions } = useContext(AppContext);
  const navigation = useNavigation();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const total = income + expense;

  const incomePercent = total > 0 ? ((income / total) * 100).toFixed(1) : 0;
  const expensePercent = total > 0 ? ((expense / total) * 100).toFixed(1) : 0;

  const chartData =
    income === 0 && expense === 0
      ? [
          {
            name: 'No Data',
            population: 1,
            color: '#BDBDBD',
            legendFontColor: '#757575',
            legendFontSize: 17,
          },
        ]
      : [
          {
            name: `Income ${incomePercent}%`,
            population: income || 0.1,
            color: '#3E7C78',
            legendFontColor: '#2E7D32',
            legendFontSize: 17,
          },
          {
            name: `Expense ${expensePercent}%`,
            population: expense || 0.1,
            color: '#EF5350',
            legendFontColor: '#D32F2F',
            legendFontSize: 17,
          },
        ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={37} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spending Chart</Text>
        <View style={{ width: 37 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => `#2E7D32`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Summary Amounts */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>₨ {income}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={[styles.summaryValue, { color: '#D32F2F' }]}>₨ {expense}</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.slice(-5).reverse().map((t, i) => (
            <View key={i} style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {t.date} - {t.title}
              </Text>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: t.type === 'Income' ? '#3E7C78' : '#D32F2F' },
                ]}
              >
                ₨ {t.amount}
              </Text>
            </View>
          ))}
          {transactions.length === 0 && (
            <Text style={styles.empty}>No transactions to show.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    backgroundColor: '#00897B',
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#F0F9F7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E7C78',
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
