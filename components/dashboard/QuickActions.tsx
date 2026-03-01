import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { DollarSign, Receipt, CreditCard, Plane } from 'lucide-react-native';

const actions = [
  { id: '1', label: 'Request Funds', icon: DollarSign },
  { id: '2', label: 'Upload Receipt', icon: Receipt },
  { id: '3', label: 'New Card', icon: CreditCard },
  { id: '4', label: 'Book Travel', icon: Plane },
];

export const QuickActions = () => {
  const router = useRouter();

  const handlePress = (label: string) => {
    if (label === 'Request Funds') router.push('/request-funds');
    if (label === 'Upload Receipt') router.push('/camera');
    if (label === 'Book Travel') router.push('/travel');
    if (label === 'New Card') router.push('/control');
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {actions.map((action) => (
        <TouchableOpacity 
          key={action.id} 
          style={styles.card} 
          activeOpacity={0.7}
          onPress={() => handlePress(action.label)}
        >
          <View style={styles.iconContainer}>
            <action.icon size={20} color={Colors.primaryBlack} strokeWidth={1.5} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 12,
    paddingVertical: 8, // For shadow visibility
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    width: 100,
    height: 100,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 13,
    color: Colors.primaryBlack,
    lineHeight: 18,
  },
});
