//! API ID: 42107755
//! KEY: 255b6d3420f660f99b960ee55721155d
//! API Base Adress: http://api.weatherunlocked.com/
//! API Structure: api/forecast/se.### ##?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d



window.addEventListener('load', () => {

//! Input Area Start
    // document.querySelector('input').oninput = function () {
    //     var foo = this.value.split(" ").join("");
    //     if (foo.length > 0) {
    //         foo = foo.match(new RegExp('.{1,3}', 'g')).join(" ");
    //     }
    //     this.value = foo;
    // };
    

//! Input Area End
    const sendBtn = document.querySelector('#postalBtn')
    sendBtn.addEventListener('click', async e => {
        const baseURL = 'http://api.weatherunlocked.com/api/forecast/se.';
        const apiSettingKey = '?lang=sv&app_id=42107755&app_key=255b6d3420f660f99b960ee55721155d';
        const postalInput = document.querySelector('#postalNo');
        let postalCode = postalInput.value;
        console.log(postalInput.value)
        console.log(postalCode)
        const editedURL = baseURL + postalCode + apiSettingKey;
        let weatherResponse = await fetch(editedURL);
        let responseData = await weatherResponse.json(); //* Array ligger i ".Days"
        // console.log(responseData)
        let weatherArray = responseData.Days;
        console.log(weatherArray);
        modifiedArray(weatherArray, postalCode)
    });
    function modifiedArray(weatherArray, postalCode){ //* Väljer ut idag och imorrgon i arrayen. Lägger det i en ny array. (modifiedArray)
        let modifiedArray = [];
        for ( let i=0; i < 2; i++){
            modifiedArray.push(weatherArray[i]);
        }
		console.log(modifiedArray)
		console.log(modifiedArray[0].Timeframes[0].wx_code) //? hitta väder-kod
        showResults(modifiedArray, postalCode)
    }
    function showResults(modifiedArray, postalCode){
		//! Dagens Start
		let dateAndPostal1 = document.createElement('span');		
		dateAndPostal1.className = 'dateAndPostalMessage';
		dateAndPostal1.innerText = 'Dagens datum ' + (modifiedArray[0].date) + '\n Postnummer: ' + postalCode;
		document.getElementById('todayText').appendChild(dateAndPostal1);
		//! Dagens Slut

		//! Morgondagens Start
		let dateAndPostal2 = document.createElement('span');
		dateAndPostal2.className = 'dateAndPostalMessage';
		dateAndPostal2.innerText = 'Morgondagens datum ' + (modifiedArray[1].date) + '\n Postnummer: ' + (postalCode);
		document.getElementById('tomorrowText').appendChild(dateAndPostal2);
		//! Morgondagens Slut
		showResultsImg(modifiedArray, postalCode)
    }
	function showResultsImg(modifiedArray, postalCode) {
		if (modifiedArray[0].Timeframes[0].wx_code == 0){
			
		}
	};

})