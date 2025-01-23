const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

//Provides static data for Coffee and Tea categories with their start and end rates, change, and change percentage. Fetched from the same paid API (as it has limited calls)
function fetchLocalData() {
  let pricingData = [
    {
      category: "Coffee",
      startRate: 0.30358227079539,
      endRate: 0.29162170831997,
      change: 0.011960562475420045,
      changePercent: 3.939809279403305,
    },
    {
      category: "Tea",
      startRate: 0.0054424730597584,
      endRate: 0.006170173381872,
      change: 0.0007277003221136001,
      changePercent: 13.370765718515175,
    },
  ];

  return pricingData;
}

//Cleans and parses CSV data, removing dollar signs, converting prices and stock into appropriate formats, and assigning categories based on product names.
async function cleanCSV(filePath) {
  return new Promise((resolve, reject) => {
    const cleanedData = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        let price = parseFloat(row.ourPrice.replace(/[^0-9.]/g, ""));
        if (isNaN(price)) {
          price = null;
        }

        let stock = row.currentStock;
        if (stock.toLowerCase() === "out of stock") {
          stock = 0;
        } else {
          stock = parseInt(stock, 10);
          if (isNaN(stock)) {
            stock = null;
          }
        }

        let category = "Beverage";
        if (
          row.productName.toLowerCase().includes("tea") ||
          row.productName.toLowerCase().includes("chai") ||
          row.productName.toLowerCase().includes("leaf")
        ) {
          category = "Tea";
        } else if (
          row.productName.toLowerCase().includes("coffee") ||
          row.productName.toLowerCase().includes("beans") ||
          row.productName.toLowerCase().includes("brew")
        ) {
          category = "Coffee";
        }

        if (price !== null && stock !== null) {
          cleanedData.push({
            productName: row.productName.trim(),
            ourPrice: price,
            category: category,
            currentStock: stock,
            restockThreshold: parseInt(row.restockThreshold, 10) || null,
          });
        }
      })
      .on("end", () => resolve(cleanedData))
      .on("error", (error) => reject(error));
  });
}

//Fetches real-time pricing data from an external API, handles response errors, and gets data points for Coffee and Tea fluctuation rates.
async function fetchPricingData() {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error(
      "API Key is not set. Please set it as an environment variable."
    );
    return;
  }

  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 29);
  const formattedStartDate = startDate.toISOString().split("T")[0];

  try {
    const coffeeResponse = await fetch(
      `https://commodities-api.com/api/fluctuation?access_key=${apiKey}&start_date=${formattedStartDate}&end_date=${endDate}&symbols=COFFEE`
    );

    if (!coffeeResponse.ok) {
      throw new Error(
        `Failed to fetch coffee data: ${coffeeResponse.statusText}`
      );
    }

    const coffeeData = await coffeeResponse.json();

    const coffeeFluctuation = coffeeData.data.success
      ? {
          category: "Coffee",
          startRate: coffeeData.data.rates.COFFEE.start_rate,
          endRate: coffeeData.data.rates.COFFEE.end_rate,
          change: coffeeData.data.rates.COFFEE.change,
          changePercent: coffeeData.data.rates.COFFEE.change_pct,
        }
      : null;

    const teaResponse = await fetch(
      `https://commodities-api.com/api/fluctuation?access_key=${apiKey}&start_date=${formattedStartDate}&end_date=${endDate}&symbols=TEA`
    );

    if (!teaResponse.ok) {
      throw new Error(`Failed to fetch tea data: ${teaResponse.statusText}`);
    }

    const teaData = await teaResponse.json();

    const teaFluctuation = teaData.data.success
      ? {
          category: "Tea",
          startRate: teaData.data.rates.TEA.start_rate,
          endRate: teaData.data.rates.TEA.end_rate,
          change: teaData.data.rates.TEA.change,
          changePercent: teaData.data.rates.TEA.change_pct,
        }
      : null;

    const results = [];
    if (coffeeFluctuation) results.push(coffeeFluctuation);
    if (teaFluctuation) results.push(teaFluctuation);

    return results;
  } catch (error) {
    console.error("Error fetching fluctuation data:", error);
  }
}

module.exports = { cleanCSV, fetchLocalData, fetchPricingData };
