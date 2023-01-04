const exchangeRates = {
  USD: 1,
  EUR: 0.86,
  GBP: 0.76,
  MXN: 21.91,
  AUD: 1.39,
  ARS: 370,
  };
  
  function convertCurrency(amount, exchangeRate, fromCurrency, toCurrency) {
  if (fromCurrency === "USD" && toCurrency === "EUR") {
  return (amount * exchangeRate.EUR).toFixed(2);
  } else if (fromCurrency === "USD" && toCurrency === "GBP") {
  return (amount * exchangeRate.GBP).toFixed(2);
  } else if (fromCurrency === "USD" && toCurrency === "MXN") {
  return (amount * exchangeRate.MXN).toFixed(2);
  } else if (fromCurrency === "USD" && toCurrency === "AUD") {
  return (amount * exchangeRate.AUD).toFixed(2);
  } else if (fromCurrency === "USD" && toCurrency === "ARS") {
  return (amount * exchangeRate.ARS).toFixed(2);
  } else {
  return "Invalid currency pair";
  }
  }
  
  const form = document.getElementById("conversionForm");
  
  form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const result = document.getElementById("convertedAmount");
  result.innerHTML = convertCurrency(amount, exchangeRates, fromCurrency, toCurrency);
  });