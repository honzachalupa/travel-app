const firebaseCredentials = require('./firebase-credentials');

module.exports = {
    name: 'Places',
    nameShort: 'Places',
    description: 'Some description.',
    accentColor: '#ffb12a',
    developerName: 'Jan Chalupa',
    developerUrl: 'https://www.honzachalupa.cz/',
    caching: true,
    deviceBreakpoint: 600,
    googleCloudKey: 'AIzaSyBHmKKahUlHUEZPUjuS2yLb-D_zUyn1_y4',
    coordinatesFallback: { latitude: 50.083333, longitude: 14.416667 },
    firebase: firebaseCredentials
};
