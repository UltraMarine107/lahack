'use strict';

$(document).ready(function(){
	initializePage();
});

function initializePage(){
	$('#back').click(backClick);
}

function backClick(e){
	e.preventDefault();
	ga("create", "back", "auto");
	ga("send", "event", "back", "click");
	console.log("Back Clicked");
}
