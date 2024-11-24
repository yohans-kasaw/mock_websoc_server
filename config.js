import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const websocketConfig = {
  port: 8000,
};

export const paths = {
  tokens: path.join(__dirname, "./tokens.json"),
};
