import { IDefaultData } from "./IdefaultData";

export interface IGameState {
    turn: number;
    language: string;
    isTutorial: boolean;
    player: IDefaultData;
    bots: IDefaultData[];
}
