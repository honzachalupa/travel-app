const firebaseCredentials = require('./firebase-credentials');

module.exports = {
    name: 'Places',
    nameShort: 'Places',
    description: 'Some description.',
    accentColor: '#FF0006',
    developerName: 'Jan Chalupa',
    developerUrl: 'https://www.honzachalupa.cz/',
    caching: false,
    mapConfig: {
        defaultZoom: 9,
        defaultPosition: {
            latitude: 50.073658,
            longitude: 14.41854
        }
    },
    firebase: firebaseCredentials
};
