import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { CreditCard } from '../components/dashboard/CreditCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { TransactionRow } from '../components/dashboard/TransactionRow';
import { BudgetRow } from '../components/dashboard/BudgetRow';
import { Search, BarChart2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { MainLayout } from '../components/layout/MainLayout';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <MainLayout activeTab="dashboard">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
               <View style={styles.avatar}>
                 <Text style={styles.avatarText}>A</Text>
               </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <BarChart2 size={20} color={Colors.primaryBlack} strokeWidth={1.5} />
                <Text style={styles.iconButtonText}>Insights</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Search size={20} color={Colors.primaryBlack} strokeWidth={1.5} />
                <Text style={styles.iconButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                tintColor={Colors.accentLime}
                colors={[Colors.accentLime]}
              />
            }
          >
            {/* Greeting */}
            <View style={styles.section}>
              <Text style={styles.greeting}>Good morning, Arian</Text>
              <Text style={styles.subGreeting}>Here's your company spend overview</Text>
            </View>

            {/* Corporate Card */}
            <View style={styles.section}>
              <CreditCard />
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsSection}>
              <QuickActions />
            </View>

            {/* Budgets */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Budgets</Text>
              <View style={styles.cardStack}>
                <BudgetRow title="Software Subscriptions" remaining="$2,400 left" icon="monitor" />
                <BudgetRow title="Travel & Events" remaining="$12,850 left" icon="briefcase" />
                <BudgetRow title="Office Supplies" remaining="$450 left" icon="coffee" />
              </View>
            </View>

            {/* Activity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Activity</Text>
                <TouchableOpacity onPress={() => router.push('/transactions')} activeOpacity={0.7}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.activityList}>
                <TransactionRow 
                  merchant="Figma" 
                  date="Today, 9:41 AM" 
                  amount="$15.00" 
                  status="complete" 
                />
                <TransactionRow 
                  merchant="Uber" 
                  date="Yesterday" 
                  amount="$24.50" 
                  status="needs_attention" 
                />
                <TransactionRow 
                  merchant="Slack" 
                  date="Oct 24" 
                  amount="$8.90" 
                  status="complete" 
                />
              </View>
            </View>

            {/* Padding for floating nav bar */}
            <View style={{ height: 120 }} /> 
          </ScrollView>
        </View>
      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarContainer: {},
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
  },
  iconButtonText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  scrollContent: {
    paddingTop: 16,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  greeting: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  subGreeting: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
    marginBottom: 12,
  },
  seeAll: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: '#8CBF15',
    padding: 4,
  },
  cardStack: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  activityList: {},
});
