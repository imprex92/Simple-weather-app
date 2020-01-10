//! API ID: 42107755
//! KEY: 255b6d3420f660f99b960ee55721155d
//! API Base Adress: http://api.weatherunlocked.com/
//! API Structure: api/forecast/se.### ##?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d



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

    	if (!infoContainer.style.display)
    		infoContainer.style.display = "none";
    	console.log("button funkar");

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
        const baseURL = 'http://api.weatherunlocked.com/api/forecast/se.';
        const apiSettingKey = '?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d';
        const postalInput = document.querySelector('#postalNo');
        let postalCode = postalInput.value;
		// console.log(postalInput.value)
		//! Postnummer validering Start
		if (postalCode == '' || postalCode == null) {
			alert("Du måste skriva in ett postnummer!");
		} else if (isNaN(postalCode)){
			alert('Bara siffror i postnummret är accepterat!')
		}else{
        console.log(postalCode)
        const editedURL = baseURL + postalCode + apiSettingKey;
        let weatherResponse = await fetch(editedURL);
        let responseData = await weatherResponse.json(); //* Array ligger i ".Days"
        // console.log(responseData)
        let weatherArray = responseData.Days;
        console.log(weatherArray);
		modifiedArray(weatherArray, postalCode)	
		}
		//! Postnummer validering End
});
    function modifiedArray(weatherArray, postalCode){ //* Väljer ut idag och imorrgon i arrayen. Lägger det i en ny array. (modifiedArray)
        let modifiedArray = [];
        for ( let i=0; i < 2; i++){
            modifiedArray.push(weatherArray[i]);
        }
		console.log(modifiedArray)
		// console.log(modifiedArray[0].Timeframes[0].wx_code) //? hitta väder-kod
        showResults(modifiedArray, postalCode)
	}
	//! PostalWeather Area End

    function showResults(modifiedArray, postalCode){
		//! Dagens Start
		//TODO dubbla bilder
		// let imgUmbrella = document.getElementById('umbrellaImg')
		// imgUmbrella.remove();
		document.getElementById('todayText').innerHTML = '';
		
		let dateAndPostal1 = document.createElement('div');		
		dateAndPostal1.className = 'dateAndPostalMessage';
		dateAndPostal1.innerText = 'Datum ' + (modifiedArray[0].date) + '\n Postnummer: ' + postalCode;
		document.getElementById('todayText').appendChild(dateAndPostal1);
		//! Dagens Slut

		//! Morgondagens Start
		let dateAndPostal2 = document.createElement('div');
		dateAndPostal2.className = 'dateAndPostalMessage';
		dateAndPostal2.innerText = 'Morgondagens datum ' + (modifiedArray[1].date) + '\n Postnummer: ' + (postalCode);
		document.getElementById('tomorrowText').appendChild(dateAndPostal2);
		//! Morgondagens Slut
		showResultsImg(modifiedArray, postalCode)
    };
	function showResultsImg(modifiedArray, postalCode) {
		let wx_code = modifiedArray[0].Timeframes[4].wx_code;
		//! Today Pictures Start
		if (wx_code == 0){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/lPtKdQ6JMO06Y/giphy.gif');
			weatherImg.setAttribute('alt', 'Sunny weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if ((wx_code == 45 || wx_code == 49) || (wx_code == 10)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/26xBwlGgyeQjxx09G/giphy.gif');
			weatherImg.setAttribute('alt', 'Foggy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if (wx_code >= 1 && wx_code <= 3) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/3oz8xrJFAzgwfB0h5m/giphy.gif');
			weatherImg.setAttribute('alt', 'Cloudy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if ((wx_code >= 21 && wx_code <= 56) || (wx_code == 60 || wx_code == 61) || (wx_code == 66 || wx_code == 68) || (wx_code == 80 || wx_code == 83)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/CFWNpx0LDRiSY/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if((wx_code == 62 || wx_code == 63) || (wx_code == 67 || wx_code == 69)){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/BmQPKjwhScjdK/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if((wx_code == 57 || wx_code == 64) || (wx_code == 65 || wx_code == 82) || (wx_code == 84)){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/4Wk3vMYcipa0/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if((wx_code == 38 || wx_code == 39) || (wx_code == 70 || wx_code == 71) || (wx_code == 85)){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/6sqaUJgoc5JWE/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if((wx_code == 72 || wx_code == 73) || (wx_code == 86)){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/7Bgpw7PwdxoDC/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if(wx_code == 74 || wx_code == 75){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/l0MYHlfBw17B06vp6/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if(wx_code == 87){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/xTiTnGmU99wLFvZBfy/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Haily weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if(wx_code == 79 || wx_code == 88){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/YMPVlSoVQDJGU/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Haily weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if(wx_code == 29){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/FZzbTJyRTwPuw/giphy.gif');
			weatherImg.setAttribute('alt', 'Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if(wx_code == 91 || wx_code == 93){
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/iLdNyukd3uxsk/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if (wx_code == 92) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/EVf8tbnlr77Es/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		else if (wx_code == 94) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/VnaDpKoxNnHBC/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('todayPic').appendChild(weatherImg);
			// showResultsTomorrowImg(modifiedArray)
			umbrellaOrNot(wx_code)
		}
		//! Today Pictures End
	};	

	//TODO Någonting går fel i denna funktion!
	function showResultsTomorrowImg(modifiedArray, postalCode){
		let wx_code1 = modifiedArray[1].Timeframes[4].wx_code;
		//! Tomorrow Pictures Start
		if (wx_code1 == 0) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/lPtKdQ6JMO06Y/giphy.gif');
			weatherImg.setAttribute('alt', 'Sunny weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1)
		}
		else if ((wx_code1 == 45 || wx_code1 == 49) || (wx_code1 == 10)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/26xBwlGgyeQjxx09G/giphy.gif');
			weatherImg.setAttribute('alt', 'Foggy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 >= 1 && wx_code1 <= 3) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/3oz8xrJFAzgwfB0h5m/giphy.gif');
			weatherImg.setAttribute('alt', 'Cloudy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if ((wx_code1 >= 21 && wx_code1 <= 56) || (wx_code1 == 60 || wx_code1 == 61) || (wx_code1 == 66 || wx_code1 == 68) || (wx_code1 == 80 || wx_code1 == 83)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/CFWNpx0LDRiSY/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if ((wx_code1 == 62 || wx_code1 == 63) || (wx_code1 == 67 || wx_code1 == 69)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/BmQPKjwhScjdK/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if ((wx_code1 == 57 || wx_code1 == 64) || (wx_code1 == 65 || wx_code1 == 82) || (wx_code1 == 84)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/4Wk3vMYcipa0/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Rainy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if ((wx_code1 == 38 || wx_code1 == 39) || (wx_code1 == 70 || wx_code1 == 71) || (wx_code1 == 85)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/6sqaUJgoc5JWE/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if ((wx_code1 == 72 || wx_code1 == 73) || (wx_code1 == 86)) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/7Bgpw7PwdxoDC/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 74 || wx_code1 == 75) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/l0MYHlfBw17B06vp6/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Snowy weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 87) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/xTiTnGmU99wLFvZBfy/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Haily weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 79 || wx_code1 == 88) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/YMPVlSoVQDJGU/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Haily weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 29) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/FZzbTJyRTwPuw/giphy.gif');
			weatherImg.setAttribute('alt', 'Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 91 || wx_code1 == 93) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/iLdNyukd3uxsk/giphy.gif');
			weatherImg.setAttribute('alt', 'Light Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 92) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/EVf8tbnlr77Es/giphy.gif');
			weatherImg.setAttribute('alt', 'Moderat Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		else if (wx_code1 == 94) {
			let weatherImg = document.createElement('img');
			weatherImg.setAttribute('src', 'https://media.giphy.com/media/VnaDpKoxNnHBC/giphy.gif');
			weatherImg.setAttribute('alt', 'Heavy Thunder weather');
			weatherImg.className = 'weatherImg';
			document.getElementById('tomorrowPic').appendChild(weatherImg);
			umbrellaOrNot(wx_code1);
		}
		//! Tomorrow Pictures End
	};

	//TODO wx_code1 fattas. Behövs för att visa paraply på morgondagen!
	function umbrellaOrNot(wx_code) {
		console.log(wx_code)
		if ((wx_code >= 1 && wx_code <= 3)) {
			let umbrellaImg = document.createElement('img');
			umbrellaImg.setAttribute('src', '/Resources/Clouds.png');
			umbrellaImg.setAttribute('alt', 'No Umbrella');
			umbrellaImg.className = 'umbrellaImg';
			document.getElementById('todayText').appendChild(umbrellaImg)

			let umbrellaYesNo = document.createElement('div')
			umbrellaOrNot.className = 'umbrellaYesNo'
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
			umbrellaOrNot.className = 'umbrellaYesNo'
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
			umbrellaOrNot.className = 'umbrellaYesNo'
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
			umbrellaOrNot.className = 'umbrellaYesNo'
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
			umbrellaOrNot.className = 'umbrellaYesNo'
			umbrellaYesNo.innerText = 'Ta med paraply!'
			document.getElementById('todayText').appendChild(umbrellaYesNo)
		}
	};
})
