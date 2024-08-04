// BottomTabs.tsx
import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { list, calendar, person } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import Calendar from '../Calender/Calendar';
import Mine from '../Mine/Mine';
import Home from '../Home/Home';

const BottomTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/home" component={Home} exact={true} />
      <Route path="/calendar" component={Calendar} exact={true} />
      <Route path="/mine" component={Mine} exact={true} />
      <Redirect from="/" to="/home" exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={list} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="calendar" href="/calendar">
        <IonIcon icon={calendar} />
        <IonLabel>Calendar</IonLabel>
      </IonTabButton>
      <IonTabButton tab="mine" href="/mine">
        <IonIcon icon={person} />
        <IonLabel>Mine</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default BottomTabs;
