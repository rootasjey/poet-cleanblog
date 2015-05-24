{{{
    "title"    : "La relation entre RequireJS, AMD et CommonJS",
    "tags"     : [ "dev", "JavaScript", "nodejs", "io.js" ],
    "category" : "dev",
    "date"     : "05-24-2015"
}}}

En entendant parler de [requireJS](http://requirejs.org) à mon stage
depuis plusieurs jours, je me suis
décidé à aller regarder par moi-même ce qu'il  en était.
Et bien qu'après 5 min je pensais avoir compris, je me suis étonné à retourner
sur leur site à maintes reprises. Car entre **RequireJS**, **AMD** et **CommonJS**, les
différences ne sont pas clairement définies aux premiers abords.

Après quelques recherches, je suis tombé sur [un poste sur stackoverflow](http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)
de quelqu'un qui était tout aussi perdu que moi :D

Et en fait, la réponse était sur le site officiel depuis le début dans la [documentation](http://requirejs.org/docs/whyamd.html) ;o

En combinant les différentes réponses, voici ma compréhension du truc:


<br><br>
## Un peu d'histoire

L'idée est partie de [James Burke](https://github.com/jrburke) qui voulait
utiliser des modules de différentes sources mais ne pouvait pas à cause
des restrictions de *"same-origin" (CORS)*.

Il a donc crée le module **xdomain** qui effectuait une étape de compilation
pour injecter des fonctions encapsulées comme le fait RequireJS mais en plus complexe.

Donc de part la complexité et la difficulté de mise en oeuvre,
il a s'est mis à réfléchir à autre chose.

Il voulait quelque chose qui marche avec les modules de CommonJS mais ces derniers
étaient structurés de manière syncrhone ce qui est normal côté serveur.
Il fallait un truc asyncrhone. C'est là où RequireJS est née.

[Si vous souhaitez lire l'histoire complète](http://requirejs.org/docs/history.html)



<br><br>
## CommonJS

CommonJS est un moyen de définir des modules en JavaScript avec l'aide d'**exports**.
Un exemple de code ressemblerait à cela:

```javascript
// /exemple/moduleRepos.js
exports.Repos = function () { console.log("COOL! 3 heures de sommeil!"); };

// /exemple/app.js
var dormir = require('moduleRepos');

dormir.Repos(); // affiche "COOL! 3 heures de sommeil!" dans la console
```

La définition et l'utilisation d'un module se fait donc par ces deux étapes :

* **exports**: pour exporter le contenu du module et éventuellement des dépendances
*(un module peut utiliser un autre module)*

* **require**: la fonction qui va chercher le module et ses dépendances s'il y en a.

CommonJS a plusieurs implémentations, notamment celle de [Node.js](http://nodejs.org).



<br><br>
## AMD

La légende dit que du fait que CommonJS n'était pas
spécifiquement designé pour l'environnement du navigateur,
il se ne comportait pas très bien. Mais **AMD** (Asynchronous Modules Definition) lui
était le candidat parfait! La particularité d'**AMD** est qu'un module peut être déclaré
avant même que ses dépendances ne soit chargées (magique hein? :D).


<br><br>
## RequireJS

RequireJS est une implémentation d'AMD et peut être utilisé pour charger
des modules de manière asyncrhone.

#### Exemple:

Dans un fichier html:

```html
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'   -->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

Dans un fichier JavaScript:

```javascript
// scripts/main.js
// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
```

<br><br>
## En conclusion

Donc CommonJS et AMD sont différentes implémentations de définir des modules JavaScript.
Ces bibliothèques ont été crées par [James Burke](https://github.com/jrburke)
avec [un groupe de participants](http://groups.google.com/group/commonjs).

**AMD** est plus adapté dans la partie cliente (aux navigateurs) dû au chargement asynchrone
des dépendances de modules.

*RequireJS* est une implémentation d'AMD en essayant de garder la philosphie de **CommonJS**.
De plus, **RequireJS** offre un *wrapper* de telle sorte que les modules CommonJS
peuvent presque être directement importés et utilisés par **RequireJS**.

### sources

* [stackoverflow](http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)
* [requireJS docs](http://requirejs.org/docs/whyamd.html)
