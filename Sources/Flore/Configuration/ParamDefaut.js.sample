//Configuration des interfaces de saisie
// identifiants base de données de chaque protocole
const CST_ptcIdEnjeux = 1;
const CST_ptcIdSuivi = 2;
const CST_ptcIdLichens = 3;
const CST_ptcIdFlore = 4;
// répertoires de stockage des photos et des fichiers GPX de chaque protocole
const CST_RepBiotopes = 'Biotopes/';
const CST_RepPopulations = 'Populations/';
const CST_RepEspeces = 'Taxons/';

//Paramétrage d'installation
// répertoire de stockage des fichiers GPX
const CST_cheminRelatifGPX = '../../../GPX/';
// répertoire de stockage des photos
const CST_cheminRelatifPhoto = '../../../Photos/Flore/';

//Gestion de la déconnection
function deconnecter() {
    Ext.MessageBox.confirm('Confirmation', 'Etes-vous sûr de vouloir vous déconnecter ?', deconnecte);
}
function deconnecte(btn) {
    if (btn == 'yes') {
        Ext.Ajax.request({
            url: '../Controleurs/Gestions/GestSession.php',
            params: {
                action: 'Deconnecter'
            },
            callback: function(options, success, response) {
                if (success) {
                    var obj = Ext.util.JSON.decode(response.responseText); // décodage JSON du résultat du POST
                    if (obj.success) {
                        Ext.MessageBox.show({
                            title: 'Déconnection réussie',
                            fn: function() {document.location.href = 'vAuthent.php';},
                            msg: obj.data,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: obj.errorMessage,
                            fn: function() {document.location.href = 'vAuthent.php';},
                            msg: obj.data,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: 'ERREUR : ' + response.statusText,
                        fn: function() {document.location.href = 'vAuthent.php';},
                        msg: 'Code erreur ' + response.status,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
}
