const discoALatLng = L.latLng(latitudeA, longitudeA);
const discoBLatLng = L.latLng(latitudeB, longitudeB);

const distance = discoALatLng.distanceTo(discoBLatLng); // in meters

$("#distance").html(distance.toFixed(2));

function getRollAxis(currentDirection) {
    const curse = calculateBearingBetween(
        latitudeA,
        longitudeA,
        latitudeB,
        longitudeB,
        distance
    );

    const targetDirection = curse.bearing;

    $("#bearing-current").html(currentDirection.toFixed(2));
    $("#bearing-target").html(targetDirection.toFixed(2));

    const provisional = targetDirection - currentDirection;

    let turn = 0;

    if (-180 < provisional && provisional <= 180) {
        turn = provisional;
    } else if (provisional > 180) {
        turn = provisional - 360;
    } else if (provisional <= -180) {
        turn = provisional + 360;
    }

    if (Math.abs(turn) < constants.DIRECTION_MARGIN) return 0;

    if (turn > 0 || turn < 0) return rollMapWithMinMax(turn);

    return 0;
}

let firstThrottleWithLoad = null;

function getThrottle(distance) {
    if (
        distance >
        constants.REQUIRED_DISTANCE + constants.REQUIRED_DISTANCE_MARGIN
    ) {
        // We are too far, shoud speed up

        if (!firstThrottleWithLoad) firstThrottleWithLoad = Date.now();

        const diff = Date.now() - firstThrottleWithLoad;

        if (
            diff >
            (constants.THROTTLE.MAX_FULL_POWER + constants.THROTTLE.REST) * 1000
        ) {
            firstThrottleWithLoad = null;
        }

        if (diff > constants.THROTTLE.MAX_FULL_POWER * 1000) {
            return 0;
        }

        return 100;
    } else if (distance > constants.REQUIRED_DISTANCE) {
        // We are too far away (but within margin), we have to speed up becasue we will fall out from margin

        firstThrottleWithLoad = null;

        const throttle = (distance - constants.REQUIRED_DISTANCE).map(
            0,
            constants.REQUIRED_DISTANCE_MARGIN,
            0,
            50
        );

        return throttle;
    } else if (
        distance <
        constants.REQUIRED_DISTANCE - constants.REQUIRED_DISTANCE_MARGIN
    ) {
        // We are too too close, we have to slow down becasue we will overtake

        firstThrottleWithLoad = null;

        return constants.THROTTLE.MAX_SLOWING;
    } else if (distance < constants.REQUIRED_DISTANCE) {
        // We are too close (but within margin), we have to slow down becasue we will slowly overtake

        firstThrottleWithLoad = null;

        const throttle = -Math.abs(distance - constants.REQUIRED_DISTANCE).map(
            0,
            constants.REQUIRED_DISTANCE_MARGIN,
            0,
            -constants.THROTTLE.MAX_SLOWING
        );

        return throttle;
    }

    firstThrottleWithLoad = null;

    return 0;
}

// [-100, 100] -100 mean slowing down, 100 mean accelerate
const throttle = getThrottle(distance);

// [-100, 100] -100 mean hard left turn, 100 mean hard right turn
const roll = getRollAxis(directionA);

$("#direction").html(rollToDirection(roll));
$("#throttle").html(throttle.toFixed(0));
$("#roll").html(roll.toFixed(0));
