/* Avec l'attribut data, on peut stocker ce qu'on veut. Par exemple les données x,y des cases et valider ou non l'action de se déplacer d'une case (x=x y=y+1 -> valide / x=x y=y-2 -> erreur) */

"use strict"


$(document).ready(function() {
        
/* Dessin du plateau */

    /* Définition des largeurs des cases et des bordures */
    let widthCase = 50;
    let widthBordure = 10;

    /* console.log(`Plateau de ${widthCase}px par case / ${widthBordure}px par bordure`); */

    /* Génération du plateau en SVG */
    $("div").append(`<svg height="${widthCase*9+widthBordure*8}" width="${widthCase*9+widthBordure*8}">`+generateurPlateau(widthCase,widthBordure)+`</svg>`);






































    /* FONCTIONS */


    /* Générateur de rectangle SVG selon les coordonnées et les dimensions souhaitées. Elle comprend aussi 2 données : la class CSS et les coordonnées x,y dans la propriété data */
    function generateurRect (classCss,numLigne,numColonne,positionX,positionY,largeur,hauteur) {
        let rect = `<rect class="${classCss}" data="${numLigne},${numColonne}" x="${positionX}px" y="${positionY}px" width="${largeur}" height="${hauteur}"/>`;

        return rect;
    }




    
    /* Générateur d'un plateau aux dimensions voulues */
    function generateurPlateau (widthCase,widthBordure) {

        let plateau = String;
        
        for (let numLigne = 0; numLigne<9; numLigne++) {
            /* Génération des cases */
            for (let numColonne=0; numColonne<9; numColonne++) {
                plateau = plateau+generateurRect("case",numLigne+1,numColonne+1,numColonne*(widthCase+widthBordure),numLigne*(widthCase+widthBordure),widthCase,widthCase);
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


        return plateau;
    }






});

