<h2>Data Analysis and External Data Integration Report<h2>
<h4>
<ol> 
  <li>Data Quality Issues Found:
    <ul>
      <li>Rows labeled as "out of stock".</li> 
      <li>Categories were not accurate as some tea and coffee products had beverage as their category.</li>
      <li>Price values in the CSV files included special characters.</li>
      <li>Some aditional columns existed in the raw CSV file without the column header or even the data type.</li>
<li> Weight units were not consistent, some rows had bags, some had lbs and some had oz.</li>
    </ul>
  </li> 
  <li>Cleaned Data Summary:
    <ul> 
<li>Standardized the units to $ and removed the $ sign. </li>
      <li>The cleaning process categorized products into either "Coffee" or "Tea" or Beverage based on keywords in the product names, improving data usability for <b>market analysis</b>.</li>
<li></li>
      <li>Function cleanCSV manages to do all of this.</li>
    </ul> 
  </li> 
  <li>External Data Integration Results: 
    <ul>
      <li>API Integration: Real-time pricing data was retrieved from the Commodity API, including fluctuations in coffee and tea rates. This allowed us to find the price of coffee and tea at specific time intervals which helps to figure out if the price has gone up or down in the last 30 days.</li>
<li>Using this pricing API and by setting a certain value slightly higher than restock threshold (which is 10% in this case), it will predict when they should restock a certain item based on stock levels and also the price fluctuations in the market.</li>
      <li>Here is the API documentation I used for this project: https://commodities-api.com/documentation</li>
      <li>Local Data: A sample of pricing data for last 30 days (static) for Coffee and Tea categories was fetched and stored locally for testing as its a paid API and has limited calls. Function - fetchPricingData is making the API call and can be called in analysis.js. </li>
    </ul>
  </li> 
  <li>Business Insights: 
    <ul> 
      <li>By comparing the stock levels with current market pricing trends, it was clear that many products had stock levels below optimal restock thresholds.</li>
      <li>Both Coffee and Tea categories showed price changes, so in some cases when products are understocked, strategic restocking can be done in relation to market prices.</li> 
      <li>Alerts and Recommendations are set on all products if they go under 10% above their restock threshold values to make sure we can restock based on pricing data</li>
<li> Example: If there is an item 'x' which has a current stock of 43 and the restock threshold is 40, and the price of this item is low in market, we recommend re-stocking, since current stock 43 is below 44(10% above 40). We do this since prices might increase in the future when the item actually reaches the threshold. </li>
      <li>When items fall below normal threshold, based on pricing data we recommmend if they should stock more or less</li>
    </ul>
  </li>

  <li>Future Recommendation:
  <ul><li>If more data was present on how many items are being sold each month, per sku, we can better manage inventory.</li>
  <li>For future, location specific demand data can be used to figure out which product has high demand and can be reflected on our inventory planning</li>
  </ul>
  </li>

</ol>
</h4>
