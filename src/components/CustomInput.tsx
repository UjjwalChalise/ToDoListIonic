// CustomInput.tsx
import React, { forwardRef } from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password'; // You can extend this based on your needs
}

const CustomInput = forwardRef<HTMLIonInputElement, CustomInputProps>(
  ({ label, value, onChange, type = 'text' }, ref) => (
    <IonItem>
      <IonInput
        labelPlacement="floating"
        ref={ref}
        label={label}
        type={type}
        value={value}
        onIonChange={(e) => onChange(e.detail.value!)}
      />
    </IonItem>
  )
);

export default CustomInput;
