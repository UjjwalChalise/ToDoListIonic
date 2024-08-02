import React, { useState, useEffect } from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { add, pencilOutline, trashOutline } from 'ionicons/icons';
import './Home.css';
import { TaskModel } from '../../Model/TaskModel';
import { getData, loadDataFromFirestore, saveData } from '../../components/storage';
import { logOutUser, syncLocalDataWithFirestore } from '../../Firebase/firebaseConfigs';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const router = useIonRouter();

  useEffect(() => {
    const loadData = async () => {
      await loadDataFromFirestore(); // Load from Firestore
      const localTasks = await getData('tasks') || [];
      setTasks(localTasks);
    };
    loadData();
  }, []);

  const handleUploadData = async () => {
    await syncLocalDataWithFirestore(); // Sync local data with Firestore
    const localTasks = await getData('tasks') || [];
    setTasks(localTasks);
  };

  const handleDelete = async (id: string) => {
    const localTasks: TaskModel[] = await getData('tasks') || [];
    const updatedTasks = localTasks.filter(task => task.id !== id);
    await saveData('tasks', updatedTasks);
    setTasks(updatedTasks);
  };

  const handleCreateTask = () => {
    router.push('/task/create');
  };

  const handleEditTask = (id: string) => {
    router.push(`/task/edit/${id}`);
  };

  const handleLogout = async () => {
    await syncLocalDataWithFirestore(); // Ensure data is uploaded before logging out
    await logOutUser();
    router.push('/login'); // Redirect to login page or any other page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="button-group">
          <IonButton expand="block" onClick={handleCreateTask} className="action-button">
            <IonIcon icon={add} slot="start" />
            Add Task
          </IonButton>
          <IonButton expand="block" onClick={handleUploadData} className="action-button">
            Upload All Tasks
          </IonButton>
          <IonButton expand="block" onClick={handleLogout} className="action-button">
            Log Out
          </IonButton>
        </div>
        <IonList>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <IonItemSliding key={task.id}>
                <IonItem>
                  <IonAvatar slot="start">
                    <img
                      src={`https://via.placeholder.com/150`}
                      alt={`${task.name}`}
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{task.name}</h2>
                    <h3>{task.desc}</h3>
                    <p>{task.date}</p>
                  </IonLabel>
                  <IonButton slot="end" fill="clear" color="primary" onClick={() => handleEditTask(task.id!)}>
                    <IonIcon icon={pencilOutline} slot="icon-only" />
                  </IonButton>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => handleDelete(task.id!)} color="danger">
                    <IonIcon icon={trashOutline} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          ) : (
            <div className="empty-state">
              <img src="/assets/animation.gif" width={100} alt="Illustration" />
              <div className="message">
                <span>Click here to create your first task.</span>
              </div>
              <IonButton className="floating-button" color="primary" onClick={handleCreateTask}>
                <IonIcon icon={add} />
              </IonButton>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
