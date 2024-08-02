import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonDatetime, IonIcon } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './CreateTask.css';
import { getData, saveData } from '../../components/storage';

export interface Task {
  id: string;  // ID is required
  name: string;
  desc: string;
  date: string;
}

const CreateTask: React.FC = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState<string | undefined>(undefined);
  const router = useIonRouter();

  const handleAddTask = async () => {
    if (name.trim() === '' || desc.trim() === '' || !date) {
      return;
    }
    const newTask: Task = { name, desc, date, id: new Date().toISOString() };
    const localTasks = await getData('tasks') || [];
    localTasks.push(newTask);
    await saveData('tasks', localTasks);
    router.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Task Name" value={name} onIonChange={(e) => setName(e.detail.value!)} clearInput className="input-field" />
        <IonInput placeholder="Description" value={desc} onIonChange={(e) => setDesc(e.detail.value!)} clearInput className="input-field" />
        <IonDatetime 
          aria-placeholder="Select Due Date" 
          value={date} 
          onIonChange={(e) => setDate(e.detail.value!.toString())} 
          className="datetime-field" 
        />
        <IonButton onClick={handleAddTask} className="ok-button">
          <IonIcon icon={checkmarkCircleOutline} slot="icon-only" />
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateTask;
