import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronRight } from 'lucide-react-native';

interface ControlRowProps {
  title: string;
  subtitle: string;
  onPress: () => void;
  isLast?: boolean;
}

export const ControlRow: React.FC<ControlRowProps> = ({ title, subtitle, onPress, isLast }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isLast && styles.noBorder]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
