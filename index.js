const axios = require('axios');
const { response } = require('express');

const getExchangeRate =  async (fromCurrency, toCurrency) =>{
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
        const rate = response.data.rates;
        const euro = 1/rate[fromCurrency];
        const exchange = euro * rate[toCurrency];
        return exchange;
    }catch (error) {
        console.log(error)
    }
}

const getCountries = async (toCurrency) => {
   try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
    return response.data.map(country => country.name)
   }catch (error) {
       console.log(error)
   }
}

const convertCurrency  = async (fromCurrency, toCurrency, amount) =>{
    try {
        const exchange = await getExchangeRate(fromCurrency, toCurrency)
        const countries = await getCountries(toCurrency)
        const convertedAmount = (amount * exchange).toFixed(2)
        
        return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. you can spent it in the following countries: ${countries}`;
    }catch (error) {
        console.log(error)
    }
}

convertCurrency('CAD', 'NGN', 10000)
.then((message) => {
    console.log(message);
}).catch(err=> console.log(err))
