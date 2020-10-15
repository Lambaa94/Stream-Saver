// javascript for all pages
$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.name);

    });


    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        const searchItem = $("#searchText").val()

        console.log(searchItem)




        // Ajax call to database to get tv show or movie data
        function streamingData() {
            // Hardcoded title of tv shor or movie
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
                streamTitle = titleData.results[0].original_title;
                rating = titleData.results[0].vote_average;
                mediaType = titleData.results[0].media_type;
                releaseDate = titleData.results[0].release_date;
                console.log("Movie/Show ID: " + titleId)
                console.log("Searched Movie/Show: " + Title)
                console.log(titleId)
                console.log(streamTitle)
                console.log(rating)
                console.log(mediaType)
                streamTvTitle = titleData.results[0].original_name;
                showRating = titleData.results[0].vote_average;
                firstAirDate = titleData.results[0].first_air_date;
                console.log(streamTvTitle)
                console.log(showRating)
                console.log(firstAirDate)
                
                
                function movieStream() {    
                var newDiv = $("<div>")
                newDiv.addClass("card")
                newDiv.attr("style", "width: 18rem")
                var nextDiv = $("<div>")
                nextDiv.addClass("card-body")
                newDiv.append(nextDiv)
                var newTitle = $("<h5>")
                newTitle.addClass("card-title")
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
                addWatchList.addClass("addToWatchList")
                newDiv.append(addWatchList)
                $(".streamMovieInfo").prepend(newDiv)
                }
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
                addTvWatchList.addClass("addToWatchList")
                addTvWatchList.text("Add To Watchlist")
                tvDiv.append(addTvWatchList)
                $(".streamTvInfo").prepend(tvDiv)
                }



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

                    // loop through the similar movie lsit to display all titles
                    for (var i = 0; i < 3; i++) {
                        var simMovieList = similarMovies[i].original_title;
                        console.log("SIMILAR MOVIE: " + simMovieList)
                    }


                    //simMovieList variable displayer all titles
                });
                const queryUrl3 = "https://api.themoviedb.org/3/tv/" + titleId + "/similar?api_key=" + apiKey + "&language=en-US&page=1";
                // Ajax call to similar tv shows
                $.ajax({
                    url: queryUrl3,
                    method: "GET"
                }).then(function (similarShowData) {
                    // variable directly to show titles 
                    console.log(similarShowData)
                    let similarShows = similarShowData.results
                    // loop through the similar show lsit to display all titles
                    for (var i = 0; i < 3; i++) {
                        var simShowList = similarShows[i].name
                        console.log("SIMILAR TV SHOWS:" + simShowList)
                    }





                });
            }     //simShowList displays shows
            )
        };
        streamingData();
    });












});

