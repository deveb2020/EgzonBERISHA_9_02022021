# Billed - P9

_Write unit tests, integration tests, E2E tests to keep the project without errors at anytime_

## Purpose of the project

The purpose of this project was to get familiar with automated tests, this project is fully covered with automated tests.

**Comment lancer l'application en local** :

Clonez le projet :
```
$ git clone https://github.com/deveb2020/EgzonBERISHA_9_02022021.git
```

Allez au repo cloné :
```
$ cd EgzonBERISHA_9_02022021
```

Installez les packages npm (décrits dans `package.json`) :
```
$ npm install
```

Installez live-server pour lancer un serveur local :
```
$ npm install -g live-server
```

Lancez l'application :
```
$ live-server
```

Puis allez à l'adresse : `http://127.0.0.1:8080/`


**Comment lancer tous les tests en local avec Jest :**

```
$ npm run test
```

**Comment lancer un seul test :**

Installez jest-cli :

```
$npm i -g jest-cli
$jest src/__tests__/your_test_file.js
```

**Comment voir la couverture de test :**

`http://127.0.0.1:8080/coverage/lcov-report/`


