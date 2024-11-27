// Utility function to select a random element from an array
function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// Function to capitalize the first letter of a string
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
// Enhanced token name generator using syllables
function generateTokenName() {
  const prefixes = [
    "Neo",
    "Crypto",
    "Block",
    "Quantum",
    "Aero",
    "Terra",
    "Luna",
    "Sol",
    "Hydro",
    "Photon",
  ];
  const suffixes = [
    "Chain",
    "Coin",
    "Token",
    "Sphere",
    "Net",
    "Link",
    "Wave",
    "Bit",
    "Flux",
    "Pulse",
  ];

  const prefix = getRandomElement(prefixes);
  const suffix = getRandomElement(suffixes);

  // Optionally, add a random number or additional syllable for uniqueness
  const uniquePart = getRandomString(2); // e.g., "ab", "xy"

  return `${prefix}${suffix}${capitalize(uniquePart)}`;
}

// Enhanced ticker generator (3-5 uppercase letters)
function generateTicker() {
  const length = getRandomInt(3, 5);
  let ticker = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    ticker += chars[getRandomInt(0, chars.length - 1)];
  }
  return ticker;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

function getRandomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
}

function getRandomBool() {
  return Math.random() < 0.5;
}

function getRandomChainType(exclude = null) {
  const chains = [
    "Ethereum",
    "Solana",
    "Binance Smart Chain",
    "Polygon",
    "Avalanche",
    "Cardano",
  ];
  const availableChains = exclude
    ? chains.filter((chain) => chain !== exclude)
    : chains;
  return availableChains[getRandomInt(0, availableChains.length - 1)];
}

function getRandomImageUrl() {
  return `https://ipfs.io/ipfs/Qm${getRandomString(44)}`;
}

function getRandomDate(baseDate) {
  const base = new Date(baseDate);
  const variation = getRandomInt(-30, 30); // days variation
  base.setDate(base.getDate() + variation);
  return base.toISOString();
}

function getRandomWalletAddress() {
  return getRandomString(44);
}

function getRandomTokenAddress() {
  return getRandomString(44);
}

/**
 * Helper to get a random subset of fields
 */
function getRandomFields(fields, count) {
  const shuffled = fields.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Function to generate a random variation of the provided JSON
 */
function generateRandomVariation() {
  const baseJson = {
    type: "new_token",
    data: {
      Token: {
        id: 0,
        total_volume: 14118421.052631,
        buy_volume: 14118421.052631,
        sell_volume: 0,
        chain_type: "solana",
        market_cap: 28.709537123330197,
        image_url:
          "https://ipfs.io/ipfs/QmR84QAvvYvMXCpjjSkCSGLQbarwS13s3qwwe6iTfVvp8P",
        creation_time: "2024-11-23T13:19:07.852971474Z",
        ticker: "DiddyList",
        mint_authority: false,
        freeze_authority: false,
        is_token_mutable: true,
        is_lp_burned: false,
        bonding_progress: 5472260.410468198,
        liquidity: 30.399999999999984,
        name: "The Diddy List",
        holders: 0,
        bad_actors: 0,
        developer_wallet: "2tfKDRgPN4pHNNYZVNPJpokSKwmS5vvyCe5HoXQUmUV5",
        risk_Score: 0,
        symbol: "DiddyList",
        signature:
          "28njrBbg3oUoo5YfA5geYBXD8zPnEXYnLQqtbP2wH4HwnhvG3GTUQVfZqVaiMTNHwxX6GN76qe3YEBVT5F8S5Ssf",
        token_address: "6JaSvZhXNaEKcdB9qQhVrxrRY1ALqzayyhB3kTv7pump",
      },
      Socials: {
        id: "320195",
        twitter: "",
        telegram: "",
        discord: "",
        website: "",
      },
    },
  };
  const newJson = JSON.parse(JSON.stringify(baseJson));
  const token = newJson.data.Token;

  const modifiableFields = [
    "id",
    "total_volume",
    "buy_volume",
    "sell_volume",
    "chain_type",
    "market_cap",
    "image_url",
    "creation_time",
    "ticker",
    "mint_authority",
    "freeze_authority",
    "is_token_mutable",
    "is_lp_burned",
    "bonding_progress",
    "liquidity",
    "name",
    "holders",
    "bad_actors",
    "developer_wallet",
    "risk_Score",
    "symbol",
    "signature",
    "token_address",
  ];

  // Determine number of fields to modify (2 or 3)
  const fieldsToModify = getRandomFields(modifiableFields, getRandomInt(2, 3));

  token.id = getRandomInt(1, 1000000);

  token["bonding_progress"] = getRandomFloat(0.3, 1) * 1000_000;
  token["total_volume"] = getRandomFloat(0, 1) * 10_000_000;
  token["image_url"] = "https://picsum.photos/100/?" + getRandomInt(1, 1000);

  token["name"] = generateTokenName();
  token["ticker"] = generateTicker();
  token["total_volume"] = getRandomFloat(0, 1) * 1000;
  const date = new Date();
  token["creation_time"] = date.toISOString();

  fieldsToModify.forEach((field) => {
    switch (field) {
      case "symbol":
      case "ticker":
      case "name":
        token[field] =
          field === "name" ? `Token ${getRandomString(5)}` : getRandomString(6);
        break;
      case "buy_volume":
      case "sell_volume":
      case "market_cap":
      case "liquidity":
        token[field] = getRandomFloat(0, token[field] * 1.1); // Up to +10%
        break;
      case "chain_type":
        token.chain_type = getRandomChainType(token.chain_type);
        break;
      case "image_url":
        token.image_url = getRandomImageUrl();
        break;
      case "mint_authority":
      case "freeze_authority":
      case "is_token_mutable":
      case "is_lp_burned":
        token[field] = getRandomBool();
        break;
      case "holders":
      case "bad_actors":
      case "risk_Score":
        token[field] = getRandomInt(0, field === "risk_Score" ? 10 : 1000);
        break;
      case "developer_wallet":
      case "signature":
      case "token_address":
        token[field] = getRandomString(field === "signature" ? 64 : 44);
        break;
      default:
        break;
    }
  });

  const socials = newJson.data.Socials;
  const socialFields = ["twitter", "telegram", "discord", "website"];
  const socialFieldsToModify = getRandomFields(
    socialFields,
    getRandomInt(1, 2),
  );

  socialFieldsToModify.forEach((field) => {
    switch (field) {
      case "twitter":
        socials.twitter = `https://twitter.com/${getRandomString(10)}`;
        break;
      case "telegram":
        socials.telegram = `https://t.me/${getRandomString(10)}`;
        break;
      case "discord":
        socials.discord = `https://discord.gg/${getRandomString(8)}`;
        break;
      case "website":
        socials.website = `https://www.${getRandomString(10).toLowerCase()}.com`;
        break;
      default:
        break;
    }
  });

  return newJson;
}

export default generateRandomVariation;
