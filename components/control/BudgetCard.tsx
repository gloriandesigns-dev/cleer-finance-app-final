import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronRight } from 'lucide-react-native';

interface BudgetCardProps {
  name: string;
  allocated: string;
  remaining: string;
  progress: number; // 0 to 100
  dates: string;
  onPress: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ 
  name, 
  allocated, 
  remaining, 
  progress, 
  dates, 
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <ChevronRight size={20} color={Colors.textSecondary} />
      </View>
      
      <View style={styles.amounts}>
        <Text style={styles.allocated}>{allocated}</Text>
        <Text style={styles.remaining}>{remaining} remaining</Text>
      </View>
      
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${Math.min(Math.max(progress, 0), 100)}%` }]} />
      </View>
      
      <Text style={styles.dates}>{dates}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  allocated: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: Colors.primaryBlack,
  },
  remaining: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: Colors.divider,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accentLime,
    borderRadius: 2,
  },
  dates: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
