$(document).ready(function () {

    var $booksList = $('#books-list');
    function loadBooks() {
        $.ajax({
            url: 'http://localhost:8282/books/',
            type: 'GET',
            daraType: 'json'
        }).done(function (result) {
            $.each(result, function (i, book) {
                $booksList.append("<li data-no='" + book.id + "'>" + '<b>' + book.title + '</b>' + '</li><div></div>');
            });

        });
    }

    loadBooks();

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

    var formSubmit = $("#submit");
    formSubmit.on("click", function () {

        var newBook = {"isbn": $("#isbn").val(),
            "title": $("#title").val(),
            "author": $("#author").val(),
            "publisher": $("#publisher").val(),
            "type": $("#type").val() };

        $.ajax({
            url: "http://localhost:8282/books/",
            data: JSON.stringify(newBook),
            contentType: "application/json",
            method: "POST"

        }).done(function () {
            console.log("added new book");
            loadBooks();
        });

    });

});