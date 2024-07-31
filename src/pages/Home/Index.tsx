import { IonAvatar, IonButton, IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Index.css';

const arr =[
  {
    name :'Ujjwal',
    desc:'He Is Hero'
},
{
  name :'Chalise',
  desc:'He Is Don'
}
,{
  name :'Giri',
  desc:'He Is Chor'
}
]

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='ion-padding' fullscreen> Hello Home
        <IonList>
          {arr.map(elem => 
          <IonItemSliding key={elem.name}>
            <IonItem>
            <IonAvatar>
              <img src={`https://ionicframework.com/docs/demos/api/list/avatar-${elem.name.toLowerCase()}.png`}></img>
            </IonAvatar>
            <IonLabel>
              <h2>{elem.name}</h2>
              <h3>{elem.desc}</h3>
              <p>some helper text </p>
              </IonLabel>
              </IonItem>
              <IonItemOptions side ="end">
              <IonItemOption onClick={()=> alert('Pressed Delete')} color="danger"> Delete</IonItemOption>
              </IonItemOptions>
          </IonItemSliding>
        )}</IonList>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonButton routerLink='/login'> Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
