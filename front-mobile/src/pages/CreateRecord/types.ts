export type GamePlatform = 'XBOX' | 'PC' | 'PS'

export type Game = {
    id: number;
    title: string;
    platform: GamePlatform;
    label: string;
    value: number;
    

}

