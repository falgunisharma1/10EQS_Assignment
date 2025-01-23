const { cleanCSV, fetchLocalData, fetchPricingData } = require("./utils");

//This function prints the data in a table format using console.table().
function displayTable(data) {
  console.table(data);
}

//This function processes cleaned data to compute the stock percentage difference and filters out items with a percentage difference below 10%.
function getStockPercentages(cleanedData) {
  const result = [];

  cleanedData.forEach((item) => {
    const difference = item.currentStock - item.restockThreshold;
    const percentageDifference = (difference / item.restockThreshold) * 100;

    if (percentageDifference < 10) {
      result.push({
        productName: item.productName,
        category: item.category,
        currentStock: item.currentStock,
        restockThreshold: item.restockThreshold,
        percentageDifference: percentageDifference,
      });
    }
  });
  return result;
}


//Gets the data flow from cleaning CSV to fetching pricing data and analyzing inventory, including recommendations or alerts based on stock and price fluctuations.
async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.log("Please provide the CSV file path as an argument.");
    return;
  }

  const ITEM_EXTRA_restockThreshold_PERCENT = 10;

  try {
    
    const cleanedData = await cleanCSV(filePath);
    displayTable(cleanedData);


    //Commenting out the API call as its a paid version, instead stored api output in a variable and reuse that.
    // const pricingData = await fetchPricingData();

    //For using the local Data
    const pricingData = await fetchLocalData();


    const stockPercentages = getStockPercentages(cleanedData);
    
    stockPercentages.forEach((item) => {
      const category = item.category;
      const pricingDataForCategory = pricingData.find(
        (row) => row.category === category
      );

      if (pricingDataForCategory.endRate > pricingDataForCategory.startRate) {
        if (item.percentageDifference <= 0) {
          console.log(
            `ALERT: The price of ${category} has increased. You may want to restock ${item.productName} to only ${ITEM_EXTRA_restockThreshold_PERCENT}% higher than the threshold, and wait when price gets lower`
          );
        } else {
          console.log(
            `Recommendation: The price of ${category} has increased. You have enough stock of ${item.productName} so don't recommend restocking ${item.productName} unless prices go down significantly.`
          );
        }
      } else if (
        pricingDataForCategory.endRate < pricingDataForCategory.startRate
      ) {
        if (item.percentageDifference <= 0) {
          console.log(
            `ALERT: The price of ${category} has declined. You may want to restock ${item.productName} a good chuck.`
          );
        } else if (
          item.percentageDifference <= ITEM_EXTRA_restockThreshold_PERCENT
        ) {
          console.log(
            `Recommendation: The price of ${category} has declined. You can restock ${item.productName} if there is much higher demand, however there is no urgency as the restock threshold has not been met as of now.`
          );
        }
      }
    });
  } catch (error) {
    console.error("Error during execution:", error);
  }
}



main();
