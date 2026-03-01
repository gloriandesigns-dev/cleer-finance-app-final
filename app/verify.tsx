import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout } from '../constants/Colors';
import { Button } from '../components/ui/Button';
import { OTPInput } from '../components/ui/OTPInput';
import { ArrowLeft } from 'lucide-react-native';

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={20} color={Colors.primaryBlack} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>Verify your email</Text>
          <Text style={styles.subheadline}>
            Enter the 6-digit code sent to your inbox
          </Text>

          <View style={styles.form}>
            <OTPInput 
              length={6} 
              onComplete={(code) => setCode(code)} 
            />

            <Button 
              title="Verify" 
              onPress={handleVerify}
              style={styles.verifyButton}
              variant="primary"
              textStyle={{ color: Colors.white }}
            />

            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.paddingHorizontal,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
    color: Colors.primaryBlack,
  },
  content: {
    marginTop: 10,
    flex: 1,
  },
  headline: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 32,
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subheadline: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  form: {
    alignItems: 'center',
  },
  verifyButton: {
    width: '100%',
    backgroundColor: Colors.primaryBlack,
    marginTop: 24,
  },
  resendButton: {
    marginTop: 24,
    padding: 12,
  },
  resendText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: '#8CBF15',
  }
});
