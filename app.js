app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=query`;

const array = ["show", "another show", "yet another show"]

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
        app.displayShow(result);
    }).fail((error) => {
        app.displayErrorMessage();
    })
}
// Function to display random shows when Start button is pressed
app.randomShow = () => {
    
    $(".results").empty();
    app.getRandomNumber = () => {
        const randomNumber = Math.ceil(Math.random() * 250);
        return randomNumber;
    }
    app.getRandomShow = (number) => {
        return $.ajax({
            url: `http://api.tvmaze.com/shows/${number}`,
            method: "GET",
            dataType: "json"
        }).then((data) => {
            app.displayMatchedShow(data);
        })
    }
    const randomId = app.getRandomNumber();

    for (let i = randomId; i <= randomId + 10 ; i++) {
        app.getRandomShow(i);
    }
}

// Smooth scroll to Search section
app.smoothScroll = () => {
    // onclick event
    $("button").on('click', function(e) {
        e.preventDefault();

        let target;
        // grab id of clicked button
        const button = $(this).attr("id");

        // expression to determine the target of the scroll
        if(button === "start"){
            target = $("main");
            // Call the RandomShow function!
            app.randomShow();
        }else if (button === "search"){
            target = $(".results");
        }

        $("html, body").animate({
            scrollTop: $(target).offset().top}, "slow");
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
app.displayShow = (returnedShow) => {
    // $(".results").empty();
    app.displayMatchedShow(returnedShow);
}
app.displayMatchedShow = (returnedShow) => {
    // empty the results container
   
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
                <h2 class="searchedTitle">${returnedShow.name}</h2>
                <hr class="searchedTitleHr">
                <div class="searchedImage">
                    <img src="${returnedShow.image.original}" alt="">
                </div>
                <div class="searchedInfo">
                    <div class="basicInfo">
                
                            <p>Language: ${returnedShow.language}</p>
                            <p>Rating: ${rating}</p>
                    
                        <p class="genres">Genres: ${returnedShow.genres}</p>
                    </div>
                    <p class="summaryTitle">Summary</p>
                    <hr>
                    <p>${summary}</p>
                </div>
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
    app.smoothScroll();
    app.showToLookUp();
}

$(() => {
    app.init();
})