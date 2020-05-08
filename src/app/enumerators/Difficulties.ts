import { IDifficulty } from 'Interfaces/Difficulty';

export enum DifficultyCodes {
    'NONE' = 'NONE',
    'DIFFICULTY_1' = 'DIFFICULTY_1',
    'DIFFICULTY_2' = 'DIFFICULTY_2',
    'DIFFICULTY_3' = 'DIFFICULTY_3'
}

export const Difficulties = [{
    id: DifficultyCodes.NONE,
    label: '-'
}, {
    id: DifficultyCodes.DIFFICULTY_1,
    label: 'Snadná'
}, {
    id: DifficultyCodes.DIFFICULTY_2,
    label: 'Střední'
}, {
    id: DifficultyCodes.DIFFICULTY_3,
    label: 'Obtížná'
}] as IDifficulty[];
