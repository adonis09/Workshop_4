$(document).ready(function () {

    var $titles = $('.title');

    $.ajax({
        url: 'http://localhost:8282/books/',
        type: 'GET',
        daraType: 'json'
    }).done(function (result) {
        var $booksList = $('#books-list');
        $.each(result, function (i, book) {
            $booksList.append("<li data-no='" + book.id + "'>" + '<b>' + book.title + '</b>' + '</li><div></div>');

        });

        $booksList.on("click", "li", function () {
            var clickedLi = $(this);
            $.ajax({
                url: "http://localhost:8282/books/" + clickedLi.data("no"),
                contentType: "application/json",
                method: "GET"
            }).done(function (result) {
                clickedLi.next().html(
                    "Author: " + result.author + "<br/>" +
                    "Publisher: " + result.publisher + "<br/>" +
                    "Type: " + result.type + "<br/>" +
                    "ISBN: " + result.isbn + "<br/>" +
                    "ID: " + result.id);

            });

        });

    });

});