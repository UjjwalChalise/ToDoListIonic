import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home/Index';
import Index from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Index';
import Register from './pages/Register/Index';
import { useEffect, useState } from 'react';
import {getCurrentUser} from './Firebase/firebaseConfigs'
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/action';

setupIonicReact();

const RoutingSystem : React.FC =() =>{
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
        
          <Login />
        </Route>
        <Route exact path="/register">
        
          <Register />
        </Route>
        <Route exact path="/home">
        
          <Home />
        </Route>


        <Route exact path="/home">
        
          <Home />
        </Route>

        <Route exact path="/dashboard">
        
          <Index />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () =>{
  const[busy,setBusy]= useState(true)
const dispatch = useDispatch();


  useEffect(()=>{
      getCurrentUser().then((user:any)=>{
        console.log("user",user)
        if(user){
          dispatch(setUserState(user.email))

          window.history.replaceState({},'','/dashboard')
        }
        else{
          window.history.replaceState({},'','/login')
        }
        setBusy(false)
      })
  },[])
  
  return(
  <IonApp>
    {busy ? <IonSpinner/> :
    <RoutingSystem />}
  </IonApp>
)
}

export default App;
