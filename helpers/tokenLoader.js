
import { paths } from '../config.js';
import fs from 'fs';

function loadTokens() {
  try {
    const data = fs.readFileSync(paths.tokens, 'utf8');
    const parsedData = JSON.parse(data);
    const tokens = parsedData.tokens;
    if (!Array.isArray(tokens)) {
      throw new Error('tokens.json must contain an array of tokens.');
    }
    return tokens;
  } catch (err) {
    console.error('Error reading tokens.json:', err.message);
    process.exit(1);
  }
}

export default loadTokens;
