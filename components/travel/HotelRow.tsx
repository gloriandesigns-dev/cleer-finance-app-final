import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Star } from 'lucide-react-native';

interface HotelRowProps {
  name: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
  inPolicy?: boolean;
  isLast?: boolean;
}

export const HotelRow: React.FC<HotelRowProps> = ({ 
  name, 
  rating, 
  reviews, 
  price, 
  image, 
  inPolicy, 
  isLast 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isLast && styles.noBorder]} 
      activeOpacity={0.7}
    >
      <Image source={{ uri: image }} style={styles.thumbnail} />
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        
        <View style={styles.middleRow}>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.primaryBlack} fill={Colors.primaryBlack} />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>
          <Text style={styles.perNight}>/ night</Text>
        </View>

        <View style={styles.bottomRow}>
          {inPolicy && (
            <View style={styles.policyBadge}>
              <Text style={styles.policyText}>In Policy</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E8E8E6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.primaryBlack,
    marginRight: 8,
  },
  price: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 16,
    color: Colors.primaryBlack,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 13,
    color: Colors.primaryBlack,
  },
  reviews: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  perNight: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyBadge: {
    backgroundColor: Colors.accentLime,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  policyText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 10,
    color: Colors.primaryBlack,
  },
});
