# GitPad

This project assumes creating an interactive web application for many users to create stories collectively. Users will be able to add short parts to already started stories. The main goal is to create a platform encouraging to creative writing, sharing ideas and improving writing skills.

## Authors:
* Adrian Grzymski
* Mikołaj Krupiński
* Łuksz Machnik
* Jarosław Socha
* Zofia Wiora

## How to run
```
npm i
npm start
```
Open localhost:3000 in browser.

And additional 2 commands for authentication:
```
npm install firebase
npm install -g firebase-tools
```

Baza Danych:
1. mieć mysql
2. w pliku config/config.json ustawić swój "username" i "password" aby móc wejść do mysql (jeśli nie ma hasła, to hasło to null)


bazę danych tworzymy dzięki database_reset.sh
aby wysłać do serwera zapytanie używamy funkcji send w public/js/post.js
pytania jak co zrobić można kierować do mnie
