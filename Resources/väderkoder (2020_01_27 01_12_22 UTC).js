switch(wx_code){
	//Sunny
	case 0: 	//Sunny skies/Clear skies
	break;
	// Cloudy
	case 1:		//Partly cloudy skies
	case 2:		//Cloudy skies
	case 3:		//Overcast skies
	break;
	//Light Rain
	case 21:	//Patchy rain possible
	case 50:	//Patchy light drizzle
	case 51:	//Light drizzle
	case 56:	//Freezing drizzle
	case 57:	//Heavy freezing drizzle
	case 60:	//Patchy light rain
	case 61:	//Light rain
	case 66:	//Light freezing rain
	case 80:	//Light rain shower
	break;
	//Moderat rain
	case 62:	//Moderate rain at times
	case 63:	//Moderate rain
	case 67:	//Moderate or heavy freezing rain
	case 81:	//Moderate or heavy rain shower
	break;
	//Heavy rain
	case 64:	//Heavy rain at times
	case 65:	//Heavy rain
	case 82:	//Torrential rain shower
	break;
	//Snöblandat regn
	case 68:	//Light sleet
	case 69:	//Moderate or heavy sleet
	case 83:	//Light sleet showers
	break;
	//heavy snöblandat
	case 84:	//Moderate or heavy sleet showers
	break;
	//light Snow 
	case 70:	//Patchy light snow
	case 71:	//Light snow
	case 85:	//Light snow showers
	break;
	//moderat snow
	case 72:	//Patchy moderate snow
	case 73:	//Moderate snow
	case 86:	//Moderate or heavy snow showers
	case 38:	//Blowing snow
	break;
	//Heavy Snow
	case 74:	//Patchy heavy snow
	case 75:	//Heavy snow
	case 39:	//Blizzard
	break;
	//Hagel
	case 79:	//Ice pellets
	case 87:	//Light showers of ice pellets
	case 88:	//Moderate or heavy showers of ice pellets
	break;
	//Thunder rain
	case 91:	//Patchy light rain with thunder
	case 92:	//Moderate or heavy rain with thunder
	case 29:	//Thundery outbreaks possible
	break;
	//thunder snow
	case 93:	//Patchy light snow with thunder
	case 94:	//Moderate or heavy snow with thunder
	break;
	//Foggy
	case 10:	//Mist
	case 45:	//Fog
	case 49:	//Freezing fog
	break;
}