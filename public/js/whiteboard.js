$(document).ready(function () {
    //toggle sidebar
    $('.side-panel-toggle').on('click', function () {
        // $(".sidebar").toggle();
        $('.content').toggleClass('content-is-open');
    });
    //   Toggles the form depending on button clicked.
    
        $("#buttonCreate").click(function () {
            $("#formCreate").toggle();
            $("#formEnter,#formSettings").hide();
        });
   
  
        $("#buttonEnter").click(function () {
            $("#formEnter").toggle();
            $("#formCreate,#formSettings").hide();
        });

 
        $("#buttonSettings").click(function () {
            $("#formSettings").toggle();
            $("#formCreate,#formEnter").hide();
        });


    //hide items with .hoverhide on mouseover
    $('.hoverhide').mouseover(function () {
        $('.hoverhide').fadeOut(750);
    });
});
