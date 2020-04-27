import { IState } from "App/*";

export interface IContext extends IState {
    setTestValue: (value: string) => void;
}
