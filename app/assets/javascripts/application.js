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
//= require components
//= require companies
//= require indexes
//= require calculations
//= require activities
//= require_tree .

var windowWidth = $(window).width();

var companiesContent = [];
var companiesPerPage = Math.ceil(0.9*windowWidth/140) -1;
companiesPerPage *= 2;
var displayedCompaniesPages = [];
var displayedCompaniesPagesCount = 10;
var companiesCurrentPage = 0;
var currentCompanyIndex = 0;

var indexesContent = [];
var indexesPerPage = companiesPerPage;
var indexesCurrentPage = 0;
var currentIndexIndex = 0;

var calculationResult = [];


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

var windowResizeHandler = function() {
  $(window).on('resize', function(){
    console.log("WINDOW RESIZED!!!!");
    windowWidth = $(window).width();
    companiesPerPage = Math.ceil(0.9*windowWidth/140) -1;
    companiesPerPage *= 2;
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

var welcomeContentBehavior = function() {
  $(".container-primary").hide();
  $(".container-primary:first").show();
  companiesContentBehavior();
  indexesContentBehavior();


  $(".section-wrapper").on('click', function(event) {
    console.log("clicked on logo");
    var idx = $(this).attr("index");
    var section_id = $(this).attr("id");
    console.log("CLICKED:", idx);
    console.log("id: ", section_id);

    if(section_id === "strategies_section_button") {
      companiesContentBehavior();
      indexesContentBehavior();
    } else if (section_id === "activity_section_button") {
      activityContentBehavior();
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
