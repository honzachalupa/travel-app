// import { Context } from '@honzachalupa/helpers';
// import { IContext } from 'Interfaces/Context';
// import { useContext, useEffect, useState } from 'react';

export enum EThemes {
    DARK = 'DARK',
    LIGHT = 'LIGHT'
}

/* export default () => {
    const { setIsDarkModeOn, setIsDarkModeSupported } = useContext(Context) as IContext;
    const [theme, setTheme] = useState<EThemes>();

    const getTheme = ({ matches }: { matches: boolean }) => {
        if (setIsDarkModeSupported) {
            setIsDarkModeSupported(true);
        }

        setTheme(matches ? EThemes.DARK : EThemes.LIGHT);
    }

    useEffect(() => {
        try {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', getTheme);
        } catch (error) {
            if (setIsDarkModeSupported) {
                setIsDarkModeSupported(false);
            }

            setTheme(EThemes.LIGHT);

            const storageItem = localStorage.getItem('isDarkModeOn');

            if (storageItem) {
                setTheme(storageItem === 'true' ? EThemes.DARK : EThemes.LIGHT);
            }
        }

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', getTheme);
        };
    }, []);

    useEffect(() => {
        if (setIsDarkModeOn) {
            console.log(theme === EThemes.DARK);
            setIsDarkModeOn(theme === EThemes.DARK);
        }
    }, [theme]);

    return theme;
} */
