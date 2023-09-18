// Model
const model = {
    targetPoint: {
        x: null,
        y: null,
        pointSize: 15
    },
    mousePosition: {
        x: null,
        y: null
    },
    distance: null,
    backgroundColors: {
        start: {
            red: 0,
            green: 255,
            blue: 255
        },
        end: {
            red: 255,
            green: 0,
            blue: 0,
        }
    }
}


// View

const app = document.getElementById('app');
init();
updateView()

function updateView() {
    if (model.distance != null && model.distance <= model.targetPoint.pointSize) {
        app.innerHTML = /* html */`
            <h1>Du klarte det!</h1>
            <span class="point" style="top: ${model.targetPoint.y - model.targetPoint.pointSize}px; left: ${model.targetPoint.x - model.targetPoint.pointSize}px"></span>
        `;
        removeEventListener("mousemove", onMouseMove);
        return;
    }

    app.innerHTML = /* html */`
        <span>MousePosition: x: ${model.mousePosition.x}, y: ${model.mousePosition.y}</span>
        <br>
        <span>TargetPoint: x: ${model.targetPoint.x}, y: ${model.targetPoint.y}</span>
        <br>
        <span>Distance: ${model.distance}</span>
    `;
    app.style.backgroundColor = getBackgroundColor();
}


// Controller
function init() {
    let targetPoint = getTargetPoint();
    model.targetPoint.x = targetPoint.x;
    model.targetPoint.y = targetPoint.y;
}

function getTargetPoint() {
    return {
        x: getRandomNumber(1, (window.innerWidth - model.targetPoint.pointSize)),
        y: getRandomNumber(1, (window.innerHeight - model.targetPoint.pointSize)),
    }
}

function calcDistance() {
    model.distance = Math.sqrt(
        (model.targetPoint.x - model.mousePosition.x)*(model.targetPoint.x - model.mousePosition.x)
        + (model.targetPoint.y - model.mousePosition.y)*(model.targetPoint.y - model.mousePosition.y)
    );
}

function getBackgroundColor() {
    if (model.distance == null) return;
    let red = 255 - model.distance;
    let green = 0 + model.distance / 2;
    let blue = 0 + model.distance / 4;
    return `rgb(${red}, ${green}, ${blue})`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMouseMove(event) {
    model.mousePosition.x = event.clientX;
    model.mousePosition.y = event.clientY;
    calcDistance();
    /* model.backgroundColor = getBackgroundColor(); */
    updateView();
}

window.addEventListener("mousemove", onMouseMove);