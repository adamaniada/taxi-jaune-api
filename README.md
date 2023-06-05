# TAXI JAUNE GUIDE DATA

## USERS JSON TEST DATA

{
    "phoneNumber": "70000000",
    "password": "my_password_crypt",
    "user_type": "mobile",
    "role": "customer"
}

## REQUEST JSON DATA TEST

{
    "mobile_user_id": 1,
    "taxi_user_id": 2,
    "lieu_depart": "Pissy",
    "lieu_arrive": "Zogona",
    "heure_depart": "2023-06-03 21:48:00",
    "distance": 445,
    "prix": 500
}

## LOCATIONS JSON DATA TEST

{
    "user_id": 2,
    "latitude": "-143,34",
    "longitude": "334,76",
    "altitude": "34",
    "speed": "3",
    "heart": "1.0.0",
    "name": "Customer",
    "description": "dffdggffgf n,kghgfvfbfgngng tnhthrgttytyt j;miouyjthth fbghghhhh"
}


## FAVORIS

{
    "mobile_user_id": 23,
    "taxi_user_id": 23,
    "commentaires": "Bon conducteur"
}

## Notes

{
    "mobile_user_id": 11131,
    "taxi_user_id": 2,
    "notes": "5/10",
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
- knex migrate:latest --env development
```
### OPTION 2
```bash
- knex migrate:make development
```
