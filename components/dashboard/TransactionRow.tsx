import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

interface TransactionProps {
  merchant: string;
  date?: string;
  metadata?: string;
  amount: string;
  status: 'complete' | 'needs_attention' | 'pending_review' | 'cleared';
}

export const TransactionRow: React.FC<TransactionProps> = ({ merchant, date, metadata, amount, status }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7}
      onPress={() => router.push('/transaction-detail')}
    >
      <View style={styles.left}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>{merchant.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.merchant}>{merchant}</Text>
          <Text style={styles.metadata}>{metadata || date}</Text>
        </View>
      </View>
      
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
        {status === 'needs_attention' && (
          <View style={styles.attentionBadge}>
            <Text style={styles.attentionText}>Review</Text>
          </View>
        )}
        {status === 'pending_review' && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pending</Text>
          </View>
        )}
        {status === 'cleared' && (
          <Text style={styles.clearedText}>Cleared</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    height: 68,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8E8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  merchant: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  metadata: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  attentionBadge: {
    backgroundColor: Colors.accentLime,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  attentionText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 10,
    color: Colors.primaryBlack,
  },
  pendingBadge: {
    backgroundColor: '#E8E8E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  pendingText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 10,
    color: Colors.textSecondary,
  },
  clearedText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
