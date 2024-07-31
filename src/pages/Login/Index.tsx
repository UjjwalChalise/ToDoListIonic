import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonCheckbox, IonIcon, IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { eyeOff, eye, bus } from 'ionicons/icons';
import './Index.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Firebase/firebaseConfigs';
import { presentToast } from '../../components/toast';
import { setUserState } from '../../redux/action';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {

const [busy,setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
const dispatch = useDispatch(); 
  const handleLogin = async () => {
    setBusy(true)
    if (username === '' || password === '') {
      setError('Please fill in both fields');
    } else {
      setError('');
      const response :any = await loginUser(username,password)
      if(response){
        dispatch(setUserState(response.user.email))
        presentToast("ErrorLogin",2000);
      }
      else{
        presentToast("ErrorLogin",2000);

      }
    }
    setBusy(false)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please Wait.." duration={0} isOpen={busy}/>
      <IonContent className="ion-padding login-content">
        <div className="login-container">
          <IonItem className="login-item">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput placeholder='Username' value={username} onIonChange={(e: any) => setUsername(e.target.value)} clearInput></IonInput>
          </IonItem>
          <IonItem className="login-item">
            <IonLabel position="floating" >Password</IonLabel>
            <IonInput placeholder='Password' type={showPassword ? 'text' : 'password'} value={password} onIonChange={(e: any) => setPassword(e.target.value)} clearInput></IonInput>
            <IonIcon
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </IonItem>
          {error && <p className="error-message">{error}</p>}
          <IonItem lines="none" className="remember-me-item">
            <IonCheckbox checked={rememberMe} onIonChange={e => setRememberMe(e.detail.checked)} />
            <IonLabel>Remember Me</IonLabel>
          </IonItem>
          <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </div>
        <p>Create an Account ? <Link to="/register">Register</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
