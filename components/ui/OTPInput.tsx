import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import { MotiView } from 'moti';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const hiddenInputRef = useRef<TextInput>(null);
  const [hiddenCode, setHiddenCode] = useState('');

  const handleHiddenTextChange = (text: string) => {
    if (text.length > length) return;
    
    setHiddenCode(text);
    const newCode = text.split('').concat(new Array(length - text.length).fill(''));
    setCode(newCode);
    
    if (text.length === length) {
      onComplete(text);
      hiddenInputRef.current?.blur();
    }
  };

  const handlePress = () => {
    hiddenInputRef.current?.focus();
    setFocusedIndex(Math.min(hiddenCode.length, length - 1));
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={hiddenInputRef}
        value={hiddenCode}
        onChangeText={handleHiddenTextChange}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocusedIndex(Math.min(hiddenCode.length, length - 1))}
        onBlur={handleBlur}
        autoFocus={true}
      />
      
      <Pressable onPress={handlePress} style={styles.inputsContainer}>
        {code.map((digit, index) => {
          const isActive = index === Math.min(hiddenCode.length, length - 1) && focusedIndex !== null;
          const isFilled = digit !== '';
          
          return (
            <MotiView
              key={index}
              style={[
                styles.box,
                isActive && styles.activeBox,
                isFilled && !isActive && styles.filledBox
              ]}
              animate={{
                scale: isActive ? 1.02 : 1,
              }}
              transition={{ type: 'timing', duration: 150 }}
            >
              <TextInput
                style={styles.boxText}
                editable={false}
                value={digit}
              />
            </MotiView>
          );
        })}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    maxWidth: 56,
  },
  activeBox: {
    borderColor: '#A0A0A0', // Subtly darkened
    backgroundColor: '#F4F4F4', // Subtly darkened background
  },
  filledBox: {
    borderColor: '#D0D0D0', // Subtly darker than divider
  },
  boxText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 24,
    color: Colors.primaryBlack,
    textAlign: 'center',
  },
});
