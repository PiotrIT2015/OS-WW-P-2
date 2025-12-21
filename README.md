# OS-WW-P-2[office]

# Konfiguracja dla Linux Arch

```
sudo dd if=your.iso of=/dev/sdX bs=4M status=progress oflag=sync`
sudo pacman -S git
git clone https://github.com/PiotrIT2015/OS-WW-P-2`
```

# Aktualizacja i instalacja Xorg

```
sudo pacman -Syu
sudo pacman -S xorg-server xorg-xinit
```

# Instalacja Surf (ekstremalnie lekka) oraz sterowników wideo

# Wybierz sterownik dla swojej karty (intel/amdgpu/vesa)
`sudo pacman -S surf mesa xf86-video-vesa`

# Frontend (React/Vite)
`sudo pacman -S nodejs npm`

# Backend (PHP/Yii2)
`sudo pacman -S php php-apache php-sqlite`

Wskazówka: W pliku /etc/php/php.ini odkomentuj linie extension=intl, extension=gd oraz extension=pdo_sqlite (lub mysql), aby Yii2 mogło poprawnie pracować.

#[.xinitrc]

```

# Wyłączenie wygaszania ekranu i oszczędzania energii
xset s off
xset -dpms
xset s noblank

# Uruchomienie Twojego serwera Yii2 w tle
cd ~/sciezka/do/yii2-app
php yii serve --port=8080 &

# Uruchomienie frontendu Vite w tle
cd ~/sciezka/do/secureos-web-desktop
npm run dev &

# Czekamy chwilę na wstanie serwerów
sleep 5

# Uruchomienie Surf w trybie pełnoekranowym (Kiosk Mode)
# -F (fullscreen), -z (zoom 1.0), -K (blokada klawiszy funkcyjnych)
exec surf -F -z 1.0 http://localhost:3000

```

#Optymalizacja 

```
cd ~/sciezka/do/yii2-app
chmod -R 777 runtime web/assets
```

## Run Locally

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
