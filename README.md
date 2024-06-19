<p align="center"> 
  <img src="public/images/Project Logo.png" alt="HAR Logo" width="80px" height="80px">
</p>
<h1 align="center"> Backend Craft It App </h1>
<h3 align="center"> A backend supporting an Android app for recognizing waste materials and converting them into handicrafts. </h3>


</br>

<p align="center"> 
  <img src="" alt="Sample signal" width="70%" height="70%">
</p>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> ➤ About The Project</a></li>
    <li><a href="#Technology"> ➤ Technology</a></li>
    <li><a href="#folder-structure"> ➤ Folder Structure</a></li>
    <li><a href="#Quick"> ➤ Quick Start</a></li>
    <li><a href="#Wiki"> ➤ Wiki</a></li>
    <li><a href="#Contributors"> ➤ Contributors</a></li>
    <li><a href="#Activities"> ➤ Activities</a></li>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> :pencil: About The Project</h2>

<p align="justify"> 
 This project is a backend for an Android application designed to recognize waste materials and transform them into handicrafts. The backend provides essential functionality to support the application, including data management, authentication, and communication with the Android client.
</p>

<p align="center">
  <img src="images/WISDM Activities.png" alt="Table1: 18 Activities" width="70%" height="70%">        
  <!--figcaption>Caption goes here</figcaption-->
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- Technology -->
<h2 id="Technology"> :fork_and_knife: Technology</h2>

<!--This project is written in Python programming language. <br>-->

The following open source packages are used in this project:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Axios](https://axios-http.com/)
- [Docker](https://www.docker.com/)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- :paw_prints:-->
<!-- FOLDER STRUCTURE -->
<h2 id="folder-structure"> :cactus: Folder Structure</h2>

    code
    .
    │
    ├── .github
    │   ├── raw_data
    │   ├── raw_data
    │   ├── raw_data
    ├── Key
    ├── Postman
    │   ├── images
    |   │   ├── 404.jpg
    |   │   ├── aluminium.jpg
    |   │   ├── bottle.jpg
    |   │   ├── cardboard.jpg
    |   │   ├── handicraft.jpg
    |   │   ├── paper.jpg
    |   │   ├── plastic.jpg
    |   │   ├── user.jpg
    │   ├── craft-backend-dev.json
    │   ├── craft-backend.json
    │   ├── CraftBackend.postman_environment.json
    ├── Prisma
    │   ├── migration
    │   ├── client.ts
    │   ├── schema.prisma
    │   ├── seed.ts
    ├── Public
    │   ├── images
    │   │   ├── Project Logo.png
    ├── src
    │   ├── config
    │   │   ├── index.ts
    |   |
    │   ├── controllers
    │   │   ├── authController.ts
    │   │   ├── dashboardController.ts
    │   │   ├── detailHandicraftController.ts
    │   │   ├── handicraftController.ts
    │   │   ├── healthController.ts
    │   │   ├── historyHandicraftController.ts
    │   │   ├── imageUploadController.ts
    │   │   ├── likeController.ts
    │   │   ├── recognitionController.ts
    │   │   ├── userController.ts
    │   │   ├── wasteController.ts
    │   │   ├── wasteHandicraftController.ts
    |   |
    │   ├── middleware
    │   │   ├── authMiddleware.ts
    │   │   ├── corsMiddleware.ts
    │   │   ├── handicraftMiddleware.ts
    │   │   ├── historyHandicraftMiddleware.ts
    |   |
    │   ├── routes
    │   │   ├── authRoutes.ts
    │   │   ├── dashboardRoutes.ts
    │   │   ├── detailHandicraftRoutes.ts
    │   │   ├── handicraftRoutes.ts
    │   │   ├── healthRoutes.ts
    │   │   ├── historyHandicraftRoutes.ts
    │   │   ├── imageUploadRoutes.ts
    │   │   ├── likeRoutes.ts
    │   │   ├── recognitionRoutes.ts
    │   │   ├── userRoutes.ts
    │   │   ├── wasteRoutes.ts
    |   |
    │   ├── utils
    │   │   ├── bucketimages.ts
    │   │   ├── multer.ts
    |   |
    │   ├── app.ts
    ├── .gitignore
    ├── deploy.sh
    ├── docker-compose-dev.yml
    ├── docker-compose.yml
    ├── Dockerfile
    ├── express.d.ts
    ├── nodemon.json
    ├── package-lock.json
    ├── package-lock.json
    ├── readme.json
    ├── tsconfig.json

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Quick"> ⚡️ Quick start </h2>

First, clone the repository:

```bash
git clone https://github.com/7exp/backend.git
cd backend
```

Install the necessary dependencies:

```bash
npm install
```

Set up the database:

```bash
npx prisma migrate deploy
```

Start the development server:

```bash
npm run nd:start
```

That's all you need to know to start! 🎉

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 🐳 Docker-way to quick start

If you don't want to install Create Go App CLI to your system, you feel free
to using our official [Docker image][docker_url] and run CLI from isolated
container:

```bash
docker run --rm -it -v ${PWD}:${PWD} -w ${PWD} koddr/cgapp:latest [COMMAND]
```

> 🔔 Please note: the `deploy` command is currently **unavailable** in this
> image.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Wiki">📖 Project Wiki</h2>

Explore the extensive features and functionalities of **Backend Craft It** by delving into our comprehensive [Wiki](https://github.com/7exp/backend/wiki). Whether you're new to the project or a seasoned developer, our Wiki offers:

- **Detailed Documentation**: Learn about every aspect of the backend architecture, from setup to advanced features.
- **API Endpoint Descriptions**: Understand how to interact with various endpoints for data management and authentication.

Dive into our Wiki today to harness the full potential of **Backend Craft It** and transform waste materials into beautiful handicrafts seamlessly.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Contributors">📜 Contributors</h2>

This project is the result of the collaborative efforts of several contributors. 💖 We appreciate the hard work and dedication of the following individuals:

<table align="center">
  <tr border="none">
    <td valign="top">  <a href="https://yoganova.my.id/">
    <img src="https://github.com/7exp/backend/blob/main/public/images/Yoga%20Novaindra-modified.png" alt="Yoga Novaindra" width="200px">
    <p align="center">Yoga Novaindra</p>
  </a>
    </td>
    <td valign="top">  <a href="gymnastiarag.my.id">
    <img src="https://github.com/7exp/backend/blob/main/public/images/AGIM-modified.png" alt="Gymnastiar Alma Ghifari" width="200px">
    <p align="center">Gymnastiar Alma Ghifari</p>
  </tr>
</table>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Activities">⭐️ Activities</h2>

![Activities](https://repobeats.axiom.co/api/embed/a19d5048e43a501a5cb06b4d0e7f07630d5e307b.svg "Repobeats analytics image")

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


