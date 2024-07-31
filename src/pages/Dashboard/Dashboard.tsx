import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Index.css';
import { logOutUser } from '../../Firebase/firebaseConfigs';
import { star } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  const userName = useSelector((state: any) => state.user.username);

  async function logOut() {
    setBusy(true);
    await logOutUser();
    setBusy(false);
    history.replace('/');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Logging Out" duration={0} isOpen={busy} />
      <IonContent class='ion-padding' fullscreen>
        Hello Dashboard {userName}
        <br />
        <IonButton color="primary" expand='full' onClick={logOut}>Logout</IonButton>
        <IonButton color="primary">
          <IonIcon slot="start" icon={star}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
