import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { HotelRow } from '../components/travel/HotelRow';

const FILTERS = ['In Policy', 'Refundable', 'Price Range', '4+ Stars', 'Amenities'];

export default function HotelBookingScreen() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<string[]>(['In Policy']);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <MainLayout activeTab="travel">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <ArrowLeft size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Hotels</Text>
            <View style={styles.placeholderIcon} />
          </View>

          {/* Search Summary Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBox} activeOpacity={0.7}>
              <Search size={20} color={Colors.textSecondary} />
              <View style={styles.searchTexts}>
                <Text style={styles.searchDest}>Dallas, TX</Text>
                <Text style={styles.searchDates}>Nov 12 - Nov 15 • 1 Room, 1 Guest</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersWrapper}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
            >
              <TouchableOpacity style={styles.filterIconButton}>
                <SlidersHorizontal size={18} color={Colors.primaryBlack} />
                <Text style={styles.filterIconText}>Filter</Text>
              </TouchableOpacity>
              
              {FILTERS.map((filter) => {
                const isActive = activeFilters.includes(filter);
                return (
                  <TouchableOpacity 
                    key={filter}
                    style={[styles.filterPill, isActive && styles.activeFilterPill]}
                    onPress={() => toggleFilter(filter)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.resultsCount}>142 properties found</Text>

            {/* Hotel List */}
            <View style={styles.cardStack}>
              <HotelRow 
                name="The Joule Dallas"
                rating="4.8"
                reviews="1.2k"
                price="$245"
                image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200&h=200"
                inPolicy={true}
              />
              <HotelRow 
                name="Hilton Anatole"
                rating="4.6"
                reviews="856"
                price="$210"
                image="https://images.unsplash.com/photo-1551882547-ff40c0d509af?auto=format&fit=crop&q=80&w=200&h=200"
                inPolicy={true}
              />
              <HotelRow 
                name="Omni Dallas Hotel"
                rating="4.5"
                reviews="2.1k"
                price="$189"
                image="https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=200&h=200"
                inPolicy={true}
              />
              <HotelRow 
                name="W Dallas - Victory"
                rating="4.7"
                reviews="943"
                price="$320"
                image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=200&h=200"
                inPolicy={false}
              />
              <HotelRow 
                name="Fairmont Dallas"
                rating="4.6"
                reviews="1.5k"
                price="$265"
                image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=200&h=200"
                inPolicy={true}
                isLast={true}
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
  placeholderIcon: {
    width: 60,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  searchTexts: {
    flex: 1,
  },
  searchDest: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
    marginBottom: 2,
  },
  searchDates: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  filtersWrapper: {
    marginBottom: 20,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    gap: 8,
    alignItems: 'center',
  },
  filterIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    marginRight: 4,
  },
  filterIconText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    height: 40,
    justifyContent: 'center',
  },
  activeFilterPill: {
    backgroundColor: Colors.primaryBlack,
    borderColor: Colors.primaryBlack,
  },
  filterText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  activeFilterText: {
    color: Colors.white,
    fontFamily: 'Urbanist_600SemiBold',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  resultsCount: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  cardStack: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
});
