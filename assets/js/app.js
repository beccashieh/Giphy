//Array of topics
var topics = ["cats", "dogs", "birds", "fish", "pandas"];




//Handles adding topic once user inputs something into textbox.
$("#add-topic").on("click", function(event){
    event.preventDefault();
    var choice = $("#choice-input").val().trim();
    topics.push(choice);
    render();
})

//Function to display the buttons
function render (){
    //Deletes buttons prior to adding new ones, preventing duplicates.
    $(".buttons").empty();
    //Loops through array of topics
    for (var i= 0; i < topics.length; i++){
        var selector = $("<button>");
        selector.addClass("topic-button");
        selector.attr("data-name", topics[i]);
        selector.text(topics[i]);
        $(".buttons").append(selector);
}
}

//Event listener to display the gifs once the button is clicked.
$(".topic-button").on("click", function(){
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${topics[i]}&api_key=I3uUEvU4BlcowhufGXlpP2bKhemQ3mvT&limit=10`;
    
    //Ajax function to pull the gifs from giphy api
    $.ajax({
        url: queryURL,
        method: "GET",
      }) .then(function(response){
          var imageURL = response.data.image_original_url;

          //Place to display gifs once retrieved
          var giphyImage = $("<img>");
          giphyImage.attr("src", imageURL);
          giphyImage.attr("alt", topics[i]);
          $(".images").prepend(giphyImage);
      })
});

render();

