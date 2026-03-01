import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { X } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      router.replace({ pathname: '/receipt-form', params: { imageUri: photo.uri } });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView style={styles.camera} ref={cameraRef}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
              <X size={24} color={Colors.white} />
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Capture Receipt</Text>
            <View style={{ width: 80 }} />
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.captureBtnOuter} onPress={takePicture} activeOpacity={0.8}>
              <View style={styles.captureBtnInner} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlack,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionText: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionBtn: {
    backgroundColor: Colors.primaryBlack,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  permissionBtnText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  camera: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  closeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  closeBtnText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  headerTitle: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureBtnOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryBlack,
  },
});
