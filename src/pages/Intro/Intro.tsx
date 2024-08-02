import React from 'react';
import { IonContent, IonButton, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Intro.css';

interface IntroProps {
  onContinue: () => void;
}

const Intro: React.FC<IntroProps> = () => {
  const history = useHistory();

  const handleContinue = () => {
    history.push('/login');
  };

  return (
    <IonContent className="intro-content">
      <div className="intro-container">
        <IonImg src="/assets/background.jpg" className="background-image" />
        <div className="gif-container">
          <img src="/assets/animation.gif" alt="Animation" className="gif-player" />
        </div>
        <IonButton className="continue-button" onClick={handleContinue}>
          Continue
        </IonButton>
      </div>
    </IonContent>
  );
};

export default Intro;
