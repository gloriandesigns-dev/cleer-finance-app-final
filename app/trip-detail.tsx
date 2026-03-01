import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, MoreHorizontal } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { BookingRow } from '../components/travel/TripComponents';
import { TransactionRow } from '../components/dashboard/TransactionRow';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';

export default function TripDetailScreen() {
  const router = useRouter();
  const [perDiemEnabled, setPerDiemEnabled] = useState(true);

  return (
    <MainLayout activeTab="travel">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Top Bar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Dallas</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconButtonText}>Options</Text>
              <MoreHorizontal size={20} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Trip Summary Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryDates}>Nov 12 - Nov 15, 2023</Text>
              <Text style={styles.summaryAmount}>$1,240.00</Text>
              <View style={styles.summaryUnderline} />
              <Text style={styles.summaryBudget}>$2,000 trip budget</Text>
            </View>

            {/* Bookings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bookings</Text>
              <View style={styles.cardStack}>
                <BookingRow 
                  vendor="Delta Airlines" 
                  type="flight" 
                  datetime="Nov 12 • 8:30 AM" 
                  amount="$450.00" 
                  status="Confirmed" 
                  isActive={true} 
                />
                <BookingRow 
                  vendor="Hilton Downtown" 
                  type="hotel" 
                  datetime="Nov 12 - Nov 15" 
                  amount="$790.00" 
                  status="Confirmed" 
                  isActive={true} 
                />
              </View>
            </View>

            {/* Per Diem Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Per Diem</Text>
              <View style={styles.perDiemCard}>
                <View>
                  <Text style={styles.perDiemTitle}>Daily Allowance</Text>
                  <Text style={styles.perDiemAmount}>$75.00 / day</Text>
                </View>
                <Toggle active={perDiemEnabled} onToggle={() => setPerDiemEnabled(!perDiemEnabled)} />
              </View>
            </View>

            {/* Expenses Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expenses</Text>
              <View style={styles.cardStack}>
                <TransactionRow 
                  merchant="Uber" 
                  date="Nov 12" 
                  amount="$34.50" 
                  status="cleared" 
                />
                <TransactionRow 
                  merchant="Starbucks" 
                  date="Nov 12" 
                  amount="$6.40" 
                  status="cleared" 
                />
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
              <Button 
                title="Book Travel" 
                onPress={() => router.push('/hotel-booking')} 
                style={styles.bookButton}
                textStyle={{ color: Colors.white }}
              />
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
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryDates: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  summaryAmount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 28,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  summaryUnderline: {
    height: 2,
    width: 48,
    backgroundColor: Colors.accentLime,
    marginBottom: 8,
    borderRadius: 1,
  },
  summaryBudget: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
    marginBottom: 16,
  },
  cardStack: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  perDiemCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  perDiemTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  perDiemAmount: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actionContainer: {
    marginTop: 8,
  },
  bookButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
});
