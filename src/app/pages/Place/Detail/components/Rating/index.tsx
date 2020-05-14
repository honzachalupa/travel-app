import { Database } from 'Helpers';
import { IPlaceRemote } from 'Interfaces/Place';
import React from 'react';
import Ratings from 'react-star-ratings';
import './style';

interface IProps {
    place: IPlaceRemote;
}

export default ({ place }: IProps) => {
    const getValue = (value: number, count: number) =>
        value > 0 && count > 0 ?
            Math.round(value / count) :
            0;

    const handleRatingChange = (ratedValue: any) => {
        Database.places.doc(place.id).set({
            ...place,
            rating: {
                value: place.rating.value + ratedValue,
                count: place.rating.count + 1
            }
        });
    }

    return (
        <div data-component="Rating">
            <Ratings
                rating={getValue(place.rating.value, place.rating.count)}
                svgIconPath="M 9.5449219 4 C 5.9299219 4 3 6.9299219 3 10.544922 C 3 16.837321 10.298975 22.849799 13.708984 25.527344 A 2 2 0 0 0 13.71875 25.535156 C 13.742115 25.5535 13.773881 25.579629 13.796875 25.597656 L 13.798828 25.595703 A 2 2 0 0 0 15 26 A 2 2 0 0 0 16.203125 25.595703 L 16.203125 25.597656 C 16.209855 25.59238 16.219801 25.585381 16.226562 25.580078 C 16.231704 25.576045 16.23898 25.570455 16.244141 25.566406 A 2 2 0 0 0 16.263672 25.548828 C 19.663109 22.880904 27 16.852336 27 10.544922 C 27 6.9299219 24.070078 4 20.455078 4 C 17.000078 4 15 7 15 7 C 15 7 12.999922 4 9.5449219 4 z"
                svgIconViewBox="0 0 30 30"
                starRatedColor="#FF0006"
                starDimension="30px"
                starSpacing="2px"
                changeRating={handleRatingChange}
            />

            <p className="count">Hodnotilo {place.rating.count} uživatelů.</p>
        </div>
    );
};
