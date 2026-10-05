import init, { hash_file, hex_view } from "./pkg/hexhash.js";

const fileInput = document.querySelector("#file");
const drop = document.querySelector("#drop");
const result = document.querySelector("#result");
const name = document.querySelector("#name");
const size = document.querySelector("#size");
const hashes = document.querySelector("#hashes");
const hex = document.querySelector("#hex");

let currentFile = null;
let currentData = null;
let hashText = "";
let hexText = "";
let expanded = false;

function formatSize(bytes) {
    const units = ["B", "KiB", "MiB", "GiB"];
    let value = bytes;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
        value /= 1024;
        index++;
    }

    return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function updateHex() {
    if (!currentData) return;

    const maxBytes = expanded ? currentData.length : 4096;
    hexText = hex_view(currentData, maxBytes);
    hex.textContent = hexText;
    document.querySelector("#expand").textContent = expanded ? "collapse" : "expand";
}

async function loadFile(file) {
    if (!file) return;

    currentFile = file;
    currentData = new Uint8Array(await file.arrayBuffer());

    hashText = hash_file(currentData);

    name.textContent = file.name;
    size.textContent = formatSize(file.size);
    hashes.textContent = hashText;

    expanded = false;
    updateHex();

    result.hidden = false;
    drop.hidden = true;
}

fileInput.addEventListener("change", event => {
    loadFile(event.target.files[0]);
});

drop.addEventListener("dragover", event => {
    event.preventDefault();
    drop.classList.add("over");
});

drop.addEventListener("dragleave", () => {
    drop.classList.remove("over");
});

drop.addEventListener("drop", event => {
    event.preventDefault();
    drop.classList.remove("over");
    loadFile(event.dataTransfer.files[0]);
});

document.querySelector("#clear").addEventListener("click", () => {
    currentFile = null;
    currentData = null;
    hashText = "";
    hexText = "";
    expanded = false;

    result.hidden = true;
    drop.hidden = false;
    fileInput.value = "";
});

document.querySelector("#copy-hashes").addEventListener("click", () => {
    navigator.clipboard.writeText(hashText);
});

document.querySelector("#copy-hex").addEventListener("click", () => {
    navigator.clipboard.writeText(hexText);
});

document.querySelector("#expand").addEventListener("click", () => {
    expanded = !expanded;
    updateHex();
});

document.querySelector("#download").addEventListener("click", () => {
    if (!currentFile || !currentData) return;

    const output = [
        "HexHash",
        "",
        `File: ${currentFile.name}`,
        `Size: ${formatSize(currentFile.size)}`,
        `Bytes: ${currentFile.size}`,
        "",
        hashText,
        "",
        "Hex dump",
        "",
        hexText
    ].join("\n");

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${currentFile.name}.txt`;
    link.click();

    URL.revokeObjectURL(url);
});

await init();
