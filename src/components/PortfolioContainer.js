import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ myStocks, removeFromPortfolio, onStockClick }) {

  const stockDisplay = myStocks.map((stock, index) => {
    return <Stock 
      key={stock.id}
      stock={stock}
      onStockClick={removeFromPortfolio}
    />
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {stockDisplay}
    </div>
  );
}

export default PortfolioContainer;
