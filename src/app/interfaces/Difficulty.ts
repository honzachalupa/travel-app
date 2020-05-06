export enum DifficultyCodes {
    'NONE' = 'NONE',
    'DIFFICULTY_1' = 'DIFFICULTY_1',
    'DIFFICULTY_2' = 'DIFFICULTY_2',
    'DIFFICULTY_3' = 'DIFFICULTY_3'
}

export interface IDifficulty {
    id: DifficultyCodes;
    label: string;
}
