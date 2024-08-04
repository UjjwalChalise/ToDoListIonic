// CustomInput.tsx
import React, { forwardRef } from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  endIcon?: JSX.Element; // Optional icon or component at the end
  type?: 'text' | 'email' | 'password'; // You can extend this based on your needs
}

const CustomInput = forwardRef<HTMLIonInputElement, CustomInputProps>(
  ({ label, value, onChange,type = 'text' ,endIcon}, ref) => (
    <IonItem>
      <IonInput
        labelPlacement="floating"
        ref={ref}
        label={label}
        type={type}
        value={value}
        onIonChange={(e) => onChange(e.detail.value!)}
        clearInput={true}
      />
        {endIcon && React.cloneElement(endIcon, {   style: { 
          position: 'relative',
          right:'11px',
          top: '15%', // Adjust this value to position the icon lower
          fontSize: '150%', // Adjust the size of the icon if needed
        }  })}
    </IonItem>
  )
);

export default CustomInput;
