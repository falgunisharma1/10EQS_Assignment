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
  <li>Data quality issues found: Missing or invalid values in CSV rows, automatic conversion of "out of stock" to zero, and price formatting requiring cleaning.</li>
  <li>Cleaned data summary: Extraction of product names, prices, categories (Coffee, Tea, Beverage), stock levels, and restock thresholds; categorization improvement for market analysis.</li>
  <li>External data integration results: Real-time pricing data retrieved from Commodity API, API documentation available here, and local sample data stored due to API limitations.</li>
  <li>Business insights: Inventory analysis shows stock levels below optimal restock thresholds; significant price changes in Coffee and Tea offer restocking opportunities; alerts set for products going above 10% of restock thresholds.</li>
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
