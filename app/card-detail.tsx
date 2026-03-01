import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { CreditCard } from '../components/dashboard/CreditCard';
import { TransactionRow } from '../components/dashboard/TransactionRow';
import { ArrowLeft, MoreHorizontal, ChevronRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Toggle } from '../components/ui/Toggle';

export default function CardDetailScreen() {
  const router = useRouter();
  const [isFrozen, setIsFrozen] = useState(false);

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Top Bar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Card</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconButtonText}>Options</Text>
              <MoreHorizontal size={20} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Card Display */}
            <View style={styles.cardSection}>
              <CreditCard 
                brand="cleer"
                team="Software Subscriptions"
                balanceLabel="Arian Z."
                limit="Exp 12/28"
                number="•••• 8294"
                showStatus={true}
                frozen={isFrozen}
              />
            </View>

            {/* Spend Limit Section */}
            <View style={styles.limitCard}>
              <Text style={styles.limitAmount}>$5,000.00</Text>
              <View style={styles.limitUnderline} />
              <Text style={styles.limitSubtitle}>Monthly limit</Text>
            </View>

            {/* Card Controls */}
            <View style={styles.controlsCard}>
              <View style={styles.controlRow}>
                <Text style={styles.controlLabel}>Freeze card</Text>
                <Toggle active={isFrozen} onToggle={() => setIsFrozen(!isFrozen)} />
              </View>
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.controlRow} activeOpacity={0.7}>
                <Text style={styles.controlLabel}>Edit spend limit</Text>
                <ChevronRight size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.controlRow} activeOpacity={0.7}>
                <Text style={styles.controlLabel}>Change assigned user</Text>
                <ChevronRight size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.controlRow} activeOpacity={0.7}>
                <Text style={styles.controlLabel}>View all transactions</Text>
                <ChevronRight size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Recent Activity */}
            <View style={styles.activitySection}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <View style={styles.activityList}>
                <TransactionRow 
                  merchant="Figma" 
                  date="Today, 9:41 AM" 
                  amount="$15.00" 
                  status="cleared" 
                />
                <TransactionRow 
                  merchant="Adobe" 
                  date="Oct 22" 
                  amount="$54.99" 
                  status="cleared" 
                />
                <TransactionRow 
                  merchant="GitHub" 
                  date="Oct 18" 
                  amount="$24.00" 
                  status="cleared" 
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cardSection: {
    marginBottom: 24,
  },
  limitCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  limitAmount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 28,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  limitUnderline: {
    height: 2,
    width: 48,
    backgroundColor: Colors.accentLime,
    marginBottom: 8,
    borderRadius: 1,
  },
  limitSubtitle: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  controlsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  controlLabel: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  activitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: 'transparent',
  },
});
