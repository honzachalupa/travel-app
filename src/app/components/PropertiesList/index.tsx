import { Context } from '@honzachalupa/helpers';
import UserActions from 'Actions/users';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { ERoles } from 'Enums/Roles';
import { findInEnum, hasRole } from 'Helpers';
import CheckedIcon from 'Icons/checked-green.svg';
import HeartIcon from 'Icons/heart-red.svg';
import DifficultyIcon from 'Icons/mountain-red.svg';
import AuthorIcon from 'Icons/person-yellow.svg';
import StarIcon from 'Icons/star-yellow.svg';
import DistanceIcon from 'Icons/walker-green.svg';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceRemote } from 'Interfaces/Place';
import { IUser } from 'Interfaces/User';
import React, { useContext, useEffect, useState } from 'react';
import './style';

export enum EViews {
    INLINE = 'inline',
    BLOCK = 'block'
}

interface IProps {
    place: IPlace | IPlaceRemote;
    view: EViews;
    showHeadline?: boolean;
    showAuthor?: boolean;
    style?: React.CSSProperties;
}

export default ({ place, ...props }: IProps) => {
    const { visits, currentUser } = useContext(Context) as IContext;
    const [addedByUser, setAddedByUser] = useState<IUser | null>(null);

    const isVisited = visits && currentUser && visits[place.id] ? visits[place.id].includes(currentUser.uid) : false;

    const items = [{
        label: 'Doporučeno',
        icon: StarIcon,
        isHidden: !place.isPromoted || isVisited
    }, {
        label: 'Navštíveno',
        icon: CheckedIcon,
        isHidden: !isVisited
    }, {
        label: 'Skvělé hodnocení',
        icon: HeartIcon,
        isHidden: place.rating < 4.5
    }, {
        label: `Pěší vzdálenost: ${place.accessibility.walkingDistance} km`,
        icon: DistanceIcon,
        isHidden: place.accessibility.walkingDistance === 0
    }, {
        label: `Obtížnost terénu: ${findInEnum(Difficulties, place.accessibility.difficultyCode).label}`,
        icon: DifficultyIcon,
        isHidden: place.accessibility.difficultyCode === DifficultyCodes.NONE
    }, {
        label: `Autor: ${addedByUser?.emailAddress}`,
        icon: AuthorIcon,
        isHidden: !addedByUser || !hasRole(currentUser, ERoles.ADMIN)
    }].filter(x => !x.isHidden);

    useEffect(() => {
        if (props.showAuthor) {
            UserActions.getById(place.addedBy.id, setAddedByUser);
        }
    }, []);

    return items.length > 0 ? (
        <React.Fragment>
            {props.showHeadline && (
                <h3 className="headline">Podrobnosti</h3>
            )}

            <div data-component="PropertiesList" className={props.view} style={props.style}>
                {items.map(item => (
                    <div key={item.label} className="item">
                        <img className="icon" src={item.icon} alt="" />
                        <p className="label">{item.label}</p>
                    </div>
                ))}
            </div>
        </React.Fragment>
    ) : null
};
