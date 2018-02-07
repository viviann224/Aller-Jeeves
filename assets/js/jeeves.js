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

// conversion table logic
function convert (a, b, c) {
  console.log(a, b, c)
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var builtString = "https://neutrinoapi.com/convert?from-value="+a+"&from-type="+b+"&to-type="+c+"&userId=PMMIV&apiKey=lxAaqP7fkM6ZjKHg0fnvmkF192s1vmihtuGtY381Ls6xHsNs";
  console.log(builtString);
  $.get(proxyUrl + builtString, function(response) {
    console.log(response);
    var noOutput = response.result
    $('.results').text(a + " " + b + " = " + noOutput + " " + c);
  }).fail(function(error){
    console.log(error);
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

//creates an array of recipe id's that matches with the user input
function foodToForkURL(userinput)
{
  //yummily key
  var apiKey="11e4aadcc3dddb10fa26ae2968e1ce03";
  //yumily app id
  var appid="87e47442";
  //url creation
  var myURL="http://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+apiKey+"&q="+userinput;
  //creates an empty array to store recipe title
   var myTitle= [];
   var myRecURL= [];
   var myRecImg =[];
   //variable to hold the recipe name in lowercase
    var lowerCheck;
    //string to change imge
    var temp;

    
    //calling the ajax class to pass the url, and the
    //GET method to return the myObj object
    $.ajax({
      url:myURL,
      method:"GET"
    }).then(function(myObj)
    {
        //creates size variable for each search
        var size =myObj.matches.length;
        for(var x=0; x<size; x++)
        {
          //fix case sensitivity to compare with title
          lowerCheck= myObj.matches[x].id.toLowerCase()
          console.log(lowerCheck);
          console.log(lowerCheck.includes(userinput));
          //if title contains user input create an array to store the recipe, image, and url
          if(lowerCheck.includes(userinput))
          {
            //make title array
            myTitle.push(myObj.matches[x].id);
            //make url array
            myRecURL.push("https://www.yummly.com/recipe/"+myObj.matches[x].id);
            //makes resized image from image object 
            temp= JSON.stringify(myObj.matches[x].imageUrlsBySize[90]);
            console.log(typeof(temp));
            temp=temp.replace("s90", "s500");
            console.log("change size: "+temp);
            //stores a string of url address
            myRecImg.push(temp);
            $(".container").append("<img src="+myRecImg[x]+" id='yumImg'>;");
          }

        }
        console.log(myTitle);
        console.log(myRecURL);
        console.log(myRecImg);
    });
}

//once get userinput with the associated array of recipe id's get the ingredient list
function foodToForkDisplayRec(userinput, arrayRec) 
{}

// var arrayRecId= foodToForkURL("chicken");