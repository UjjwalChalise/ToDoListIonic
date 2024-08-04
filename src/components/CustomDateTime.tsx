import React, { forwardRef } from 'react';
import { IonDatetime, IonButton, IonContent, IonItem } from '@ionic/react';
import './CustomDateTime.css'; // Import your custom CSS for styling

interface CustomDateTimeProps {
  value: string;
  onChange: (value: string) => void;
  onTodayButtonClick: () => void;
}
const CustomDateTime = forwardRef<HTMLIonDatetimeElement, CustomDateTimeProps>(
  
  ({ value, onChange, onTodayButtonClick }, ref) => (
    <IonItem className="datetime-item">
      <IonDatetime
        ref={ref}
        presentation='date'
        value={value}
        aria-hidden
        
        className="calendar"
        onIonChange={(e) => onChange(e.detail.value!.toString())}
      />
      
      <div className="datetime-button-container">
        <IonButton disabled={new Date().toISOString().split('T')[0] == value
          } expand="block" onClick={onTodayButtonClick}>
          Today
        </IonButton>
      </div>
    </IonItem>
  )
);

export default CustomDateTime;
