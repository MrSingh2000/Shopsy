[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url] [![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MrSingh2000/Shopsy">
    <img src="client/public/logo512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Shopsy :computer:</h3>

  <p align="center">
    A MERN stack based E-Commerce application.
    <br />
    <a href="https://myshopsy.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/MrSingh2000/Shopsy/issues">Report Bug</a>
    ·
    <a href="https://github.com/MrSingh2000/Shopsy/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://myshopsy.netlify.app)

This is a personal project based on mainly MERN stack. Tried to make a e-commerce application with various features, although there is always a scope to make the application better, So if you wanna add your taste to the existing application, feel free to fork the repo and just start working on your local machine!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [Redux](https://redux.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Set up the project locally on your system following instructions on setting up your project.
To get a local copy up and running, follow these simple steps.

### Prerequisites

Installing latest Package Manager

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  yarn install yarn@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MrSingh2000/Shopsy.git
   ```
2. Install Backend & Frontend packages
   ```sh
   npm install
   ```
   ```sh
   cd .\client\ npm install
   ```
3. Setting up environment variables in `.env`
   
   `Backend`

   ```txt
   MONGODB_URI = 'my_mongodb'
   JWT_SECRET = 'your_jwt_secret'
   HOSTNAME = 'localhost:5000'
   ```

   `Frontend`

   ```txt
   REACT_APP_HOST = 'localhost:5000'
   ```

4. Start the server
   ```sh
   node .\index.js
   ```
5. Start the client application
   ```sh
   npm run start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage
I tried to add various features to the e-commerce application, some of them are listed :-

#### Login/Signup
![login-signup]

#### Add a Product
![add-product]

#### Check Added Products
![check-added-product]

#### Surf Products
![surf-products]

#### Add Product to Cart
![add-cart]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Anshuman Singh - [@LinkedIn](https://www.linkedin.com/in/anshuman-singh-856991201/) - patialashahi2000@gmail.com

Project Link: [https://github.com/MrSingh2000/Shopsy](https://github.com/MrSingh2000/Shopsy)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/MrSingh2000/Shopsy.svg?style=for-the-badge
[forks-url]: https://github.com/MrSingh2000/Shopsy/network/members
[stars-shield]: https://img.shields.io/github/stars/MrSingh2000/Shopsy.svg?style=for-the-badge
[stars-url]: https://github.com/MrSingh2000/Shopsy/stargazers
[issues-shield]: https://img.shields.io/github/issues/MrSingh2000/Shopsy.svg?style=for-the-badge
[issues-url]: https://github.com/MrSingh2000/Shopsy/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anshuman-singh-856991201
[product-screenshot]: readme_assets/screenshot.png
[login-signup]: readme_assets/login.gif
[add-product]: readme_assets/addproduct.gif
[check-added-product]: readme_assets/checkproduct.gif
[surf-products]: readme_assets/surf.gif
[add-cart]: readme_assets/cart.gif

