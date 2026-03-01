import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { Plus, X, CheckCircle2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { TripCard, PastTripRow } from '../components/travel/TripComponents';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MotiView } from 'moti';

export default function TravelScreen() {
  const router = useRouter();
  const [createVisible, setCreateVisible] = useState(false);
  const [tripStep, setTripStep] = useState<'form' | 'loading' | 'success'>('form');
  
  const [dest, setDest] = useState('');
  const [dates, setDates] = useState('');
  const [budget, setBudget] = useState('');

  const handleCreateTrip = () => {
    setTripStep('loading');
    setTimeout(() => setTripStep('success'), 1500);
  };

  const closeCreateModal = () => {
    setCreateVisible(false);
    setTimeout(() => {
      setTripStep('form');
      setDest('');
      setDates('');
      setBudget('');
    }, 300);
  };

  return (
    <MainLayout activeTab="travel">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Travel</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.7}
              onPress={() => setCreateVisible(true)}
            >
              <Plus size={20} color={Colors.primaryBlack} />
              <Text style={styles.addButtonText}>Add Trip</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Policy Banner */}
            <View style={styles.policyCard}>
              <View style={styles.policyDot} />
              <Text style={styles.policyText}>Travel policy applies to bookings</Text>
            </View>

            {/* Upcoming Trips Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
              <TripCard 
                city="Dallas" 
                dates="Nov 12 - Nov 15" 
                amount="$1,240.00" 
                status="Confirmed" 
                isActive={true} 
              />
              <TripCard 
                city="New York" 
                dates="Dec 04 - Dec 08" 
                amount="$2,100.00" 
                status="Pending" 
                isActive={false} 
              />
            </View>

            {/* Past Trips Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Trips</Text>
              <View style={styles.pastTripsContainer}>
                <PastTripRow city="Chicago" dates="Oct 10 - Oct 12" amount="$850.00" />
                <PastTripRow city="Seattle" dates="Sep 22 - Sep 25" amount="$1,420.00" />
                <PastTripRow city="Austin" dates="Aug 05 - Aug 07" amount="$930.00" />
              </View>
            </View>

            {/* Padding for floating nav bar */}
            <View style={{ height: 120 }} /> 
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Create Trip Bottom Sheet */}
      <Modal
        visible={createVisible}
        transparent
        animationType="slide"
        onRequestClose={closeCreateModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeCreateModal}>
          <Pressable style={styles.bottomSheet}>
            {tripStep === 'form' ? (
              <>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Create New Trip</Text>
                  <TouchableOpacity onPress={closeCreateModal} style={styles.closeButton}>
                    <X size={24} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.formContainer}>
                  <Input 
                    placeholder="Destination city" 
                    value={dest} 
                    onChangeText={setDest} 
                  />
                  <Input 
                    placeholder="Dates (e.g. Nov 12 - Nov 15)" 
                    value={dates} 
                    onChangeText={setDates} 
                  />
                  <Input 
                    placeholder="Estimated Budget" 
                    keyboardType="numeric" 
                    value={budget} 
                    onChangeText={setBudget} 
                  />
                  
                  <Button 
                    title="Create Trip" 
                    onPress={handleCreateTrip} 
                    style={styles.createButton}
                    textStyle={{ color: Colors.white }}
                  />
                </View>
              </>
            ) : tripStep === 'loading' ? (
              <View style={styles.loadingContainer}>
                <View style={styles.progressTrack}>
                  <MotiView 
                    from={{ width: '0%' }} 
                    animate={{ width: '100%' }} 
                    transition={{ type: 'timing', duration: 1500 }}
                    style={styles.progressFill} 
                  />
                </View>
                <Text style={styles.loadingText}>Creating trip...</Text>
              </View>
            ) : (
              <View style={styles.successContainer}>
                <MotiView
                  from={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle2 size={64} color={Colors.accentLime} strokeWidth={1.5} />
                </MotiView>
                <Text style={styles.successTitle}>Trip Created</Text>
                <Text style={styles.successSubtitle}>Your travel request is ready.</Text>
                
                <View style={styles.summaryCard}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Destination</Text>
                    <Text style={styles.summaryValue}>{dest || 'Dallas, TX'}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Dates</Text>
                    <Text style={styles.summaryValue}>{dates || 'Nov 12 - Nov 15'}</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.noBorder]}>
                    <Text style={styles.summaryLabel}>Budget</Text>
                    <Text style={styles.summaryValue}>${budget || '2,000'}</Text>
                  </View>
                </View>

                <Button 
                  title="Return to Dashboard" 
                  onPress={() => {
                    closeCreateModal();
                    router.replace('/dashboard');
                  }} 
                  style={styles.homeButton}
                  textStyle={{ color: Colors.white }}
                />
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  addButtonText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryBlack,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    gap: 12,
  },
  policyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentLime,
  },
  policyText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.primaryBlack,
    flex: 1,
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
  pastTripsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  closeButton: {
    padding: 4,
    marginRight: -4,
  },
  formContainer: {
    gap: 8,
  },
  createButton: {
    backgroundColor: Colors.primaryBlack,
    marginTop: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.divider,
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accentLime,
    borderRadius: 2,
  },
  loadingText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  successTitle: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 24,
    color: Colors.primaryBlack,
    marginTop: 24,
    marginBottom: 8,
  },
  successSubtitle: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  homeButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
});
