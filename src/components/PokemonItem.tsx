import React from "react";
import { IonItem , IonAvatar, IonLabel} from '@ionic/react';
import { Pokemon } from '../models/pokemon.model';

const PokemonItem: React.FC<{pokemon : Pokemon}> = ({pokemon}) =>{
    return(
        <IonItem>
            <IonAvatar slot="start">
                <img src={pokemon.frontSprite} />
            </IonAvatar>
            <IonLabel>
                <h2>{pokemon.name}</h2>
                <p>{pokemon.type}</p>
                <b>Shiny Version</b>
                <img src={pokemon.shinySprite} />
            </IonLabel>
        </IonItem>
    );
}

export default PokemonItem;