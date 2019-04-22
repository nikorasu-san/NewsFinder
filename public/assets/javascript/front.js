$(document).ready(function () {
    $(".modal").modal();

    // click scrape new articles button/text
    $(document).on("click", ".scrape", function (event) {
        event.preventDefault();
        console.log("clicked scrape")
        $.get("/scrape").then(function (data) {
            console.log(data);
            // empty articles card
            $("#articles").empty();
            // post data in articles card
        })
    })


    // click saved article
    $(document).on("click", ".save", function (event) {
        event.preventDefault();
        console.log("clicked save")
        // take id from button, send to controller
        console.log($(this).data("id"))
        let id = $(this).data("id");
        $.post("/save/" + id, function (data) {
            console.log(data)
            // open message modal
            $(".modal").modal();
            $("#modal-body").empty();
            $("#modal-body").append(`<p class="">${data.message}</p>`);
        })

    })

    // click on remove saved article
    $(document).on("click", ".remove", function (event) {
        event.preventDefault();
        console.log("clicked remove");
        let id = $(this).data("id");
        $.post("/remove/" + id, function (data) {
            console.log(data);
            location.reload();
        });
    })

    // click on add note
    $(document).on("click", ".modal-trigger", function (event) {
        event.preventDefault();
        console.log("clicked modal");
        // empty modal text if any
        $("#title").val("");
        $("#textarea").val("");
        // open message modal
        let articleId = $(this).data("id");
        $("#submit").attr("data-id", articleId);
        $.get("/article/" + articleId).then(function (data) {
            console.log(data);
            // put title and body in form
            $("#title").val(data.note.title);
            $("#textarea").val(data.note.body);
        })

    })

    $(document).on("click", "#submit", function (event) {
        event.preventDefault();
        console.log("clicked submit note");
        // take id and message in body as POST
        let id = $(this).data("id");
        let title = $("#title").val();
        let body = $("#textarea").val();
        // add validation for empty title or body values 
        let note = {
            title: title,
            body: body
        };
        console.log(note);
        $.post("/article/" + id, note, function (data) {
            console.log(data);
            location.reload();

        });
    });


})