import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, useIonViewDidEnter , IonTitle, IonToolbar, IonButton, IonCard, IonList,IonItem,IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonCol, IonRow } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import { Pokemon } from './../models/pokemon.model' 
import { debug } from 'console';

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
  const [searchPokemonSnippet,setSearchPokemonSnippet] = useState<string>('');
  const [searchPokemon,setSearchPokemon] = useState<string>();
  const [totalPokemonCount,setPokemonCount] = useState<number>(0);
  const [currentPokemonMin,setPokemonMin] = useState<number>(0);
  const [ammountOfItemsShown,setItemsShown] = useState<number>(3);
  const [currentPokemonMax,setPokemonMax] = useState<number>(ammountOfItemsShown);

  const [firstBoot,setFirstBoot] = useState<boolean>(true);

  async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    let res = response.json();
    
    return await res
  }
  
  useIonViewDidEnter(async () => {
    //Get the total ammount of pokemon
    const resultCount = await (await http<IResponse>("https://pokeapi.co/api/v2/pokemon-species/?limit=1"));
    setPokemonCount(resultCount.count);
    //set limit for searh (top)
    
    //setSearchPokemonSnippet( "https://pokeapi.co/api/v2/pokemon/?offset="+currentPokemonMin+"&limit="+currentPokemonMax );
    setSearchPokemon("https://pokeapi.co/api/v2/pokemon/");
  });

  function nextPokemonList(){
    if(currentPokemonMax >= totalPokemonCount){
      console.log("limit of list reached");
      return;
    }
    setPokemonMin((currentPokemonMin + ammountOfItemsShown));
    setPokemonMax(currentPokemonMax + ammountOfItemsShown);
  }
  function prevPokemonList(){
    if(currentPokemonMin <= 0){
      console.log("limit of list reached");
      return;
    }
    setPokemonMin((currentPokemonMin - ammountOfItemsShown));
    setPokemonMax(currentPokemonMax - ammountOfItemsShown);
  }

  useEffect(() =>{
    if(!firstBoot){
      updatePokemon();
    }
    return;
  },[currentPokemonMin])

  useEffect(() => {
    updatePokemon();
  }, [searchPokemon])

  function updatePokemon(){
    if(searchPokemon === undefined){
      return;
    }
    setFirstBoot(false);
    (async function(){
    let result = new Array<Pokemon>(ammountOfItemsShown);
    if(searchPokemon === undefined){
      console.log("search pokemon undefined: ", searchPokemon);
    }
    for(let i:number = 1; i <= ammountOfItemsShown; i++){
      let tempSearch:string = (searchPokemon + (currentPokemonMin + i) ) ;
      
      result[i] = ( await (await http<Pokemon>( ( tempSearch) )));
      //console.log("Query res: ",result);
    }
    
    addPokemons(result);
    })();
  }
  function addPokemons(newPokemon: Array<Pokemon>){
    setPokemon(newPokemon);
  }

  function addPokemon(newPokemon:Pokemon){
    
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
        <h3>url: {searchPokemon} {currentPokemonMin} - {currentPokemonMax}</h3>
        <IonGrid>
          <IonRow>
            {pokemon.map(poke  =>
                <IonCol key={poke.id} size='4'>
                  <IonCard>
                    <img src={poke.sprites.front_default} alt="pokemon img" />
                    <IonCardHeader>
                      <IonCardSubtitle>Type: { 
                        poke.types?.map(
                          (pokeType) => <span>{pokeType.type.name}, </span>
                        )
                        }
                        </IonCardSubtitle>
                      <IonCardTitle>Pokemon: {poke.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>Weight: {poke.weight}</p>
                      <p>Height: {poke.height}</p>
                      <IonButton>See more</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonButton onClick={()=>{prevPokemonList()}}>Previous</IonButton>
        <IonButton onClick={()=>{nextPokemonList()}}>Next</IonButton>
        <IonButton onClick={()=>{console.log(pokemon)}}>Debug</IonButton>
        <IonButton onClick={()=>{  }}>Debug type</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

//<IonButton onClick={() => {debuglog(searchPokemon);}}>showpokemon</IonButton>