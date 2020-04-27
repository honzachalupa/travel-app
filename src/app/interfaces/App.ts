declare module '@honzachalupa/helpers';

declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare let __BUILDTARGET__: string;
declare let __BASENAME__: string;
