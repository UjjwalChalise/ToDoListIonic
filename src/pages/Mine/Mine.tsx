import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon } from '@ionic/react';
import BottomTabs from '../Layout/ButtomTabs';
import { personCircleOutline } from 'ionicons/icons';
import './Mine.css';
const Mine: React.FC = () => (
  <IonPage>
      <BottomTabs />
      <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            <IonIcon icon={personCircleOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Keep plan for 1 day</IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={personCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Upgrade to PRO</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">Unlock all PRO features</IonButton>
          </IonCardContent>
        </IonCard>
        <div style={{ padding: '16px' }}>
          <h3>Tasks Overview</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <h4>0</h4>
              <p>Completed Tasks</p>
            </div>
            <div>
              <h4>0</h4>
              <p>Pending Tasks</p>
            </div>
          </div>
          <div>
            <h3>Completion of Daily Tasks</h3>
            <p>No task data</p>
          </div>
          <div>
            <h3>Tasks in Next 7 Days</h3>
            <p>No tasks</p>
          </div>
          <div>
            <h3>Pending Tasks in Categories</h3>
            <p>In 30 days</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
);

export default Mine;
