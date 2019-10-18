$(document).ready(function () {

    var $booksList = $('#books-list');

    function loadBooks() {
        $.ajax({
            url: "http://localhost:8282/books/",
            type: "GET",
            contentType: "application/json"
        }).done(function (result) {
            $booksList.empty();
            $.each(result, function (i, book) {
                $booksList.append("<li data-no='" + book.id + "'>" + '<b>' + book.title + '</b>' +
                    "<button id='" + book.id + "'>delete</button></li><div></div>");
                $('#' + book.id).on('click', function (del) {
                    del.stopPropagation();
                    $.ajax({
                        url: "http://localhost:8282/books/" + book.id,
                        method: "DELETE"
                    }).done(function () {
                        loadBooks();
                    })

                })
            });

        });
    }

    loadBooks();

    var clicksCount = 0;
    $booksList.on("click", "li", function (event) {
        clicksCount++;
        var clickedLi = $(this);
        $.ajax({
            url: "http://localhost:8282/books/" + clickedLi.data("no"),
            contentType: "application/json",
            method: "GET"
        }).done(function (result) {
            if (clicksCount % 2 != 0) {
                clickedLi.next().html(
                    "<form>" +
                    "    <input id=\"id\" type=\"hidden\" value=" + result.id +
                    "    ISBN: <input id=\"isbn\" type=\"number\" value=" + result.isbn + "><br>" +
                    "    Title: <input id=\"title\" type=\"text\" value=" + result.title + "><br>" +
                    "    Author: <input id=\"author\" type=\"text\" value=" + result.author + "><br>" +
                    "    Publisher:<input id=\"publisher\" type=\"text\" value=" + result.publisher + "><br>" +
                    "    Type:<input id=\"type\" type=\"text\" value=" + result.type + "><br>" +
                    "    <input type=\"submit\" value=\"Update book\" id='u" + result.id + "'>" +
                    "</form><br>");

                $('#u' + result.id).on('click', function (update) {
                    console.log("result id: " + result.id);
                    var updateBook = {
                        "id": $("#id").val(),
                        "isbn": $("#isbn").val(),
                        "title": $("#title").val(),
                        "author": $("#author").val(),
                        "publisher": $("#publisher").val(),
                        "type": $("#type").val()
                    };
                    console.log("book object:" + JSON.stringify(updateBook));
                    $.ajax({
                        url: "https://localhost:8282/books/" + result.id,
                        data: JSON.stringify(updateBook),
                        contentType: "application/json",
                        method: "PUT"
                    }).done(function () {
                        loadBooks();
                        console.log('PUT went well!');
                    });
                })

            } else {
                clickedLi.next().empty();
            }

        });

    });

    var formSubmit = $("#submit");
    formSubmit.on("click", function () {

        var newBook = {
            "isbn": $("#isbn").val(),
            "title": $("#title").val(),
            "author": $("#author").val(),
            "publisher": $("#publisher").val(),
            "type": $("#type").val()
        };

        $.ajax({
            url: "http://localhost:8282/books/",
            data: JSON.stringify(newBook),
            contentType: "application/json",
            method: "POST"

        }).done(function () {
            loadBooks();
        });

    });

});