const API_KEY = "YA430D84G5AYNSJV"; /*La clave API iría en el backend para mayor seguridad*/
const exchangeRates = {};

function convertCurrency(amount, exchangeRate, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  if (exchangeRate) {
    return (amount * exchangeRate).toFixed(2);
  } else {
    return "Tasa de cambio no disponible";
  }
}

function updateExchangeRates(fromCurrency, toCurrency) {
  fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if(data["Realtime Currency Exchange Rate"] && data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]){
        exchangeRates[toCurrency] = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      }else{
        exchangeRates[toCurrency] = null;
      }
    })
    .catch((err) => console.log(err));
}
const form = document.getElementById("conversionForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").options[document.getElementById("fromCurrency").selectedIndex].value;
  const toCurrency = document.getElementById("toCurrency").options[document.getElementById("toCurrency").selectedIndex].value;
  const result = document.getElementById("result");
  try {
      await updateExchangeRates(fromCurrency, toCurrency);
      const convertedAmount = convertCurrency(amount, exchangeRates[toCurrency], fromCurrency, toCurrency);
      result.innerHTML = `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
  } catch (error) {
      console.log(error);
  }
});

  /*TABLA DE HISTORIAL DE BUSQUEDAS DEL USUARIO*/

  const conversionHistory = [];

  function addToConversionHistory(amount, fromCurrency, toCurrency, date) {
    conversionHistory.push({ amount, fromCurrency, toCurrency, date });
  }

  function displayConversionHistory() {
    const historyTable = document.getElementById("conversion-history");
    historyTable.innerHTML = "conversionForm";
    for (const conversion of conversionHistory) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${conversion.amount}</td>
        <td>${conversion.fromCurrency}</td>
        <td>${conversion.toCurrency}</td>
        <td>${conversion.date}</td>
      `;
      historyTable.appendChild(row);
    }
  }

// Agregar la nueva conversión al historial y mostrarla en la tabla
const date = new Date();
addToConversionHistory(amount, fromCurrency, toCurrency, date);
displayConversionHistory();

function addToConversionHistory(amount, fromCurrency, toCurrency, date) {
conversionHistory.push({ amount, fromCurrency, toCurrency, date });
}

function displayConversionHistory() {
const historyTable = document.getElementById("conversion-history");
historyTable.innerHTML = "";
for (const conversion of conversionHistory) {
const row = document.createElement("tr");
row.innerHTML = `<td>${conversion.amount}</td> 
<td>${conversion.fromCurrency}</td> 
<td>${conversion.toCurrency}</td> 
<td>${conversion.date}</td>`;
historyTable.appendChild(row);
}
}
  
  //Inicializar la tabla de historial al cargar la página
  displayConversionHistory();
  
// Función para actualizar las tasas de cambio
async function updateExchangeRates(fromCurrency, toCurrency) {
  try {
      const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`);
      const data = await response.json();
      if(data["Realtime Currency Exchange Rate"] && data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]){
          exchangeRates[toCurrency] = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      } else {
          exchangeRates[toCurrency] = null;
      }
  } catch (error) {
      console.log(error);
  }
}