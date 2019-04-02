$(document).ready(function () {
    //Array of topics
    var topics = ["cats", "dogs", "birds", "fish", "pandas"];

    //Function to display the buttons
    function renderButtons() {
        //Deletes buttons prior to adding new ones, preventing duplicates.
        $(".buttons").empty();
        //Handles adding topic once user inputs something into textbox.
        $("#add-topic").on("click", function (event) {
            event.preventDefault();
            var choice = $("#choice-input").val().trim();
            topics.push(choice);
            renderButtons();
        })
        //Loops through array of topics
        for (var i = 0; i < topics.length; i++) {
            var selector = $("<button>");
            selector.addClass("topic-button btn-lg");
            selector.attr("data-name", topics[i]);
            selector.text(topics[i]);
            $(".buttons").append(selector);
        }
    }

    renderButtons();

    //Event listener to request the gifs once the button is clicked.
    $(".topic-button").on("click", function () {
        var gifTopic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=I3uUEvU4BlcowhufGXlpP2bKhemQ3mvT&limit=10";
        console.log(queryURL);


        //Ajax function to pull the gifs from giphy api
        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            var results = response.data;//shows the results of gifs
            console.log("results = " + results);
            if (results == "") {
                alert("There is no gif available for this button.");
            }
            for (var i = 0; i < results.length; i++) {
                //div to hold gif images
                var gifs = $("<div>");
                gifs.addClass("gifDiv");
                //Adds rating for each gif after the image
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifs.append(gifRating);
                var gifTitle = $("<p>").text("Title: " + results[i].title);
                gifs.append(gifTitle);
                //holds the image of each gif.
                var gifImage = $("<img>");
                var imageURL = results[i].images.fixed_height_still.url;
                var animateURL = results[i].images.fixed_height.url;
                gifImage.attr("src", imageURL);
                gifImage.attr("data-still", imageURL);
                gifImage.attr("data-animate", animateURL);
                gifImage.attr("data-state", "still");
                gifImage.addClass("img");
                gifs.append(gifImage);
                //each gif is added in front of the previous one.
                $(".images").prepend(gifs);
            }

        })
        $(document).on("click", ".img", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });




});