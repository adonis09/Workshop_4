$(document).ready(function () {

    var $books = $('#books');

    $.ajax({
        url: 'http://localhost:8282/books/',
        type: 'GET',
        daraType: 'json'
    }).done(function (result) {
        $.each(result, function (i, book) {
            $books.append('<li style="list-style: none">' + book.title + '</li><div></div>');
        });
    });
});