app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=query`;


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
            $("#start").hide();
            $("header div").addClass("enteredSite")
            // $("header p").addClass("enteredSite p");
            // Call the RandomShow function!
            app.randomShow();
        } else if (button === "search") {
            target = $(".results");
            // Append another batch of shows below current batch
        } else if (button === "randomize") {
            target = $(".randomizeButton");
            app.randomShow();
            $(".more").show();
            // Go back to main section
        } else if (button === "back") {
            target = $("main");
            // Clear all shows on page
        } else if (button === "clear") {
            $(".results").empty();
            $(".randomResults").empty();
            $(".suggestions").hide();
            $(".more").hide();
            $("#clear").hide();
            // !!!!!!! ERROR WITH THIS BUTTON !!!!!!!!!!
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

// Function to display matched result which user looked for on the page
let targetSection;
app.displayMatchedShow = (returnedShow, targetSection) => {
    $(".results").empty();
    targetSection = ".results";
    app.displayShow(returnedShow, targetSection);
}
// Function to display random shows on the page
app.displayShow = (returnedShow, targetSection) => {
    // empty the results container
    let rating;
    let summary;
    let initialSummary = [];

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

    if(targetSection === ".randomResults"){
        const words = summary.split(' ');
        initialSummary.push(words);
        
        if(initialSummary[0].length > 40){
            let shortSummary = initialSummary[0].slice(0, 40);
            shortSummary.push("...");
            summary = shortSummary.join(' ')
        }
    
    }

    const showContainer = `
                <div class="showContainer">
                    <h2 class="searchedTitle">${returnedShow.name}</h2>
                    
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
                </div>
                `;
    // append the results to the results container
     
    $(targetSection).append(showContainer);
}

// Function fetch API using ajax getting back what user search for
app.fetchShow = (query) => {
    $.ajax({
           url: app.url,
           method: "GET",
           dataType: "jsonp",
           data: {
               format: "jsonp",
               q: query
           }
       }).then((result) => {
           app.displayMatchedShow(result, targetSection);
       }).fail((error) => {
           app.displayErrorMessage();
       })
   }

// Function to display random shows when Start button is clicked
app.randomShow = () => {
    targetSection = ".randomResults";
    const randomId = Math.ceil(Math.random() * 250);
       
    // Function to fetch a batch of random shows using random show ID
    app.getRandomShow = (number) => {
        return $.ajax({
            url: `http://api.tvmaze.com/shows/${number}`,
            method: "GET",
            dataType: "jsonp"
        }).then((data) => {
            app.displayShow(data, targetSection);
        })
    }
    
    // Start from the random show ID, get back 9 consecutive shows
    for (let i = randomId; i < randomId + 9; i++) {
        app.getRandomShow(i);
    }
}
// Function to handle error when nothing matched with user input
app.displayErrorMessage = () => {
    const errorMessage = $("<p>").text("There are 0 result matched. Please try again or search for other shows!");
    $(".results").empty().append(errorMessage);
}

app.init = () => {
    app.smoothScroll();
    app.showToLookUp();
}

$(() => {
    app.init();
})