document.getElementById('currency-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[toCurrency];
      const result = amount * exchangeRate;
      document.getElementById('result').innerHTML = `Result: ${result} ${toCurrency}`;
    });
});
