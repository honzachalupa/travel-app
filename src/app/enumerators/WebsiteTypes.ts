import { IWebsite } from 'Interfaces/Website';

export enum WebsiteTypeCodes {
    'NONE' = 'NONE',
    'WIKIPEDIA' = 'WIKIPEDIA',
    'OWNER' = 'OWNER'
}

export const WebsiteTypes = [{
    id: WebsiteTypeCodes.NONE,
    label: '-'
}, {
    id: WebsiteTypeCodes.WIKIPEDIA,
    label: 'Wikipedia'
}, {
    id: WebsiteTypeCodes.OWNER,
    label: 'Další informace'
}] as IWebsite[];
