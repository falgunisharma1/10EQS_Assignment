<h2>Clear setup instructions</h2>
<ul>
  <li>To install dependencies: npm install</li>
  <li>To run the project: node src/analysis.js data/products.csv</li>
</ul>

<h2>Required API keys/credentials</h2>
<ul>
  <li>The API key is present in .env file.</li>
</ul>

<h2>Brief explanation of your approach</h2>
<ul>
  <li>Data quality issues found: Missing or invalid values in CSV rows, current stock inconsistent values, product categorization and price formatting requiring cleaning.</li>
  <li>By comparing the stock levels with current market pricing trends, it was clear that many products had stock levels below optimal restock thresholds.</li> 
 <li>Alerts and Recommendations are set on all products if they go under 10% above their restock threshold values to make sure we can restock based on pricing data</li>
<li> Example: If there is an item 'x' which has a current stock of 43 and the restock threshold is 40, and the price of this item is low in market, we recommend re-stocking, since current stock 43 is below 44(10% above 40). We do this since prices might increase in the future when the item actually reaches the threshold. </li>
      <li>When items fall below normal threshold, based on pricing data we recommmend if they should stock more or less</li>
</ul>

<h2>Any known issues or limitations</h2>
<ul>
  <li>The Data was not consistent with the unit size, some were in lbs, some were in bags so that was one strong limitation.</li>
  <li>The rate at which each item is being sold is unknown, hence it's hard to predict accurate restocking needs.</li>
  <li>Only paid versions of API endpoints were available so that was a bummer.</li>
</ul>

<h2>Time spent on each component</h2>
<ul>
  <li>Data Cleaning: 30 mins</li>
  <li>API integration: 40 mins</li>
  <li>Insight Generation: 20 mins</li>
  <li>Report & ReadMe: 30 mins</li>
</ul>
