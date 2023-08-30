import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Function to generate a random token
const generateToken = () => {
  const tokenLength = 32;
  const buffer = crypto.randomBytes(tokenLength);
  const token = buffer.toString('hex');
  return token;
};

// Function to generate a random salt
const generateSalt = async () => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds);
};

// Export the main token generation function
export const generateAppToken = async (component: string) => {
  let token = '';

  if (component === 'client') {
    // Generate token for client component
    const salt = await generateSalt();
    const plaintextToken = generateToken();
    token = await bcrypt.hash(plaintextToken, salt);
  } else if (component === 'scrapy') {
    // Generate token for scrapy component
    const salt = await generateSalt();
    const plaintextToken = generateToken();
    token = await bcrypt.hash(plaintextToken, salt);
  }

  return token;
};
