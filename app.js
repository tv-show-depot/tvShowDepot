app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=query`;

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
        console.log("ERROR");
    })

}

app.showToLookUp = () => {
    $('.submitButton').on('click', function(e) {   
        e.preventDefault();
        const userInput = $('input').val();
        app.fetchShow(userInput);
    })
}

// Function to display returned result on the page
app.displayMatchedShow = (returnedShow) => {
    $('.results').empty();

    const title = $('<h2>').text(returnedShow.name)
    const image = $('<img>').attr('src',returnedShow.image.original);
    const language = $('<p>').text(`Language: ${returnedShow.language}`);
    const genres = $('<p>').text(`Genres: ${returnedShow.genres}`);
    const rating = $('<p>').text(`Rating: ${returnedShow.rating.average}`);
    const summary = `Summary: ${returnedShow.summary}`;
    const showContainer = $('<div>').append(title, image, language, genres, rating, summary);

    $('.results').append(showContainer);
}
    


// A button that allows user to start the process, which will navigate them to a search section.
// Listen to the button click event to scroll to Search section.
// A search bar and input field so user can type in the show's name
// Create an eventlistener on submit button, prevent default behavior
// Get value from user and store in a variable
// Make API call
// Store returned information in variable
// Append information to the page



app.init = () => {
    app.showToLookUp();
}

$(() => {
    app.init();
})