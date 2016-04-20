


var activityContentBehavior = function () {
  
  $.getJSON("/activities.json",
   function(result) {
    console.log(JSON.stringify(result, null, 2));
    console.log("got result");
    $("#activity_container").empty();

    var div_str = "";
    div_str += "<div class='container'>"
     +"<h2>Activity log</h2>"        
        +"<table class='table table-hover'>"
          +"<thead>"
             +"<tr>"
              +"<th style='text-align:center'>Stock name</th>"
              +"<th style='text-align:center'>Indicator name</th>"
              +"<th style='text-align:center'>Budget</th>"
              +"<th style='text-align:center'>Final result</th>"
              +"<th style='text-align:center'>Date</th>"
            +"</tr>"
          +"</thead>"
          +"<tbody>";

    for(var i = 0; i<result.length; i++ ) {     
      var contentObj = JSON.parse(result[i].content);
      console.log("PARSED: ", JSON.stringify(contentObj, null, 2));
      div_str += "<tr>";
      div_str += "<td>"+contentObj.request.stockName+"</td>";
      div_str += "<td>"+contentObj.request.indicatorName+"</td>";
      div_str += "<td>"+contentObj.request.parameters.budget+"</td>";
      div_str += "<td>"+contentObj.result+"</td>";
      div_str += "<td>"+contentObj.date+"</td>";
      div_str += "</tr>";
    }
    div_str += "</tbody></table></div>";
    $("#activity_container").append(div_str);
  });

}


