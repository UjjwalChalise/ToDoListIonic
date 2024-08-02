import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonDatetime, IonButtons, IonBackButton, IonIcon } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { saveData, getData } from '../../components/storage';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './UpdateTask.css';
import { TaskModel } from '../../Model/TaskModel';


const UpdateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState<string | undefined>(undefined);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const router = useIonRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedData = await getData('data');
      if (storedData) {
        setTasks(storedData);
        if (id) {
          const task = storedData[parseInt(id)];
          setName(task.name);
          setDesc(task.desc);
          setDate(task.date);
        }
      }
    };
    loadData();
  }, [id]);


  const handleAddOrUpdate = async () => {
    if (name.trim() === '' || desc.trim() === '' || !date) {
      return;
    }
    // let updatedTasks;
    // if (id) {
    //   updatedTasks = [...tasks];
    //   updatedTasks[parseInt(id)] = { name, desc, date };
    // } else {
    //   updatedTasks = [...tasks, { name, desc, date }];
    // }
    // setTasks(updatedTasks);
    // await saveData('data', updatedTasks);
    // router.push('/home');
  };

  const handleDelete = async () => {
    const updatedTasks = tasks.filter((_, i) => i !== parseInt(id));
    setTasks(updatedTasks);
    await saveData('data', updatedTasks);
    router.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Update Task</IonTitle>
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
          aria-description='Select Date' // Provide placeholder for better UX
        />
        {id && (
          <IonButton expand="block" onClick={handleDelete} color="danger" className="delete-button">
            Delete
          </IonButton>
        )}
        
        <IonButton onClick={handleAddOrUpdate} className="ok-button">
          <IonIcon icon={checkmarkCircleOutline} slot="icon-only" />
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UpdateTask;
