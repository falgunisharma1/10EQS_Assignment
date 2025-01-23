<h1>Data Analysis and External Data Integration Report<h1>

<ol> 
  <li>Data Quality Issues Found:
    <ul>
      <li>Some CSV rows contained missing or invalid values for product prices and stock levels, which compromised the accuracy of the inventory analysis.</li> 
      <li>Rows labeled as "out of stock" were automatically converted to zero.</li> 
      <li>Price values in the CSV files included special characters,converted them into usable numeric data.</li>
    </ul>
  </li> 
  <li>Cleaned Data Summary:
    <ul> 
      <li>Key Fields Extracted and renamed as per JS format: Product names, prices, categories (Coffee, Tea, Beverage), current stock levels, and restock thresholds.</li> 
      <li>Categories Identified: The cleaning process categorized products into either "Coffee" or "Tea" or Beverage based on keywords in the product names, improving data usability for <b>market analysis</b>.</li>
      <li>Function cleanCSV manages to do all of this.</li>
    </ul> 
  </li> 
  <li>External Data Integration Results: 
    <ul>
      <li>API Integration: Real-time pricing data was retrieved from the Commodity API, including fluctuations in coffee and tea rates over the past 30 days. This allowed for timely comparison between local stock levels and market conditions.</li>
      <li>Here is the API documentation I used for this project: https://commodities-api.com/documentation</li>
      <li>Local Data: A sample pricing data for Coffee and Tea categories were fetched and stored locally for testing as its a paid API and has limited calls. Function - fetchPricingData is making the API call and can be called in analysis.js on line 48. </li>
    </ul>
  </li> 
  <li>Business Insights: 
    <ul> 
      <li>Inventory Analysis: By comparing the stock levels with current market pricing trends, it was clear that many products had stock levels below optimal restock thresholds.</li>
      <li>Opportunity for Restocking: Both Coffee and Tea categories showed significant price changes, so in some cases when products are understocked, strategic restocking can be done in relation to market prices.</li> 
      <li>Alerts and Recommendations are set on all products if they go under 10% above their restock threshold values, especially when there is a significant fluctuation in the market prices fetched from the API data</li>
    </ul>
  </li>

  <li>Future Recommendation:
  <ul><li>If more data was present on how many items are being sold each month, per sku, we can better manage inventory.</li>
  <li>For future, location specific demand data can be used to figure out which product has high demand and can be reflected on our inventory planning</li>
  </ul>
  </li>

</ol>
