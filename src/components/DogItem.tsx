import React from "react";
import { IonItem , IonAvatar, IonLabel} from '@ionic/react';
import { Dog } from '../models/dog.model';

const EmployeeItem: React.FC<{dog : Dog}> = ({dog}) =>{
    return(
        <IonItem>
            <IonAvatar slot="start">
                <img src={dog.message} />
            </IonAvatar>
            <IonLabel>
                <h2>dog</h2>
                <p>dogo</p>
            </IonLabel>
        </IonItem>
    );
}

export default EmployeeItem;