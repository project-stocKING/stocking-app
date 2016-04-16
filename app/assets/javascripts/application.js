// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require components
//= require_tree .

var companiesContent = [];

var windowWidth = $(window).width();
var companiesPerPage = Math.ceil(0.9*windowWidth/140) -1;
companiesPerPage *= 3;

var companiesCurrentPage = 0;
var currentCompanyIndex = 0;

var indexesContent = [];
var indexesPerPage = companiesPerPage;
var indexesCurrentPage = 0;
var currentIndexIndex = 0;

var calculationResult = [];

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).ready(function() {

  userContentBehavior();
  welcomeContentBehavior();
  windowResizeHandler();

  $.datepicker.setDefaults(
    $.extend( $.datepicker.regional[ '' ] )
  );

  if(document.getElementById("title")===null) {
    document.getElementById("aboutTab").style.display = "none";
    document.getElementById("servicesTab").style.display = "none";
    console.log("on other page");
  }else {
    console.log("on main page")
    document.getElementById("aboutTab").style.display = "inline";
    document.getElementById("servicesTab").style.display = "inline";
  }

  window.onscroll = function(ev) {
    if(document.getElementById("title")===null) return;

    if (window.scrollY >= 50) {
      document.getElementById("myNavbar").style.backgroundColor = "#003D6F";
      document.getElementById("myNavbar").style.backgroundImage = "none";
      console.log("window scrolled");
    } else {
      console.log("returned to top");
      document.getElementById("myNavbar").style.background = "none";
    }
  };

});

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

    var serverUrl = 'http://156.17.41.238:5000/indexes'
    // var serverUrl = 'http://httpbin.org/post';
    
    var $form = $("#index_form");
    var data = getFormData($form);
    console.log(JSON.stringify(data, null, 2));
    var postdata = {
      stockName: companiesContent[currentCompanyIndex],
      indexName: indexesContent[currentIndexIndex].indexName,
      parameters: data
    }
    // console.log(JSON.stringify(postdata));

    // $.post(serverUrl, {
    //   data: JSON.stringify(postdata),
    //   contentType: "application/json",
    //   crossDomain: true,
    //   dataType: "json"

    // }).done(function(res) {
    //   console.log(JSON.stringify(res, null, 2));
    //   calculationResult = res;
    //   displayResult();
    // }).fail(function(res) {
    //   console.log(JSON.stringify(res));
    // });

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

var windowResizeHandler = function() {
  $(window).on('resize', function(){
    console.log("WINDOW RESIZED!!!!");
    windowWidth = $(window).width();
    companiesPerPage = Math.ceil(0.9*windowWidth/140) -1;
    companiesPerPage *= 3;
    console.log("current company: ", currentCompanyIndex);
    companiesCurrentPage = Math.max(Math.ceil(currentCompanyIndex/companiesPerPage)-1, 0);

    companiesPaginationBehavior();
    setCompaniesPagination();

    indexesPerPage = companiesPerPage;
    indexesCurrentPage = Math.max(Math.ceil(currentIndexIndex/indexesPerPage)-1, 0);

    indexesPaginationBehavior();
    setIndexesPagination();

  });
}

var setCompaniesPagination = function() {

  $(".pagination-company-tile").removeClass('active');
  $(".pagination-company-tile").eq(companiesCurrentPage).addClass('active');

  var paginationStart = companiesCurrentPage*companiesPerPage;
  var paginationEnd = paginationStart+companiesPerPage;
  if (paginationEnd >= companiesContent.length) paginationEnd = companiesContent.length-1;
  $("#companies_container").empty();

  for(var i = paginationStart; i<paginationEnd; i++) {
    $("#companies_container").append("<div class='company-tile'><p>"+companiesContent[i]+"</p></div>"); 
  }
  companiesTileBehavior();
}

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

var companiesTileBehavior = function() {

  if (currentCompanyIndex >= companiesCurrentPage*companiesPerPage 
    && currentCompanyIndex < (companiesCurrentPage+1)*companiesPerPage ) {
    $(".company-tile").eq(currentCompanyIndex%companiesPerPage).addClass('active');
  }

  console.log("in company-tile behavior");
  $(".company-tile").on('click', function(event) {
    // console.log("clicked on strategy-tile");
    $(".company-tile").removeClass('active');
    $(this).addClass('active');

    var companyIndex = companiesCurrentPage*companiesPerPage + $(this).index();
    currentCompanyIndex = companyIndex;
    console.log("clicked on company-tile ", companyIndex);

    $("#company_info").empty();
    $("#company_info").append("<div id='company_info_content'><h4>description</h4></div>");

    $("#company_info_content").append(
      "<p>"+"Title: " +companiesContent[companyIndex]+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );
    $("#company_info_content").append(
      "<p>"+"Content: " +companiesContent[companyIndex]+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );


  });
}

var displayResult = function() {

  $("#result_info").empty();
  $("#result_info").append("<div id='result_info_content'><h4>results</h4></div>");
  for(var i = 0; i<calculationResult.length; i++) {
    var res = calculationResult[i];
    $("#result_info_content").append('<div padding="20px 20px"></div>');
    $("#result_info_content").append("<p> Operation: "+res.result.name +"</p>");
    $("#result_info_content").append("<p> Index: "+res.indexName +"</p>");
    $("#result_info_content").append("<p> Date: "+res.date +"</p>");
  }
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

var companiesPaginationBehavior = function() {
  var pages = companiesContent.length/companiesPerPage;
  if(pages * companiesPerPage < companiesContent.length) pages++;
  console.log("For ", companiesContent.length,
   "items there will be", pages, "pages");
  $("#companies_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#companies_paginator").append("<div class='pagination-company-tile'><p>"+(i+1)+"</p></div>");
  }
  // setStrategiesPagination();

  $(".pagination-company-tile").on('click', function(event) {
    companiesCurrentPage = $(this).index();
    console.log("clicked on page: ", companiesCurrentPage);
    setCompaniesPagination();

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

var welcomeContentBehavior = function() {
  $(".container-primary").hide();
  $(".container-primary:first").show();

  $(".section-wrapper").on('click', function(event) {
    console.log("clicked on logo");
    var idx = $(this).attr("index");
    var section_id = $(this).attr("id");
    console.log("CLICKED:", idx);
    console.log("id: ", section_id);

    if(section_id === "strategies_section_button") {
      companiesContentBehavior();
      indexesContentBehavior();
    }

    $(".container-primary").hide();
    $(".container-primary").eq(idx).show();
  });
}

var companiesContentBehavior = function() {


  $.getJSON("http://156.17.41.238:5001/companies",
   function(result) {
    companiesContent = result;
    console.log("got result");
    // console.log(JSON.stringify(result, null ,2));
    $("#companies_container").empty();

    for(var i = 0; i<companiesPerPage; i++) {
      $("#companies_container").append("<div class='company-tile'><p>"+companiesContent[i]+"</p></div>" );
    }

    companiesTileBehavior();
    companiesPaginationBehavior();
    $(".pagination-company-tile").removeClass('active');
    $(".pagination-company-tile:first").addClass('active');
    // $("#companies_container").append('<iframe display=block width="420" height="315"src="https://www.youtube.com/embed/Osjohw3glPk"></iframe>');

  });

}

var indexesContentBehavior = function() {

  // $.getJSON("http://156.17.41.238:5000/companies", function(result) {
  //   console.log(result);
  // });

  $.getJSON("http://156.17.41.238:5001/indexes",
    function(result) {
      // console.log(result);
      indexesContent = result;
      $("#indexes_container").empty();

      var limiter = Math.min(indexesPerPage, indexesContent.length);
      for(var i = 0; i<limiter; i++) {
        var index = indexesContent[i];
        console.log(JSON.stringify(index));
        $("#indexes_container").append("<div class='index-tile'><p>"+index.indexName+"</p></div>" );
      }

      indexesTileBehavior();
      indexesPaginationBehavior();
      $(".pagination-index-tile").removeClass('active');
      $(".pagination-index-tile:first").addClass('active');
    });

}

var userContentBehavior = function() {
  $(".user-content").hide();
  $(".user-content:first").show();

  // $(".user-content:first").css("display", "inline-block");

  $(".general-list li").removeClass('active');
  $(".general-list li:first-child").addClass('active');

  $(".general-list li").on('click', function(event) {
    $(".general-list li").removeClass('active');
    $(this).addClass('active');
    var idx = $(this).index();

    console.log(idx);
    $(".user-content").hide();
    $(".user-content:nth-child("+(idx+2)+")").show();
  });
}

$(document).on('click', ".navbar a:not('#logo'), footer a[href='#myPage']", function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
});


$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
    }
  });
});


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
