const discoALatLng = L.latLng(latitudeA, longitudeA);
const discoBLatLng = L.latLng(latitudeB, longitudeB);

const distance = discoALatLng.distanceTo(discoBLatLng); // in meters

function isTheSameDirectionWithMargin() {
    // TODO

    return false;
}

let roll = 0; // [-100, 100] -100 mean hard left turn, 100 mean hard right turn
let throttle = 0; // [-100, 100] -100 mean slowing down, 100 mean accelerate

// algorithm here

if (
    distance > requiredDistance + requiredDistanceMargin &&
    isTheSameDirectionWithMargin()
) {
    throttle = 50; // TODO dynamic throttle control
}

if (
    distance < requiredDistance - requiredDistanceMargin &&
    isTheSameDirectionWithMargin()
) {
    throttle = -50; // TODO dynamic throttle control
}

if (distance > 100) {
    throttle = 100; // TODO don't use 100% throttle for too long
}

// end
