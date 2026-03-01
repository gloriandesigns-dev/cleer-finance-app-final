import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, MoreHorizontal, ChevronRight, Upload } from 'lucide-react-native';
import { Button } from '../components/ui/Button';
import { StatusBar } from 'expo-status-bar';

interface DetailRowProps {
  label: string;
  value: string;
  editable?: boolean;
  isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, editable, isLast }) => (
  <TouchableOpacity 
    style={[styles.detailRow, isLast && styles.noBorder]} 
    disabled={!editable}
    activeOpacity={0.7}
  >
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.detailValueContainer}>
      <Text style={styles.detailValue}>{value}</Text>
      {editable && <ChevronRight size={16} color={Colors.textSecondary} style={styles.chevron} />}
    </View>
  </TouchableOpacity>
);

export default function TransactionDetailScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="transactions">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Top Bar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transaction</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconButtonText}>Options</Text>
              <MoreHorizontal size={20} color={Colors.primaryBlack} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Merchant Section */}
            <View style={styles.merchantSection}>
              <View style={styles.merchantLogo}>
                <Text style={styles.merchantLogoText}>U</Text>
              </View>
              <Text style={styles.merchantName}>Uber</Text>
              <Text style={styles.merchantAmount}>$24.50</Text>
              <Text style={styles.merchantDate}>Oct 24, 2023 • 9:41 AM</Text>
              <View style={styles.attentionBadge}>
                <Text style={styles.attentionText}>Needs Attention</Text>
              </View>
            </View>

            {/* Policy Violation Section */}
            <View style={styles.policyCard}>
              <View style={styles.policyDot} />
              <Text style={styles.policyText}>Missing receipt for transaction over $20.</Text>
            </View>

            {/* Detail Card */}
            <View style={styles.card}>
              <DetailRow label="Card Used" value="Virtual Card •••• 4821" />
              <DetailRow label="Category" value="Travel" editable />
              <DetailRow label="Budget" value="Travel & Events" editable />
              <DetailRow label="Team" value="Design Team" />
              <DetailRow label="Location" value="San Francisco, CA" isLast />
            </View>

            {/* Receipt Section */}
            <TouchableOpacity style={styles.receiptCard} activeOpacity={0.7}>
              <View style={styles.receiptIconContainer}>
                <Upload size={20} color={Colors.textSecondary} />
              </View>
              <Text style={styles.receiptText}>Upload receipt</Text>
            </TouchableOpacity>

            {/* Accounting Section */}
            <Text style={styles.sectionTitle}>Accounting</Text>
            <View style={styles.card}>
              <DetailRow label="QuickBooks Category" value="Travel - Rideshare" editable />
              <DetailRow label="Class" value="Design" editable />
              <DetailRow label="Location" value="HQ" editable isLast />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <Button 
                title="Submit for review" 
                onPress={() => router.back()}
                style={styles.submitButton}
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
  merchantSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  merchantLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E8E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  merchantLogoText: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 24,
    color: Colors.primaryBlack,
  },
  merchantName: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  merchantAmount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 24,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  merchantDate: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  attentionBadge: {
    backgroundColor: Colors.accentLime,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  attentionText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 12,
    color: Colors.primaryBlack,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryBlack,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailRow: {
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
  detailLabel: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailValue: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  chevron: {
    marginLeft: 4,
  },
  receiptCard: {
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.textSecondary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  receiptIconContainer: {
    marginBottom: 8,
  },
  receiptText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
    marginBottom: 16,
  },
  actionContainer: {
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: Colors.primaryBlack,
    width: '100%',
  },
});
