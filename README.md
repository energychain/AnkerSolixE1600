<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2.0][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/energychain/AnkerSolixE1600">
    <img src="https://cdn.shopify.com/s/files/1/0665/2506/9578/collections/ankersolixe1600.png?v=1698079497" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Anker Solix E1600</h3>

  <p align="center">
    Smart Solar, Bright Tomorrow: Making Every Ray Count.
    <br />
    <a href="https://github.com/energychain/AnkerSolixE1600"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/energychain/AnkerSolixE1600">View Demo</a>
    ·
    <a href="https://github.com/energychain/AnkerSolixE1600/issues">Report Bug</a>
    ·
    <a href="https://github.com/energychain/AnkerSolixE1600/issues">Request Feature</a>
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
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Anker Solix Solarbank E1600 - Node Library][product-screenshot]](https://corrently.energy/products/anker-solix-solarbank-e1600-vorbestellung)

Welcome to our ANKER Solix Solarbank E1600 Management Adapter! Please read on to discover how this project can empower you to optimize your Micro-PV (Photovoltaic) plant, enabling efficient energy management and increased self-consumption of solar power.

### Project Background
Our project was initiated with a clear mission: to provide remote support for our clients who utilize ANKER Solix Solarbank E1600, without any affiliation with the manufacturer, Anker Power. We recognize the importance of independence and impartiality, ensuring that our users receive unbiased, top-quality support and solutions.

### Project Goals
- Remote Support: We aim to offer seamless remote support to our clients, enabling them to resolve issues and optimize their solar energy systems from anywhere, at any time.
- Integration into Energy Management Systems: Our project facilitates the seamless integration of ANKER Solix Solarbank E1600 into various energy management systems. This integration empowers users with comprehensive control over their energy production and consumption.
- Optimization of Self-Consumption: One of the core objectives of our project is to optimize the self-consumption of PV power. 

By intelligently managing the generation peaks and storing excess electricity for later use, we help our users maximize their energy efficiency.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This section will walk you through the essential steps to set up the library, providing you with options to test its functionalities conveniently.


### Installation: 
Start by installing the library using your preferred package manager. For example, if you're using Node.js, you can install it via npm:

#### For embeddding into your project
```bash
npm install --save ankersolixe1600
```

#### For Command-Line-Usage (CLI)
```bash
npm install -g ankersolixe1600
```
#### For NodeRED usage
- Open Palet Manager
- Install `ankersolixe1600`

### Integrating the Library
Our library is designed with seamless integration in mind, allowing you to harness the power of ANKER Solix Solarbank E1600 within your own codebase. 
To begin, follow these steps:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Check the [cli.js](./cli.js) file to see how we are using the library.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authentication
This libraray/module uses the APP login credentials of the Anker APP to authenticate with the Anker Cloud Service.

### Step 1: User Authentication
To start the login process, provide your username and password. These credentials are necessary to establish a secure connection with the Anker Cloud Service:
```javascript
const mysolix = new SolixE1600({
  username: 'EmailAsUsedInAnkerApp',
  password: 'AccountPassword',
  country: '2-Letter-Country-Code'
});
```

### Step 2: Obtaining the `auth_token`

After successful authentication, you will receive an `auth_token`. This token acts as a session identifier, allowing you to perform actions on behalf of your account. Safeguard this token as it grants access to your session.

### Important Note: Single Device Login

Please note that Anker Cloud Service allows only one device to be logged in at a time. If you attempt to log in from another device while already logged in, the existing session will be terminated.

### Daily Login Limits

Additionally, be aware that the Anker Cloud Service imposes restrictions on the number of logins permitted per day. Make sure to stay within the allowed limits to avoid interruptions in your service.

### Best Practice: Handling Multiple Instances

If you are instantiating this library/module multiple times within your application, it is advisable to manage your sessions efficiently. One recommended approach is to save the session login configuration using the `getSessionConfiguration()` method. By doing so, you can maintain a coherent login state across all instances, ensuring a seamless experience for your users.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache-2.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Inspired by the work of the [Solix2MQTT Project](https://github.com/tomquist/solix2mqtt)

## Maintainer / Imprint

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)<br/>
  <br/>
https://stromdao.de/<br/>
</addr>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/energychain/AnkerSolixE1600.svg?style=for-the-badge
[contributors-url]: https://github.com/energychain/AnkerSolixE1600/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/energychain/AnkerSolixE1600.svg?style=for-the-badge
[forks-url]: https://github.com/energychain/AnkerSolixE1600/network/members
[stars-shield]: https://img.shields.io/github/stars/energychain/AnkerSolixE1600.svg?style=for-the-badge
[stars-url]: https://github.com/energychain/AnkerSolixE1600/stargazers
[issues-shield]: https://img.shields.io/github/issues/energychain/AnkerSolixE1600.svg?style=for-the-badge
[issues-url]: https://github.com/energychain/AnkerSolixE1600/issues
[license-shield]: https://img.shields.io/github/license/energychain/AnkerSolixE1600.svg?style=for-the-badge
[license-url]: https://github.com/energychain/AnkerSolixE1600/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/stromdao/?originalSubdomain=de
[product-screenshot]: https://cdn.shopify.com/s/files/1/0665/2506/9578/collections/ankersolixe1600.png?v=1698079497
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 