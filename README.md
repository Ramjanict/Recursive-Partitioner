# Recursive-Partitioner 🧩

**Live Demo:** https://recursive-partitioner-beta.vercel.app  
**Source Code:** https://github.com/Ramjanict/Recursive-Partitioner

## 🚀 What is this?

Recursive-Partitioner is a React + TypeScript + Tailwind CSS application that lets you interactively split the browser viewport into resizable panels.  
Each panel can be split vertically or horizontally — recursively — and you can delete or resize any partition.  
On load you start with a single randomly colored panel. Splits generate new colors, and layouts can get arbitrarily nested, giving you a powerful “partition everything” UI playground.

## ✨ Features

- Single panel with **random background color** on first load.
- Two control buttons on each panel:
  - `v` — split **vertically** (left / right)
  - `h` — split **horizontally** (top / bottom)
- After split:
  - The original panel keeps its color
  - The new panel receives a new random color
- Recursive splitting — **any panel** (including newly created ones) can be further split.
- Delete a panel: if there is more than one panel, a `-` button appears — clicking removes that panel and re-flows layout.
- Resizable partitions: you can click and drag dividers to resize siblings dynamically.
- (Optional) Snap-to layout when resizing: 1/4, 1/2, and 3/4 thresholds for easy alignment.

## 🛠️ Tech Stack

- React + TypeScript
- Vite (for build / dev)
- Tailwind CSS for styling
- No external UI libraries — everything built from scratch

> A clean, minimal setup — perfect for learning, prototyping or extending into more complex layouts.

## 🎯 How to Run Locally

```bash
git clone https://github.com/Ramjanict/Recursive-Partitioner.git
cd Recursive-Partitioner
npm install
npm run dev
```
