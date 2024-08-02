import React, { useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const TopTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  return (
    <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value!.toString())}>
      <IonSegmentButton value="all">
        <IonLabel>All</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="work">
        <IonLabel>Work</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="personal">
        <IonLabel>Personal</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="wishlist">
        <IonLabel>Wishlist</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default TopTabs;
