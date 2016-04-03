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
//= require turbolinks
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require components
//= require_tree .
//assuming this comes from an ajax call

var companiesContent = [];
var companiesPerPage = 18;
var companiesCurrentPage = 0;
var currentCompanyIndex = 0;

var indexesContent = [];
var indexesPerPage = 10;
var indexesCurrentPage = 0;
var currentIndexIndex = 0;

$(document).ready(function() {

  userContentBehavior();
  welcomeContentBehavior();

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

var strategiesTileBehavior = function() {

  console.log("in strategy-tile behavior");
  $(".strategy-tile").on('click', function(event) {
    // console.log("clicked on strategy-tile");
    $(".strategy-tile").removeClass('active');
    $(this).addClass('active');

    var strategyIndex = companiesCurrentPage*companiesPerPage + $(this).index();
    currentCompanyIndex = strategyIndex;
    console.log("clicked on strategy-tile ", strategyIndex);

    $("#strategy_info").empty();
    $("#strategy_info").append("<div id='strategy_info_content'><h4>description</h4></div>");

    $("#strategy_info_content").append(
      "<p>"+"Title: " +companiesContent[strategyIndex].title+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );
    $("#strategy_info_content").append(
      "<p>"+"Content: " +companiesContent[strategyIndex].body+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );


  });
}



var indexesTileBehavior = function() {

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
      "<p>"+"Id: "+indexesContent[indexIndex].id+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );

    $("#index_info_content").append(
      "<p>"+"Title: "+indexesContent[indexIndex].title+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );

  });
}


var strategiesPaginatorBehavior = function() {
  var pages = companiesContent.length/companiesPerPage;
  if(pages * companiesPerPage < companiesContent.length) pages++;
  console.log("For ", companiesContent.length,
   "items there will be", pages, "pages");
  $("#strategies_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#strategies_paginator").append("<div class='pagination-strategy-tile'><p>"+(i+1)+"</p></div>");
  }

  $(".pagination-strategy-tile").on('click', function(event) {
    $(".pagination-strategy-tile").removeClass('active');
    $(this).addClass('active');
    $("#strategies_container").empty();
    companiesCurrentPage = $(this).index();
    console.log("clicked on page: ", companiesCurrentPage);

    var paginationStart = companiesCurrentPage*companiesPerPage;
    var paginationEnd = paginationStart+companiesPerPage;
    console.log("displaying from ", paginationStart, "to ", paginationEnd);
    for(var i = paginationStart; i<paginationEnd; i++) {
      $("#strategies_container").append("<div class='strategy-tile'><p>"+companiesContent[i].title+"</p></div>"); 
    }
    strategiesTileBehavior();
  });

}

var indexesPaginationBehavior = function() {
  var pages = indexesContent.length/indexesPerPage;
  if(pages * indexesPerPage < indexesContent.length) pages++;
  $("#indexes_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#indexes_paginator").append("<div class='pagination-index-tile'><p>"+(i+1)+"</p></div>");
  }

  $(".pagination-index-tile").on('click', function(event) {
    $(".pagination-index-tile").removeClass('active');
    $(this).addClass('active');
    $("#indexes_container").empty();
    indexesCurrentPage = $(this).index();

    var paginationStart = indexesCurrentPage * indexesPerPage;
    var paginationEnd = paginationStart + indexesPerPage;

    for(var i = paginationStart; i<paginationEnd; i++) {
      $("#indexes_container").append("<div class='index-tile'><p>"+indexesContent[i].id+"</p></div>" );
    }

    indexesTileBehavior();
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
      strategiesContentBehavior();
      indexesContentBehavior();
    }

    $(".container-primary").hide();
    $(".container-primary").eq(idx).show();
  });
}

var strategiesContentBehavior = function() {
  $.getJSON("http://jsonplaceholder.typicode.com/posts",
   function(result) {
    companiesContent = result;
    console.log("got result");
    // console.log(JSON.stringify(result, null ,2));
    $("#strategies_container").empty();


    for(var i = 0; i<companiesPerPage; i++) {
      $("#strategies_container").append("<div class='strategy-tile'><p>"+companiesContent[i].title+"</p></div>" );
    }

    strategiesTileBehavior();
    strategiesPaginatorBehavior();
    $(".pagination-strategy-tile").removeClass('active');
    $(".pagination-strategy-tile:first").addClass('active');
  });
}

var indexesContentBehavior = function() {
  $.getJSON("http://jsonplaceholder.typicode.com/todos",
    function(result) {
      indexesContent = result;
      $("#indexes_container").empty();

      for(var i = 0; i<indexesPerPage; i++) {
        $("#indexes_container").append("<div class='index-tile'><p>"+indexesContent[i].id+"</p></div>" );
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
