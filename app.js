app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=query`;

app.fetchShow = (query) => {

 $.ajax({
        url: app.url,
        method: "GET",
        dataType: "json",
        data: {
            dataType: "json",
            q: query
        }
        
    }).then((result) => {
        console.log(result);
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
    


// A button that allows user to start the process, which will navigate them to a search section.
// Listen to the button click event to scroll to Search section.
// Prevent default
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