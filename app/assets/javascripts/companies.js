//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks
//= require bootstrap-sprockets
//= require components

var companiesContentBehavior = function() {

  $.getJSON("http://156.17.41.238:5001/companies",
   function(result) {
    companiesContent = result;
    console.log(JSON.stringify(companiesContent, null, 2));
    console.log("got result");
    // console.log(JSON.stringify(result, null ,2));
    $("#companies_container").empty();

    var limiter = Math.min(companiesPerPage, companiesContent.length);
    for(var i = 0; i<limiter; i++) {
      $("#companies_container").append("<div class='company-tile'><p>"+companiesContent[i]+"</p></div>" );
    }

    companiesTileBehavior();
    companiesPaginationBehavior();
    $(".pagination-company-tile").removeClass('active');
    $(".pagination-company-tile:first").addClass('active');
    // $("#companies_container").append('<iframe displasy=block width="420" height="315"src="https://www.youtube.com/embed/Osjohw3glPk"></iframe>');

    // $("#companies_fold_button").click(function() {
    //   $("#companies_container").toggle();
    // }); 
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

var companiesPaginationBehavior = function() {
  var pages = companiesContent.length/companiesPerPage;
  if (pages < 2) return;
  if(pages * companiesPerPage < companiesContent.length) pages++;
  // console.log("For ", companiesContent.length,
   // "items there will be", pages, "pages");
  $("#companies_paginator").empty();

  // var pagesStart = Math.max(0, currentCompanyIndex-4);
  // displayedCompaniesPages = [];
  // for(var i = pagesStart; i<pagesStart+displayedCompaniesPagesCount; i++) {
  //   displayedCompaniesPages.push(i);
  // }

  for(var i = 0; i<pages; i++) {
    $("#companies_paginator").append("<div class='pagination-company-tile'><p>"+displayedCompaniesPages[i]+"</p></div>");
  }
  // setStrategiesPagination();

  $(".pagination-company-tile").on('click', function(event) {
    companiesCurrentPage = displayedCompaniesPages[$(this).index()];
    console.log("clicked on page: ", companiesCurrentPage);
    setCompaniesPagination();

  });

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
    // $("#company_info").append("<div id='company_info_content_folder'><button id='company_info_fold_button'>Fold</button></div>");
    // $("#company_info_fold_button").click(function() {
    //   $("#company_info_content").toggle();
    // }); 

    $("#company_info").append("<div id='company_info_content'><h4>description</h4></div>");

    $("#company_info_content").append(
      "<p>"+"Title: " +companiesContent[companyIndex]+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );
    $("#company_info_content").append(
      "<p>"+"Content: " +companiesContent[companyIndex]+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
    );


  });
}
