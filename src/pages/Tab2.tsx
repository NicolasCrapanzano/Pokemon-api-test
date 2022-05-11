import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonList } from '@ionic/react';
import './Tab2.css';

import { Person } from '../models/person.model';
import { Dog } from '../models/dog.model';

import EmployeeItem from './../components/EmployeeItem'
import DogItem from './../components/DogItem'

const Tab2: React.FC = () => {

  const [people, setPeople] = useState<Person[]>([]);
  const [dog, setDog] = useState<Dog>({message:"test"});

  
  useIonViewDidEnter(async () => {
    const result = await fetch('https://dog.ceo/api/breeds/image/random');

    const data = await result.json();
    setDog({message:data.message});
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <DogItem dog={dog} />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
