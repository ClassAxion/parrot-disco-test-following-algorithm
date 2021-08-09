const map = L.map("map").setView([53.34912, 17.64003], 15);

function degressCorrect(degress) {
    if (degress > 360) degress -= 360;
    if (degress < 0) degress = 360 - degress * -1;

    return degress;
}

L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);

const discoIcon = L.icon({
    iconUrl: "/assets/parrot.png",
    iconSize: [50, 50],
});

const markerA = L.marker([latitudeA, longitudeA], {
    icon: discoIcon,
    rotationAngle: degressCorrect(directionA - 180),
})
    .addTo(map)
    .bindPopup(
        "Disco A | Direction " +
            directionA.toFixed(0) +
            " | Speed " +
            speedA.toFixed(1)
    );

markerA._icon.style["transform-origin"] = "50% 50%";

const markerB = L.marker([latitudeB, longitudeB], {
    icon: discoIcon,
    rotationAngle: degressCorrect(directionB - 180),
})
    .addTo(map)
    .bindPopup(
        "Disco B | Direction " +
            directionB.toFixed(0) +
            " | Speed " +
            speedB.toFixed(1)
    );

markerB._icon.style["transform-origin"] = "50% 50%";
