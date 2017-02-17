//Variables globales utilisées pour gérer le formulaire
var formulaire, fenetreFormulaire;

Ext.onReady(function() {
    //Combo d'auto-complétion "observateur"
    var comboObr = new Ext.form.ComboBox({
        id: 'numerisateur_id',
        triggerAction: 'all',
        store: new Ext.data.JsonStore({
            url: "../Modeles/Json/jListVal.php?table=saisie.numerisateur&chId=obr_id&chVal=login",
            fields: ['id', 'val']
        }),
        emptyText: 'Sélectionnez',
        mode: 'local',
        displayField: 'val',
        valueField: 'id',
        fieldLabel: 'Numérisateur FLORE',
        allowBlank: false,
        blankText: "Veuillez sélectionner le numérisateur FLORE !",
        forceSelection : true
    });
    //Panel contenant le formulaire avec titre, contrôles de saisie et boutons action
    formulaire = new Ext.FormPanel({
        keys: [{key: [Ext.EventObject.ENTER], fn: soumettre}],
        frame: true,
        labelWidth: 150,
        labelAlign: 'right',
        defaults: {width: 250},
        labelSeparator: ' :',
        items: [
            comboObr,
            {
                xtype: 'textfield',
                fieldLabel: 'Mot de passe',
                id: 'mot_de_passe',
                allowBlank: false,
                inputType: 'password',
                value: recupereCookie('mot_de_passe'),
                blankText: "Veuillez saisir votre mot de passe !",
            },
            {
                xtype:'checkbox',
                fieldLabel: 'Se souvenir de moi',
                id: 'save',
                checked: recupereCookie('save')
            }
        ]
    });
    //Panel container rajoutant la barre de status
    var formulaireTotal = new Ext.Panel({
        items: formulaire,
        bbar: new Ext.ux.StatusBar({
            items: [{
                    text: 'Se connecter',
                    handler: soumettre,
                    iconCls: 'connexion'
                }
            ],
            id: 'statusbar',
            defaultText: 'Prêt'
        })
    });
    //Fenêtre container
    fenetreFormulaire = new Ext.Window({
        modal: true,
        resizable: false,
        title: 'Authentification',
        width: 500,
        autoHeight: true,
        constrain: true,
        items: formulaireTotal
    });
    fenetreFormulaire.show();
    Ext.getCmp('numerisateur_id').focus('', 2000); // focus de 2000 ms sinon ça ne marche pas
    //Initialisation des listes et des variables quasi-stables dans le temps
    comboObr.store.load({callback: function() {comboObr.setValue(recupereCookie('numerisateur_id'))}});
});

//Fonction appelée sur le click du bouton "Se connecter"
function soumettre() {
    if (formulaire.form.isValid()) {
        formulaire.getEl().mask(); // application d'un masque gris sur le formulaire pour bloquer une saisie éventuelle
        Ext.getCmp('statusbar').showBusy('Connexion en cours...'); // affichage du message de chargement
        // vérification des paramètres de connexion dans la base
        Ext.Ajax.request({
            url: '../Controleurs/Gestions/GestSession.php',
            params: {
                action: 'Authentifier',
                numerisateur_id: Ext.getCmp('numerisateur_id').value,
                mot_de_passe: Ext.getCmp('mot_de_passe').getValue()
            },
            callback: function(options, success, response) {
                if (success) {
                    var obj = Ext.util.JSON.decode(response.responseText); // décodage JSON du résultat du POST
                    if (obj.success) {
                        if (Ext.getCmp('save').checked) {
                            creeCookie('numerisateur_id', Ext.getCmp('numerisateur_id').value, 365);
                            creeCookie('mot_de_passe', Ext.getCmp('mot_de_passe').getValue(), 365);
                            creeCookie('save', Ext.getCmp('save').getValue(), 365);
                        }
                        else  {
                            supprimeCookie('numerisateur_id');
                            supprimeCookie('mot_de_passe');
                            supprimeCookie('save');
                        }
                        Ext.getCmp('statusbar').setStatus({
                            text: 'Opération réussie',
                            iconCls: 'x-status-valid'
                        });
                        Ext.MessageBox.show({
                            title: 'Authentification réussie',
                            fn: function() {
                                Ext.getCmp('statusbar').showBusy('Redirection en cours...'); // affichage du message de chargement
                                document.location.href = 'vSaisieZpr.php';
                            },
                            msg: obj.data,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                    else {
                        Ext.getCmp('statusbar').setStatus({
                            text: 'Opération échouée',
                            iconCls: 'x-status-error'
                        });
                        Ext.MessageBox.show({
                            title: obj.errorMessage,
                            fn: function() {
                                Ext.getCmp('statusbar').clearStatus({useDefaults: true}); // remise des valeurs par défaut de la barre de status
                                formulaire.getEl().unmask();  // déblocage de la saisie sur le formulaire
                            },
                            msg: obj.data,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
                else {
                    Ext.getCmp('statusbar').setStatus({
                        text: 'Erreur serveur',
                        iconCls: 'x-status-error'
                    });
                    Ext.MessageBox.show({
                        title: 'ERREUR : ' + response.statusText,
                        fn: function() {
                            Ext.getCmp('statusbar').clearStatus({useDefaults: true}); // remise des valeurs par défaut de la barre de status
                            formulaire.getEl().unmask();  // déblocage de la saisie sur le formulaire
                        },
                        msg: 'Code erreur ' + response.status,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
    else {
        Ext.getCmp('statusbar').setStatus({
            clear: true, // faible attente pour être à nouveau "Prêt"
            text: 'Formulaire non valide',
            iconCls: 'x-status-error'
        });
    }
}
