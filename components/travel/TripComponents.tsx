import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { ChevronRight, Plane, Building } from 'lucide-react-native';

interface TripCardProps {
  city: string;
  dates: string;
  amount: string;
  status: string;
  isActive: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ city, dates, amount, status, isActive }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push('/trip-detail')} activeOpacity={0.7}>
      <View style={styles.topRow}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.dates}>{dates}</Text>
        <View style={[styles.badge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={[styles.badgeText, isActive ? styles.activeBadgeText : styles.inactiveBadgeText]}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface PastTripRowProps {
  city: string;
  dates: string;
  amount: string;
}

export const PastTripRow: React.FC<PastTripRowProps> = ({ city, dates, amount }) => {
  return (
    <TouchableOpacity style={styles.pastRow} activeOpacity={0.7}>
      <View style={styles.pastLeft}>
        <Text style={styles.pastCity}>{city}</Text>
        <Text style={styles.pastDates}>{dates}</Text>
      </View>
      <View style={styles.pastRight}>
        <Text style={styles.pastAmount}>{amount}</Text>
        <ChevronRight size={20} color={Colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

interface BookingRowProps {
  vendor: string;
  type: 'flight' | 'hotel';
  datetime: string;
  amount: string;
  status: string;
  isActive: boolean;
}

export const BookingRow: React.FC<BookingRowProps> = ({ vendor, type, datetime, amount, status, isActive }) => {
  const Icon = type === 'flight' ? Plane : Building;
  return (
    <View style={styles.bookingRow}>
      <View style={styles.bookingLeft}>
        <View style={styles.bookingIcon}>
          <Icon size={18} color={Colors.primaryBlack} />
        </View>
        <View>
          <Text style={styles.bookingVendor}>{vendor}</Text>
          <Text style={styles.bookingDatetime}>{datetime}</Text>
        </View>
      </View>
      <View style={styles.bookingRight}>
        <Text style={styles.bookingAmount}>{amount}</Text>
        <View style={[styles.badge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={[styles.badgeText, isActive ? styles.activeBadgeText : styles.inactiveBadgeText]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  city: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  amount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dates: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  activeBadge: {
    backgroundColor: Colors.accentLime,
  },
  inactiveBadge: {
    backgroundColor: '#E8E8E6',
  },
  badgeText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 12,
  },
  activeBadgeText: {
    color: Colors.primaryBlack,
  },
  inactiveBadgeText: {
    color: Colors.textSecondary,
  },
  pastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 1,
  },
  pastLeft: {
    gap: 2,
  },
  pastCity: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  pastDates: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  pastRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pastAmount: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 1,
  },
  bookingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F7F7F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingVendor: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
    marginBottom: 2,
  },
  bookingDatetime: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bookingRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  bookingAmount: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
});
