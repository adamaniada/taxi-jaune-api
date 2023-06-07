# **TAXI JAUNE GUIDE DATA**

## USERS JSON TEST DATA

{
    "phoneNumber": "75000001",
    "password": "my_password_will_crypted",
    "user_type": "mobile",
    "role": "guest",
    "token": "AEEAURURURURUsffdffd53536636ddd336gggrrERTERTETE655"
}

## REQUEST JSON DATA TEST

{
    "taxi_user_id": 24,
    "lieu_depart": "Pissy",
    "lieu_arrive": "Zogona",
    "heure_depart": "2023-06-03 21:48:00",
    "distance": 445,
    "prix": 500
}

## LOCATIONS JSON DATA TEST

{
    "latitude": "143,34",
    "longitude": "334,76",
    "altitude": "34",
    "speed": "3",
    "heart": "1.0.0",
    "name": "Customer",
    "description": "dffdggffgf n,kghgfvfbfgngng tnhthrgttytyt j;miouyjthth fbghghhhh"
}

## NOTIFICATION

{
    "description": "Taxi N°2 a accepte votre invitation",
    "status": true
}


## FAVORIS

{
    "taxi_user_id": 23,
    "commentaires": "Bon conducteur"
}

## Notes

{
    "taxi_user_id": 30,
    "note": "5/10",
    "commentaires": "Bon conducteur"
}


## GIT CODE 

### Push code
```bash
git add . && git commit -m "Message" && git branch -M main && git push -u origin main
```

## KNEX DATABASE MIGRATION
Voici les étapes pour effectuer une migration de base de données MySQL dans un projet Node.js
### OPTION 1
```bash
- knex migrate:currentVersion
```

```bash
- knex migrate:latest --env development
```
### OPTION 2
```bash
- knex migrate:make development
```
- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

# COMMANDS AFTER DOWNLOAD CODE ON GITHUB

```bash
- npm install
```

```bash
- npm start
```
