import React from 'react'
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className='AboutArea'>
      <div>
        <h1>About DRIP investments: </h1>
        <h3>Why "DRIP"?:</h3>
        <p>
          "DRIP" stands for Dividend Re-Investment Plan. This typically refers to the investment strategy
          where one invests in companies that pay a dividend, and use that dividend payment to buy more shares
          of that company. This has a compounding effect, and can provide a safe, beneficial way to invest long-term.
        </p>
        <h3>How returns are calculated: </h3>
        <p>
          The formula for calulating returns is FV = P * (1+r/m)^mt.<br/>
          FV = Future Value<br/>
          P = Initial Investment<br/>
          r = Average Dividend Yield In Decimals<br/>
          m = Dividend Pay Rate (currently only annual available)<br/>
          t = Number of Years Invested (set at 65)
        </p>
        <h3>Assumptions: </h3>
        <p>
          As the market is always changing, some assumptions have to be made when calculating returns.
          Currently, returns are calculated assuming a 5% annual share value increase. 
          Dividend Yield usually changes every year, depending on the company. Due to the somewhat unpredictable nature
          of this, the Dividend Yield increase rate is locked at 0.
        </p>
      </div>
      <div className='credits'>
        <h3>Credits: </h3>
        Free SVG Background by <a href="https://bgjar.com">BGJar</a>
      </div>
    </div>
  )
}

export default AboutPage;
