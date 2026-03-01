import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '../../constants/Colors';

interface ToggleProps {
  active: boolean;
  onToggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ active, onToggle }) => {
  return (
    <Pressable onPress={onToggle} style={[styles.toggleContainer, active && styles.toggleActive]}>
      <MotiView 
        animate={{ translateX: active ? 20 : 0 }} 
        transition={{ type: 'timing', duration: 200 }} 
        style={[styles.toggleKnob, active && styles.toggleKnobActive]} 
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.divider,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: Colors.primaryBlack,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleKnobActive: {
    backgroundColor: Colors.accentLime,
  },
});
