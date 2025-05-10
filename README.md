# Chat App
FullStack Real-Time Chat App with Image Uploads 
Socket.io-JWT-TailwindCSS

Following tutorial on udemy https://smusg.udemy.com/course/the-web-dev-bootcamp/learn/lecture/47848063#content

# Backend
## Setup
### npm installs, basics
1. (inside main directory) `npm create vite@latest .`
    - framework : React
    - variant : JavaScript
    - follow instructions (npm install, npm run dev)
        - dont forget to put into .gitignore before pushing to github
2. cd backend, `npm init -y`
    - to get package.json
4. `npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io`
    - to get all dependencies we need throughout this project
5. `npm i nodemon -D`
    - D means dev dependency, only used in dev
7. create index.js
    - change "script" inside package.json to `"dev": "nodemon index.js"`
    - then `"dev": "nodemon src/index.js"` when u put index.js into src folder. Update main as well

### DB
1. create a project and cluster in mongodb
2. select connect through drivers
    - add connection string into .env under MONGODB_URI
        - Using .env variables
            ```js
            import dotenv from "dotenv"
            dotenv.config()
            ```
            - `process.env.MONGODB_URI`
3. Change network access
    - include your IP address or your teammates IP address, or simply allow all IP address


# Frontend
## Setup
1. Paging and routing? (react-router-dom) + notifications (react-hot-toast)
    - `npm i react-router-dom react-hot-toast`
2. tailwind CSS installation guide - version 3 (not latest): 
    link : https://v3.tailwindcss.com/docs/installation/framework-guides
    - v3.4.17 -> framework guides -> vite
3. replace App.jsx with "rafce", if shortcut doesnt work means no es7 vscode extension
4. tailwind css intellisense vscode extension
    - test using this code in App.jsx. If the suggestion for text-red-500 comes up means working
    ```jsx      
    const App = () => {
        return <div className="text-red-500">Helloooooooo</div>;
    };
    ```
5. daisyUI (component library) - version 4 (not latest)
    - link : https://v4.daisyui.com/docs/install/
    - for the line "npm i -D daisyui@latest" replace latest with the version u are installing
    - test by going to components, and copy some random jsx code into App.jsx
    ```jsx
    const App = () => {
        return <div className="text-red-500">Helloooooooo<button className="btn btn-active">Default</button>
    <button className="btn btn-active btn-neutral">Neutral</button>
    <button className="btn btn-active btn-primary">Primary</button>
    <button className="btn btn-active btn-secondary">Secondary</button>
    <button className="btn btn-active btn-accent">Accent</button>
    <button className="btn btn-active btn-ghost">Ghost</button>
    <button className="btn btn-active btn-link">Link</button></div>;
    };
    ```
