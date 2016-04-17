
var setIndexesPagination = function() {
  var pages = indexesContent.length/indexesPerPage;
  if(pages < 2) return;

  $(".pagination-index-tile").removeClass('active');
  $(".pagination-index-tile").eq(indexesCurrentPage).addClass('active');

  var paginationStart = indexesCurrentPage * indexesPerPage;
  var paginationEnd = paginationStart + indexesPerPage;
  if (paginationEnd >= indexesContent.length) paginationEnd = indexesContent.length - 1;
  $("#indexes_container").empty();

  var limiter = Math.min(indexesPerPage, paginationEnd);
  for(var i = paginationStart; i<limiter; i++) {
    $("#indexes_container").append("<div class='index-tile'><p>"+indexesContent[i].indexName+"</p></div>" );
  }

  indexesTileBehavior();
}

var indexesTileBehavior = function() {

  if (currentIndexIndex >= indexesCurrentPage*indexesPerPage 
    && currentIndexIndex < (indexesCurrentPage+1)*indexesPerPage ) {
    $(".index-tile").eq(currentIndexIndex%indexesPerPage).addClass('active');
  }


  $(".index-tile").on('click', function(event) {
    // console.log("clicked on strategy-tile");
    $(".index-tile").removeClass('active');
    $(this).addClass('active');

    var indexIndex = indexesCurrentPage*indexesPerPage + $(this).index();
    currentIndexIndex = indexIndex;
    console.log("clicked on index-tile ", indexIndex);

    $("#index_info").empty();
    $("#index_info").append("<div id='index_info_content'><h4>description</h4></div>");
    $("#index_info_content").append(
      "<p>"+"Name: "+indexesContent[indexIndex].indexName+"</p></div>");

    for(var i=0; i<indexesContent[indexIndex].parameters.length; i++) {
      $("#index_info_content").append(
        "<p>"+"Parameter: "+indexesContent[indexIndex].parameters[i]+"</p></div>");
    }
    createForm(indexesContent[indexIndex], "#index_info_content");
  });
}

var indexesPaginationBehavior = function() {
  var pages = indexesContent.length/indexesPerPage;
  if(pages < 2) return;
  if(pages * indexesPerPage < indexesContent.length) pages++;
  $("#indexes_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#indexes_paginator").append("<div class='pagination-index-tile'><p>"+(i+1)+"</p></div>");
  }

  $(".pagination-index-tile").on('click', function(event) {
    indexesCurrentPage = $(this).index();
    setIndexesPagination();
  });
}

var indexesContentBehavior = function() {

  // $.getJSON("http://156.17.41.238:5000/companies", function(result) {
  //   console.log(result);
  // });

  $.getJSON("http://156.17.41.238:5001/indexes",
    function(result) {
      console.log(result);
      indexesContent = result;
      $("#indexes_container").empty();

      console.log('about to display');
      console.log(indexesContent.length);
      var limiter = Math.min(indexesPerPage, indexesContent.length);
      for(var i = 0; i<limiter; i++) {
        console.log("i: ", i);
        var index = indexesContent[i];
        console.log(JSON.stringify(index));
        $("#indexes_container").append("<div class='index-tile'><p>"+index.indexName+"</p></div>" );
      }
      console.log('displayed');
      indexesTileBehavior();
      indexesPaginationBehavior();
      $(".pagination-index-tile").removeClass('active');
      $(".pagination-index-tile:first").addClass('active');

      $("#indexes_fold_button").click(function() {
        $("#indexes_container").toggle();
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
                   { id: 'index_form' }
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

  $('#index_form').submit(function(event) {
    console.log('clicked on submit'); 
    event.preventDefault();

    var serverUrl = 'http://156.17.41.238:5001/indexes'
    // var serverUrl = 'http://httpbin.org/post';
    
    var $form = $("#index_form");
    var data = getFormData($form);
    var postdata = {
      stockName: companiesContent[currentCompanyIndex],
      indexName: indexesContent[currentIndexIndex].indexName,
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
          displayResult();
        }
    }
    xhr.send(JSON.stringify(postdata));


  });
}
