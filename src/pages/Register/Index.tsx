import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonCheckbox, IonIcon, IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { eyeOff, eye, pawSharp } from 'ionicons/icons';

import './Index.css';
import { Link } from 'react-router-dom';
import { presentToast } from '../../components/toast';
import { registerUser } from '../../Firebase/firebaseConfigs';

const Register: React.FC = () => {

  const [busy,setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const navigate = useNavigate();


  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

    const handleRegister = async () => {
      setBusy(true)

    if (username === '' || password === '' ||( password === cPassword)) {
      setError('Error');
      return  presentToast("Error In Register",2000);
    } else {
      setError('');
      const response :boolean=  await registerUser(username,password)
      if(response){
        <Link to ='/login'></Link>
        // navigate('/login');
      }
    }
    setBusy(false)

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please Wait.." duration={0} isOpen={busy}/>

      <IonContent className="ion-padding">
            <IonInput placeholder='UserName' value={username} onIonChange={(e: any) => setUsername(e.target.value)} clearInput></IonInput>
          
            <IonInput placeholder='Password' type='password' value={password} onIonChange={(e: any) => setPassword(e.target.value)} clearInput></IonInput>
            <IonInput placeholder='Confirm Password' type= 'password' value={cPassword} onIonChange={(e: any) => setCPassword(e.target.value)} clearInput></IonInput>          
       
          {error && <p className="error-message">{error}</p>}
          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
         <p>Already have an Account ? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
