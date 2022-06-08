import React from 'react'
import './HowToPage.css';

const HowToPage = () => {
  return (
    <div className='HowToArea'>
      <h1>How to Use DRIP:</h1>
      <h3>1. Sign Up / Log In: </h3>
      <p>In order to store your graph data, you must create an account and Log in.</p>
      <h3>2. Create a Graph: </h3>
      <p>
        When prompted, you can enter a name for your graph, select how often
        you would reinvest into the graph's portfolio (currently only annual is enabled), and
        select how much you will be manually reinvesting every reinvestment period.
      </p>
      <h3>3. Add Assets to the Graph: </h3>
      <p>
        When prompted, you can enter the ticker symbol (ex: 'AAPL' for Apple Inc.) for the stock you wish to graph.
        You can also enter how many shares you wish to simulate. The rest of the data for the asset will automatically be populated.
        Stock data is based on the close of the previous trading day.
      </p>
      <h3>Extra: </h3>
      <p>
        If you wish, you may also view each individual asset. This will give an overview of the company, 
        as well as a few recent articles that involve the company you are viewing.
      </p>
    </div>
  )
}

export default HowToPage;