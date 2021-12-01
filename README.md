# Getting Started with Create React App

Za pokreniti projekt treba imati instaliran NodeJS, pozicionirati se u root folder projekta
i iz komandne linije upisati naredbu "npm install", zatim unutar folder-a "server" također
upisati naredbu "npm install".

Kada se uredno sve povuče, vratiti u root folder i pokreniti naredbu "npm start".

Ako se slučajno javi greška prilikom pokretanja:

c:\Projects\recipe-crud\server\node_modules\whatwg-url\lib\encoding.js:2
const utf8Encoder = new TextEncoder();
                    ^

ReferenceError: TextEncoder is not defined


Potrebno je na putanji "recipe-crud/server/node_modules/whatwg-url/lib/encoding.js",
unutar te datoteke pri vrhu (ispod use 'strict') ispisati liniju:

const { TextEncoder, TextDecoder } = require("util");

Aplikacija se vrti na port-u 3000.

Sretno!