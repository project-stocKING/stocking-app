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

var usersContent = [];
var perPage = 20;
var currentPage = 0;

$(document).ready(function() {

  userContentBehavior();
  // tileBehavior();
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

var tileBehavior = function() {
  console.log("in tile behavior");
  $(".tile").on('click', function(event) {
    // console.log("clicked on tile");
    $(".tile").removeClass('active');
    $(this).addClass('active');

    var tileIndex = currentPage*perPage + $(this).index();
    console.log("clicked on tile ", tileIndex);

    $("#strategy_info").empty();
    $("#strategy_info").append(
      "<p>"+"Title: " +usersContent[tileIndex].title+"</p>" 
    );
    $("#strategy_info").append(
      "<p>"+"Content: " +usersContent[tileIndex].body+"</p>" 
    );


  });
}

var paginatorBehavior = function() {
  var pages = usersContent.length/perPage;
  if(usersContent.length % perPage !== 0) pages++;
  console.log("For ", usersContent.length,
   "items there will be", pages, "pages");
  $("#strategies_paginator").empty();

  for(var i = 0; i<pages; i++) {
    $("#strategies_paginator").append("<div class='pagination-tile'><p>"+i+"</p></div>");
  }

  $(".pagination-tile").on('click', function(event) {
    $(".pagination-tile").removeClass('active');
    $(this).addClass('active');
    $("#strategies_container").empty();
    currentPage = $(this).index();
    console.log("clicked on page: ", currentPage);

    var paginationStart = currentPage*perPage;
    var paginationEnd = paginationStart+perPage;
    console.log("displaying from ", paginationStart, "to ", paginationEnd);
    for(var i = paginationStart; i<paginationEnd; i++) {
      $("#strategies_container").append("<div class='tile'><p>"+usersContent[i].title+"</p></div>" );
    }
    tileBehavior();
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
      $.getJSON("http://jsonplaceholder.typicode.com/posts",
       function(result) {
        usersContent = result;
        console.log("got result");
        // console.log(JSON.stringify(result, null ,2));
        $("#strategies_container").empty();


        for(var i = 0; i<perPage; i++) {
          $("#strategies_container").append("<div class='tile'><p>"+usersContent[i].title+"</p></div>" );
        }

        tileBehavior();
        paginatorBehavior();
        $(".pagination-tile").removeClass('active');
        $(".pagination-tile:first").addClass('active');
      });
    }

    $(".container-primary").hide();
    $(".container-primary").eq(idx).show();
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
