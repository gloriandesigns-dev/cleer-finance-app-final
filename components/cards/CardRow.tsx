import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronRight, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface CardRowProps {
  name: string;
  user: string;
  limit: string;
}

export const CardRow: React.FC<CardRowProps> = ({ name, user, limit }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7}
      onPress={() => router.push('/card-detail')}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <CreditCard size={18} color={Colors.primaryBlack} />
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.user}>{user}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.limit}>{limit}</Text>
        <ChevronRight size={20} color={Colors.textSecondary} />
      </View>
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
    marginBottom: 1, 
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
  name: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  user: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  limit: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
