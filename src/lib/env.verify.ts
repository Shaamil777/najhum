// Run with the application environment loaded; never print credentials.
import { validateEnv } from './env';
validateEnv();
console.log('Environment configuration is valid.');
