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

        // When Adding Movie to Watchlist
        $(document).on('click', '.addMovie', function(event){
            event.preventDefault()
            console.log("ADDING NEW MOVIE")
            newTitle = {title: streamTitle, rating: rating,
            poster: poster, date: releaseDate }
            $.ajax("api/watchlists/", {
                method: "POST",
                data: newTitle
            }).then(function() {
                console.log("Movie has been added!")
                window.location = "/watchlist"
            })
          });
          $(document).on('click', '.addShow', function(event){
            event.preventDefault()
            
            console.log(" ADDING NEW SHOW")
          });
          $(document).on('click', '#1', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM MOVIE-1")
          });
          $(document).on('click', '#2', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM MOVIE-2")
          });
          $(document).on('click', '#3', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM MOVIE-3")
          });
          $(document).on('click', '#4', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM SHOW-1")
          });
          $(document).on('click', '#5', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM SHOW-2")
          });
          $(document).on('click', '#6', function(event){
            event.preventDefault()
            
            console.log("ADDING NEW SIM SHOW-3")
          });

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
                // Pulling info for searched Movie
                streamTitle = titleData.results[0].original_title;
                rating = titleData.results[0].vote_average;
                mediaType = titleData.results[0].media_type;
                releaseDate = titleData.results[0].release_date;
                poster = titleData.results[0].poster
                // Showing Id of movie and title
                console.log("Movie/Show ID: " + titleId)
                console.log("Searched Movie/Show: " + Title)
                //Pulling info for searched tv
                streamTvTitle = titleData.results[0].original_name;
                showRating = titleData.results[0].vote_average;
                firstAirDate = titleData.results[0].first_air_date;
                
                // Adding Searched Movie Card to html page
                function movieStream() {    
                var newDiv = $("<div>")
                newDiv.addClass("card")
                newDiv.attr("style", "width: 18rem")
                var nextDiv = $("<div>")
                nextDiv.addClass("card-body")
                newDiv.append(nextDiv)
                var newTitle = $("<h5>")
                newTitle.addClass("card-title")
                newTitle.attr("id", "movieTitle")
                newTitle.text("Movie Title: " + streamTitle)
                nextDiv.append(newTitle)
                var newReleaseDate = $("<h6>")
                newReleaseDate.addClass("card-subtitle mb-2 text-muted")
                newReleaseDate.text("Release Date: " + releaseDate)
                newTitle.append(newReleaseDate)
                var newRating = $("<p>")
                newRating.addClass("card-text")
                newRating.text("Rating: " + rating)
                newReleaseDate.append(newRating)
                var addWatchList = $("<button>")
                addWatchList.text("Add To Watchlist")
                addWatchList.addClass("addMovie")
                addWatchList.attr("id", "Add1")
                newDiv.append(addWatchList)
                $(".streamMovieInfo").html(newDiv)
                }
                // Adding Searched Show Card to html page
                function tvStream(){
                var tvDiv = $("<div>")
                tvDiv.addClass("card")
                tvDiv.attr("style", "width: 18rem")
                var newerDiv = $("<div>")
                newerDiv.addClass("card-body")
                tvDiv.append(newerDiv)
                var tvTitle = $("<h5>")
                tvTitle.addClass("card-title")
                tvTitle.text("Show Title: " + streamTvTitle)
                newerDiv.append(tvTitle)
                var newfirstAirDate = $("<h6>")
                newfirstAirDate.addClass("card-subtitle mb-2 text-muted")
                newfirstAirDate.text("First Aired: " + firstAirDate)
                tvTitle.append(newfirstAirDate)
                var tvRating = $("<p>")
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
                if (mediaType === "tv"){
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
                    
            //  Adding Sim Searched Movie Card to html page
                    for (var i = 1; i < 4; i++) {
                    var simMovie = $("<div>")
                    simMovie.addClass("card")
                    simMovie.attr("style", "width: 18rem")
                    var div2 = $("<div>")
                    div2.addClass("card-body")
                    simMovie.append(div2)
                    var simTitle = $("<h5>")
                    simTitle.addClass("card-title")
                    simTitle.text("Movie Title: " + similarMovies[i].original_title)
                    div2.append(simTitle)
                    var simRelease = $("<h6>")
                    simRelease.addClass("card-subtitle mb-2 text-muted")
                    simRelease.text("Release Date: " + similarMovies[i].release_date)
                    simTitle.append(simRelease)
                    var simRating = $("<p>")
                    simRating.addClass("card-text")
                    simRating.text("Rating: " + similarMovies[i].vote_average)
                    simRelease.append(simRating)
                    var simButton = $("<button>")
                    simButton.text("Add To Watchlist")
                    simButton.attr("id",[i])
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

                    for (var i = 4; i < 7; i++) {
                        var simShow = $("<div>")
                        simShow.addClass("card")
                        simShow.attr("style", "width: 18rem")
                        var div3 = $("<div>")
                        div3.addClass("card-body")
                        simShow.append(div3)
                        var showTitle = $("<h5>")
                        showTitle.addClass("card-title")
                        showTitle.text("Show Title: " + similarShows[i].original_name)
                        div3.append(showTitle)
                        var firstAired = $("<h6>")
                        firstAired.addClass("card-subtitle mb-2 text-muted")
                        firstAired.text("Release Date: " + similarShows[i].first_air_date)
                        showTitle.append(firstAired)
                        var showRating = $("<p>")
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



});

