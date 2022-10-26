Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (
        ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
};

const rad2deg = 180 / Math.PI;
const deg2rad = Math.PI / 180;

function fixBearing(value) {
    if (value < 0) value += 360;
    if (value > 365) value -= 360;

    return value;
}

function rollMapWithMinMax(value) {
    if (value > 0) {
        if (value < constants.ROLL.MIN) return constants.ROLL.MIN;
        if (value > constants.ROLL.MAX) return constants.ROLL.MAX;
    } else if (value < 0) {
        if (value > -constants.ROLL.MIN) return -constants.ROLL.MIN;
        if (value < -constants.ROLL.MAX) return -constants.ROLL.MAX;
    }

    return value;
}

function calculateBearingBetween(lat1, lon1, lat2, lon2) {
    let dphi, dlam;

    dphi = deg2rad * (lat1 + lat2) * 0.5e-6;

    const cphi = Math.cos(dphi);

    dphi = deg2rad * (lat2 - lat1) * 1.0e-6;
    dlam = deg2rad * (lon2 - lon1) * 1.0e-6;

    dlam *= cphi;

    let bearing = fixBearing(rad2deg * Math.atan2(dlam, dphi));

    // const ndistance = 6371000 * Math.sqrt(dphi * dphi + dlam * dlam);

    return { bearing };
}

function estaminatePosition(lat, lon, Vx, Vy, deltaT) {
    // deltaT in milis
    deltaT /= 1000;

    const estaminateLatitude = lat + (Vx * deltaT) / 111111; //111111 m = 1° latitude when traveling on a meridian
    const estaminateLongitude =
        lon + (Vy * deltaT) / (111111 * cos((lat * 3.14159) / 180));

    return { latitude: estaminateLatitude, longitude: estaminateLongitude };
}

function rollToDirection(value) {
    if (value > 0) return "right";
    else if (value < 0) return "left";
    return "hold";
}
