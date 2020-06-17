import { Context } from '@honzachalupa/helpers';
import CheckedIcon from 'Icons/accept.svg';
import { IContext } from 'Interfaces/Context';
import { IPlace } from 'Interfaces/Place';
import React, { useContext } from 'react';
import './style';

interface IProps {
    place: IPlace;
}

export default ({ place }: IProps) => {
    const { visits, currentUser } = useContext(Context) as IContext;

    const isVisited = visits && currentUser && visits[place.id] ? visits[place.id].includes(currentUser.uid) : false;

    const items = [{
        label: 'Doporučeno',
        icon: CheckedIcon,
        isHidden: !place.isPromoted
    }, {
        label: 'Navštíveno',
        icon: CheckedIcon,
        isHidden: !isVisited
    }, {
        label: 'Skvělé hodnocení',
        icon: CheckedIcon,
        isHidden: place.rating.value < 5
    }].filter(x => !x.isHidden);

    console.log(items);

    return (
        <div data-component="PropertiesList">
            {items.map(item => (
                <img className="icon" src={item.icon} alt={item.label} title={item.label} />
            ))}
        </div>
    )
};
