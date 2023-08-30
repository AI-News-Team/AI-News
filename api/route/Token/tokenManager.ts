// tokenManager.ts
import { generateAppToken } from './services/tokenGen';
import fs from 'fs';

// Function to generate tokens and permissions
export const generateTokensAndPermissions = async () => {
  const clientToken = await generateAppToken('client');
  const scrapyToken = await generateAppToken('scrapy');

  const tokensAndPermissions = {
    client: {
      token: clientToken,
      permissions: ['READ.article.list', 'READ.article.list_all', 'READ.article.summary'],
    },
    scrapy: {
      token: scrapyToken,
      permissions: ['READ.article.create_raw'],
    },
  };

  return tokensAndPermissions;
};

// Function to save tokens and permissions to .env file
export const saveTokensToEnvFile = async () => {
  try {
    const tokensAndPermissions = await generateTokensAndPermissions();
    const envContent = Object.keys(tokensAndPermissions)
      .map(component => {
        const { token, permissions } = tokensAndPermissions[component];
        const permissionStrings = permissions.map(permission => `'${token}' '${permission}'`);
        return permissionStrings.join('\n');
      })
      .join('\n\n');

    fs.writeFileSync('.env', envContent);
    console.log('Tokens and permissions saved to .env file');
  } catch (error) {
    console.error('Error saving tokens to .env file:', error);
  }
};
