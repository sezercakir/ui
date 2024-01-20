import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { useMyContext } from '../MyContext';
import '../style/MyButton.scss';

export interface MyButtonProps extends ButtonProps {
  defaultLabel: string;
}

const MyButton: React.FC<MyButtonProps> = ({ 
    defaultLabel = 'Click Me',
    className,
    ...rest
}) => {

  const {context} = useMyContext();
  
  return (
    <Button
        className={`myButton-${context.theme} ${className}`}
        {...rest} 
    >
        {defaultLabel}
    </Button>
  );
};

export default MyButton;