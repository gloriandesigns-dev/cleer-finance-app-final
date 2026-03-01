import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronRight, Briefcase, Coffee, Monitor } from 'lucide-react-native';

interface BudgetProps {
  title: string;
  remaining: string;
  icon: 'briefcase' | 'coffee' | 'monitor';
}

const IconMap = {
  briefcase: Briefcase,
  coffee: Coffee,
  monitor: Monitor,
};

export const BudgetRow: React.FC<BudgetProps> = ({ title, remaining, icon }) => {
  // Defensive coding: Fallback to Briefcase if icon is not found in map
  const IconComponent = IconMap[icon] || Briefcase;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <IconComponent size={18} color={Colors.primaryBlack} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.remaining}>{remaining}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 1, // Tiny gap for separator effect if stacked
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F7F7F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  remaining: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
