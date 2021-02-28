import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const url = 'http://localhost:3001/stocks'

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sort, setSort] = useState("Alphabetically")
  const [filter, setFilter] = useState("Tech")

  useEffect(() => {
    fetch(url)
    .then(r => r.json())
    .then(stocks => {
      const updatedStocks = stocks.map((stock) => {
       return  {...stock, owned: false}
      })
      setStocks(updatedStocks)
    })
  }, [])

  function addToPortfolio(stock) {
    setMyStocks([...myStocks, stock])
  }

  function removeFromPortfolio(stock){
    setMyStocks(myStocks.filter((myStock) => myStock.id !== stock.id))
  }

    const sortedStocks = [...stocks].sort((stock1, stock2) => {
      if (sort === "Alphabetically") {
        return stock1.name.localeCompare(stock2.name);
      } else {
        return stock1.price - stock2.price;
      }
    })

    const filteredStocks = sortedStocks.filter(
      (stock) => stock.type === filter
    );

  return (
    <div>
      <SearchBar 
      setSort={setSort} 
      sort={sort} 
      filter={filter}
      setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks}
            addToPortfolio={addToPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            myStocks={myStocks}
            removeFromPortfolio={removeFromPortfolio}
            />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
