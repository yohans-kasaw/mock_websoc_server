import { getRandomInt, getRandomFloat } from "./utils.js";

function modifyToken(token) {
  const newToken = JSON.parse(JSON.stringify(token));

  const fieldsToChange = [
    //"market_cap",
    "buy_volume.value",
    "sell_volume.value",
    "total_volume",
    "star_rating",
    //"risk_level",
    //"volatility",
    //"velocity_model.intervals.percentage_change",
    "total_holders",
  ];

  const numberOfChanges = 3;
  const changedFields = new Set();

  newToken["token_id"] = getRandomInt(1, 10000);
  newToken.total_volume = getRandomInt(0, 1000);
  for (let i = 0; i < numberOfChanges; i++) {
    let field;
    do {
      const fieldIndex = getRandomInt(0, fieldsToChange.length - 1);
      field = fieldsToChange[fieldIndex];
    } while (changedFields.has(field));
    changedFields.add(field);

    try {
      switch (field) {
        case "market_cap": {
          let currentMarketCap = parseFloat(
            newToken.market_cap.replace(/[^0-9.-]+/g, ""),
          );
          const marketCapChange =
            currentMarketCap * getRandomFloat(-0.12, 0.12, 4);
          currentMarketCap += marketCapChange;
          newToken.market_cap = `$${currentMarketCap.toFixed(4)}K`;
          break;
        }

        case "buy_volume.value": {
          let currentBuyVolume = parseFloat(
            newToken.buy_volume.value.replace(/[^0-9.-]+/g, ""),
          );
          const buyVolumeChange =
            currentBuyVolume * getRandomFloat(-0.22, 0.22, 2);
          currentBuyVolume += buyVolumeChange;
          newToken.buy_volume.value = `${currentBuyVolume.toFixed(2)}K`;
          break;
        }

        case "sell_volume.value": {
          let currentSellVolume = parseFloat(
            newToken.sell_volume.value.replace(/[^0-9.-]+/g, ""),
          );
          const sellVolumeChange =
            currentSellVolume * getRandomFloat(-0.22, 0.22, 2);
          currentSellVolume += sellVolumeChange;
          newToken.sell_volume.value = `${currentSellVolume.toFixed(2)}K`;
          break;
        }

        case "total_volume": {
          const buyVol = parseFloat(
            newToken.buy_volume.value.replace(/[^0-9.-]+/g, ""),
          );
          const sellVol = parseFloat(
            newToken.sell_volume.value.replace(/[^0-9.-]+/g, ""),
          );
          newToken.total_volume = `${(buyVol + sellVol).toFixed(2)}K`;
          newToken.total_volume = getRandomInt(0, 100000);
          break;
        }

        case "star_rating": {
          let currentRating = newToken.star_rating;
          let ratingChange = getRandomFloat(-0.5, 0.5, 3);
          let newRating = currentRating + ratingChange;
          newRating = Math.max(0, Math.min(newRating, 5));
          newToken.star_rating = parseFloat(newRating.toFixed(3));
          break;
        }

        case "risk_level": {
          const riskLevels = ["Low", "Moderate", "High"];
          newToken.risk_level =
            riskLevels[getRandomInt(0, riskLevels.length - 1)];
          break;
        }

        case "volatility": {
          const volatilityLevels = ["Low", "Moderate", "High"];
          newToken.volatility =
            volatilityLevels[getRandomInt(0, volatilityLevels.length - 1)];
          break;
        }
        case "total_holders": {
            let currentHolders = parseInt(newToken.total_holders);
            const holdersChange = getRandomInt(0, 1000);
            currentHolders = holdersChange;
            newToken.total_holders = currentHolders.toString();
            break;
        }

        case "velocity_model.intervals.percentage_change": {
          if (newToken.velocity_model && newToken.velocity_model.intervals) {
            const intervals = Object.keys(newToken.velocity_model.intervals);
            if (intervals.length > 0) {
              const randomInterval =
                intervals[getRandomInt(0, intervals.length - 1)];
              newToken.velocity_model.intervals[
                randomInterval
              ].percentage_change = getRandomFloat(-50, 50, 2);
            }
          }
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error(`Error modifying field ${field}:`, err.message);
    }
  }

  return newToken;
}

export default modifyToken;
