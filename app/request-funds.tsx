import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Paperclip, CheckCircle2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';

export default function RequestFundsScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [amountFocused, setAmountFocused] = useState(false);
  
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    setStep('loading');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'loading') {
    return (
      <MainLayout activeTab="dashboard" disableFab>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <View style={styles.progressTrack}>
              <MotiView 
                from={{ width: '0%' }} 
                animate={{ width: '100%' }} 
                transition={{ type: 'timing', duration: 2000 }}
                style={styles.progressFill} 
              />
            </View>
            <Text style={styles.loadingText}>Submitting request...</Text>
          </View>
        </SafeAreaView>
      </MainLayout>
    );
  }

  if (step === 'success') {
    return (
      <MainLayout activeTab="dashboard" disableFab>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.successContainer}>
            <CheckCircle2 size={64} color={Colors.accentLime} strokeWidth={1.5} />
            <Text style={styles.successTitle}>Request Submitted</Text>
            <Text style={styles.successSubtitle}>Your manager will review this request.</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Amount</Text>
                <Text style={styles.summaryValue}>$500.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Budget</Text>
                <Text style={styles.summaryValue}>{budget || 'Travel & Events'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Category</Text>
                <Text style={styles.summaryValue}>{category || 'Flights'}</Text>
              </View>
              <View style={[styles.summaryRow, styles.noBorder]}>
                <Text style={styles.summaryLabel}>Status</Text>
                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingText}>Pending Review</Text>
                </View>
              </View>
            </View>

            <Button 
              title="Back to Home" 
              onPress={() => router.replace('/dashboard')} 
              style={styles.homeButton}
              textStyle={{ color: Colors.white }}
            />
          </View>
        </SafeAreaView>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeTab="dashboard">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Request Funds</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.formCard}>
              <View style={[styles.amountWrapper, amountFocused && styles.amountFocused]}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput 
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="decimal-pad"
                  onFocus={() => setAmountFocused(true)}
                  onBlur={() => setAmountFocused(false)}
                />
              </View>

              <Select 
                placeholder="Select Budget"
                value={budget}
                options={['Software Subscriptions', 'Travel & Events', 'Office Supplies', 'Marketing']}
                onSelect={setBudget}
              />
              
              <Select 
                placeholder="Select Category"
                value={category}
                options={['Flights', 'Hotels', 'Meals', 'Software', 'Other']}
                onSelect={setCategory}
              />

              <Input placeholder="Purpose" multiline />
              
              <Input placeholder="Needed by (e.g. Nov 15)" />

              <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
                <Paperclip size={20} color={Colors.textSecondary} />
                <Text style={styles.attachText}>Attach supporting document (optional)</Text>
              </TouchableOpacity>
            </View>

            <Button 
              title="Submit Request" 
              onPress={handleSubmit} 
              style={styles.submitButton}
              textStyle={{ color: Colors.white }}
            />

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
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingVertical: 16,
    marginBottom: 24,
  },
  amountFocused: {
    borderBottomColor: '#A0A0A0', // Subtly darkened
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  currencySymbol: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 32,
    color: Colors.primaryBlack,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Urbanist_700Bold',
    fontSize: 32,
    color: Colors.primaryBlack,
    padding: 0,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  attachText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  submitButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
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
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
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
  pendingBadge: {
    backgroundColor: '#E8E8E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  pendingText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  homeButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
});
