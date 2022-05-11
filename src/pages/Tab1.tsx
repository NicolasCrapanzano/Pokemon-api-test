import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, useIonViewDidEnter , IonTitle, IonToolbar, IonButton, IonCard, IonList,IonItem,IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonCol, IonRow } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import { Pokemon } from './../models/pokemon.model' 

interface IResponse{
  count:number,
  next:string
  previous:string
  results: [Object]
}
function debuglog(param:any){
  console.log("data is: ",param);
  return undefined;
}

const Tab1: React.FC = () => {

  const [pokemon,setPokemon] = useState<Pokemon[]>([]);
  const [searchPokemon,setSearchPokemon] = useState<string>();
  const [totalPokemonCount,setPokemonCount] = useState<number>(0);
  const [currentPokemonMin,setPokemonMin] = useState<number>(0);
  const [ammountOfItemsShown,setItemsShown] = useState<number>(10);
  const [currentPokemonMax,setPokemonMax] = useState<number>(ammountOfItemsShown);

  async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    return await response.json()
  }
  
  useIonViewDidEnter(async () => {
    //Get the total ammount of pokemon
    const resultCount = await (await http<IResponse>("https://pokeapi.co/api/v2/pokemon-species/?limit=1"));
    setPokemonCount(resultCount.count);
    //set limit for searh (top)
    
    setSearchPokemon( "https://pokeapi.co/api/v2/pokemon/?offset="+currentPokemonMin+"&limit="+currentPokemonMax );
  });
  function nextPokemonList(){
    if(currentPokemonMax >= totalPokemonCount){
      console.log("limit of list reached");
      return;
    }
    setPokemonMin(currentPokemonMin + ammountOfItemsShown);
    
  }
  useEffect(() => {
    (async function(){
    const result = await (await http<IResponse>( (searchPokemon as string) )).results;
    console.log(result);
    addPokemons(result as [Pokemon]);
    })();
  }, [searchPokemon])

  function addPokemons(newPokemon:[Pokemon]){
    setPokemon(newPokemon);
  }
  function addPokemon(newPokemon:Pokemon){
    console.log(pokemon," + ",newPokemon);
    setPokemon([...pokemon,newPokemon]);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokemon search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            
          </IonToolbar>
        </IonHeader>
        <h1>Pokemon count is:  </h1>
        <h2>{totalPokemonCount}</h2>
        <h3>url: {searchPokemon}</h3>
        <IonGrid>
          <IonRow>
            {pokemon.map(poke  =>
                <IonCol size='4'>
                  <IonCard key={poke.name}>
                    <img src={poke.frontSprite} alt="pokemon img" />
                    <IonCardHeader>
                      <IonCardSubtitle>{poke.name}</IonCardSubtitle>
                      <IonCardTitle>{poke.url}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton>See more</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonButton >Previous</IonButton>
        <IonButton onClick={()=>{nextPokemonList()}}>Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

//<IonButton onClick={() => {debuglog(searchPokemon);}}>showpokemon</IonButton>