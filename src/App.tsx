// App.tsx
import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';
import './CustomMenu.css';

import Login from './pages/Login/Index';
import Register from './pages/Register/Index';
import Intro from './pages/Intro/Intro';
import BottomTabs from './pages/Layout/ButtomTabs';
import { getCurrentUser } from './Firebase/firebaseConfigs';
import { setUserState } from './redux/action';
import { Storage } from '@ionic/storage';
import CreateTask from './pages/Task/CreateTask';
import UpdateTask from './pages/Task/UpdateTask';
import Calendar from './pages/Calender/Calendar';

setupIonicReact();

const RoutingSystem: React.FC = () => (
  <IonRouterOutlet>

    <Route exact path="/intro" component={Intro} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Redirect from="/" to="/home" exact={true} />
    <Route exact path="/task/create" component={CreateTask} />
    <Route exact path="/task/edit/:id" component={UpdateTask} />
    <Route exact path="/calender" component={Calendar} />

  </IonRouterOutlet>
);

const App: React.FC = () => {
  const [storage, setStorage] = useState<Storage | null>(null);
  const [busy, setBusy] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initStorage = async () => {
      const store = new Storage();
      await store.create();
      setStorage(store);
    };

    initStorage();

    const checkUserStatus = async () => {
      setBusy(true);
      const user = await getCurrentUser();
      if (user) {
        dispatch(setUserState(user.email));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setBusy(false);
    };

    checkUserStatus();
  }, [dispatch]);

  return (
    <IonApp>
      <IonReactRouter>
        {busy ? <IonSpinner /> : (
          <>
            <RoutingSystem />
            {isLoggedIn && <BottomTabs />}
          </>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
