// javascript for all pages
$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.name);

    });

    //Search Button
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        $(".relatedStreams").empty()
        $(".relatedMovies").empty()
       
        //Grabbing the user input
        const searchItem = $("#searchText").val()
        $("#searchText").val("")
        // When Adding Movie to Watchlist
        

        // Ajax call to database to get tv show or movie data
        function streamingData() {

            let Title = searchItem
            Title = Title.replace(/ /g, '+');
            const apiKey = "436032d6749a29a57b3c39ae36df859d"
            const queryUrl = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&page=1&query=" + Title + "&page=1&include_adult=false";


            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (titleData) {
                console.log(titleData)
                titleId = titleData.results[0].id;
                
                $(document).on('click', '.addMovie', function (event) {
                    event.preventDefault()
                    console.log("ADDING NEW MOVIE")
                    newTitle = {
                        title: streamTitle, rating: rating,
                        poster: fullPosterURL, date: releaseDate,
                        media_type: true, stream_url: streamMovieURl()
                    }
                    $.ajax("api/watchlists/", {
                        method: "POST",
                        data: newTitle
                    }).then(function () {
                        console.log("Movie has been added!")
                        window.location = "/watchlist"
                    })
                });
                $(document).on('click', '.addShow', function (event) {
                    event.preventDefault()
        
                    console.log(" ADDING NEW SHOW")
                    newTitle = {
                        title: streamTvTitle, rating: showRating,
                        poster: fullPosterURL, date: firstAirDate,
                        media_type: false, stream_url: streamTvUrl()
                    }
                    $.ajax("api/watchlists/", {
                        method: "POST",
                        data: newTitle
                    }).then(function () {
                        console.log("Show has been added!")
                        window.location = "/watchlist"
                    })
                });
        
                
                
                // Pulling info for searched Movie
                streamTitle = titleData.results[0].original_title;
                rating = titleData.results[0].vote_average;
                mediaType = titleData.results[0].media_type;
                releaseDate = titleData.results[0].release_date;
                poster = titleData.results[0].poster_path
                fullPosterURL = "http://image.tmdb.org/t/p/original" + poster
                // Showing Id of movie and title
                console.log("Movie/Show ID: " + titleId)
                console.log("Searched Movie/Show: " + Title)
                //Pulling info for searched tv
                streamTvTitle = titleData.results[0].original_name;
                showRating = titleData.results[0].vote_average;
                firstAirDate = titleData.results[0].first_air_date;
                // To search where the movie is being streamed.
                
                function streamMovieURl(){
                    var streamTitleNew = streamTitle.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                    var streamMovieUrl = "https://www.justwatch.com/us/movie/" + streamTitleNew;
                    return streamMovieUrl
                };
                function streamTvUrl(){
                    var streamTvTitleNew = streamTvTitle.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                    var streamTvUrl = "https://www.justwatch.com/us/tv-show/" + streamTvTitleNew;
                    return streamTvUrl
                };
                
               
                
                // Adding Searched Movie Card to html page
                function movieStream() {
                    var newDiv = $("<div>")
                    newDiv.addClass("card col")
                    //                     newDiv.attr("style", "width: 40rem")
                    var nextDiv = $("<div>")
                    nextDiv.addClass("card-body")
                    newDiv.append(nextDiv)
                    var newTitle = $("<h3>")
                    newTitle.addClass("card-title")
                    newTitle.attr("id", "movieTitle")
                    newTitle.text("Original Title: " + streamTitle)
                    nextDiv.append(newTitle)
                    var moviePoster = $("<img>")
                    moviePoster.attr("src", "http://image.tmdb.org/t/p/original" + poster)
                    moviePoster.attr("alt", "Movie Poster")
                    newDiv.append(moviePoster)
                    var newReleaseDate = $("<h4>")
                    newReleaseDate.addClass("card-subtitle m-3")
                    newReleaseDate.text("Release Date: " + releaseDate)
                    newReleaseDate.attr("style", "color: white")
                    newDiv.append(newReleaseDate)
                    var newRating = $("<h4>")
                    newRating.addClass("card-text")
                    newRating.text("Rating: " + rating)
                    newDiv.append(newRating)
                    var addWatchList = $("<button>")
                    addWatchList.text("Add To Watchlist")
                    addWatchList.addClass("addMovie")
                    addWatchList.attr("id", "Add1")
                    newDiv.append(addWatchList)
                    $(".streamMovieInfo").html(newDiv)
                }
                // Adding Searched Show Card to html page
                function tvStream() {
                    var tvDiv = $("<div>")
                    tvDiv.addClass("card col")
                    // tvDiv.attr("style", "width: 200rem")
                    var newerDiv = $("<div>")
                    newerDiv.addClass("card-body")
                    tvDiv.append(newerDiv)
                    var tvTitle = $("<h3>")
                    tvTitle.addClass("card-title")
                    tvTitle.text("Show Title: " + streamTvTitle)
                    newerDiv.append(tvTitle)
                    var showPoster = $("<img>")
                    showPoster.attr("src", "http://image.tmdb.org/t/p/original" + poster)
                    showPoster.attr("alt", "Show Poster")
                    tvDiv.append(showPoster)
                    var newfirstAirDate = $("<h4>")
                    newfirstAirDate.addClass("card-subtitle m-3")
                    newfirstAirDate.attr("style", "color: white")
                    newfirstAirDate.text("First Aired: " + firstAirDate)
                    tvDiv.append(newfirstAirDate)
                    var tvRating = $("<h4>")
                    tvRating.addClass("card-text")
                    tvRating.text("Rating: " + showRating)
                    newfirstAirDate.append(tvRating)
                    var addTvWatchList = $("<button>")
                    addTvWatchList.addClass("addShow")
                    addTvWatchList.text("Add To Watchlist")
                    tvDiv.append(addTvWatchList)
                    $(".streamTvInfo").html(tvDiv)
                }
                // Will decide on what search to execute
                if (mediaType === "tv") {
                    tvStream();
                } else {
                    movieStream();
                }

                // Ajax call to get similar movies
                const queryUrl2 = "https://api.themoviedb.org/3/movie/" + titleId + "/similar?api_key=" + apiKey + "&language=en-US&page=1"
                $.ajax({
                    url: queryUrl2,
                    method: "GET"
                }).then(function (similarMovieData) {
                    // variable directly to movie titles 
                    let similarMovies = similarMovieData.results
                    console.log(similarMovies)
                    // loop through the similar movie lsit to display all titles
                    for (var i = 0; i < 3; i++) {
                        var simMovieList = similarMovies[i].original_title;
                        console.log("SIMILAR MOVIE: " + simMovieList)
                    }

                    $(document).on('click', '#1', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM MOVIE-1")
                        newTitle = {
                            title: simMovie1, rating: simRating1,
                            poster: simPoster1, date: simDate1,
                            media_type: true, stream_url: movieUrl1()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })

                    });
                    $(document).on('click', '#2', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM MOVIE-2")
                        newTitle = {
                            title: simMovie2, rating: simRating2,
                            poster: simPoster2, date: simDate2,
                            media_type: true, stream_url: movieUrl2()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })
                    });
                    $(document).on('click', '#3', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM MOVIE-3")
                        newTitle = {
                            title: simMovie3, rating: simRating3,
                            poster: simPoster3, date: simDate3,
                            media_type: true, stream_url: movieUrl3()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })
                    });

                    var simMovie1 = similarMovies[1].original_title
                    var simPoster1 = "http://image.tmdb.org/t/p/original" + similarMovies[1].poster_path
                    var simDate1 = similarMovies[1].release_date
                    var simRating1 = similarMovies[1].vote_average
                    var simMovie2 = similarMovies[2].original_title
                    var simPoster2 = "http://image.tmdb.org/t/p/original" + similarMovies[2].poster_path
                    var simDate2 = similarMovies[2].release_date
                    var simRating2 = similarMovies[2].vote_average
                    var simMovie3 = similarMovies[3].original_title
                    var simPoster3 = "http://image.tmdb.org/t/p/original" + similarMovies[3].poster_path
                    var simDate3 = similarMovies[3].release_date
                    var simRating3 = similarMovies[3].vote_average

                    // Movie stream url
                    function movieUrl1(){
                        var movieTNew1 = simMovie1.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var movieUrl1 = "https://www.justwatch.com/us/movie/" + movieTNew1;
                        return movieUrl1
                    };
                    function movieUrl2(){
                        var movieTNew2 = simMovie2.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var movieUrl2 = "https://www.justwatch.com/us/movie/" + movieTNew2;
                        return movieUrl2
                    };
                    function movieUrl3(){
                        var movieTNew3 = simMovie3.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var movieUrl3 = "https://www.justwatch.com/us/movie/" + movieTNew3;
                        return movieUrl3
                    };
                    

                    //  Adding Sim Searched Movie Card to html page
                    for (var i = 1; i < 4; i++) {
                        var simMovie = $("<div>")
                        simMovie.addClass("card col")
                        //                         simMovie.attr("style", "width: 40rem")
                        var div2 = $("<div>")
                        div2.addClass("card-body")
                        simMovie.append(div2)
                        var simTitle = $("<h3>")
                        simTitle.addClass("card-title")
                        simTitle.text("Movie Title: " + similarMovies[i].original_title)
                        div2.append(simTitle)
                        var simMoviePoster = $("<img>")
                        simMoviePoster.attr("src", "http://image.tmdb.org/t/p/original" + similarMovies[i].poster_path)
                        simMoviePoster.attr("alt", "Movie Poster")
                        simMovie.append(simMoviePoster)
                        var simRelease = $("<h4>")
                        simRelease.addClass("card-subtitle m-3")
                        simRelease.attr("style", "color: white")
                        simRelease.text("Release Date: " + similarMovies[i].release_date)
                        simMovie.append(simRelease)
                        var simRating = $("<h4>")
                        simRating.addClass("card-text")
                        simRating.text("Rating: " + similarMovies[i].vote_average)
                        simRelease.append(simRating)
                        var simButton = $("<button>")
                        simButton.text("Add To Watchlist")
                        simButton.attr("id", [i])
                        simMovie.append(simButton)
                        $(".relatedMovies").append(simMovie)
                    }

                });

                // Ajax call for similar shows
                const queryUrl3 = "https://api.themoviedb.org/3/tv/" + titleId + "/similar?api_key=" + apiKey + "&language=en-US&page=1";
                // Ajax call to similar tv shows
                $.ajax({
                    url: queryUrl3,
                    method: "GET"
                }).then(function (similarShowData) {


                    let similarShows = similarShowData.results

                    // loop through the similar show lsit to display all titles
                    for (var i = 0; i < 3; i++) {
                        var simShowList = similarShows[i].name
                        console.log("SIMILAR TV SHOWS:" + simShowList)
                    }

                    $(document).on('click', '#4', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM SHOW-1")
                        newTitle = {
                            title: simShow1, rating: simShowRating1,
                            poster: simShowPoster1, date: simShowDate1,
                            media_type: false, stream_url: showUrl1()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })
                    });
                    $(document).on('click', '#5', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM SHOW-2")
                        newTitle = {
                            title: simShow2, rating: simShowRating2,
                            poster: simShowPoster2, date: simShowDate2,
                            media_type: false, stream_url: showUrl2()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })
                    });
                    $(document).on('click', '#6', function (event) {
                        event.preventDefault()

                        console.log("ADDING NEW SIM SHOW-3")
                        newTitle = {
                            title: simShow3, rating: simShowRating3,
                            poster: simShowPoster3, date: simShowDate3,
                            media_type: false, stream_url: showUrl3()
                        }
                        $.ajax("api/watchlists/", {
                            method: "POST",
                            data: newTitle
                        }).then(function () {
                            console.log("Movie has been added!")
                            window.location = "/watchlist"
                        })
                    });
                    var simShow1 = similarShows[4].original_name
                    var simShowRating1 = similarShows[4].vote_average
                    var simShowPoster1 = "http://image.tmdb.org/t/p/original" + similarShows[4].poster_path
                    var simShowDate1 = similarShows[4].first_air_date
                    var simShow2 = similarShows[5].original_name
                    var simShowRating2 = similarShows[5].vote_average
                    var simShowPoster2 = "http://image.tmdb.org/t/p/original" + similarShows[5].poster_path
                    var simShowDate2 = similarShows[5].first_air_date
                    var simShow3 = similarShows[6].original_name
                    var simShowRating3 = similarShows[6].vote_average
                    var simShowPoster3 = "http://image.tmdb.org/t/p/original" + similarShows[6].poster_path
                    var simShowDate3 = similarShows[6].first_air_date

                    // Show url for streamed shows

                    function showUrl1(){
                        var showTNew1 = simShow1.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var showUrl1 = "https://www.justwatch.com/us/tv-show" + showTNew1;
                        return showUrl1
                    };
                    function showUrl2(){
                        var showTNew2 = simShow2.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var showUrl2 = "https://www.justwatch.com/us/tv-show/" + showTNew2;
                        return showUrl2
                    };
                    function showUrl3(){
                        var showTNew3 = simShow3.replace(/ /g, "-").replace(/\&/g, "and").replace(/\./g, "").replace(/\'/g, "").replace(/\:/g, "").replace(/\!/g, "").replace(/\?/g, "").replace(/\$/g, "")
                        var showUrl3 = "https://www.justwatch.com/us/tv-show/" + showTNew3;
                        return showUrl3
                    };

                    var showUrl1 = "https://www.justwatch.com/us/tv-show/" + simShow1;
                    var showUrl2 = "https://www.justwatch.com/us/tv-show/" + simShow2;
                    var showUrl3 = "https://www.justwatch.com/us/tv-show/" + simShow3;


                    for (var i = 4; i < 7; i++) {
                        var simShow = $("<div>")
                        simShow.addClass("card col")
                        simShow.attr("style", "d-flex")
                        var div3 = $("<div>")
                        div3.addClass("card-body")
                        simShow.append(div3)
                        var showTitle = $("<h3>")
                        showTitle.addClass("card-title")
                        showTitle.text("Show Title: " + similarShows[i].original_name)
                        div3.append(showTitle)
                        var simShowPoster = $("<img>")
                        simShowPoster.attr("src", "http://image.tmdb.org/t/p/original" + similarShows[i].poster_path)
                        simShowPoster.attr("alt", "Movie Poster")
                        simShow.append(simShowPoster)
                        var firstAired = $("<h4>")
                        firstAired.addClass("card-subtitle m-3")
                        firstAired.attr("style", "color: white")
                        firstAired.text("First Aired: " + similarShows[i].first_air_date)
                        simShow.append(firstAired)
                        var showRating = $("<h4>")
                        showRating.addClass("card-text")
                        showRating.text("Rating: " + similarShows[i].vote_average)
                        firstAired.append(showRating)
                        var showBtn = $("<button>")
                        showBtn.text("Add To Watchlist")
                        showBtn.attr("id", [i])
                        simShow.append(showBtn)
                        $(".relatedStreams").append(simShow)
                    }


                });
            }
            )
        };
        streamingData();
    });
    $(".deleteBtn").on('click', function (event) {
        var id = $(this).data("id");
        event.preventDefault()
        console.log("DELETE")
        $.ajax("api/watchlists/" + id, {
            method: "Delete",
        }).then(function () {
            console.log("Title has been deleted!")
            window.location = "/watchlist"
        })
    });


});

