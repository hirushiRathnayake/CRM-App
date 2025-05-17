import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardSummary } from '../../redux/slices/dashboardSlice';
import { RootState, AppDispatch } from '../../redux/store';
import SummaryCard from '../../components/dashboad/dashboadCard';
import { PieChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/common/header';
import BottomNavBar from '@/components/common/bottomNavbar';

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

  const barData = summary
    ? {
        labels: ['New', 'Won', 'Lost'],
        datasets: [
          {
            data: [
              summary.newOpportunities,
              summary.closedWonOpportunities,
              summary.closedLostOpportunities,
            ],
          },
        ],
      }
    : null;

  return (
    <>
     <Header title="Dashboard" />
  <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>

       
      

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : summary ? (
        <>
          <View style={styles.cardRow}>
            <SummaryCard title="Total Customers" value={summary.totalCustomers} backgroundColor="#e0f7fa" textColor="#006064" icon={<Icon name="users" size={24} color="#006064" />} />
            <SummaryCard title="Total Opportunities" value={summary.totalOpportunities} backgroundColor="#f3e5f5" textColor="#6a1b9a" icon={<Icon name="briefcase" size={24} color="#6a1b9a" />} />
          </View>

          <View style={styles.cardRow}>
            <SummaryCard title="New Opp." value={summary.newOpportunities} backgroundColor="#e3f2fd" textColor="#0277bd" icon={<Icon name="star" size={24} color="#0277bd" />} />
            <SummaryCard title="Won Opp." value={summary.closedWonOpportunities} backgroundColor="#d0f0c0" textColor="#2e7d32" icon={<Icon name="thumbs-up" size={24} color="#2e7d32" />} />
            <SummaryCard title="Lost Opp." value={summary.closedLostOpportunities} backgroundColor="#f8d7da" textColor="#c62828" icon={<Icon name="thumbs-down" size={24} color="#c62828" />} />
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

          <Text style={styles.chartTitle}>Opportunities Overview</Text>
          {barData && (
            <BarChart
              data={barData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={10}
              showValuesOnTopOfBars
            />
          )}
        </>
      ) : null}
      
    </ScrollView>
    <BottomNavBar/>
    </>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
//   marginbottom: 0,
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