import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import './Graph.css';

const Graph = (props) => {
	const [options, setOptions] = useState();
    const [series, setSeries] = useState();
    useEffect(() => {
        let optionsObj = {
            chart: {
                id: 'graphChart'
            },
            xaxis: {
                categories: []
            }
        }
        let seriesArr = [
            {
                name: 'With Reinvested Dividends',
                data: []
            },
            {
                name: 'Without Reinvested Dividends',
                data: []
            }
        ];

        
        const generateYears = () => {
            let startYear = Number(props.startYear);
            let yearArr = [];
            yearArr.push(startYear)
            for(let i = 0; i < 65; i++){
                startYear ++;
                yearArr.push(startYear)
            }
            return yearArr;
        }
        optionsObj['xaxis']['categories'] = generateYears()
        
        const generateEquityAndDiv = () => {
            let startingEquity = 0;
            let startingDiv = 0;

            for(let i = 0; i < props.assetProps.length; i++){
                let assetPrice = Number(props.assetProps[i]['price_per_share']) * Number(props.assetProps[i]['shares']);
                let assetDiv = Number(props.assetProps[i]['div_yield'])
                startingEquity += assetPrice;
                startingDiv += assetDiv;
            }
            props.grabDivAndEquity(startingDiv, startingEquity)
            return [startingEquity, startingDiv];
        }

        const generateEquityPoints = () => {
            let equityArr = [];
            let equityDiv = generateEquityAndDiv()
            let startingEquity = equityDiv[0];
            let avgDiv = equityDiv[1] / props.assetProps.length;
            let finalValue = 0;
            for(let i = 1;i <= 65; i++){
                if(Number(props.reinvestmentAmount === 0)){
                    finalValue = ((startingEquity) * Math.pow((1+avgDiv/1), i))
                }else{
                    finalValue = ((startingEquity + (Number(props.reinvestmentAmount) * i)) * Math.pow((1+avgDiv/1), i))
                }
                finalValue += (finalValue * 0.05);
                equityArr.push(finalValue.toFixed(2))
            }
            
            return equityArr;
        }

        const generateEquityPointsNoDiv = () => {
            let equityArr = [];
            let equityDiv = generateEquityAndDiv()
            let startingEquity = equityDiv[0];
            if(startingEquity === 0){
                return [null]
            }else{
                for(let i = 1;i <= 65; i++){
                    let finalValue = (startingEquity + Number(props.reinvestmentAmount));
                    finalValue += (finalValue * 0.05)
                    startingEquity = finalValue;
                    equityArr.push(finalValue.toFixed(2))
                }
                return equityArr;
            }        
        }

        seriesArr[0]['data'] = generateEquityPoints()
        seriesArr[1]['data'] = generateEquityPointsNoDiv()
        setOptions(optionsObj);
        setSeries(seriesArr)
    }, [props]);

    return (
        <div className={'chartArea'}>
            {(options || series) &&
                <Chart 
                    options={options} 
                    series={series} type="line" 
                    width={1300} height={400} 
                />
            }
        </div>
    );
}
export default Graph;