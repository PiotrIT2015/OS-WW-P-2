# OS-WW-P-2: Office
## European Open Desktop Platform Proposal

---

# Overview

**OS-WW-P-2: Office** is a lightweight, modular desktop operating system concept designed as a proposal for a future European Open Source Operating System (**EU OS**).

The project focuses on:

- technological independence,
- open-source software,
- privacy-oriented computing,
- low hardware requirements,
- modular architecture,
- accessibility,
- secure office and productivity environments.

Unlike traditional desktop operating systems, OS-WW-P-2 uses a minimal Linux foundation combined with modern web technologies to provide a flexible and maintainable user interface.

The system is based on:

- **Arch Linux** as the operating system foundation,
- **React/Vite** as the desktop interface layer,
- **Yii2/PHP** as the backend service layer.

---

# Vision

The goal of OS-WW-P-2 is to explore the possibility of creating a European-controlled computing platform based entirely on open technologies.

The project follows several principles:

## Digital Sovereignty

Reducing dependence on closed ecosystems by using:

- open-source components,
- transparent architecture,
- community-driven development.

## Security

The system architecture allows:

- minimal attack surface,
- controlled software stack,
- easier auditing,
- isolated services.

## Sustainability

The lightweight design enables:

- operation on older hardware,
- lower energy consumption,
- longer device lifecycle.

## Accessibility

The platform is designed with accessibility in mind, allowing integration with:

- assistive technologies,
- alternative input methods,
- customized user interfaces.

---

# Architecture

OS-WW-P-2 uses a layered architecture:


**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev` or double click on `wwp[office].bat` in MS Windows
   
...or:

1. `docker pull piotrit2015/wwp-office:2.0`
2. `docker-compose up -d`
3. `docker run -p 8080:80 piotrit2015/wwp-office:2.0`
3. `docker-compose down`

| Co                    | URL                                                  |
| --------------------- | ---------------------------------------------------- |
| Aplikacja             | **[http://localhost:55001](http://localhost:55001)** |
| phpMyAdmin            | **[http://localhost:55002](http://localhost:55002)** |
| Backend direct (test) | [http://localhost:8080](http://localhost:8080)       |
   
![image alt](https://github.com/PiotrIT2015/OS-WW-P-2/blob/master/screenshot.jpg)
