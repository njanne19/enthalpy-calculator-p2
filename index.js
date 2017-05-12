$(document).ready(function() {
  console.log('Bonnets');
$('#field').focus();


$('#field').keypress(function(e) {
  var key = (event.keyCode ? event.keyCode : event.which);
  var numbersReactants = [];
  var numbersProducts = [];
  if (key == "13") {
    //Upon enter sign, do a equals check
    var input = $('#field').val();
    if(input.indexOf('=') >= 0) {
      console.log(input);
      var reactants = input.split('=')[0];
      var products = input.split('=')[1];

    //Starts reactants check
    if (reactants.indexOf("+") > 0) {
      reactants = reactants.split("+");
      for(var i = 0; i<reactants.length; i++) {
        reactants[i] = reactants[i].replace(/\s/g,'');
        if (isNaN(reactants[i][0])) {
          reactants[i] = "1" + reactants[i];
        }
      }
      // Gets numbers

        for (var i = 0; i<reactants.length; i++) {
          $.getJSON("https://enthalpy-api.herokuapp.com/" + reactants[i] + '/', function(result) {
            numbersReactants.push(result);
          });
        }

        console.log(numbersReactants);

      console.log(reactants);
    }

    //Starts products check
    if (products.indexOf("+") > 0) {
      products = products.split("+");
      for(var i = 0; i<products.length; i++) {
        products[i] = products[i].replace(/\s/g,'');
        if (isNaN(products[i][0])) {
          products[i] = "1" + products[i];
        }
      }

      //Gets products numbers

      for (var i = 0; i<products.length; i++) {
        $.getJSON("https://enthalpy-api.herokuapp.com/" + products[i] + '/', function(result) {
          numbersProducts.push(result);
        });
      }

      console.log(numbersProducts);

      console.log(products);
    }

    }

  }
});



});
