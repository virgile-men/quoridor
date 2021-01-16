"use strict"

/*  $('svg').html($('svg').html());
    --> permet d'actualiser le SVG mais ceci enlève le .on("click").
    Solution = pointer le .on("click") sur le body et son enfant
    --> ('body').on('.case' "click") */

/* || --> OU ___ && --> ET */

/*  console.log("data-ligne de la case : "+$(this).data(`ligne`));
    console.log("data-ligne du joueur : "+$(`.joueur${tourJoueur}`).data(`ligne`));

    console.log("data-colonne de la case : "+$(this).data(`colonne`));
    console.log("data-colonne du joueur : "+$(`.joueur${tourJoueur}`).data(`colonne`)); */

/* $("svg").html($("svg").html());
   Lorsque on implimente des formes dans un SVG à partir d'un script, il peut il avoir des problèmes d'actualisations. Pour palier à ce problème, il faut (à chaque implimentation) réactualiser le HTML. Attention au (`élement à l'intérieur d'un SVG`).on("click") car en faisant .html cela les supprime. */






$(document).ready(function() {
        
/* Dessin du plateau */

    /* Définition des largeurs des cases et des bordures */
    const widthCase = 50;
    const widthBordure = 10;

    /* console.log(`Plateau de ${widthCase}px par case / ${widthBordure}px par bordure`); */

    /* Génération du plateau en SVG */
    $(".container").append(`<svg class="stockage-2" height="${widthCase*2+widthBordure}" width="${widthCase*9+widthBordure*8}">`+generateurStockage('joueur2',widthCase,widthBordure)+`</svg>`);
    $(".container").append(`<svg class="plateau" height="${widthCase*9+widthBordure*8}" width="${widthCase*9+widthBordure*8}">`+generateurPlateau(widthCase,widthBordure)+`</svg>`);
    $(".container").append(`<svg class="stockage-1" height="${widthCase*2+widthBordure}" width="${widthCase*9+widthBordure*8}">`+generateurStockage('joueur1',widthCase,widthBordure)+`</svg>`);




/* Déplacement des pions -- En cours */

    let tourJoueur = 1;

    let compteurBatonnet = {joueur1: 7, joueur2: 7};

    $("body").on("click", ".case", function(){


        /* on vérifie si le joueur peut se déplacer à la case cliqué */
        if (validDeplacementPion($(`#joueur${tourJoueur}`).data(`ligne`),$(`#joueur${tourJoueur}`).data(`colonne`),$(this).data(`ligne`),$(this).data(`colonne`)) == true) {
            
            /* on modifie la data-contenu "vide" en "plein" si un point s'y trouve. On change également la data-contenu "plein" en vide pour la case de départ */
            $(this).data(`contenu`, "plein");

            $(`.case[data-ligne=${$(`#joueur${tourJoueur}`).data(`ligne`)}] + .case[data-colonne=${$(`#joueur${tourJoueur}`).data(`colonne`)}]`).data(`contenu`, "vide");
            

            /* On modifie les attributs cx et cy du pions pour le placer sur la case cliqué. On lui modifie aussi ces attributs data-ligne et data-colonne pour actualiser le positionnement */

            $(`#joueur${tourJoueur}`).attr('cx', parseInt($(this).attr('x'))+widthCase/2);
            $(`#joueur${tourJoueur}`).data(`ligne`, ($(this).data(`ligne`)));
            
            $(`#joueur${tourJoueur}`).attr('cy', parseInt($(this).attr('y'))+widthCase/2);
            $(`#joueur${tourJoueur}`).data(`colonne`, ($(this).data(`colonne`)));


            

            /* changement de joueur */
            if (tourJoueur == 1 ) {
                tourJoueur++;
            } else {
                tourJoueur = 1;
            }


        } else {
            alert(`Joueur ${tourJoueur} : Vous ne pouvez pas vous déplacer sur cette case !`)
        }

    

    });



/* Placement des batonnets -- En cours */
    $("body").on("click", ".bordure", function(){


        if (validPlacementBatonnet($(this).data(`contenu`),$(this).data(`ligne`),$(this).data(`colonne`),$(this).data(`ligne`),$(this).data(`colonne`)) == true) {

            /* on place le bâtonnet sur la case cliquée */
            $(this).addClass(`batonnet`);
            $(this).data(`contenu`, `plein`);
            
            /* on prolonge le bâtonnet jusqu'à une bordure +1 */
            placementBatonnetAdjacent($(this).data(`ligne`),$(this).data(`colonne`),$(this).attr(`width`));

        
            /* changement de joueur */
            if (tourJoueur == 1 ) {
                /* on enlève le bâtonnet de sa zone de stockage */
                $(`#joueur1-${compteurBatonnet.joueur1}`).addClass('fond-stockage-batonnet');
                
                compteurBatonnet.joueur1 = compteurBatonnet.joueur1 - 1;
                tourJoueur++;
            } else {
                /* on enlève le bâtonnet de sa zone de stockage */
                $(`#joueur2-${compteurBatonnet.joueur2}`).addClass('fond-stockage-batonnet');

                compteurBatonnet.joueur2 = compteurBatonnet.joueur2 - 1;
                tourJoueur = 1;
            }
        } else {
            alert(`Joueur ${tourJoueur} : Il y a déjà un bâtonnet à cet endroit ou vous n'avez plus de bâtonnet`)
        }


    

    });





























/* FONCTIONS */


    /* Générateur de rectangle SVG selon les coordonnées et les dimensions souhaitées. Elle comprend aussi 2 données : la class CSS et les coordonnées x,y dans la propriété data */
    function generateurRect (classCss,numLigne,numColonne,positionX,positionY,largeur,hauteur) {

            let rect = String;
        
        if (classCss !== "batonnet") {
            
            rect = `<rect class="${classCss}" data-ligne="${numLigne}" data-colonne="${numColonne}" data-contenu="vide" x="${positionX}" y="${positionY}" width="${largeur}" height="${hauteur}"/>`;

        } else {

            rect = `<rect class="${classCss}" id="${numLigne}-${numColonne}" data-ligne="${numLigne}" data-colonne="${numColonne}" data-contenu="plein" x="${positionX}" y="${positionY}" width="${largeur}" height="${hauteur}"/>`;

        }


        return rect;
    }

    /* Générateur de cercle SVG selon les coordonnées et les dimensions souhaitées. Elle comprend aussi 2 données : la class CSS du Joueur et les coordonnées x,y dans la propriété data */
    function generateurCircle (classJoueur,numLigne,numColonne,positionX,positionY,rayon) {
        const circle = `<circle class="${classJoueur}" id="${classJoueur}" data-ligne="${numLigne}" data-colonne="${numColonne}" cx="${positionX}" cy="${positionY}" r="${rayon}" />`;

        return circle;
    }


    function generateurStockage (joueurId, widthCase, widthBordure) {

        let stockage = String;

        for (let numColonne=0; numColonne<9; numColonne++) {
            stockage = stockage+generateurRect("fond-stockage",joueurId,numColonne,numColonne*(widthCase+widthBordure),0,widthCase,widthCase*2+widthBordure);
        }
        for (let numColonne=0; numColonne<8; numColonne++) {
            stockage = stockage+generateurRect("batonnet",joueurId,numColonne,widthCase+numColonne*(widthCase+widthBordure),0,widthBordure,widthCase*2+widthBordure);
        }

        return stockage;
    }

    
    /* Générateur d'un plateau aux dimensions voulues */
    function generateurPlateau (widthCase,widthBordure) {

        let plateau = String;
        
        for (let numLigne = 0; numLigne<9; numLigne++) {
            /* Génération des cases */
            for (let numColonne=0; numColonne<9; numColonne++) {
                plateau = plateau+generateurRect("case",numLigne,numColonne,numColonne*(widthCase+widthBordure),numLigne*(widthCase+widthBordure),widthCase,widthCase);
            }
            /* Génération des bordures verticales */
            for (let numColonne=0; numColonne<8; numColonne++) {
                plateau = plateau+generateurRect("bordure verticale",numLigne,numColonne,widthCase+numColonne*(widthCase+widthBordure),numLigne*(widthCase+widthBordure),widthBordure,widthCase);
            }
        }

        
        for (let numLigne = 0; numLigne<8; numLigne++) {
            /* Génération des bordures horizontales */
            for (let numColonne=0; numColonne<9; numColonne++) {
                plateau = plateau+generateurRect("bordure horizontale",numLigne,numColonne,numColonne*(widthCase+widthBordure),widthCase+numLigne*(widthCase+widthBordure),widthCase,widthBordure);
            }
            /* Génération des intersections */
            for (let numColonne=0; numColonne<8; numColonne++) {
                plateau = plateau+generateurRect("intersection",numLigne,numColonne,widthCase+numColonne*(widthCase+widthBordure),widthCase+numLigne*(widthCase+widthBordure),widthBordure,widthBordure);
            }
        }

        /* Génération des pions */

        /* Joueur 1 */
        plateau = plateau+generateurCircle ('joueur1',8,4,(widthCase*4+widthBordure*4+widthCase/2),(widthCase*8+widthBordure*8+widthCase/2),widthCase/2);
        /* Joueur 2 */
        plateau = plateau+generateurCircle ('joueur2',0,4,(widthCase*4+widthBordure*4+widthCase/2),(0+widthCase/2),widthCase/2);


        return plateau;
    }









    function validDeplacementPion (ligneDepart,colonneDepart,ligneArrivee,colonneArrivee) {

        let verifLigne = Boolean , verifColonne = Boolean
        
        verifLigne = ligneDepart == ligneArrivee;

        /* Première condition -> vérifie si la case d'arrivée est vide
        Deuxième condition -> vérifie si la bordure d'entre les cases est vide (BUG) */
        if ($(`.case[data-ligne=${ligneArrivee}] + .case[data-colonne=${colonneArrivee}]`).data(`contenu`) == "vide" &&
        $(`.bordure[data-ligne=${ligneArrivee}] + .bordure[data-colonne=${colonneArrivee}]`).data(`contenu`) == "vide") {
            if (verifLigne == true) {
                verifColonne = (colonneDepart == colonneArrivee - 1) || (colonneDepart == colonneArrivee + 1);
            } else {
                verifLigne = (ligneDepart == ligneArrivee - 1) || (ligneDepart == ligneArrivee + 1);
                verifColonne = colonneDepart == colonneArrivee;
            }
        }


        /* Ajouter la contrainte des batonnets entre les cases */


        /* Ajouter la possibilité de passer par dessus un joueur */


        if (verifLigne == true && verifColonne == true) {
            return true;
        } else {
            return false;
        }


    }



    function validPlacementBatonnet(contenu,ligneSelect,colonneSelect) {
        if (tourJoueur == 1) {
            if (compteurBatonnet.joueur1 !== -1) {
                /* on vérifie s'il n'y a pas de bâtonnet sur la bordure cliqué */
                if (contenu == "vide") {
                    /* on vérifie s'il n'y a pas de bâtonnet sur l'intersection entre les 2 bordures */
                    if ($(`.intersection[data-ligne=${ligneSelect}] + .intersection[data-colonne=${colonneSelect}]`).data(`contenu`) == "vide") {
                        return true;
                    }
                } else { return false }
            }
        } else {
            if (compteurBatonnet.joueur2 !== -1) {
                /* on vérifie s'il n'y a pas de bâtonnet sur la bordure cliqué */
                if (contenu == "vide") {
                    /* on vérifie s'il n'y a pas de bâtonnet sur l'intersection entre les 2 bordures */
                    if ($(`.intersection[data-ligne=${ligneSelect}] + .intersection[data-colonne=${colonneSelect}]`).data(`contenu`) == "vide") {
                        return true;
                    }
                } else { return false }
            }
        }
        
    }

    





    


    function placementBatonnetAdjacent(ligneSelect,colonneSelect,widthSelect) {



        /* si la bordure cliquée est verticale alors on ajoute le bâtonnet sur la bordure +1 */
        if (widthSelect == widthBordure) {
            $(`.bordure[data-ligne=${ligneSelect+1}] + .bordure[width=${widthSelect}] + .bordure[data-colonne=${colonneSelect}]`).addClass(`batonnet`);
            $(`.bordure[data-ligne=${ligneSelect+1}] + .bordure[width=${widthSelect}] + .bordure[data-colonne=${colonneSelect}]`).data(`contenu`, `plein`);
        } else {
            $(`.bordure[data-ligne=${ligneSelect}] + .bordure[width=${widthSelect}] + .bordure[data-colonne=${colonneSelect+1}]`).addClass(`batonnet`);
            $(`.bordure[data-ligne=${ligneSelect}] + .bordure[width=${widthSelect}] + .bordure[data-colonne=${colonneSelect+1}]`).data(`contenu`, `plein`);
        }

        /* On ajoute la bordure sur l'intesection entre la bordure cliquée et la bordure +1 */
        $(`.intersection[data-ligne=${ligneSelect}] + .intersection[data-colonne=${colonneSelect}]`).addClass(`batonnet`);
        $(`.intersection[data-ligne=${ligneSelect}] + .intersection[data-colonne=${colonneSelect}]`).data(`contenu`, `plein`);

    }


});

