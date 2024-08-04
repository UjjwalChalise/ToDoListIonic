import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonCheckbox, IonIcon, IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { eyeOff, eye, pawSharp } from 'ionicons/icons';

import './Index.css';
import { Link } from 'react-router-dom';
import { presentToast } from '../../components/toast';
import { registerUser } from '../../Firebase/firebaseConfigs';
import CustomInput from '../../components/CustomInput';

const Register: React.FC = () => {

  const [busy,setBusy] = useState<boolean>(false)
  const [showCPassword, setCShowPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      }
    }
    setBusy(false)

  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar className='custom-toolbar'>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please Wait.." duration={0} isOpen={busy}/>

      <IonContent className="ion-padding register-content">
      <div className="register-container">
      <CustomInput
            label="Enter Email Address"
            value={username}
            onChange={setUsername}
            type="email"
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
             <CustomInput
            label="Confirm Password"
            value={cPassword}
            onChange={setCPassword}
            type={showCPassword ? 'text' : 'password'}
            endIcon={
              <IonIcon
              slot='end'
              icon={showCPassword ? eyeOff : eye}
              onClick={() => setCShowPassword(!showCPassword)}
            />
            }
          />
            <br></br>
          {error && <p className="error-message">{error}</p>}
          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
          </div>
         <p>Already have an Account ? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
