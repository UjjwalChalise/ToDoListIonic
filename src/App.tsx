import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  setupIonicReact,
} from '@ionic/react';
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

/* Theme variables */
import './theme/variables.css';

import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Index';
import Register from './pages/Register/Index';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './Firebase/firebaseConfigs';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/action';
import { Storage } from '@ionic/storage';
import './CustomMenu.css';
import UpdateTask from './pages/Task/UpdateTask';
import CreateTask from './pages/Task/CreateTask';
import Intro from './pages/Intro/Intro';
import TopTabs from './pages/Layout/TopTabs';
import BottomTabs from './pages/Layout/ButtomTabs';
import Mine from './pages/Mine/Mine';

setupIonicReact();

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/intro">
            <Intro onContinue={() => { /* Handle continuation, e.g., navigate to home */ }} />
          </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/task/create">
          <CreateTask />
        </Route>
        <Route exact path="/task/edit/:id">
          <UpdateTask />
        </Route>
        <Route exact path="/mine">
          <Mine />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/home" component={Home} exact={true} />

      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  const [storage, setStorage] = useState<Storage | null>(null);
  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initStorage = async () => {
      const store = new Storage();
      const createdStore = await store.create();
      setStorage(createdStore);
    };

    initStorage();

    setBusy(true);
    getCurrentUser().then((user: any) => {
      if (user) {
        dispatch(setUserState(user.email));
        window.history.replaceState({}, '', '/mine');
      } else {
        window.history.replaceState({}, '', '/mine');
      }
      setBusy(false);
    });
  }, [dispatch]);

  return (
    <IonApp>
    <IonReactRouter>
      <TopTabs />
    
      {busy ? <IonSpinner /> : <RoutingSystem />}
      <BottomTabs />
    </IonReactRouter>
  </IonApp>

  );
};

export default App;
