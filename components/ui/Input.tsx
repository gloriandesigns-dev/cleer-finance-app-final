import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, isPassword, style, placeholder, multiline, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        multiline && styles.multilineContainer,
        isFocused && styles.focusedInput,
        error ? styles.errorInput : null
      ]}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput, style]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          selectionColor={Colors.primaryBlack}
          multiline={multiline}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
            {showPassword ? (
              <EyeOff size={20} color={Colors.textSecondary} />
            ) : (
              <Eye size={20} color={Colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: 'transparent',
  },
  multilineContainer: {
    alignItems: 'flex-start',
  },
  focusedInput: {
    borderBottomColor: '#A0A0A0', // Subtly darkened from divider (#E8E8E6)
    backgroundColor: 'rgba(0,0,0,0.02)', // Subtle background darkening
  },
  errorInput: {
    borderBottomColor: Colors.error,
  },
  input: {
    flex: 1,
    fontFamily: 'Urbanist_400Regular',
    fontSize: 17,
    color: Colors.textPrimary,
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  icon: {
    padding: 8,
  },
  errorText: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
