import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardSummary } from '../../redux/slices/dashboardSlice';
import { RootState, AppDispatch } from '../../redux/store';
import SummaryCard from '../../components/dashboad/dashboadCard';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { summary, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const chartData = summary
    ? [
        {
          name: 'Active',
          population: summary.activeCustomers,
          color: '#28a745',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Inactive',
          population: summary.inactiveCustomers,
          color: '#6c757d',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Lead',
          population: summary.leadCustomers,
          color: '#ffc107',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ]
    : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : summary ? (
        <>
          <View style={styles.cardRow}>
            <SummaryCard title="Total Customers" value={summary.totalCustomers} />
            <SummaryCard title="Total Opportunities" value={summary.totalOpportunities} />
          </View>

          <View style={styles.cardRow}>
            <SummaryCard title="New Opp." value={summary.newOpportunities} backgroundColor="#e3f2fd" />
            <SummaryCard title="Won Opp." value={summary.closedWonOpportunities} backgroundColor="#d0f0c0" />
            <SummaryCard title="Lost Opp." value={summary.closedLostOpportunities} backgroundColor="#f8d7da" />
          </View>

          <Text style={styles.chartTitle}>Customer Status Breakdown</Text>
          <PieChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </>
      ) : null}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1c1c1e',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: '#c00',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Dashboard;
