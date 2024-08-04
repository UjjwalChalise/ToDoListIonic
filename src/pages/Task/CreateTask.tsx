import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonDatetime, IonIcon } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './CreateTask.css';
import { getData, saveData } from '../../components/storage';
import { TaskModel } from '../../Model/TaskModel';
import CustomInput from '../../components/CustomInput';
import CustomDateTime from '../../components/CustomDateTime';


const CreateTask: React.FC = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState<string | undefined>(undefined);
  const router = useIonRouter();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
 

  const handleAddTask = async () => {
    if (name.trim() === '' || desc.trim() === '' || !date) {
      return;
    }
 

    const newTask: TaskModel = { name, desc, date, id: new Date().toISOString(),categoryId:"",completed:true,incrementId:1 };
    const localTasks = await getData('tasks') || [];
    localTasks.push(newTask);
    await saveData('tasks', localTasks);
    router.goBack()
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <CustomInput
            label="Task Name"
            value={name}
            onChange={setName}
            type="text"
          />
           <CustomInput
            label="Description"
            value={desc}
            onChange={setDesc}
            type="text"
          />
       
         <IonDatetime
          presentation='date'
          value={selectedDate}
          onClick={()=>setSelectedDate }
        />
        <IonInput type='date'></IonInput>
       

      </IonContent>
    </IonPage>
  );
};

export default CreateTask;
