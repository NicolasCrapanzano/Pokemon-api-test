import React from "react";
import { IonItem, IonLabel, IonButton} from '@ionic/react';
import { Pokemon } from '../models/pokemon.model';

const PokemonPreviewItem: React.FC<{pokemon : Pokemon}> = ({pokemon}) =>{
    return(
        <IonItem>
            <IonLabel>
                <h2>{pokemon.name}</h2>
                <p>{pokemon.url}</p>
                <IonButton>See More</IonButton>
            </IonLabel>
        </IonItem>
    );
}

export default PokemonPreviewItem;