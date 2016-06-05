
var strategiesContentBehavior = function () {
  
  $.getJSON("/strategies/personalized",
   function(result) {
    console.log(JSON.stringify(result, null, 2));
    console.log("got result");
    $("#strategy_container").empty();

    var div_str = "";
    div_str += "<div class='container'>"
     +"<h2>Your strategies</h2>"        
        +"<table class='table table-hover'>"
          +"<thead>"
             +"<tr>"
              +"<th style='text-align:center'>Stock name</th>"
              +"<th style='text-align:center'>Indicator name</th>"
              +"<th style='text-align:center'>Parameters</th>"
              +"<th style='text-align:center'>Signal</th>"
            +"</tr>"
          +"</thead>"
          +"<tbody>";

    for(var i = 0; i<result.length; i++ ) {     
      var contentObj = result[i].content;//JSON.parse(result[i].content);
      var params = contentObj.indicatorsWithParams[0].parameters
      console.log("PARSED: ", JSON.stringify(contentObj, null, 2));
      div_str += "<tr>";
      div_str += "<td>"+contentObj.indicatorsWithParams[0].stockName+"</td>";
      div_str += "<td>"+contentObj.indicatorsWithParams[0].indicatorName+"</td>";
      div_str += "<td>"+JSON.stringify(params)+"</td>";
      div_str += "<td>"+result[i].signal+"</td>";
      div_str += "</tr>";
    }
    div_str += "</tbody></table></div>";
    $("#strategy_container").append(div_str);
  });

}


