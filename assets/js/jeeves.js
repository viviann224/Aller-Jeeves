
// Edamam API key: f0230ede31a4d5ec34b6d43a4d98c3e2
// Edamam group ID: 8bee9814
// foodtofork: dd38b57cf59482a6f6a4907bfa20c71f
console.log("I'm linked");

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


// function edamamQuery () {
// 	$.ajax({
//     	url: queryURL,
//     	method: "GET"
// 	}).then(function(argument)) {

// 	}
// }
//creates url query

//creates an array of recipe id's that matches with the user input
function foodToForkURL(userinput)
{
    var myURL="http://api.yummly.com/v1/api/recipes?_app_id=87e47442&_app_key=11e4aadcc3dddb10fa26ae2968e1ce03&q="+userinput;
   //creates an empty array to store the recipe id's
   var myArray= [];
   //variable to hold the recipe name in lowercase
    var lowerCheck;
    //calling the ajax class to pass the url, and the
    //GET method to return the myObj object
    $.ajax({
      url:myURL,
      method:"GET"
    //once myString string returns, pass in myString to the next function
    }).then(function(myString)
    {
      console.log(myString.matches[0].ingredients);
      /*
      //convert myString into an object via JSON function
       var newObj =JSON.parse(myString);

       for(var x=0; x<newObj.recipes.length; x++)
       {
        //removing case sensitivy on title of recipe
        lowerCheck=newObj.recipes[x].title.toLowerCase();
         //check the user input against the title if the keyword is the same add to array
          if(lowerCheck.includes(userinput))
          {
            //need to convert object to a string with recipe ID **TO DO
            var strRecId=JSON.stringify(parseInt(newObj.recipes[x].recipe_id));
            myArray.push(strRecId);

          }
       } 
       */
    });
    //returns object array

    return myArray;
}

//once get userinput with the associated array of recipe id's get the ingredient list
function foodToForkDisplayRec(userinput, arrayRec) 
{
  var id;
  console.log(arrayRec.length);
  for(var x=0;x<arrayRec.length; x++)
  {
    id=arrayRec[x];
  var myURL="http://api.yummly.com/v1/api/recipes?_app_id=87e47442&_app_key=11e4aadcc3dddb10fa26ae2968e1ce03&your%20_search_parameters";

  console.log(myURL);
      $.ajax({
      url:myURL,
      method:"GET"
     }).then(function(myString)
    {
        //convert myString into an object via JSON function
        var newObj =JSON.parse(myString);
       
   });

  }
   
}

var arrayRecId= foodToForkURL("chicken");
console.log(arrayRecId);


foodToForkDisplayRec("chicken", arrayRecId);
