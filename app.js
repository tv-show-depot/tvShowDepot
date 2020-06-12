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

// Function to display returned result on the pag
app.displayMatchedShow = (returnedShow) => {
    // empty the results container
    $(".results").empty();

    let rating;
    let summary;

    if (returnedShow.rating.average === null) {
        rating = "Rating: N/A";
    } else {
        rating = returnedShow.rating.average;
    };

    if(returnedShow.summary === null){
        summary = "There is no summary for this show."
    } else {
        summary = returnedShow.summary;
    }

    const showContainer = `
                <h2>${returnedShow.name}</h2>
                <img src="${returnedShow.image.original}" alt="">
                <p>Language: ${returnedShow.language}</p>
                <p>Genres: ${returnedShow.genres}</p>
                <p>Rating: ${rating}</p>
                <p>Summary</p>
                <p>${summary}</p>
                `
    // append the results to the results container
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