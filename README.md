# HexHash

A small file hashing and hex viewer made with Rust and WebAssembly.
Drop a file in. Get some hashes. Look at some bytes. Very exciting.

## Features

* MD5
* SHA-1
* SHA-256
* SHA-512
* Hex dump
* Expandable hex dump
* Download file info and bytes as a `.txt`
* Drag and drop
* File picker
* Copy buttons
* Runs entirely in your browser

## Privacy

Files are processed locally in your browser.
Nothing gets uploaded to a server.
Your files are safe from me. I have no idea what you're doing with them.

## How It Works

Rust handles the hashing and byte processing.
WebAssembly lets the Rust code run in the browser.
JavaScript handles the page itself.

```text
file
browser
rust + wasm
hashes / hex
```

## Hex Dump

The hex viewer shows the first **4096 bytes by default**.
You can expand it if you want to see the rest.
You can also download a `.txt` containing the file information, hashes, and displayed hex bytes.

Example:

```text
00000000  52 49 46 46 24 80 00 00 57 41 56 45 66 6D 74 20  RIFF$...WAVEfmt
00000010  10 00 00 00 01 00 02 00 44 AC 00 00 10 B1 02 00  ........D.......
```

I do not want to display the entire contents of a 30 GB file by default.
That would be... excessive.

## Stuff Used

* Rust
* WebAssembly
* wasm-bindgen
* JavaScript
* HTML
* CSS
* GitHub Pages (obviously)
* GitHub Actions (obviously)

## Project

```text
index.html
style.css
app.js
Cargo.toml
src/
└── lib.rs
```

## Building

GitHub Actions builds the Rust/WASM part and deploys the site to GitHub Pages.
You can also build it locally if you really want to.
I probably wouldn't.

## Why

I wanted a small tool for checking files without installing something enormous.
I also wanted to make something with Rust.
So I made this.
That's the origin story.