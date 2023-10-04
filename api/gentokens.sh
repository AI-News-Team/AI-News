#!/bin/bash

# Loads env vars
if [ -f ../local.env ]; then
  source ../local.env
else
  echo "Global local.env file not found. Please create it."
  exit 1
fi

# Checks if JWT_LIFETIME and SECRET_KEY are set
if [ -z "$JWT_LIFETIME" ] || [ -z "$JWT_SECRET" ]; then
  echo "JWT_LIFETIME and JWT_SECRET must be set in the global .env file."
  exit 1
fi

# Generate tokens for 'client', 'scrapy', and 'reWriter' modules
# CLIENT_TOKEN=$(node -e "require('./token/tokenGen.ts').generateAppToken('client').then(console.log)")
SCRAPY_TOKEN=$(node -e "require('./token/tokenGen.ts').generateAppToken('scrapy', '$JWT_SECRET', '$JWT_LIFETIME').then(console.log)")
REWRITER_TOKEN=$(node -e "require('./token/tokenGen.ts').generateAppToken('reWriter', '$JWT_SECRET', '$JWT_LIFETIME').then(console.log)")

# Save tokens to .env file
# echo "CLIENT_TOKEN=$CLIENT_TOKEN" >> .env
echo "SCRAPY_TOKEN=$SCRAPY_TOKEN" >> local.env # Perhaps we should use virtual.env instead of local.env?
echo "REWRITER_TOKEN=$REWRITER_TOKEN" >> local.env

echo "Scrapy token: $SCRAPY_TOKEN"
echo "ReWriter token: $REWRITER_TOKEN"

POSTGRES_PASSWORD="$POSTGRES_PASSWORD"
POSTGRES_USER="$POSTGRES_USER"

# Use psql to insert tokens into the database and assign routes to them
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<EOF
INSERT INTO tokens (token, module) VALUES ('$SCRAPY_TOKEN', 'scrapy');
INSERT INTO tokens (token, module) VALUES ('$REWRITER_TOKEN', 'reWriter');

--
-- Insert routes for SCRAPY_TOKEN
--
INSERT INTO Permissions (token_id, route_id, route)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$SCRAPY_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route = '/article.create_raw') AS route_id,
    '/article.create_raw' AS route;

--
-- Insert routes for REWRITER_TOKEN
--
INSERT INTO Permissions (token_id, route_id, route)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$REWRITER_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route = '/article.create_raw') AS route_id,
    '/article.create' AS route;
EOF

echo "Tokens generated, saved in .env file, and routes added to the DB."
