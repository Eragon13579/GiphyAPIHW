// initial array
var animals = ["Lion", "Tiger", "Bear"];
//function to display
function displayAnimalInfo() {

    //clear container

    $('#animal-view').empty();

    var animal = $(this).attr('data-name');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {


                if (results[i].rating == "r" || results[i].rating == "pg-13") {

                }
                else {


                    console.log(response)



                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var animalImage = $('<img>');

                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('animalImage');


                    $('#animal-view').append(p);
                    $('#animal-view').append(animalImage);





                    // PAUSE / ANIMATE GIFS
                    // loop through all gifs and extract url data
                    // use trim or similar function to add -s to gif url
                    // assign all gifs with data-still -s.gif url  
                    // assign all gifs with data-animate regular.gif url 
                    // display all gifs as paused with -s.gif extension
                    // create toggle pause-animate state when click on animalImage
                }

            }

            $('.animalImage').on('click', function () {
                //STEP ONE: study the html above. Look at all the data attributes. Run the file in the browser. Look at the images. After you fill in steps 1 and 2 you'll be able to pause gifs from giphy.

                //STEP TWO: make a variable named state and then reference the button's data-state into it. Do not use .data('state'). It won't work the way we expect.

                //---------------FILL IN CODE HERE FOR STEP TWO----------------------------
                var state = $(this).attr('data-state');
                console.log(state);
                //----------------------------------------------------

                /*STEP THREE: 
                  * if variable state is equal to 'still' then 
                    * update the src attribute of this image that you clicked on to what data-animate is equal to for this image
                    * and update the data-state attribute to 'animate'
                  * if state does not equal 'still' then 
                    * update the src attribute of this image that you clicked on to what data-still is equal to for this image
                    * and update the data-state attribute to 'still'
            */

                //---------------FILL IN CODE HERE FOR STEP THREE----------------------------
                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
                //----------------------------------------------------

                //STEP FOUR: open the file in the browser and click on the images. Then click again to pause.
            });


        });

}


// ========================================================

// Generic function for displaying animal data 
function renderButtons() {

    // Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
    $('#buttons-view').empty();

    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generates buttons for each animal in the array

        // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('animal'); // Added a class 
        a.addClass("btn btn-success"); // Added a class 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', animals[i]); // Added a data-attribute
        a.text(animals[i]); // Provided the initial button text
        $('#buttons-view').append(a); // Added the button to the HTML
    }
}

// ========================================================
$("form").submit(function (event) {
    event.preventDefault();
    $("#addAnimal").click();
});

// This function handles events where one button is clicked
$('#addAnimal').on('click', function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $('#animal-input').val().trim();

    // The animal from the textbox is then added to our array
    animals.push(animal);

    // Our array then runs which handles the processing of our animal array
    renderButtons();

    $('#animal-input').val('')

})

// ========================================================

// Generic function for displaying the animalInfo
$(document).on('click', '.animal', displayAnimalInfo);


// ========================================================

// This calls the renderButtons() function
renderButtons();
