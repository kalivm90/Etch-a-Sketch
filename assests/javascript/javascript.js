document.addEventListener("DOMContentLoaded", () => {

    const DEFAULT_SIZE = 16
    const DEFAULT_COLOR = "#333333"
    const DEFAULT_MODE = "color"
    
    let currentSize = DEFAULT_SIZE
    let currentColor = DEFAULT_COLOR
    let currentMode = DEFAULT_MODE

    let colorPick = document.querySelector(".color-picker")
    let colorMode = document.querySelector(".color")
    let randomMode = document.querySelector(".random")
    let eraseMode = document.querySelector(".erase")
    let clearMode = document.querySelector(".clear")
    let customSize = document.querySelector("#custom-size")

    colorPick.oninput = e => currentColor = e.target.value; 
    colorMode.onclick = e => setCurrentMode("color");
    randomMode.onclick = e => setCurrentMode("random");
    eraseMode.onclick = e => setCurrentMode("erase");
    clearMode.onclick = e => clearBoard();
    customSize.onchange = e => customeBoard(e);

    let mouseDown = false
    document.body.onmousedown = () => (mouseDown = true)
    document.body.onmouseup = () => (mouseDown = false)

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function setCurrentMode(newMode) {
        activateButton(newMode)
        currentMode = newMode
    }

    function activateButton(newMode) {
        console.log(currentMode, newMode)
        if (currentMode === "random") {
            randomMode.classList.remove("active")
        } else if (currentMode === "color") {
            colorMode.classList.remove("active")
        } else if (currentMode === "erase") {
            eraseMode.classList.remove("active")
        }

        if (newMode === "random") {
            randomMode.classList.add("active")
        } else if (newMode === "color") {
            colorMode.classList.add("active")
        } else if (newMode === "erase") {
            eraseMode.classList.add("active")
        }
    }

    function changeColor(e) {
        if (e.type === "mouseover" && !mouseDown) return
        if (currentMode === "random") {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            let color = `rgb(${String(r)}, ${String(g)}, ${String(b)})`
            e.target.style.backgroundColor = color;
        } else if (currentMode === "erase"){
            e.target.style.backgroundColor = "#ffffff"
        } else  {
            e.target.style.backgroundColor = currentColor 
        }
    }

    function makeBoard() {

        for (let i = 0; i < currentSize; i++) {
            let row = document.createElement("div");
            setAttributes(row, {"class" : `row${String(i+1)}`, "id" : "row"})
            document.querySelector(".board").appendChild(row);
            for (let j = 0; j < currentSize; j++) {
                let piece = document.createElement("div");
                setAttributes(piece, {"class": `item${String(j+1)}`, "id": "item"})
                piece.addEventListener("mousedown", changeColor)
                piece.addEventListener("mouseover", changeColor)
                document.querySelector(`.row${String(i+1)}`).appendChild(piece);
            }
        }
    }

    function clearBoard() {
        let myNode = document.querySelectorAll("#row")
        for (let i = 0; i < myNode.length; i++) {
            myNode[i].remove()
        }
        render();
    }

    function customeBoard(e) {
        currentSize = e.target.value;
        clearBoard();
    }

    function render() {
        makeBoard();
        activateButton();
    }

})