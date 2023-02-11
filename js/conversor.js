//CONVERSOR//
const API_KEY = "YA430D84G5AYNSJV"; /*La clave API iría en el backend para mayor seguridad*/
const exchangeRates = {};
function convertCurrency(amount, exchangeRate, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  if (exchangeRate) {
    return (amount * exchangeRate).toFixed(0);
  }
  return "cotización no disponible";
}
async function updateExchangeRates(fromCurrency, toCurrency) {
  document.getElementById("loading-spinner").style.display = "block";
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`);
    const data = await response.json();
    const exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    exchangeRates[toCurrency] = exchangeRate || null;
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loading-spinner").style.display = "none";
  }
}
const form = document.getElementById("conversionForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const result = document.getElementById("result");
  try {
    await updateExchangeRates(fromCurrency, toCurrency);
    const convertedAmount = convertCurrency(amount, exchangeRates[toCurrency], fromCurrency, toCurrency);
    result.innerHTML = `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
    addToConversionHistory(convertedAmount, fromCurrency, toCurrency, new Date(), amount);
    displayConversionHistory();
  } catch (error) {
    console.error(error);
  }
});
