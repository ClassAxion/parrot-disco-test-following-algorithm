const latitudeA = 53.34562;
const longitudeA = 17.63535;
const directionA = 349.070544524; // [0,360] in degress
const speedA = 54.6760371; // in km/h
const altitudeA = 76.6920166015625; // in meters

// on the right
// const latitudeB = 53.3518;
// const longitudeB = 17.64192;

// on the left
// const latitudeB = 53.34936;
// const longitudeB = 17.62082;

// opposite direction
// const latitudeB = 53.3505;
// const longitudeB = 17.6337;

// opposide in required distance
const latitudeB = 53.346;
const longitudeB = 17.63541;

const directionB = 358.126125284; // [0,360] in degress
const speedB = 52.3734924; // in km/h
const altitudeB = 89.60479736328125; // in meters

const constants = {
    REQUIRED_DISTANCE: 50, // required distance between drones [m]
    REQUIRED_DISTANCE_MARGIN: 10, // required distance margin [m]
    DIRECTION_MARGIN: 5, // direction margin [deg]
    ROLL: {
        MIN: 10, // min roll value when turning [%]
        MAX: 80, // max roll value when turning [%]
    },
    THROTTLE: {
        MAX_SLOWING: -50, // max slowing [%]
        MAX_FULL_POWER: 10, // max seconds with full power [s]
        REST: 5, // throttle rest after full power
    },
};
