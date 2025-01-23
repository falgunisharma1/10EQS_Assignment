
<h2>Clear setup instructions</h2>
To install dependencies: npm install 
To run the project: node src/analysis.js data/products.csv

<h2>Required API keys/credentials</h2>
The API key is present in .env file.

<h2>Brief explanation of your approach</h2>
1. Data quality issues found: Missing or invalid values in CSV rows, automatic conversion of "out of stock" to zero, and price formatting requiring cleaning.
2. Cleaned data summary: Extraction of product names, prices, categories (Coffee, Tea, Beverage), stock levels, and restock thresholds; categorization improvement for market analysis.
3. External data integration results: Real-time pricing data retrieved from Commodity API, API documentation available here, and local sample data stored due to API limitations.
4. Business insights: Inventory analysis shows stock levels below optimal restock thresholds; significant price changes in Coffee and Tea offer restocking opportunities; alerts set for products going above 10% of restock thresholds.


<h2>Any known issues or limitations</h2>
1. The Data was not consistent with the unit size, some were in lbs, some with in bags so that was one strong limitation.
2. The rate at which each item is being sold is unknown, hence its hard to predict accurate restocking needs.
3. Only paid versions of API endpoints were available so that was a bummer.


<h2>Time spent on each component</h2>
1. Data Cleaning: 30 mins
2. API integration: 40 mins
3. Insight Generation: 20 mins
4. Report & ReadMe: 30 mins