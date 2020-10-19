"use strict"

/*  $('svg').html($('svg').html());
    --> permet d'actualiser le SVG mais ceci enlève le .on("click").
    Solution = pointer le .on("click") sur le body et son enfant
    --> ('body').on('.case' "click") */

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

    $('.case').on("click", function () {

        $(`.joueur${tourJoueur}`).attr('cx', parseInt($(this).attr('x'))+widthCase/2);
        $(`.joueur${tourJoueur}`).attr('cy', parseInt($(this).attr('y'))+widthCase/2);


        /* changement de joueur */
        if (tourJoueur == 1 ) {
            tourJoueur++;
        } else {
            tourJoueur = 1;
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
        let circle = `<circle class="${classJoueur}" data-ligne="${numLigne}" data-colonne="${numColonne}" cx="${positionX}" cy="${positionY}" r="${rayon}" />`;

        

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






});

