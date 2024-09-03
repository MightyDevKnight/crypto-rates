// src/components/CryptoDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import cryptoStore from "../store/CryptoStore";

const CryptoDetail: React.FC = observer(() => {
  const { baseCurrency, quoteCurrency } = useParams<{
    baseCurrency: string;
    quoteCurrency: string;
  }>();
  const crypto = cryptoStore.cryptoRates.find(
    (c) =>
      c.baseCurrency.toLowerCase() === baseCurrency &&
      c.quoteCurrency.toLowerCase() === quoteCurrency
  );

  if (!crypto) {
    return <div>Crypto not found</div>;
  }

  return (
    <div>
      <h1>
        {crypto.baseCurrency}/{crypto.quoteCurrency} Details
      </h1>
      <p>Rate: {crypto.rate}</p>
      <p>Ask: {crypto.ask}</p>
      <p>Bid: {crypto.bid}</p>
      <p>24h Diff: {crypto.diff24h}</p>
    </div>
  );
});

export default CryptoDetail;
