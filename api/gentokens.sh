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

# Checks if Docker Daemon is running
if ! docker stats --no-stream &> /dev/null; then
  echo "Docker Daemon not running ❌"
  exit 1
fi

# Transpile TS to JS for tokenGen.ts 
# Had troubles with ts-node, so I just used tsc
tsc ./token/tokenGen.ts

# Generate tokens for 'scrapy', and 'reWriter' modules
SCRAPY_TOKEN=$(node -e "require('./token/tokenGen.js').generateAppToken('scrapy', '$JWT_SECRET', '$JWT_LIFETIME').then(console.log)")
REWRITER_TOKEN=$(node -e "require('./token/tokenGen.js').generateAppToken('reWriter', '$JWT_SECRET', '$JWT_LIFETIME').then(console.log)")

# Append tokens to existing vars in the local.env
sed -i "s#^SCRAPY_TOKEN=.*#SCRAPY_TOKEN=$SCRAPY_TOKEN#" ../local.env
sed -i "s#^REWRITER_TOKEN=.*#REWRITER_TOKEN=$REWRITER_TOKEN#" ../local.env

# SQL script to insert tokens
SQL_QUERY=$(cat <<EOF
-- Insert tokens into the Tokens table
INSERT INTO Tokens (token, module) VALUES ('$SCRAPY_TOKEN', 'scrapy');
INSERT INTO Tokens (token, module) VALUES ('$REWRITER_TOKEN', 'reWriter');

-- Insert routes for SCRAPY_TOKEN
INSERT INTO Permissions (token_id, route_id)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$SCRAPY_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route_name = '/article.create_raw') AS route_id,
    '/article.create_raw' AS route;

-- Insert routes for REWRITER_TOKEN
INSERT INTO Permissions (token_id, route_id)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$REWRITER_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route_name = '/article.create') AS route_id,
    '/article.create' AS route;
EOF
)

# Execute the SQL script to insert tokens into the running container
docker exec -i "$DATABASE_CONTAINER_NAME" psql -U $POSTGRES_USER -d $POSTGRES_DB <<< "$SQL_QUERY"

echo ""
echo "Tokens generated, appended to local.env file, and added to the DB."
echo ""
echo "Scrapy token:     $SCRAPY_TOKEN"
echo "reWriter token:   $REWRITER_TOKEN"
