import chalk from 'chalk';

/**
 * Safely get an environment variable
 * Throws error if the variable is missing
 */
export const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    console.log(chalk.red(`[ENV] Missing required environment variable: ${key}`));
    throw new Error(`Missing required environment variable: ${key}`);
  }

  console.log(chalk.green(`[ENV] Loaded environment variable: ${key}`));
  
  return value;
};