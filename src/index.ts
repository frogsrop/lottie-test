import lotie, {AnimationItem, RendererType} from 'lottie-web'
import Stats = require('stats-js');
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

lotie.setQuality(1);

function loadLottieAnim(parent, path = 'chik.json', margin = "0px", activate = true) {
    const lottieElement = document.createElement("div");
    lottieElement.className = "lottie";
    lottieElement.style.margin = margin;
    lottieElement.style.width = "100px";

    parent.appendChild(lottieElement);
    const t: RendererType = 'canvas';
    const a = {
        container: lottieElement,
        loop: true,
        path: path,
        autoplay: activate,
        renderer: t,
        rendererSettings: {
            context: ctx,
            preserveAspectRatio: 'xMidYMid meet'
        }
    };
    const animItem = lotie.loadAnimation(a);
    return {anim: animItem, element: lottieElement};
}

const canvas = document.createElement("canvas");
canvas.style.width = `100px`;
canvas.style.height = `100px`;
const ctx = canvas.getContext("2d");

const topElement = document.createElement("div");
topElement.style.width = "90%";
topElement.style.height = "70px";
topElement.style.display = "flex";
topElement.style.marginLeft = "10%";
topElement.style.justifyContent = "space-between";
document.body.appendChild(topElement);
let items = 0;
const animations: AnimationItem[] = [];

function addClicker(path) {
    const item = loadLottieAnim(topElement, path, "5px", false);
    item.element.onclick = () => {
        items += 10;
        textElement.textContent = `Items: ${items}`;
        for (let i = 0; i < 10; i++) {
            const res = loadLottieAnim(bottomElement, path);
            animations.push(res.anim);
        }
    };
}

addClicker('chik.json');
addClicker('cat.json');
addClicker('animation.json');
addClicker('simple.json');
addClicker('verysimple.json');

const textElement = document.createElement("div");
textElement.style.marginLeft = "10px";
textElement.style.marginRight = "10px";
textElement.style.width = "100px";
textElement.style.display = "table";
textElement.style.verticalAlign = "middle";
textElement.textContent = "Items: 0";
textElement.style.lineHeight = "70px";
topElement.appendChild(textElement);

const button = document.body.appendChild(document.createElement("button"));
button.style.marginLeft = "45%";
button.style.marginRight = "45%";
button.textContent = "CLEAR";
button.onclick = () => {
    items = 0;
    for (const animation of animations) {
        animation.destroy();
    }
    while (bottomElement.firstChild) {
        bottomElement.removeChild(bottomElement.lastChild);
    }
}

const bottomElement = document.createElement("div");
bottomElement.style.width = "auto";
bottomElement.style.marginLeft = "50px";
bottomElement.style.marginRight = "50px";
bottomElement.style.height = "100%";
bottomElement.style.justifyContent = "top";
bottomElement.style.display = "table";
bottomElement.style.justifyContent = "center";
bottomElement.style.alignItems = "center";
bottomElement.style.marginTop = "20px";
document.body.appendChild(bottomElement);

let frames = 0;
function measurer(t) {
    frames++;
    if(frames % (60 * 1)) {
        stats.showPanel(0);
    }
    requestAnimationFrame(measurer);
    stats.update();
}
requestAnimationFrame(measurer);
