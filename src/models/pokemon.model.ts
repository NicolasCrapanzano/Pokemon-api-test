import { IPokeSprites } from "./pokemonSprites.model";

export interface Pokemon {
    id: number;
    name: string;
    sprites: IPokeSprites;
    abilities?: Array<object>;
    base_experience?: number;
    forms?: Array<object>;
    game_indices?: Array<object>;
    height?: number;
    held_items?: Array<object>;
    is_default?: boolean;
    location_area_encounters?: string;
    moves?: Array<object>;
    order?: number;
    past_types?: Array<object>;
    species?: object
    stats?:  Array<object>;
    types?: [
        {type:{
            name:string,
            url:string
        }}
    ];
    weight?: number;
}
