$(document).ready(function () {
    //toggle sidebar
    $('.side-panel-toggle').on('click', function () {
        // $(".sidebar").toggle();
        $('.content').toggleClass('content-is-open');
    });

    //hide items with .hoverhide on mouseover
    $('.hoverhide').mouseover(function () {
            $('.hoverhide').fadeOut(750);
    });
});
