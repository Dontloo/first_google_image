
$(document).ready(function() {
    $("#qfile").change(function(event) {
    	openFile(event);
    });
});

// recursion for loops that contain callbacks
function sentQuery(queries, i){
	if (i<queries.length-1){
		var fileName = queries[i].trim()+"_"+((i%10)/2)+queries[i+1].trim().replace(/ /g, "_")+"_";
		var query = queries[i+1].trim().replace(/ /g, "+");
		$.get(
		    "https://www.googleapis.com/customsearch/v1?q="+query+"&cx=004593020462780571056%3Any3rwevn8uw&searchType=image&key=AIzaSyCSEcQTObtmes9XFNlq5GbJ3c2iG4XmeFw",
		    function(data) {
		    	fileName = fileName+data.items[0].mime.replace(/\//g, ".");
		    	chrome.downloads.download({url: data.items[0].link, filename: fileName});
		    	sentQuery(queries,i+2);
		    }
		);
	}
}

var openFile = function(event) {
	
	var input = event.target;
	var reader = new FileReader();
	
	reader.onload = function(event){
	  var reader = event.target;
	  var text = reader.result;
	  var queries = text.split("\n");
	  sentQuery(queries,0);
	};
	
	reader.readAsText(input.files[0]);
};
