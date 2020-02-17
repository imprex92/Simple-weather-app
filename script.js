//! API ID: 42107755
//! KEY: 255b6d3420f660f99b960ee55721155d
//! API Base Adress: http://api.weatherunlocked.com/
//! API Structure: api/forecast/se.### ##?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d
const baseForecastURL = 'http://api.weatherunlocked.com/api/forecast/se.';
const baseCurrentURL = 'http://api.weatherunlocked.com/api/current/se.';
const apiSettingKey = '?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d';


window.addEventListener('load', () => {
//! GeoLocation Area Start
// //? INFO: Using Google Cloud Platform, Geolocation API
// 	let locationKey = '??????????????????????????';
// 	let locationURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
// 	let editedLocationURL = locationURL + locationKey;

// 	let geolocationBtn = document.querySelector('#geolocation');
// 	geolocationBtn.addEventListener('click', async event => {

// 	})




	let geolocation = document.querySelector('#geolocation')
	geolocation.addEventListener('click', event => {
		let G, options;

		document.addEventListener('DOMContentLoaded', init);

		function init(){
			if(navigator.geolocation){ //! Options (giveUp, tooOld) sätts i millisekunder
				let giveUp = 1000 * 30; //* 30 sekunder
				let tooOld = 1000 * 60 * 60; //* 1 timma
				options ={
					enableHighAccuracy: true,
					timeout: giveUp,
					maximumAge: tooOld
				}
				navigator.geolocation.getCurrentPosition(gotPosition, positionFail, options);
			}else{
				//? Om en gammal webbläsare inte stödjer Geolocation
				console.log('something went wrong!')
			}
		}
		function gotPosition(position){
			console.log(position)
			//*	position.coords.latitude;
			//* position.coords.longitude;
			//* position.coords.accuracy;
			//* position.timestamp;
		}
		function positionFail(err){
			//! Går något fel får vi tillbaka en siffra (err)
			let errors = {
				1: 'Du gav mig inte tillåtelse att leta upp dig',
				2: 'Jag är inte riktigt säker på vart  du håller hus',
				3: 'Det tog för lång tid, du har en skitdator'
			}
			// document.querySelector('h1').textContent = errors[err];
		}


	})












//! GeoLocation Area End

//! Info DropDown start
    let infoBtn = document.querySelector("#infoBtn");
    let infoContainer = document.querySelector("#infoContainer");

    infoBtn.addEventListener("click", event => {

    	if (!infoContainer.style.display) {
    		infoContainer.style.display = "none";
    		console.log("button funkar");
		}
    	if (infoContainer.style.display !== "none") {
    		console.log("i if sats")
    		infoContainer.style.display = "none";

    	} else {
    		console.log("i else sats")
    		infoContainer.style.display = "block";
    	}


    });
//! Info DropDown End



//! Input Area Start
    // document.querySelector('input').oninput = function () {
    //     var foo = this.value.split(" ").join("");
    //     if (foo.length > 0) {
    //         foo = foo.match(new RegExp('.{1,3}', 'g')).join(" ");
    //     }
    //     this.value = foo;
    // };
    

//! Input Area End

//! PostalWeather Area Start
    const sendBtn = document.querySelector('#postalBtn')
    sendBtn.addEventListener('click', async e => {
        
        const postalInput = document.querySelector('#postalNo');
        let postalCode = postalInput.value;
		// console.log(postalInput.value)

		

		//! Postnummer validering Start
		if (postalCode == '' || postalCode == null) {
			alert("Du måste skriva in ett postnummer!");
		} else if (isNaN(postalCode)){
			alert('Bara siffror i postnummret är accepterat!')
		}
		else if (postalCode.length < 5) {
		 	alert('Postnummret måste innehålla 5 siffror!');
		}else {
			console.log(postalCode)
			let editedURL = baseCurrentURL + postalCode + apiSettingKey;
			let weatherCurrentResponse = await fetch(editedURL);
			let currentWeatherData = await weatherCurrentResponse.json();
			let wx_code = currentWeatherData.wx_code;

			console.log(currentWeatherData)
			
			currentWeather(wx_code);
			// multiWeather(postalCode);
			
		}
		//! Postnummer validering End
});
    
	async function multiWeather(postalCode){
		console.log(postalCode)
			let editedURL = baseForecastURL + postalCode + apiSettingKey;
			let weatherResponse = await fetch(editedURL);
			let responseData = await weatherResponse.json(); //* Array ligger i ".Days"
			// console.log(responseData)
			let weatherArray = responseData.Days;

			let wx_code = responseData.Days[0].Timeframes[0].wx_code;
	}
	
	function currentWeather(wx_code) {
		console.log(wx_code)
		let startImg = document.getElementById('todayText');
		startImg.innerHTML = '';
		if ((wx_code >= 1 && wx_code <= 3)) {
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Clouds.png');
			umbrellaImg.setAttribute('alt', 'No Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaYesNo.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Inget paraply behövs!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		}
		else if ((wx_code == 49 || wx_code == 45) || (wx_code == 10)) {
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Fog.png');
			umbrellaImg.setAttribute('alt', 'Fogy No Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaYesNo.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Inget paraply behövs!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		}
		else if ((wx_code == 0)){
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Sun.png');
			umbrellaImg.setAttribute('alt', 'No Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaYesNo.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Inget paraply behövs!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		}
		else if (wx_code == 38){
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Windy.png');
			umbrellaImg.setAttribute('alt', 'Storm No Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaYesNo.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Stanna hemma idag!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		 }
		 else{
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Rain.png');
			umbrellaImg.setAttribute('alt', 'Yes Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaYesNo.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Ta med paraply!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		}
	};
})
