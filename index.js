$(document).ready(function() {
  console.log('Bonnets');
$('#field').focus();


$('#field').keypress(function(e) {
  var key = (event.keyCode ? event.keyCode : event.which);
  if (key == "13") {
    //Upon enter sign, do an equals check
    var input = $('#field').val();
    if(input.indexOf('=') >= 0) {
      console.log(input);
      var reactants = input.split('=')[0];
      var products = input.split('=')[1];

    //Starts reactants check
    if (reactants.indexOf("+") > 0) {
      reactants = reactants.split("+");
    } else {
      reactants = [reactants];
    }
      for(var i = 0; i<reactants.length; i++) {
        reactants[i] = reactants[i].replace(/\s/g,'');
        if (isNaN(reactants[i][0])) {
          reactants[i] = "1" + reactants[i];
        }
      }

    //Starts products check
    if (products.indexOf("+") > 0) {
      products = products.split("+");
    } else {
      products = [products];
    }
      for(var i = 0; i<products.length; i++) {
        products[i] = products[i].replace(/\s/g,'');
        if (isNaN(products[i][0])) {
          products[i] = "1" + products[i];
        }
      }

        //Get The numbersReactants

        const productData = products.map((product, index) => {
          return "";
        });
        const reactantData = reactants.map((reactant, index) => {
          return "";
        });

        console.log("This should come first");

        const getEProducts = new Promise((resolve,  reject) => {
          products.forEach((product, index) => {
            $.getJSON('https://enthalpy-api.herokuapp.com/' + products[index] + '/', (data) => {
            }).then((data) => {
              productData[index] = data;
              if (productData.indexOf("") === -1){
                resolve("Bonnets");
                console.log("Meow");
              }
            });
          });
        });

        const getEReactants = new Promise((resolve, reject) => {
          reactants.forEach((reactant, index) => {
            $.getJSON('https://enthalpy-api.herokuapp.com/' + reactants[index] + '/', (data) => {
            }).then((data) => {
              reactantData[index] = data;
              if(reactantData.indexOf("") === -1) {
                resolve("Bonnets 2");
                console.log("Meow2");
              }
            });
          });
        });


     Promise.all([getEProducts, getEReactants]).then(() => {
       let productSum = 0;
       for (var i = 0; i<productData.length; i++) {
         productSum += productData[i].enthalpy;
       }
       let reactantSum = 0;
       for (var i = 0; i<reactantData.length; i++) {
         reactantSum += reactantData[i].enthalpy;
       }
       let totalSum = productSum - reactantSum
       console.log(productSum - reactantSum);
       $('#title').text(totalSum);
     });


      console.log("These are the reactants(#1) ", reactants);
      console.log("These are the products(#2) ", products);

      }
    }
});
});
