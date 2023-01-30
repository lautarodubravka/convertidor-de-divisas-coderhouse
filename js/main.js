const API_KEY = "YA430D84G5AYNSJV"; /*La clave API iría en el backend para mayor seguridad*/
const exchangeRates = {};

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    let message = document.getElementById("important-message");
    message.style.display = "block";
    let opacity = 0;
    let timer = setInterval(function() {
      opacity += 0.05;
      message.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(timer);
      }
    }, 50);
  }, 2000);
});
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
      addToConversionHistory(convertedAmount, fromCurrency, toCurrency, new Date(), amount);
      displayConversionHistory();
  } catch (error) {
      console.log(error);
  }
});

/*TABLA DE HISTORIAL DE BUSQUEDAS REALIZADAS POR EL USUARIO*/

let conversionHistory = [];

function addToConversionHistory(convertedAmount, fromCurrency, toCurrency, date, amount) {
conversionHistory.push({ convertedAmount, fromCurrency, toCurrency, date, amount });
}

function displayConversionHistory(history = conversionHistory) {
const historyTable = document.getElementById("conversion-history");
historyTable.innerHTML = "";
for (let i = 0; i < history.length; i++) {
const conversion = history[i];
const row = document.createElement("tr");
row.innerHTML = `<td>${conversion.fromCurrency}</td> <td>${conversion.toCurrency}</td> <td>${conversion.amount}</td> <td>${conversion.convertedAmount}</td> <td>${conversion.date.toLocaleString()}</td>`;
historyTable.appendChild(row);
}
}
  /*Campo de búsqueda*/

  const searchField = document.getElementById("searchInput");
  searchField.addEventListener("keyup", () => {
  const searchValue = searchField.value.toUpperCase();
  const filteredHistory = conversionHistory.filter(conversion => conversion.fromCurrency.startsWith(searchValue) || conversion.toCurrency.startsWith(searchValue));
  displayConversionHistory(filteredHistory);
  });

function searchConversionHistory() {
  // Obtener el valor ingresado en el campo de búsqueda
  const searchValue = document.getElementById("searchInput").value;

  // Crear un nuevo arreglo para almacenar los resultados de búsqueda
  const searchResults = [];

  // Recorrer el historial de conversiones
  for (let i = 0; i < conversionHistory.length; i++) {
    const conversion = conversionHistory[i];
    // Comparar las iniciales de las monedas con el valor de búsqueda
    if (conversion.fromCurrency.startsWith(searchValue) || conversion.toCurrency.startsWith(searchValue)) {
      // Si las iniciales coinciden, agregar la conversión al arreglo de resultados de búsqueda
      searchResults.push(conversion);
    }
  }
  // Pasar el arreglo de resultados de búsqueda a la función displayConversionHistory para mostrar solo las conversiones coincidentes
  displayConversionHistory(searchResults);
}
