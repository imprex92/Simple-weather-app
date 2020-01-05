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
        modifiedArray(weatherArray)
    });
    function modifiedArray(weatherArray){ //* Väljer ut idag och imorrgon i arrayen. Lägger det i en ny array. (modifiedArray)
        let modifiedArray = [];
        for ( let i=0; i < 2; i++){
            modifiedArray.push(weatherArray[i]);
        }
        console.log(modifiedArray)
        showResults(modifiedArray)
    }
    function showResults(modifiedArray){
        
    }


})