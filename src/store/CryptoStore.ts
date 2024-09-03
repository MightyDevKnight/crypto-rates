// src/store/CryptoStore.ts
import { makeAutoObservable } from "mobx";
import axios from "axios";

interface RateDetail {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

interface CurrencyRates {
  [currencyPair: string]: RateDetail;
}

interface ApiResponse {
  [currency: string]: CurrencyRates;
}

interface CryptoRate {
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

class CryptoStore {
  cryptoRates: CryptoRate[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCryptoRates = async () => {
    this.loading = true;
    try {
      const response = await axios.get<ApiResponse>(
        "https://app.youhodler.com/api/v3/rates/extended"
      );

      // Transform the data into an array of CryptoRate objects
      this.cryptoRates = Object.entries(response.data).flatMap(
        ([baseCurrency, rates]) => {
          return Object.entries(rates).map(([quoteCurrency, rateDetail]) => ({
            baseCurrency,
            quoteCurrency,
            rate: rateDetail.rate,
            ask: rateDetail.ask,
            bid: rateDetail.bid,
            diff24h: rateDetail.diff24h,
          }));
        }
      );

      this.error = null;
    } catch (error) {
      this.error = "Failed to fetch data";
    } finally {
      this.loading = false;
    }
  };
}

const cryptoStore = new CryptoStore();
export default cryptoStore;
