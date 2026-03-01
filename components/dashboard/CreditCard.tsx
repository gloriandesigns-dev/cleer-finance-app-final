import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

interface CreditCardProps {
  brand?: string;
  team?: string;
  balanceLabel?: string;
  limit?: string;
  number?: string;
  showStatus?: boolean;
  frozen?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  brand = 'cleer',
  team = "Arian's Design Team",
  balanceLabel = '$18,240 left this month',
  limit = '$50,000 monthly limit',
  number = '•••• 4821',
  showStatus = false,
  frozen = false,
}) => {
  const isFlipped = useSharedValue(0);

  const handlePress = () => {
    isFlipped.value = withTiming(isFlipped.value === 0 ? 1 : 0, { duration: 600 });
  };

  const frontStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(isFlipped.value, [0, 1], [0, 180]);
    return { transform: [{ perspective: 1000 }, { rotateY: `${spinVal}deg` }] };
  });

  const backStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(isFlipped.value, [0, 1], [180, 360]);
    return { transform: [{ perspective: 1000 }, { rotateY: `${spinVal}deg` }] };
  });

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {/* Front Face */}
      <Animated.View style={[styles.face, frontStyle]}>
        <Image 
          source={{ uri: 'https://www.dropbox.com/scl/fi/86a9qpl8pt01qyhpvtvlt/9583338d1430eaee96c0357cdd95bff0.jpg?rlkey=8thdxkybnihjaqp83ddr2uk9c&st=0nz85gwo&raw=1' }}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <View style={styles.header}>
          <Text style={styles.brand}>{brand}</Text>
          <View style={styles.headerRight}>
            {showStatus && !frozen && <View style={styles.statusDot} />}
            <Text style={styles.team}>{team}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View>
            <Text style={styles.balanceLabel}>{balanceLabel}</Text>
            <View style={styles.underline} />
            <Text style={styles.limit}>{limit}</Text>
          </View>
          <Text style={styles.number}>{number}</Text>
        </View>

        {frozen && (
          <View style={styles.frozenOverlay}>
            <View style={styles.frozenBadge}>
              <Text style={styles.frozenText}>Frozen</Text>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Back Face */}
      <Animated.View style={[styles.face, styles.backFace, backStyle]}>
        <Image 
          source={{ uri: 'https://www.dropbox.com/scl/fi/86a9qpl8pt01qyhpvtvlt/9583338d1430eaee96c0357cdd95bff0.jpg?rlkey=8thdxkybnihjaqp83ddr2uk9c&st=0nz85gwo&raw=1' }}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <View style={styles.magneticStrip} />
        <View style={styles.cvvRow}>
          <View style={styles.cvvBox}>
            <Text style={styles.cvvText}>123</Text>
          </View>
        </View>
        <View style={styles.backDetails}>
          <Text style={styles.backNumber}>4821  9302  1123  8294</Text>
          <View style={styles.backRow}>
            <Text style={styles.backName}>ARIAN Z.</Text>
            <Text style={styles.backExpiry}>12/28</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220, // Increased by exactly 20px
    width: '100%',
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primaryBlack,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  backFace: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentLime,
  },
  brand: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: Colors.white,
    letterSpacing: -0.5,
  },
  team: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  balanceLabel: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.white,
    marginBottom: 4,
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: Colors.accentLime,
    marginBottom: 8,
    borderRadius: 1,
  },
  limit: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  number: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  frozenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 11, 11, 0.6)',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frozenBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  frozenText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  magneticStrip: {
    width: '100%',
    height: 44,
    backgroundColor: '#1A1A1A',
    marginTop: 28,
  },
  cvvRow: {
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'flex-end',
  },
  cvvBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cvvText: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  backDetails: {
    paddingHorizontal: 24,
    marginTop: 'auto',
    marginBottom: 24,
  },
  backNumber: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 2,
    marginBottom: 12,
  },
  backRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backName: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  backExpiry: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});
