


var activityContentBehavior = function () {
	
	$.getJSON("/activities.json",
	 function(result) {
	  console.log(JSON.stringify(result, null, 2));
	  console.log("got result");
	  // console.log(JSON.stringify(result, null ,2));
	  $("#activity_container").empty();
	  $("#activity_container").append("<div class='detailed-info'>" );
	  for(var i = 0; i<result.length; i++ ) {

	  	var properties = result[i].content.split(', ');
	  	var obj = {};
	  	properties.forEach(function(property) {
	  	    var tup = property.split(':');
	  	    obj[tup[0]] = tup[1];
	  	});

	  	// var contentObj = JSON.parse(result[i].content);
	  	$("#activity_container").append("<p>"+obj.result+"</p>");
	  		
	  }
	  $("#activity_container").append("</div>" );
	  // var obj = JSON.parse(JSON.stringify(result.))
	  // var limiter = Math.min(companiesPerPage, companiesContent.length);
	  // for(var i = 0; i<limiter; i++) {
	    // $("#activity_container").append("<div class='company-tile'><p>"+companiesContent[i]+"</p></div>" );
	    // $("#activity_container").append("<div><p>"+JSON.stringify(result)+"</p></div>" );
	  
	  // }

	  // companiesTileBehavior();
	  // companiesPaginationBehavior();
	  // $(".pagination-company-tile").removeClass('active');
	  // $(".pagination-company-tile:first").addClass('active');
	  // // $("#companies_container").append('<iframe displasy=block width="420" height="315"src="https://www.youtube.com/embed/Osjohw3glPk"></iframe>');

	  // $("#companies_fold_button").click(function() {
	  //   $("#companies_container").toggle();
	  // }); 
	});

}
