import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonText, useIonRouter, IonItemSliding, IonItem, IonAvatar, IonLabel, IonButton, IonItemOptions, IonItemOption } from '@ionic/react';
import { add, pencilOutline} from 'ionicons/icons';
import './Calender.css';
import { TaskModel } from '../../Model/TaskModel';
import { getData, saveData } from '../../components/storage';
import CustomDateTime from '../../components/CustomDateTime';


const Calendar: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [todayToDosTask, setToDosTask] = useState<TaskModel[]>([]);

  const [allTasks, setAllTasks] = useState<TaskModel[]>([]);
  
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    const loadData = async () => {
      const localTasks = await getData('tasks') || [];
      setAllTasks(localTasks);
    };
    loadData();
  }, []);

  const handleTodayButtonClick = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  };

  const router = useIonRouter();

  const handleDelete = async (id: string) => {
    const localTasks: TaskModel[] = await getData('tasks') || [];
    const updatedTasks = localTasks.filter(task => task.id !== id);
    await saveData('tasks', updatedTasks);
  };
  const handleEditTask = (id: string) => {
    router.push(`/task/edit/${id}`);
  };
  // Filter tasks based on selected date
  useEffect(() => {
    const filteredTasks = allTasks.filter(task => task.date == selectedDate);
    setToDosTask(filteredTasks);
  }, [selectedDate]);

  

 
  const handleAddTask = () => {
    router.push('/task/create');
  };

  return (
    <IonPage>
      
      <IonContent fullscreen>
        <div className="calendar-container">
         <CustomDateTime
          value={selectedDate}
          onChange={handleDateChange}
          onTodayButtonClick={() => handleTodayButtonClick()}
        />
          {todayToDosTask.length === 0 ? (
            <div className="calendar-text">
              <IonText className="calendar-heading">Daily Planner</IonText>
              <IonText>Click "+" to create a new task.</IonText>
              <IonText>Plan your day on the calendar view clearly!</IonText>
            </div>
            
          ) : (
            <div className="calendar-toDoList">
            <ul>
              {todayToDosTask.map((todayToDosTask) => (
                <IonItemSliding onIonDrag={() => handleDelete(todayToDosTask.id)} color='danger'   key={todayToDosTask.id} className={todayToDosTask.completed ? 'completed' : ''}>
                  <IonItem>
                    <IonLabel>
                      <h2>{todayToDosTask.name}</h2>
                      <h3>{todayToDosTask.desc}</h3>
                    </IonLabel>
                    <IonButton
                      slot="start"
                      fill="clear"
                      color="primary"
                      onClick={() => handleEditTask(todayToDosTask.id)}
                    >
                      <IonIcon icon={pencilOutline} slot="icon-only" />
                    </IonButton>
                  </IonItem>
                </IonItemSliding>
              ))}
            </ul>
          </div>
          )}
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={handleAddTask}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
