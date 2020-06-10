app = {};

app.url = ` http://api.tvmaze.com/singlesearch/shows?q=frasier`

app.fetchShow = () => {

    $.ajax({
        url: app.url,
        method: "GET",
        dataType: "json"
    }).then((result) => {
        console.log(result);
    })
}

app.init = () => {
    app.fetchShow();
}

$(() => {
    app.init();
})