// MyTextField.tsx
import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import { useMyContext } from '../MyContext';
import '../style/MyTextField.scss';

export type MyTextFieldProps= {
    defaultLabel?: string;
    className?: string;
} & TextFieldProps;


const MyTextField: React.FC<MyTextFieldProps> = ({
    defaultLabel = Date.now(),
    className,
    ...rest
}) => {
  
    const {context} = useMyContext();

    return (
      <TextField 
            className={`myTextField-${context.theme} ${className}`}
            label={defaultLabel}
            {...rest} 
      />
    );
};

export default MyTextField;