import { 
  saveTaskToFirestore, 
  getTasksFromFirestore, 
  saveTaskCategoryToFirestore, 
  getTaskCategoriesFromFirestore
} from './../Firebase/firebaseConfigs';
import { TaskModel } from '../Model/TaskModel';
import { TaskCategory } from '../Model/TaskCategory';

export const getData = async (key: string): Promise<any> => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveData = async (key: string, data: any): Promise<void> => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteData = async (key: string): Promise<void> => {
  localStorage.removeItem(key);
};

// Firestore functions

// Add a Task to Firestore
export const addTaskToFirestore = async (task: TaskModel): Promise<void> => {
  await saveTaskToFirestore(task);
};


// Delete a Task from Firestore
export const deleteTaskFromFirestore = async (taskId: string): Promise<void> => {
  await deleteTaskFromFirestore(taskId);
};

// Add a Task Category to Firestore
export const addTaskCategoryToFirestore = async (category: TaskCategory): Promise<void> => {
  await saveTaskCategoryToFirestore(category);
};


// Delete a Task Category from Firestore
export const deleteTaskCategoryFromFirestore = async (categoryId: string): Promise<void> => {
  await deleteTaskCategoryFromFirestore(categoryId);
};

// Sync local data with Firestore
export const syncLocalDataWithFirestore = async (): Promise<void> => {
  const localTasks: TaskModel[] = await getData('tasks') || [];
  const localCategories: TaskCategory[] = await getData('categories') || [];
  
  if (localTasks) {
    for (const task of localTasks) {
      if (task.id) {
        await addTaskToFirestore(task);
      }
    }
    await deleteData('tasks');
  }

  if (localCategories) {
    for (const category of localCategories) {
      if (category.id) {
        await addTaskCategoryToFirestore(category);
      }
    }
    await deleteData('categories');
  }
};

// Load data from Firestore
export const loadDataFromFirestore = async (): Promise<void> => {
  const tasksFromFirestore: TaskModel[] = await getTasksFromFirestore();
  const categoriesFromFirestore: TaskCategory[] = await getTaskCategoriesFromFirestore();
  
  await saveData('tasks', tasksFromFirestore);
  await saveData('categories', categoriesFromFirestore);
};