import React, { useEffect, useState, ChangeEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon, IonAvatar, IonModal, IonList, IonItem, IonLabel, IonToast, useIonRouter, IonFooter } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logOutUser, syncLocalDataWithFirestore } from '../../Firebase/firebaseConfigs';
import { personCircleOutline, camera, eye, cloudCircle } from 'ionicons/icons';

import './Mine.css';
import { getImageFromLocalStorage, saveImageToLocalStorage } from '../../components/storage';
import ButtomTabs from '../Layout/ButtomTabs';

const Mine: React.FC = () => {
  const router = useIonRouter();
  const [busy, setBusy] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>('https://via.placeholder.com/150');
  const [showViewPhoto, setShowViewPhoto] = useState<boolean>(false);
  const history = useHistory();
  const userName = useSelector((state: any) => state.user.username);

  const handleLogout = async () => {
    setBusy(true);

    await syncLocalDataWithFirestore(); // Ensure data is uploaded before logging out
    await logOutUser();
    setBusy(false);
    history.replace('/');

    router.push('/login'); // Redirect to login page or any other page
  };
  
  const UpLocalDataToFirestore = async () => {
    await syncLocalDataWithFirestore(); // Ensure data is uploaded before logging out
  };

  useEffect(() => {
    const loadImage = async () => {
      const storedPhoto = await getImageFromLocalStorage('userPhoto');
      if (storedPhoto) {
        setPhoto(storedPhoto);
      }
    };
    loadImage();
  }, []);

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setPhoto(imageData);
        setShowModal(false);
        setShowToast(true);
        await saveImageToLocalStorage('userPhoto', imageData); // Save image to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle className="ion-title">Hello {userName}</IonTitle>
          <IonTitle className="custom-font">Click to login</IonTitle>
          <IonAvatar slot="start" onClick={handleAvatarClick}>
            <img src={photo} />
          </IonAvatar>
          <IonButton
            size='large'
            slot="end"
            fill="clear"
            color="primary"
            onClick={() => UpLocalDataToFirestore()}
          >
            <IonIcon icon={cloudCircle} slot="icon-only" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-info">
          <p className="custom-font">Here is some additional information about Ujjwal.</p>
        </div>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Upgrade to PRO</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block" className="pro-button">Unlock all PRO features</IonButton>
          </IonCardContent>
        </IonCard>
        <div className="content-container">
          <h3>Tasks Overview</h3>
          <div className="task-overview">
            <div>
              <h4>0</h4>
              <p>Completed Tasks</p>
            </div>
            <div>
              <h4>0</h4>
              <p>Pending Tasks</p>
            </div>
          </div>
          <div className="section">
            <h3>Completion of Daily Tasks</h3>
            <p>No task data</p>
          </div>
          <div className="section">
            <h3>Tasks in Next 7 Days</h3>
            <p>No tasks</p>
          </div>
          <div className="section">
            <h3>Pending Tasks in Categories</h3>
            <p>In 30 days</p>
          </div>
        </div>
        <IonButton expand="block"  onClick={handleLogout} className="action-button">Log Out</IonButton>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Photo Options</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem button onClick={() => { document.getElementById('fileInput')?.click(); }}>
                <IonIcon slot="start" icon={camera} />
                <IonLabel>Change Photo</IonLabel>
              </IonItem>
              <IonItem button onClick={() => { setShowViewPhoto(true); setShowModal(false); }}>
                <IonIcon slot="start" icon={eye} />
                <IonLabel>View Photo</IonLabel>
              </IonItem>
            </IonList>
            <input type="file" id="fileInput" hidden onChange={handleFileChange} />
          </IonContent>
        </IonModal>

        <IonModal isOpen={showViewPhoto} onDidDismiss={() => setShowViewPhoto(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>View Photo</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowViewPhoto(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <img src={photo} alt="Profile" style={{ width: '100%' }} />
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Photo updated successfully"
          duration={2000}
        />
      </IonContent>
    
    </IonPage>
  );
};

export default Mine;
