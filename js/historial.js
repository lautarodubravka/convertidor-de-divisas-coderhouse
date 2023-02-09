/*TABLA DE HISTORIAL DE BUSQUEDAS REALIZADAS POR EL USUARIO*/
let conversionHistory = [];

function addToConversionHistory(convertedAmount, fromCurrency, toCurrency, date, amount) {
  conversionHistory.push({
    convertedAmount,
    fromCurrency,
    toCurrency,
    date: luxon.DateTime.fromJSDate(date, { locale: 'es' }).toLocaleString(luxon.DateTime.DATETIME_FULL),
    amount
  });
}

function displayConversionHistory(history = conversionHistory) {
  const historyTable = document.getElementById("conversion-history");
  historyTable.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    const conversion = history[i];
    const row = document.createElement("tr");
    row.innerHTML = `<td>${conversion.fromCurrency}</td> <td>${conversion.toCurrency}</td> <td>${conversion.amount}</td> <td>${conversion.convertedAmount}</td> <td>${conversion.date}</td>`;
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

/*Los comentarios sé que pueden ser muchos pero me sirven a mí mismo para recordar y repasar el propósito del código*/