import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { BudgetCard } from '../components/control/BudgetCard';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function BudgetsScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <ArrowLeft size={20} color={Colors.primaryBlack} />
                <Text style={styles.iconButtonText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Budgets</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Plus size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <BudgetCard 
              name="Software Subscriptions"
              allocated="$50,000.00"
              remaining="$18,240.00"
              progress={63.5} 
              dates="Nov 1 - Nov 30, 2023"
              onPress={() => {}}
            />
            
            <BudgetCard 
              name="Travel & Events"
              allocated="$25,000.00"
              remaining="$4,500.00"
              progress={82.0}
              dates="Nov 1 - Nov 30, 2023"
              onPress={() => {}}
            />
            
            <BudgetCard 
              name="Office Supplies"
              allocated="$2,000.00"
              remaining="$1,850.00"
              progress={7.5}
              dates="Nov 1 - Nov 30, 2023"
              onPress={() => {}}
            />

            <BudgetCard 
              name="Marketing & Ads"
              allocated="$100,000.00"
              remaining="$42,100.00"
              progress={57.9}
              dates="Q4 2023 (Oct - Dec)"
              onPress={() => {}}
            />

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  iconButtonText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
});
