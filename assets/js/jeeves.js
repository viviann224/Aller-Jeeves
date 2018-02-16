// Initialize Firebase
var config = {
  apiKey: "AIzaSyDzH6GmH4AivIfB6ukE5sxHQ6vSPFOlfVQ",
  authDomain: "project-one-80dc8.firebaseapp.com",
  databaseURL: "https://project-one-80dc8.firebaseio.com",
  projectId: "project-one-80dc8",
  storageBucket: "",
  messagingSenderId: "195526743097"
};
firebase.initializeApp(config);

var database = firebase.database();

//=======anime animation====
var boxEnterTimeline = anime.timeline({
  autoplay: true
})
var boxExitTimeline = anime.timeline({
  autoplay: false
})
var bookmarkTimeline = anime.timeline({
  autoplay: true
})
var easing = "linear";

var uSignIn;

var actUser = {};

var actCards = [];

var lookBookmark = false;

bookmarkTimeline
  .add({
    targets: "#bkmkBtn",
    duration: 400,
    backgroundColor: "#CB4E61",
    easing
  })
  .add({
    targets: "#bkmkBtn",
    duration: 400,
    backgroundColor: "#FEFBE0",
    easing
  })

boxEnterTimeline
  .add({
    targets: "#title",
    duration: 1000,
    opacity: "1",
    easing
  })

boxExitTimeline
  .add({
    targets: "#initBox",
    opacity: "0",
    translateX: 200,
    duration: 750,
    easing
  })
  .add({
    targets: ".slate",
    duration: 1000,
    height: 0,
    easing
  }).add({
    targets: ".slate",
    duration: 10,
    translateY: -10000
  });

$(".initSub").click(function(event) {
  event.preventDefault();
  boxExitTimeline.play();
})

// ========conversion table logic====
function convert(a, b, c) {
  console.log(a, b, c)
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var builtString = "https://neutrinoapi.com/convert?from-value=" + a + "&from-type=" + b + "&to-type=" + c + "&userId=PMMIV&apiKey=lxAaqP7fkM6ZjKHg0fnvmkF192s1vmihtuGtY381Ls6xHsNs";
  $.get(proxyUrl + builtString, function(response) {
    var noOutput = response.result
    $('.results').text(a + " " + b + " = " + noOutput + " " + c);
  }).fail(function(error) {
    $('.results').text("I'm sorry. We may have exceeded our conversion limit today.");
  })
};

$('.convertSub').click(function(event) {
  event.preventDefault();
  var noInput = $('#noInput').val();
  var typeInput = $('#typeInput').val();
  var typeOutput = $('#typeOutput').val();
  convert(noInput, typeInput, typeOutput);
});

// List of diet/allergy
// --------------------
// 396^Dairy-Free
// 393^Gluten-Free
// 394^Peanut-Free
// 400^Soy-Free
// 397^Egg-Free
// 401^Sulfite-Free
// 395^Tree Nut-Free
// 390^Pescetarian
// 386^Vegan
// 403^Paleo
// 387^Lacto-ovo vegetarian

//creates an array of recipe id's that matches with the user input
var recipeArray = [];
// create initial array for titles of recipes
var titleArray = [];
// create initial array for image_urls
var imageArray = [];
// create initial array to hold ingredient list
var ingredArray = [];
// create a varaible to store the amount of recipes returned from api
var count = 0;
//starting format for concatination for allergy restrictions
var restrictString = "&allowedAllergy[]=";
//starting format for concatination for diret restrictions
var dietString = "&allowedDiet[]=";
//intital string for allergy
var allergyRequest = "";
//intital string for diet
var dietRequest = "";
//start external url for the recipe
var recipeSource = "https://www.yummly.com/recipe/";

// call function when submit button is pressed
$("#inputBtn, .inputBtn2").on("click", function(event) {
  // prevent page refresh when submit is pressed
  event.preventDefault();

  lookBookmark = false;

  // empty initial array for recipe_ids
  recipeArray = [];
  // empty an initial array to create external link for each recipe
  idArray = [];
  // array to help create animation
  actCards = [];
  // empty initial array for titles of recipes
  titleArray = [];
  // empty initial array for image_urls
  imageArray = [];
  // empty array for the ingredients
  ingredArray = [];
  // create a varaible to store the amount of recipes returned from api
  count = 0;

  //this is to create the filter for the specific diet
  $("input[class=diet]:checked").each(function() {
    //once the user clicks on the submit button, go ahead and check what
    //input has been clicked and concat each diet together
    var restrict = $(this).val().trim();
    dietRequest += (dietString + restrict);
  });
  //this is to create the filter for the specific allergy
  $("input[class=allergy]:checked").each(function() {
    //once the user clicks on the submit button, go ahead and check what
    //input has been clicked and concat each allergy together
    var restrict = $(this).val().trim();
    allergyRequest += (restrictString + restrict);
  });

  //for each food search user input
  $("input[id=foodSearch]:input").each(function() {
    //clears out userinput
    $(".foodSearch").val('');
    //clears out each search
    $(".card").empty();

    // grab user's input value and store in new variable
    var userInput = $(this).val().trim();
    //clears out click option of food search

    //if the user input is not empty
    if (userInput != "") {
      //go ahead and clear out the results to have a new search query
      $(".outputArea").empty();

      // website url for ajax to pull from
      var myURL = "https://api.yummly.com/v1/api/recipes?_app_id=87e47442&_app_key=11e4aadcc3dddb10fa26ae2968e1ce03&q=" + userInput + allergyRequest + dietRequest + "&maxResult=12";


      //calling the ajax class to pass the url, and the
      //GET method to return the myObj object
      $.ajax({
        url: myURL,
        method: "GET"
        //once myObj object returns, pass in myObj to the next function
      }).then(function(myObj) {

        var newObj = myObj.matches;
        //console.log(newObj);

        // set the count value to the count property in the object
        count = newObj.length;

        // initiate a for loop to store recipe_id property and image_url property into their arrays
        for (var i = 0; i < count; i++) {
          recipeArray.push(recipeSource + newObj[i].id);
          idArray.push(newObj[i].id);
          imageArray.push(newObj[i].imageUrlsBySize[90]);
          ingredArray.push(newObj[i].ingredients);
          titleArray.push(newObj[i].recipeName);
        }

        // create a for-loop to pull, resize, and reassign photos back into the imageArray followed by another interation to replace all http with https...so they all match through out page.
        for (var j = 0; j < imageArray.length; j++) {
          imageArray[j] = imageArray[j].toString().replace("s90", "s500");
          imageArray[j] = imageArray[j].toString().replace("http://", "https://");
        }

        // initiate another for loop to create dynamic elements to display properties for each recipe card
        for (var i = 0; i < imageArray.length; i++) {
          // creates the card 
          var cardBody = $("<div class='card'>");
          // creates the front of the card
          var cardFront = $("<div class='front'>");
          // creates the image of the dish
          var cardImage = $("<img class='cardImage'>");
          // creates the title of the recipe
          var cardTitle = $("<h5 class='cardTitle'>");
          // creates the back of the card
          var cardBack = $("<div class='back'>");
          // creates the button for the full recipe
          var recipeLink = $("<a type='button' target='_blank' class='btn outSource'>View More</a>");
          // creates an unorder list
          var cardList = $("<ul class='ingredList'>");
          // creates an list item for each ingredient in property array and appends to the unorder list
          ingredArray[i].forEach(function(item) {
            cardList.append("<li class='listItem'>" + item);
          });
          // attaches the link to the button
          recipeLink.attr("href", recipeArray[i]);
          // attaches button to back of card
          cardBack.append(recipeLink);
          // attaches unorder list to back of card
          cardBack.append(cardList);

          cardBody.append("<button class='btn bookmark' data-cardNo="+i+" data-id="+idArray[i]+"><i class='fas fa-utensils'></i></button>");
          // adds the title of the recipe
          cardTitle.text(titleArray[i]);
          // add the source of the image of the dish
          cardImage.attr("src", imageArray[i]);
          // attaches the image to the front of the card
          cardFront.append(cardImage);
          // attaches the title to the front of the card
          cardFront.append(cardTitle);
          // attaches the front section to the card
          cardBody.append(cardFront);
          // attaches the back to the card
          cardBody.append(cardBack);
          // adds the card to the output area of the HTML
          $(".outputArea").append(cardBody);

          actCards.push(cardBody[0].outerHTML);
        }

      });
    }
    //clears out the user input
    $(".outputArea").empty();
    //clears out userinput
    $(".foodSearch").val('');
    //clears out first userinput
    $("#foodSearch").val('');

  }); 

});
//Event listener in the card area that listens for a click on the card to adds/removes the flip class that has a CSS attribute that cause the card to flip.
$(".outputArea").on("click", ".card", function() {
  $(this).toggleClass("flip");
})

// ============USER AUTHENTICATION============================
var uiConfig = {
  callbacks: {
    signInSuccess: function() {
      return false
    }
  },
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  signInFlow: 'popup'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    actUser = user
    if (user) {
      // show sign out
      $('#signInBtn').css("display", "none");
      $('#bkmkBtn').css("display", "inline");
      $('#signOut').css("display", "inline");
      $('.modal-body').html("<p>You're signed in!</p>")
    } else {
      // show sign in
      $('#signOut').css("display", "none");
      $('#bkmkBtn').css("display", "none");
      $('#signInBtn').css("display", "inline");
    }
    actUser = user;
    if (user) {
      // User is signed in.
      uSignIn = true;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
    } else {
      // User is signed out.
      uSignIn = false;
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});

// sign out button
$('#signOut').click(function() {
  firebase.auth().signOut().then(function() {
    location.reload();
  }, function(error) {
    console.error('Sign Out Error', error);
  });
})


//user clicks a book mark
$(document).on('click', '.bookmark', function () {
  var thisId = this.dataset.id;
  var storeCard = actCards[this.dataset.cardno];
  if (!uSignIn) {
    alert("You must be signed in to use bookmarks.")
  } else{
    if (!lookBookmark) {
      database.ref("/users/" + actUser.uid).once('value').then(function(dataSnapshot){
        var newBkmkCards = dataSnapshot.val();
        for (var key in newBkmkCards) {
          if (newBkmkCards.hasOwnProperty(key) && newBkmkCards[key].storeId == thisId) {
            return
          };
        }
        database.ref("/users/" + actUser.uid).push({
          storeCard: storeCard,
          storeId: thisId
        });
        bookmarkTimeline.restart();
      });
    } else {
      database.ref("/users/" + actUser.uid).once('value').then(function(dataSnapshot){
        var newBkmkCards = dataSnapshot.val();
        for (var key in newBkmkCards) {
          if (newBkmkCards.hasOwnProperty(key) && newBkmkCards[key].storeId == thisId){
            dbRemove(key);
          }
        }
        bmPrint();
      })
    }
  }
});

$('#bkmkBtn').click(function(){
  lookBookmark = true;
  bmPrint() 
})

function bmPrint () {
  bookmarkTimeline.restart();
  $('.outputArea').empty();
  database.ref("/users/" + actUser.uid).once('value').then(function(dataSnapshot){
  var newBkmkCards = dataSnapshot.val();
    for (var key in newBkmkCards) {
        if (newBkmkCards.hasOwnProperty(key)) {
            var newCard = $(newBkmkCards[key].storeCard);
            $(".outputArea").append(newCard);
            $(".bookmark").html("<i class='fas fa-times'></i>");
        }
    }
  }); 
}

function dbRemove (id) {
  database.ref("/users/" + actUser.uid + "/"+ id).remove();
};
