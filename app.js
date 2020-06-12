app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=query`;

// Function fetch API using ajax
app.fetchShow = (query) => {
 $.ajax({
        url: app.url,
        method: "GET",
        dataType: "json",
        data: {
            format: "json",
            q: query
        }
    }).then((result) => {
        app.displayMatchedShow(result)
    }).fail((error) => {
        app.displayErrorMessage();
    })
}

// Smooth scroll to Search section
app.startSmoothScroll = () => {
    $("header button").on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("main").offset().top}, "slow");
    })
}
// Smooth scroll to Result section
app.searchSmoothScroll = () => {
    $("main button").on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $(".results").offset().top}, "slow");
    })
}

// Function to get value from user's input and pass in API call to search for that value
app.showToLookUp = () => {
    $(".submitButton").on("click", function(e) {   
        e.preventDefault();
        const userInput = $("input").val();
        $("input").val("");
        app.fetchShow(userInput);
    })
}

// Function to display returned result on the page
app.displayMatchedShow = (returnedShow) => {
    $(".results").empty();
    
    const title = $("<h2>").text(returnedShow.name)
    const image = $("<img>").attr("src", returnedShow.image.original);
    const language = $("<p>").text(`Language: ${returnedShow.language}`);
    const genres = $("<p>").text(`Genres: ${returnedShow.genres}`);
    let rating;
    if (returnedShow.rating.average === null) {
        rating =  $("<p>").text("Rating: N/A");
    } else {
        rating =  $("<p>").text(`Rating: ${returnedShow.rating.average}`);
    };
  
    const summaryTitle = $("<p>").text("Summary").addClass("summaryTitle")
    let summary = $("<p>");
    console.log(summary);
    let hr = $("<hr>");
    if (returnedShow.summary === null) {
        summary.text("Summary There is no description for this show.");
    } else {
        summary.text(`${returnedShow.summary}`);
    };
    const showContainer = $("<div>").append(title, image, language, genres, rating, summaryTitle, hr, `${returnedShow.summary}`);

        
    $(".results").append(showContainer);


}


// Function to handle error when nothing matched with user input
app.displayErrorMessage = () => {
    const errorMessage = $("<h2>").text("There are 0 result matched. Please try again or search for other shows!");
    $(".results").empty().append(errorMessage);
}
    

app.init = () => {
    app.startSmoothScroll();
    app.searchSmoothScroll();
    app.showToLookUp();
}

$(() => {
    app.init();
})