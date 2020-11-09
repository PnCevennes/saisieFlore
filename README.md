# saisieFlore
Outil de saisie des protocoles flore du PnC

## installation serveur
```
sudo apt install apache2 libapache2-mod-php php-pgsql
sudo service apache2 restart
```

## Fichiers de configuration
`/saisieFlore/Sources/Flore/Configuration/`

2 fichiers : 
 - ParamDefaut.js : paramètres de configuration de l'interface javascript
 - PostGreSQL.php : paramètres de connexion à postgresql
 
