$(document).ready(function () {

    var $booksList = $('#books-list');
    function loadBooks() {
        $.ajax({
            url: 'http://localhost:8282/books/',
            type: 'GET',
            daraType: 'application/json'
        }).done(function (result) {
            $booksList.empty();
            $.each(result, function (i, book) {
                $booksList.append("<li data-no='" + book.id + "'>" + '<b>' + book.title + '</b>' + '</li><div></div>');
            });

        });
    }

    loadBooks();

    var clicksCount = 0;
    $booksList.on("click", "li", function () {
        clicksCount++;
        var clickedLi = $(this);
        $.ajax({
            url: "http://localhost:8282/books/" + clickedLi.data("no"),
            contentType: "application/json",
            method: "GET"
        }).done(function (result) {
            if(clicksCount % 2 != 0){
                clickedLi.next().html(
                    "Author: " + result.author + "<br/>" +
                    "Publisher: " + result.publisher + "<br/>" +
                    "Type: " + result.type + "<br/>" +
                    "ISBN: " + result.isbn + "<br/>" +
                    "ID: " + result.id);
            }else{
                clickedLi.next().empty();
            }


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
            loadBooks();
        });

    });

});