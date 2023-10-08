import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// Generates token
const generateToken = () => {
  const tokenLength = 32;
  const buffer = crypto.randomBytes(tokenLength);
  const token = buffer.toString('hex');
  return token;
};

// Generates salt
const generateSalt = async () => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds);
};

export const generateAppToken = async (component: string, jwtSecret: string, jwtLifetime: string) => {
  let token = '';

  if (component === 'client' || component === 'scrapy' || component === 'reWriter') {
    const salt = await generateSalt();
    const plaintextToken = generateToken();
    token = await bcrypt.hash(plaintextToken, salt);
  } else {
    throw new Error('Invalid component specified');
  }
  
  return token;
};
