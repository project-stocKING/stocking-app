
var setIndicatorsPagination = function() {
  var pages = indicatorsContent.length/indicatorsPerPage;
  if(pages < 2) return;

  $(".pagination-indicator-tile").removeClass('active');
  $(".pagination-indicator-tile").eq(indicatorsCurrentPage).addClass('active');

  var paginationStart = indicatorsCurrentPage * indicatorsPerPage;
  var paginationEnd = paginationStart + indicatorsPerPage;
  if (paginationEnd >= indicatorsContent.length) paginationEnd = indicatorsContent.length - 1;
  $("#indicators_container").empty();

  var limiter = Math.min(indicatorsPerPage, paginationEnd);
  for(var i = paginationStart; i<limiter; i++) {
    $("#indicators_container").append("<div class='indicator-tile'><p>"+indicatorsContent[i].indicatorName+"</p></div>" );
  }

  indicatorsTileBehavior();
}

var indicatorsTileBehavior = function() {

  if (currentIndicatorIndex >= indicatorsCurrentPage*indicatorsPerPage 
    && currentIndicatorIndex < (indicatorsCurrentPage+1)*indicatorsPerPage ) {
    $(".indicator-tile").eq(currentIndicatorIndex%indicatorsPerPage).addClass('active');
  }


  $(".indicator-tile").on('click', function(event) {
    // console.log("clicked on strategy-tile");
    $(".indicator-tile").removeClass('active');
    $(this).addClass('active');

    var indicatorIndex = indicatorsCurrentPage*indicatorsPerPage + $(this).index();
    currentIndicatorIndex = indicatorIndex;
    console.log("clicked on index-tile ", indicatorIndex);

    $("#indicator_info").empty();
    $("#indicator_info").append("<div id='indicator_info_content'><h4>description</h4></div>");
    $("#indicator_info_content").append(
      "<p>"+"Name: "+indicatorsContent[indicatorIndex].indicatorName+"</p></div>");

    for(var i=0; i<indicatorsContent[indicatorIndex].parameters.length; i++) {
      $("#indicator_info_content").append(
        "<p>"+"Parameter: "+indicatorsContent[indicatorIndex].parameters[i]+"</p></div>");
    }
    createForm(indicatorsContent[indicatorIndex], "#indicator_info_content");
  });
}

var indicatorsPaginationBehavior = function() {
  var pages = indicatorsContent.length/indicatorsPerPage;
  if(pages < 2) return;
  if(pages * indicatorsPerPage < indicatorsContent.length) pages++;
  $("#indicators_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#indicators_paginator").append("<div class='pagination-indicator-tile'><p>"+(i+1)+"</p></div>");
  }

  $(".pagination-indicator-tile").on('click', function(event) {
    indicatorsCurrentPage = $(this).index();
    setindicatorsPagination();
  });
}

var indicatorsContentBehavior = function() {

  // $.getJSON("http://156.17.41.238:5000/companies", function(result) {
  //   console.log(result);
  // });

  $.getJSON("http://156.17.41.238:5001/indicators",
    function(result) {
      console.log(result);
      indicatorsContent = result;
      $("#indicators_container").empty();

      console.log('about to display');
      console.log(indicatorsContent.length);
      var limiter = Math.min(indicatorsPerPage, indicatorsContent.length);
      for(var i = 0; i<limiter; i++) {
        console.log("i: ", i);
        var indicator = indicatorsContent[i];
        console.log(JSON.stringify(indicator));
        $("#indicators_container").append("<div class='indicator-tile'><p>"+indicator.indicatorName+"</p></div>" );
      }
      console.log('displayed');
      indicatorsTileBehavior();
      indicatorsPaginationBehavior();
      $(".pagination-indicator-tile").removeClass('active');
      $(".pagination-indicator-tile:first").addClass('active');

      $("#indicators_fold_button").click(function() {
        $("#indicators_container").toggle();
      }); 
    });
}



var displayResult = function() {

  var amount = calculationResult[0].budgetAmount;
  $("#result_info").empty();
  $("#result_info").append("<div id='result_info_content'><h4>Looks like you'd have "+amount+" now!</h4><p>     </p></div>");
    // $("#result_info").append("<div id='result_info_content'><h4>Looks like you'd have"+amount+"now!</h4></div>");
  
  // $("#result_info").append("<p>Looks like you'd have "+amount+" now!");
  // for(var i = 0; i<calculationResult.length; i++) {
  //   var res = calculationResult[i];
  //   $("#result_info_content").append('<div class="text-left" padding="20psssx 20px"></div>');
  //   $("#result_info_content").append("<p> Operation: "+res.result.name +"</p>");
  //   $("#result_info_content").append("<p> Index: "+res.indexName +"</p>");
  //   $("#result_info_content").append("<p> Date: "+res.date +"</p>");
  // }
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

var createForm = function(json, targetDiv) {
  var form = $("<form/>", 
                   { id: 'indicator_form' }
              );

  for(var key in json.parameters ) {
    console.log(key, json.parameters[key]);

    var paramId = key+"_key";
    form.append("<p>"+key);
    form.append(
      $("<input>",
          {type: 'text',
          id: paramId,
          name: key,
          style: 'width:40%'}
        )
    );
    form.append("</p>");
  }
  form.append("<p>Budget");
  form.append(
    $("<input>", 
    {type: 'text',
    id: "budgetId", 
    name: "budget",
    style: 'width: 40%' }
    )
  );
  form.append("</p>");


  form.append( 
       $("<input>", 
            { type:'submit',
              id: 'form_submit', 
              value:'Submit', 
              style:'width:30%' }
         )
  );

  $(targetDiv).append(form);

  for (var key in json.parameters) {
    if (json.parameters[key] === 'Date') {
      console.log("lets add date");
      var paramId = key+"_key";
      console.log("#"+paramId);
      var id = "#"+paramId;
      $(function() {
        $("#"+paramId).datepicker({
          dateFormat: "yymmdd"
        });
      });
    }
  }

  $('#indicator_form').submit(function(event) {
    console.log('clicked on submit'); 
    event.preventDefault();

    var serverUrl = 'http://156.17.41.238:5001/indicators'
    // var serverUrl = 'http://httpbin.org/post';
    
    var $form = $("#indicator_form");
    var data = getFormData($form);
    var postdata = {
      stockName: companiesContent[currentCompanyIndex],
      indicatorName: indicatorsContent[currentIndicatorIndex].indicatorName,
      parameters: data
    }
    console.log(JSON.stringify(postdata, null, 2));


    var xhr = new XMLHttpRequest();
    xhr.open('POST', serverUrl);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          calculationResult = JSON.parse(xhr.responseText);
          console.log(JSON.stringify(calculationResult, null, 2));

          var now = (new Date()).toDateString();//Date.now();
          // now = now.toDateString();
          var sendObj = {
            request: postdata,
            result: calculationResult[0].budgetAmount,
            date: now
          }

          var xhr2 = new XMLHttpRequest();
          xhr2.open('POST', '/activities');
          xhr2.setRequestHeader('Content-Type', 'application/json');
          xhr2.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              // console.log(xhr2.responseText);
            }
          }
          var obj = {
            activity: {
             content: JSON.stringify(sendObj),
             user_id: 1 
            }
          };
          xhr2.send(JSON.stringify(obj));

          displayResult();
        }
    }
    xhr.send(JSON.stringify(postdata));


  });
}
