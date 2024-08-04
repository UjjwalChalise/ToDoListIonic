import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCheckbox, IonIcon, IonLoading, IonItem, IonLabel, useIonRouter } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';
import './Index.css';
import { Link, useHistory } from 'react-router-dom';
import { getCurrentUser, loginUser } from '../../Firebase/firebaseConfigs';
import { presentToast } from '../../components/toast';
import { setUserState } from '../../redux/action';
import { useDispatch } from 'react-redux';
import CustomInput from '../../components/CustomInput';

const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const history = useHistory();


  const handleLogin = async () => {
    setBusy(true);
    if (username === '' || password === '') {
      setError('Please fill in both fields');
    } else {
      setError('');
      const response: any = await loginUser(username, password);
      if (response) {
        dispatch(setUserState(username));
        await getCurrentUser
        history.replace('/');
        presentToast("Login successful", 2000);
        router.push('/home'); 
      } else {
        presentToast("Error during login", 2000);
      }
    }
    setBusy(false);
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar className='custom-toolbar'>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please Wait.." duration={0} isOpen={busy} />
      <IonContent className="ion-padding login-content">
        <div className="login-container">
          <CustomInput
            label="Username"
            value={username}
            onChange={setUsername}
            type="text"
          />
          <CustomInput
            label="Password"
            
            value={password}
            onChange={setPassword}

            type={showPassword ? 'text' : 'password'}
            endIcon={
              <IonIcon
              slot='end'
              icon={showPassword ? eyeOff : eye}
              onClick={() => setShowPassword(!showPassword)}
            />
            }
          />
          {error && <p className="error-message">{error}</p>}
          <IonItem lines="none" className="remember-me-item">
            <IonCheckbox checked={rememberMe} onIonChange={e => setRememberMe(e.detail.checked)} />
            <IonLabel onClick={e => setRememberMe(!rememberMe)}>Remember Me</IonLabel>
          </IonItem>
          <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
     
        </div> 
        <p>Create an Account? <Link to="/register">Register</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
