# Documentation des Routes

## Configuration
Renommez le fichier `example.env` en `.env` pour que les variables d'environnement soient prises en compte. Voici les variables disponibles dans le fichier `.env` :
```properties
JWT_SECRET=votre_secret_tres_long_et_aleatoire
JWT_EXPIRES_IN=5s
REFRESH_TOKEN_SECRET=autre_secret_tres_long_et_aleatoire
REFRESH_TOKEN_EXPIRES_IN=100s
```

---

## Fonctionnement des ACL (Access Control List)
Les ACL définissent les permissions pour différents rôles (`user`, `admin`) dans le projet. Voici ce qu'elles permettent :
- **user** :
  - Peut lire son propre profil.
  - Peut créer, modifier et supprimer ses propres données.
- **admin** :
  - Peut lire, créer, modifier et supprimer les données ou profils de tous les utilisateurs.

---

## Fonctionnement des Tokens
- **JWT_SECRET** : Utilisé pour signer les tokens JWT (JSON Web Token) qui authentifient les utilisateurs.
- **JWT_EXPIRES_IN** : Durée de validité des tokens JWT.
- **REFRESH_TOKEN_SECRET** : Utilisé pour signer les tokens de rafraîchissement.
- **REFRESH_TOKEN_EXPIRES_IN** : Durée de validité des tokens de rafraîchissement.

Les tokens JWT permettent de vérifier l'identité de l'utilisateur pour chaque requête. Lorsqu'un token expire, un token de rafraîchissement peut être utilisé pour en générer un nouveau sans nécessiter une nouvelle connexion.

---

## Routes sans ACL

### POST /register
- **Description** : Inscription d'un nouvel utilisateur.
- **Corps de la requête** :
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "string",
    "email": "string"
  }
  ```

### POST /login
- **Description** : Connexion d'un utilisateur.
- **Corps de la requête** :
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### POST /logout
- **Description** : Déconnexion de l'utilisateur.

### POST /refresh-token
- **Description** : Renouvellement du token.
- **Corps de la requête** :
  ```json
  {
    "refreshToken": "string"
  }
  ```

---

## Routes avec ACL

### GET /api/profile/:id
- **Description** : Consultation d'un profil utilisateur.

### POST /api/data
- **Description** : Création de données utilisateur.

### PUT /api/data/:id
- **Description** : Modification des données utilisateur.

### DELETE /api/data/:id
- **Description** : Suppression des données utilisateur.
