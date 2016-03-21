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

$(document).ready(function() {

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

});

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
}

// $(".general-list li").on('click', function(event) {

// });


// $(document).on('click', ".general-list ul li", function(event) {

//   console.log("clicked item");


//   if(this === document.getElementById("account_details_button")) {
//    document.getElementById("account_details").style.display = "inline-block";
//    document.getElementById("companies_details").style.display = "none";
//    document.getElementById("strategies_details").style.display = "none";
//   } else if (this === document.getElementById("companies_details_button")) {
//     document.getElementById("account_details").style.display = "none";
//     document.getElementById("companies_details").style.display = "inline-block";
//     document.getElementById("strategies_details").style.display = "none";
//   } else if (this === document.getElementById("strategies_details_button")) {
//     document.getElementById("account_details").style.display = "none";
//     document.getElementById("companies_details").style.display = "none";
//     document.getElementById("strategies_details").style.display = "inline-block";
//   }

// });