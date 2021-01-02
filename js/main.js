//Listeners for form
document.getElementById('myForm').addEventListener('submit', savebookmarkers);


function savebookmarkers(e)
{   
		//prevenir le comportement par défaut du formulaire 

	    e.preventDefault();

		//prendre les inputs et leurs valeurs 
		var siteName = document.getElementById('siteName').value;
		var siteURL  = document.getElementById('siteURL').value;

		//validation du formulaire (tous les champs sont obligatoires) 

		if(!siteName || !siteURL)
		{
			alert('Attention! Veuillez remplir tous les champs!');

			return false;
		}

		//Expression régulière pour valider l'url 

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//+]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.#?&//=]*)?/gi;

		var regex = new RegExp(expression);

		if(!siteURL.match(regex))
		{
			alert('Attention, Entrer une url valide svp!');
			return false;
		}
		

		//stocker mes valeurs dans un objet (format JSON) pour l'envoyer au local storage  
		var bookmark = {
			name:siteName,
			url:siteURL
		};

		//Explications sur le localStorage et ses différentes fonctions 
        /*
		//Le Local Storage stoke seulement les strings, mais on peut convertir en json
		localStorage.setItem('test', 'Bonjour mon local storage'); //enregistrer (clé, valeur)

		console.log(localStorage.getItem('test')); //récupérer une valeur par sa clé

		localStorage.removeItem('test');

		console.log(localStorage.getItem('test'));

		localStorage.removeItem('test2'); 
         */


		//vérifier si le localStorage est null pour chaque valeur
		//créer un tableau qui stocke toutes les clés 
		//pusher l'objet bookmark qui contient déjà nos deux valeurs dans le tableau des clés
		//enregistrer les valeurs dans le localstorage après conversion de json en string

		if(localStorage.getItem('bookmarks') === null)
		{
			var bookmarks = [];

			bookmarks.push(bookmark);

			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else 
		{
			//si y en a , on les recupère sous format json
			//on les rajoute dans l'array bookmarks
			//on les renvoit dans le localStorage avec les nouvelles valeurs 
		

			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

			bookmarks.push(bookmark);

			localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		}

		//Rafrîshir le formulaire après avoir enregistré les données

		document.getElementById('myForm').reset(); 

		//Rafraîshir le localStorage au chargement du body , appel de la fonction fetchBookmarks 
	fetchBookmarks()

	
}

//fonction qui supprime le bookmarker grâce à son url 

function deleteBookmark(url)
{
	//récupération de tous les bookmarkers 
	//tester si l'url courant correspond à l'url du localStorage 
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i ++ )
	{
		if(bookmarks[i].url == url) {

			//supprimer la clé et sa valeur du tableau , ici url a une clé 1
			bookmarks.splice(i, 1);
		}
	}

	//Recharger le localStorage avec les valeurs restantes 
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Rafraîshir le localStorage au chargement du body , appel de la fonction fetchBookmarks 
	fetchBookmarks()
}



//fonction qui récupère les valeurs du localStorage à chaque chargement du body
//fonction qui affiche les valeurs dans le div bookmarksResults

function fetchBookmarks()
{
	//récupérer les données du localStorage 
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//récupérer la div bookmarksResults
	var bookmarksResults = document.getElementById('bookmarksResults');

	//construire une vue ou une output

	bookmarksResults.innerHTML ='';

	//parcourir les différentes valeurs pour les afficher 

	for(var i = 0; i < bookmarks.length; i++ ) {

		var name = bookmarks[i].name;
		var url  = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
		                               '<h5>' +name+
		                               ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
		                               ' <a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
		                               '</h5>'+
		                               '</div>';

	}

}





