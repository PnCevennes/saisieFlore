//Variables globales utilisées pour gérer le formulaireGPX
var formulaireGPX, fenetreformulaireGPX, modeImportation = false, donneesGPX, cstPtcId;

Ext.onReady(function() {
    //Panel contenant le formulaire avec titre, contrôles de saisie et boutons action
    formulaireGPX = new Ext.FormPanel({
        fileUpload: true,
        frame: true,
        labelWidth: 130,
        labelAlign: 'right',
        defaults: {width: 230},
        labelSeparator: ' :',
        items: [{
                xtype: 'hidden',
                id: 'CST_cheminRelatifGPX',
                value: CST_cheminRelatifGPX
           },
                new Ext.ux.form.FileUploadField({
                    id: 'fichierLocalGPX',
                    buttonText: 'Parcourir...',
                    fieldLabel: 'GPX à charger',
                    emptyText: 'Sélectionner un fichier GPX',
                    allowBlank: false,
                    blankText: 'Veuillez sélectionner un fichier GPX !',
                    regex: /\.GPX$/i,
                    regexText: "Veuillez sélectionner un fichier avec l'extension GPX"
                })           
        ]
    });
    //Panel container rajoutant la barre de status
    var formulaireTotalGPX = new Ext.Panel({
        items: formulaireGPX,
        bbar: new Ext.ux.StatusBar({
            items: [{
                    text: 'Charger',
                    handler: soumettreGPX,
                    iconCls: 'checked'
                }, '-', {
                    id: 'boutonAnnulerGPX',
                    text: 'Annuler',
                    handler: function() {fenetreformulaireGPX.hide();},
                    iconCls: 'cancel'
                }
            ],
            id: 'statusbarGPX',
            defaultText: 'Prêt'
        })
    });
    //Fenêtre container
    fenetreformulaireGPX = new Ext.Window({
        modal: true,
        resizable: false,
        title: 'Chargement - fichier GPX',
        width: 440,
        autoHeight: true,
        constrain: true,
        items: formulaireTotalGPX,
        close: Ext.getCmp('boutonAnnulerGPX').handler
    });
});

//Fonction appelée après un chargement réussi
function termineAffichageGPX(data) {
    document.location.href = 'vSelectGPX.php?zpr_id=' + GetParam('zpr_id') + '&GPX=' 
        + data + '&ptc_id=' + cstPtcId;
}

//Fonction appelée sur le click du bouton "Charger"
function soumettreGPX() {
    if (modeImportation) {
        templateValidation('../Modeles/Json/jFichierGPX.php', Ext.getCmp('statusbarGPX'),
            formulaireGPX, termineAffichageGPX);
    }
    else {
        templateValidation('../Modeles/Json/jFichierGPX.php', Ext.getCmp('statusbarGPX'),
            formulaireGPX, function(data) {
                donneesGPX = new GeoExt.data.FeatureStore({
                    layer: calqueGPX,
                    proxy: new GeoExt.data.ProtocolProxy({
                        protocol: new OpenLayers.Protocol.HTTP({
                            url: CST_cheminRelatifGPX + data,
                            format: new OpenLayers.Format.GPX({
                                extractRoutes: false,
                                internalProjection: carte.getProjectionObject(),
                                externalProjection: new OpenLayers.Projection('EPSG:4326')
                            }),
                            readWithPOST: true
                        })
                    })
                });
                donneesGPX.load();
                fenetreformulaireGPX.hide();
            });
    }
}

//Initialisation du formulaire
function initialiseformulaireGPX() {
    fenetreformulaireGPX.show();
    formulaireGPX.form.reset();
    Ext.getCmp('statusbarGPX').clearStatus({useDefaults: true}); // remise des valeurs par défaut de la barre de status
    formulaireGPX.getEl().unmask();  // déblocage de la saisie sur le formulaire
}

//Importation GPX
function importeGPX() {
    modeImportation = true;
    initialiseformulaireGPX();
}

//Affichage GPX
function afficheGPX() {
    initialiseformulaireGPX();
}
