import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';

export default function ReceiptFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUri = Array.isArray(params.imageUri) ? params.imageUri[0] : params.imageUri;
  
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [amountFocused, setAmountFocused] = useState(false);
  
  const [category, setCategory] = useState('Meals');
  const [budget, setBudget] = useState('Travel & Events');

  const handleSubmit = () => {
    setStep('loading');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'loading') {
    return (
      <MainLayout activeTab="transactions" disableFab>
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
            <Text style={styles.loadingText}>Submitting expense...</Text>
          </View>
        </SafeAreaView>
      </MainLayout>
    );
  }

  if (step === 'success') {
    return (
      <MainLayout activeTab="transactions" disableFab>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.successContainer}>
            <CheckCircle2 size={64} color={Colors.accentLime} strokeWidth={1.5} />
            <Text style={styles.successTitle}>Expense Submitted</Text>
            <Text style={styles.successSubtitle}>Your receipt has been recorded.</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Merchant</Text>
                <Text style={styles.summaryValue}>Uber</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Amount</Text>
                <Text style={styles.summaryValue}>$24.50</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Category</Text>
                <Text style={styles.summaryValue}>{category}</Text>
              </View>
              <View style={[styles.summaryRow, styles.noBorder]}>
                <Text style={styles.summaryLabel}>Status</Text>
                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingText}>Pending Review</Text>
                </View>
              </View>
            </View>

            <Button 
              title="Done" 
              onPress={() => router.replace('/transactions')} 
              style={styles.homeButton}
              textStyle={{ color: Colors.white }}
            />
          </View>
        </SafeAreaView>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeTab="transactions">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Receipt Details</Text>
            <TouchableOpacity onPress={() => router.replace('/dashboard')} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {imageUri && (
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: imageUri }} style={styles.thumbnail} />
              </View>
            )}

            <View style={styles.formCard}>
              <Input placeholder="Merchant" defaultValue="Uber" />
              
              <View style={[styles.amountWrapper, amountFocused && styles.amountFocused]}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput 
                  style={styles.amountInput}
                  placeholder="0.00"
                  defaultValue="24.50"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="decimal-pad"
                  onFocus={() => setAmountFocused(true)}
                  onBlur={() => setAmountFocused(false)}
                />
              </View>

              <Input placeholder="Date" defaultValue="Oct 24, 2023" />

              <Select 
                placeholder="Select Category"
                value={category}
                options={['Travel', 'Meals', 'Office Supplies', 'Software']}
                onSelect={setCategory}
              />
              
              <Select 
                placeholder="Select Budget"
                value={budget}
                options={['Travel & Events', 'Software Subscriptions', 'Office Supplies']}
                onSelect={setBudget}
              />

              <Input placeholder="Notes (optional)" multiline />
            </View>

            <Button 
              title="Submit Expense" 
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
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  thumbnail: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#E8E8E6',
    borderWidth: 1,
    borderColor: Colors.divider,
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
