// spy scroll motion in bootstrap
var appMaster = {

    scrollMenu: function(){
        var num = 100; //number of pixels before modifying styles

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');
            } else {
                $('nav').removeClass('scrolled');
            }
        });
    }
};

$(document).ready(function() {

    appMaster.scrollMenu();
});

$(document).ready(function() {

});


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
}

// search function
function searchProduct() {
    var searchText = document.getElementById('search').value;
    // alert(searchText);
    window.location.href='#/product/all?search=' + searchText;
    document.getElementById('search').value = '';
}


// updating rating
function handleRadio() {
  var radios = document.getElementsByName('rating');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      $("[data-toggle=popover]").text("Rated: " + radios[i].value)
      break;
    }
  }

}
