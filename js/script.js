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
                    "    <input id=\"update_id\" type=\"hidden\" value=\"" + result.id + "\">" +
                    "    ISBN: <input id=\"update_isbn\" type=\"number\" value=\"" + result.isbn + "\"><br>" +
                    "    Title: <input id=\"update_title\" type=\"text\" value=\"" + result.title + "\"><br>" +
                    "    Author: <input id=\"update_author\" type=\"text\" value=\"" + result.author + "\"><br>" +
                    "    Publisher:<input id=\"update_publisher\" type=\"text\" value=\"" + result.publisher + "\"><br>" +
                    "    Type:<input id=\"update_type\" type=\"text\" value=\"" + result.type + "\"><br>" +
                    "    <input type=\"submit\" value=\"Update book\" id='update" + result.id + "'>" +
                    "</form><br>");

                $('#update' + result.id).on('click', function (update) {

                    console.log("result id: " + result.id);
                    var updateBook = {
                        "id": $("#update_id").val(),
                        "isbn": $("#update_isbn").val(),
                        "title": $("#update_title").val(),
                        "author": $("#update_author").val(),
                        "publisher": $("#update_publisher").val(),
                        "type": $("#update_type").val()
                    };

                    console.log("book object:" + JSON.stringify(updateBook));
                    $.ajax({
                        url: "http://localhost:8282/books/" + result.id,
                        data: JSON.stringify(updateBook),
                        contentType: "application/json",
                        method: "PUT"
                    }).done(function () {
                        console.log('PUT went well!');
                        loadBooks();
                    });

                    update.preventDefault();

                })

            } else {
                clickedLi.next().empty();
            }

        });

    });

    var formSubmit = $("#create_submit");
    formSubmit.on("click", function (submit) {

        var newBook = {
            "isbn": $("#create_isbn").val(),
            "title": $("#create_title").val(),
            "author": $("#create_author").val(),
            "publisher": $("#create_publisher").val(),
            "type": $("#create_type").val()
        };

        console.log(newBook);

        $.ajax({
            url: "http://localhost:8282/books/",
            data: JSON.stringify(newBook),
            contentType: "application/json",
            method: "POST"

        }).done(function () {
            loadBooks();
            console.log("POST went well!")
        });

        submit.preventDefault();

    });

});