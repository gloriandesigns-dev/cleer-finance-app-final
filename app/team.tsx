import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MainLayout } from '../components/layout/MainLayout';
import { TeamRow } from '../components/control/TeamRow';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function TeamScreen() {
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
              <Text style={styles.headerTitle}>Team Members</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Plus size={20} color={Colors.primaryBlack} />
              <Text style={styles.iconButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.cardGroup}>
              <TeamRow 
                name="Arian Z."
                role="Founder / CEO"
                initials="AZ"
                isAdmin={true}
                onPress={() => {}}
              />
              <TeamRow 
                name="Sarah J."
                role="Finance Manager"
                initials="SJ"
                isAdmin={true}
                onPress={() => {}}
              />
              <TeamRow 
                name="Mike T."
                role="Engineering"
                initials="MT"
                onPress={() => {}}
              />
              <TeamRow 
                name="Emma W."
                role="Design"
                initials="EW"
                isLast={true}
                onPress={() => {}}
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
  cardGroup: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
});
