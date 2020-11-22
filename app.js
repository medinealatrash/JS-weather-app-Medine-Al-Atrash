//select the necessary elements from the HTML document
let container = document.querySelector('.container');
let containerTop = document.querySelector('.container-top');
let messageAccepted = document.querySelector('.accepted');
let messageError = document.querySelector('.error');
let errorFetch = document.querySelector('.errorFetch')
let inputForm = document.querySelector('.input-form');
let containerCenter = document.querySelector('.container-center');
let difference = document.querySelector('.difference');
let containerBottom = document.querySelector('.container-bottom');
let loadingImg = document.querySelector('.loading') 
let input = document.querySelector('.my-input');
let btn = document.querySelector('.my-btn');

//API key here
//const apiKey = `b5ba791bba7c54df7c0894859744af9e`; 



//create an action when the button is clicked
inputForm.addEventListener('submit', function(e){
    console.log(e.target);
    
   
  //create a variable that will take values from the input field 
    cityName = input.value;
    input.value = ' ';


   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
  

   //the middle part of the document becomes visible, the loading element appears
    containerCenter.style.display = 'grid';
    loadingImg.style.display = 'block';


//We create blocks (div) that will display the information of interest to us
    let card = document.createElement('div');
    card.setAttribute('class','card');
    containerCenter.appendChild(card);
    let allCard = document.querySelectorAll('.card');
    let tempDiff;
    
//create an element that will display icons corresponding to the weather in a given city
    let weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('class','weather-icon');
    card.appendChild(weatherIcon);
//create a block that will contain information about the weather in the city of interest to us
    let weatherInfo = document.createElement('div');
    weatherInfo.setAttribute('class','weather-info');
    card.appendChild(weatherInfo);


    let h3City = document.createElement('h3');
    h3City.setAttribute('class','city');

    weatherInfo.appendChild(h3City)
   
    let ul = document.createElement('ul');
    weatherInfo.appendChild(ul);



    let liTemp = document.createElement('li');
    liTemp.setAttribute('class','temperature');
    
   

    let liHumidity = document.createElement('li');
    liHumidity.setAttribute('class','humidity');
    

    let liDecription = document.createElement('li');
    liDecription.setAttribute('class','description');

    let liPressure = document.createElement('li');
    liPressure.setAttribute('class','pressure');

    let liWindSpeed = document.createElement('li');
    liWindSpeed.setAttribute('class','wind-speed');

    // we use setTimeout() so that the download element disappears after 1500 ms, and the information of interest to us appears in its place
   setTimeout(() => {
    //we use Fetch to receive data from our API
    fetch(url)
    .then(function(response){
        console.log('BRÅ',response)
        
//if the status is more than 299, a message will appear on the screen displaying the status and text corresponding to this status, which will disappear in 2000 ms
        if (response.status > 299) { 
             
            
                  errorFetch.innerText = `${response.status} : ${response.statusText}`;
                  errorFetch.style.display = 'block';
          
                  setTimeout(() => {
                      errorFetch.style.display = 'none'; 
                  },2000);
          
                  } 

//decodes the JSON response
         return response.json()

        
    })
//if successful, we will have a ready-made JSON object
    .then(function(data){
        card.style.display = 'block';
        loadingImg.style.display = 'none';


        console.log ('start ',data);


//if the city name is entered incorrectly, an error message will appear, which will disappear after 1500ms. The block displaying weather information will be removed
        if(!data.name){ 
            messageError.style.display = 'block';
            card.remove(); 

             setTimeout(() => {
             messageError.style.display = 'none';
            
             },1500); 
        } 


//display the name of the city
        h3City.innerText = data.name;

 //display the temperature in the specified city      
        liTemp.innerText = `temperature: ≈ ${Math.round(data.main.temp)} ℃`;
        
 //the background of the block displaying full information about the weather in a particular city will change color depending on the temperature       
        if ((Math.round(data.main.temp)) < 2){
            card.style.backgroundColor = 'rgba(65, 46, 133, 0.788)'
        }
        if ((Math.round(data.main.temp)) >= 2 && (Math.round(data.main.temp)) < 5 ){
            card.style.backgroundColor = 'rgba(43, 8, 167, 0.747)'
        }
        if ((Math.round(data.main.temp)) >= 5 && (Math.round(data.main.temp)) < 10){
            card.style.backgroundColor = 'rgba(31, 122, 196, 0.747)'
        }
        if ((Math.round(data.main.temp)) >= 10 && (Math.round(data.main.temp)) < 15){
            card.style.backgroundColor = 'rgba(31, 196, 119, 0.747)'
        }
        if ((Math.round(data.main.temp)) >= 15 && (Math.round(data.main.temp)) < 25)
            {card.style.backgroundColor = '#f3fd5dbe'
        }
        if ((Math.round(data.main.temp)) >= 25 && (Math.round(data.main.temp)) < 32){
            card.style.backgroundColor = '#f8b147be'
        }
        if ((Math.round(data.main.temp)) >= 32 && (Math.round(data.main.temp)) < 38){
            card.style.backgroundColor = '#f84747be'
        }
     
        
     //display information about humidity, description and pressure   
        liHumidity.innerText = `humidity: ${data.main.humidity}`;
        liDecription.innerText = `description: ${data.weather[0].description}`;
        liPressure.innerText = `pressure: ${data.main.pressure}`; 
        liWindSpeed.innerText = `wind speed: ${data.wind.speed}`;
        
        ul.appendChild(liTemp);
        ul.appendChild(liHumidity);
        ul.appendChild(liDecription);
        ul.appendChild(liPressure);
        ul.appendChild(liWindSpeed);

//if the name of the city matches the one in the database, a message appears on the screen, which will disappear after 1500ms
        messageAccepted.style.display = 'block';
        setTimeout(() => {
            messageAccepted.style.display = 'none'; 
        },1500);

//add an attribute to the element that displays icons and specify the URL       
        let iconV = data.weather[0].icon;
        let urlIcon= `http://openweathermap.org/img/wn/${iconV}@2x.png`;
        weatherIcon.src = urlIcon;
//auxiliary variables, arrays.
       let a, b, c , d;
       let x = [];
       let y = [];
      

        for (let i=0; i<allCard.length; i++){
            console.log(allCard);
            if (allCard.length === 2){ //check if we entered 2 cities
                input.disabled = true; //correct input of more than 2 cities makes the input field inactive
                
 //if you entered 2 cities, then we look for information about the temperature in the found cities and calculate the temperature difference               
                let liAll = document.querySelectorAll('ul .temperature');

                for (let j=0; j<liAll.length;j++){
                
                        a = liAll[0].innerText;
                        b = liAll[1].innerText;

                    x = a.split(' ');
                    y = b.split(' ');
               
                    for (let k = 0; k < x.length; k++){
                        x[k] = parseInt(x[k]);
                        y[k] = parseInt(y[k]);
                    }
     //looking for temperature value    
                    for(let item of x){
                        if (Number(item)){
                            console.log((item))
                            c = item;
                        }
                    }
                    for(let item1 of y){
                        if (Number(item1)){
                            console.log((item1))
                            d = item1;
                        }
                    }

                    
                }
    tempDiff = Math.abs(d - c);
//the bottom of the container becomes visible,
    containerBottom.style.display = 'block';
//a message appears on the screen that displays the temperature difference between cities
    difference.innerText = `Temperature difference between cities is ${tempDiff} ℃`;
               
//change the text and design of the button
               btn.innerText =`ReFresh`;
               btn.style.color = 'white';
               btn.style.background = 'green';
//the button will reload the page when clicked
               btn.addEventListener('click',function(e){
                   location.reload();
               })
              
            } 
           
        } 
 
})
//reject promise and catch the error 
.catch(function(error){
      
    console.log('An error occured: ', error)
    


})

loadingImg.style.display = 'none';
}, 1500);
    
  
    e.preventDefault();
});