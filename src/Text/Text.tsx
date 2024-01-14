import React from 'react';
import './TextInput.css';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'outlined' | 'filled';
}

const TextInput: React.FC<TextInputProps> = ({ variant, ...props }) => {
  const styles = () => {
    const propStyle = props.style ?? {};
    if (variant === 'outlined') {
      return {
        border: '1px solid #6366F1',
        backgroundColor: '#FAFAFA',
        color: '#6366F1',
        padding: '8px',
        ...propStyle,
      };
    }
    // Default to 'filled' variant
    return {
      backgroundColor: '#FAFAFA',
      color: '#6366F1',
      padding: '8px',
      ...propStyle,
    };
  };

  return (
    <input type="text" {...props} style={styles()} />
  );
};

export default TextInput;
