import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { PolicyCard } from '../components/control/PolicyCard';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function PoliciesScreen() {
  const router = useRouter();

  return (
    <MainLayout activeTab="control">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <ArrowLeft size={20} color={Colors.primaryBlack} />
                <Text style={styles.iconButtonText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Policies</Text>
            </View>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <PolicyCard 
              title="Travel Policy"
              description="Rules for flights, hotels, and per diems"
              isActive={true}
              onPress={() => {}}
            />
            
            <PolicyCard 
              title="Expense Limits"
              description="Transaction and monthly category limits"
              isActive={true}
              onPress={() => {}}
            />
            
            <PolicyCard 
              title="Alcohol Restriction"
              description="Blocks transactions at bars and liquor stores"
              isActive={false}
              onPress={() => {}}
            />

            <PolicyCard 
              title="Approval Thresholds"
              description="Routing rules for large expenses"
              isActive={true}
              onPress={() => {}}
            />

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
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 22,
    color: Colors.primaryBlack,
    letterSpacing: -0.5,
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
});
