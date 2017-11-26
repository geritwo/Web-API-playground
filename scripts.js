const mainNode = document.querySelector('main');
const imageThumbsArea = document.querySelector('.image-thumbs-area')
const loaderButton = document.querySelector('.loader-button');

var batchSize = 10;
var totalCount = 0;

var imageData = [];

loaderButton.addEventListener("click", getImages);

function getImages() {
	if (imageData.length == 0) {
		loadImages();
	} else {
		renderDisplay(imageData);
	}
}
	
function loadImages() {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://jsonplaceholder.typicode.com/photos');
	request.responseType = 'text';

	request.onload = function() {
		var res = JSON.parse(request.response);
		res.forEach(function (e) {
			imageData.push(e);
		});
		renderDisplay(res);
	};

	request.send();
}

function renderDisplay(res) {
	var startIndex = totalCount;
	var endIndex = totalCount + batchSize;
	// TODO: check length - not to run out of index;
	res.forEach(function(e, i) {
		if (i>=startIndex && i<endIndex) {
			var imageCard = document.createElement('div');
			var imageCardHeader = document.createElement('h2');
			var imageContainer = document.createElement('img');
			var imageCaption = document.createElement('p');
			var imageURL = document.createElement('p');
			
			imageCard.className = "image-card";
			
			var imageID = i + 1;
			imageCardHeader.innerText = "Image no. " + imageID;
			imageContainer.src = e.thumbnailUrl;
			imageCaption.innerText = e.title.charAt(0).toUpperCase() + e.title.slice(1);
			imageURL.innerText = e.url;
			
			imageCard.appendChild(imageCardHeader);
			imageCard.appendChild(imageContainer);
			imageCard.appendChild(imageCaption);
			imageCard.appendChild(imageURL);

			imageThumbsArea.appendChild(imageCard);
			
			loaderButton.innerText = "Load more images";
		}
	});
	totalCount = totalCount + batchSize;
};
	
