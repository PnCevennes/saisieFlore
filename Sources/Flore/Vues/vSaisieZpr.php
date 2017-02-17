<?php
    require_once '../Securite/VerifCnx.php';
?>
<html>
    <head>
        <title>Zones prospectées</title>
        <!-- Définition du jeu de caractères -->
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
        
        <script type='text/javascript' src='../../../Librairies/jquery/jquery-1.11.1.min.js'></script>
        
        <!-- Bibliothèque Ext en français (version de production) -->
        <script type='text/javascript' src='../../../Librairies/Ext/adapter/ext/ext-base.js'></script>
        <!-- mode debug Ext avec Firebug sur Firefox -->
        <script type='text/javascript' src='../../../Librairies/Ext/ext-all-debug.js'></script>
        <!--script type='text/javascript' src='../../../Librairies/Ext/ext-all.js'></script-->
        <script type='text/javascript' src='../../../Librairies/Ext/src/locale/ext-lang-fr.js'></script>
        <!-- Complément de Ext -->
        <script type='text/javascript' src='../../../Librairies/Ext/examples/ux/ux-all.js'></script>
        <!-- Bibliothèque Proj4JS (nécessaire pour la transformation de coordonnées selon l'EPSG : 2154 <-> 4326)-->
        <script type='text/javascript' src='../../../Librairies/Proj4JS/lib/proj4js.js'></script>
        <script type='text/javascript' src='../../../Librairies/Proj4JS/lib/defs/EPSG2154.js'></script>
        <!-- mode debug OpenLayers avec Firebug sur Firefox -->
        <script type='text/javascript' src='../../../Librairies/OpenLayers/lib/Firebug/firebug.js'></script>
        <script type='text/javascript' src='../../../Librairies/OpenLayers/lib/OpenLayers.js'></script>
        <!-- Bibliothèque OpenLayers en français (version de production) -->
        <!--script type='text/javascript' src='../../../Librairies/OpenLayers/OpenLayers.js'></script-->
        <script type='text/javascript' src='../../../Librairies/OpenLayers/lib/OpenLayers/Lang/fr.js'></script>
        <!-- Bibliothèque GeoExt (version de production compatible avec les versions de Firefox > 3.6) -->
        <script type='text/javascript' src='../../../Librairies/GeoExt/script/GeoExt.js'></script>
        <!-- Feuilles de style (bibliothèques) -->
        <link type='text/css' rel='stylesheet' href='../../../Librairies/Ext/resources/css/ext-all.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Librairies/Ext/examples/ux/css/ux-all.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Librairies/Ext/examples/ux/gridfilters/css/GridFilters.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Librairies/Ext/examples/ux/gridfilters/css/RangeMenu.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Librairies/Ext/examples/ux/statusbar/css/statusbar.css'/>
        <!-- Feuilles de style (application) -->
        <link type='text/css' rel='stylesheet' href='../../../Ergonomie/Grilles/gFds.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Ergonomie/Cartes/cFds.css'/>
        <link type='text/css' rel='stylesheet' href='../../../Ergonomie/Formulaires/frmFds.css'/>
        <!-- Compléments (remarque : PageSizer.js modifié et en français) -->
        <script type='text/javascript' src='../../../Complements/Ext/PageSizer.js'></script>
        <script type='text/javascript' src='../../../Complements/Ext/ColumnAutoResizer.js'></script>
        <script type='text/javascript' src='../../../Complements/Ext/Ext.ux.Image.js'></script>
        <!-- Adaptations (code ajouté pour compatibilité avec PageSizer.js) -->
        <script type='text/javascript' src='../../../Adaptations/GeoExt/FeatureReader.js'></script>
        <script type='text/javascript' src='../../../Adaptations/OpenLayers/Canvas.js'></script>
        <script type='text/javascript' src='../../../Adaptations/OpenLayers/Elements.js'></script>
        <script type='text/javascript' src='../../../Adaptations/OpenLayers/SVG.js'></script>
        <script type='text/javascript' src='../../../Adaptations/OpenLayers/v1_0_0.js'></script>
        <script type='text/javascript' src='../../../Adaptations/OpenLayers/v1.js'></script>
        <!-- Outils -->
        <script type='text/javascript' src='../../../Outils/Global.js'></script>
        <!-- Configuration de base -->
        <script type='text/javascript' src='../../../Outils/ParamDefautCarto.js'></script>
        <script type='text/javascript' src='../Configuration/ParamDefaut.js'></script>
        <!--Formulaires -->
        <script type='text/javascript' src='../Controleurs/Formulaires/frmZpr.js'></script>
        <script type="text/javascript" src="../Controleurs/Formulaires/frmGPX.js"></script>
        <!-- CartoGrille (obligatoirement après "Formulaire")-->
        <script type='text/javascript' src='../Controleurs/CartoGrilles/cgZpr.js'></script>
    </head>
    <body>
    </body>
</html>
