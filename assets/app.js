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
    let widthCase = 50;
    let widthBordure = 10;

    /* console.log(`Plateau de ${widthCase}px par case / ${widthBordure}px par bordure`); */

    /* Génération du plateau en SVG */
    $("div").append(`<svg height="${widthCase*9+widthBordure*8}" width="${widthCase*9+widthBordure*8}">`+generateurPlateau(widthCase,widthBordure)+`</svg>`);





/* Déplacement des pions */

    let tourJoueur = 1;

    $("body").on("click", ".case", function(){


        
    if (valideDeplacement($(`#joueur${tourJoueur}`).data(`ligne`),$(`#joueur${tourJoueur}`).data(`colonne`),$(this).data(`ligne`),$(this).data(`colonne`)) == true) {
        

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
































    /* FONCTIONS */


    /* Générateur de rectangle SVG selon les coordonnées et les dimensions souhaitées. Elle comprend aussi 2 données : la class CSS et les coordonnées x,y dans la propriété data */
    function generateurRect (classCss,numLigne,numColonne,positionX,positionY,largeur,hauteur) {
        let rect = `<rect class="${classCss}" data-ligne="${numLigne}" data-colonne="${numColonne}" x="${positionX}" y="${positionY}" width="${largeur}" height="${hauteur}"/>`;

        return rect;
    }

    /* Générateur de cercle SVG selon les coordonnées et les dimensions souhaitées. Elle comprend aussi 2 données : la class CSS du Joueur et les coordonnées x,y dans la propriété data */
    function generateurCircle (classJoueur,numLigne,numColonne,positionX,positionY,rayon) {
        let circle = `<circle class="${classJoueur}" id="${classJoueur}" data-ligne="${numLigne}" data-colonne="${numColonne}" cx="${positionX}" cy="${positionY}" r="${rayon}" />`;

        return circle;
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
                plateau = plateau+generateurRect("bordure",numLigne,numColonne,widthCase+numColonne*(widthCase+widthBordure),numLigne*(widthCase+widthBordure),widthBordure,widthCase);
            }
        }

        
        for (let numLigne = 0; numLigne<8; numLigne++) {
            /* Génération des bordures horizontales */
            for (let numColonne=0; numColonne<9; numColonne++) {
                plateau = plateau+generateurRect("bordure",numLigne,numColonne,numColonne*(widthCase+widthBordure),widthCase+numLigne*(widthCase+widthBordure),widthCase,widthBordure);
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




    function valideDeplacement (ligneDepart,colonneDepart,ligneArrivee,colonneArrivee) {

        /* console.log("ligneDepart : "+ligneDepart);
        console.log("ligneArrivee : "+ligneArrivee);

        console.log("colonneDepart : "+colonneDepart);
        console.log("colonneArrivee : "+colonneArrivee); */
        
        let verifLigne = Boolean , verifColonne = Boolean
        
        verifLigne = ligneDepart == ligneArrivee;
        
        if (verifLigne == true) {
            verifColonne = (colonneDepart == colonneArrivee - 1) || (colonneDepart == colonneArrivee + 1);
        } else {
            verifLigne = (ligneDepart == ligneArrivee - 1) || (ligneDepart == ligneArrivee + 1);
            verifColonne = colonneDepart == colonneArrivee;
        }

        if (verifLigne == true && verifColonne == true) {
            /* console.log(true); */
            return true;
        } else {
            /* console.log(false); */
            return false;
        }


    }


    


});

