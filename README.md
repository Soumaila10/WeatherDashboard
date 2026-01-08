# WeatherDashboard Premium

Un tableau de bord météo moderne et dynamique, construit avec **React** et **Tailwind CSS**.

![Weather Dashboard](https://images.unsplash.com/photo-1592210454132-328629affb12?q=80&w=1000&auto=format&fit=crop)
*(Note: Remplacez cette image par une capture d'écran de votre application)*

## ✨ Fonctionnalités

- **Design Premium** : Interface style "Glassmorphism" avec arrière-plans dégradés animés.
- **Données en Temps Réel** : Intégration de l'API OpenWeatherMap.
- **Prévisions sur 5 Jours** : Vue claire des tendances météorologiques.
- **Recherche de Ville** : Fonctionne pour toutes les villes du monde.
- **Mode Démo Intelligent** : Si aucune clé API n'est fournie, l'application utilise des données simulées pour rester fonctionnelle.

## 🚀 Installation Locale

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/Soumaila10/WeatherDashboard.git
    cd WeatherDashboard
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configuration (Optionnel mais recommandé)**
    Créez un fichier `.env` à la racine :
    ```env
    REACT_APP_WEATHER_API_KEY=votre_cle_api_openweathermap
    ```

4.  **Lancer le serveur**
    ```bash
    npm start
    ```

## 🌐 Déploiement sur Vercel

Le moyen le plus simple de déployer cette application est d'utiliser [Vercel](https://vercel.com).

### Étapes :

1.  **Créer un compte** sur [Vercel](https://vercel.com/signup) (connectez-vous avec GitHub).
2.  Cliquez sur **"Add New..."** -> **"Project"**.
3.  Sélectionnez votre dépôt `WeatherDashboard` dans la liste (bouton **Import**).
4.  **Configuration du Projet** :
    - Framework Preset : `Create React App` (détecté automatiquement).
    - Root Directory : `./` (par défaut).
5.  **Variables d'Environnement** (CRITIQUE) :
    - Dépliez la section **"Environment Variables"**.
    - Ajoutez :
        - **Key** : `REACT_APP_WEATHER_API_KEY`
        - **Value** : Votre clé API OpenWeatherMap (la même que dans votre .env local).
6.  Cliquez sur **"Deploy"**.

En quelques secondes, votre site sera en ligne avec une URL sécurisée (https://weather-dashboard-xyz.vercel.app).
