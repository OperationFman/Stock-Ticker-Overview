import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const tickerSymbol = `${TICKER}`;
  const RAPID_API_KEY = `${API_KEY}`;

  const checkStorage = localStorage.getItem("storedStockCount");
  const locallyStoredStockCount = checkStorage
    ? parseInt(checkStorage || "{}")
    : 1;

  const [stockCount, setStockCount] = useState(locallyStoredStockCount);
  const [usdStockPrice, setUsdStockPrice] = useState(0);
  const [audStockPrice, setAudStockPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStockCountChange = (value: number) => {
    setStockCount(value);
    localStorage.setItem("storedStockCount", `${value}`);
  };

  useEffect(() => {
    const getStockPricesAndSetState = async () => {
      const stockPriceUSD = await getTickerStockPriceUSD();
      const stockPriceAUD = await convertUSDToAUD(stockPriceUSD);

      setUsdStockPrice(stockPriceUSD);
      setAudStockPrice(stockPriceAUD);
    };

    getStockPricesAndSetState();
  }, []);

  const getTickerStockPriceUSD = async (): Promise<number> => {
    return axios
      .request({
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: { function: "GLOBAL_QUOTE", symbol: tickerSymbol },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY,
        },
      })
      .then((response) => {
        return response.data["Global Quote"]["05. price"];
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Too Many Requests");
      });
  };

  const convertUSDToAUD = async (usd: number): Promise<number> => {
    return axios
      .request({
        method: "GET",
        url: "https://currency-converter5.p.rapidapi.com/currency/convert",
        params: { format: "json", from: "USD", to: "AUD", amount: usd },
        headers: {
          "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY,
        },
      })
      .then((response) => {
        return response.data["rates"]["AUD"]["rate_for_amount"];
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Too Many Requests");
      });
  };

  return (
    <div className="App">
      {errorMessage && <h2 style={styles.errorMessage}>{errorMessage}</h2>}

      <br />
      <br />

      {usdStockPrice ? (
        <h1 style={styles.ticker}>{`${tickerSymbol}:  $${usdStockPrice}`}</h1>
      ) : (
        <h3>...</h3>
      )}

      <br />
      <br />

      <h4>Enter Your ThoughtWorks Stock:</h4>
      <h1>{stockCount}</h1>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          handleStockCountChange(stockCount - 10);
        }}
        style={styles.buttonStyles}
      >
        -10
      </button>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          handleStockCountChange(stockCount - 1);
        }}
        style={styles.buttonStyles}
      >
        -1
      </button>

      <button
        className="btn btn-outline-success"
        onClick={() => {
          handleStockCountChange(stockCount + 1);
        }}
        style={styles.buttonStyles}
      >
        +1
      </button>

      <button
        className="btn btn-outline-success"
        onClick={() => {
          handleStockCountChange(stockCount + 10);
        }}
        style={styles.buttonStyles}
      >
        +10
      </button>

      <br />
      <br />
      <br />
      <br />

      <h3>Total value in USD:</h3>
      {usdStockPrice ? (
        <h1>{`$${(usdStockPrice * stockCount).toFixed(1)}`}</h1>
      ) : (
        <h3>...</h3>
      )}

      <br />

      <h3>Total value in AUD:</h3>
      {usdStockPrice ? (
        <h1>{`$${(audStockPrice * stockCount).toFixed(1)}`}</h1>
      ) : (
        <h3>...</h3>
      )}
    </div>
  );
}

const styles = {
  errorMessage: {
    color: "white",
    backgroundColor: "#ed6f6f",
    paddingBottom: "5px",
  },
  ticker: {
    color: "white",
    backgroundColor: "#cccccc",
    padding: "10px",
  },
  buttonStyles: {
    margin: "10px",
  },
};

export default App;
