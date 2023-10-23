#!/bin/bash

# Loads env vars
if [ -f ../local.env ]; then
  source ../local.env
elif [ -f ../virual.env ]; then
  source ../virtual.env
else
  echo "Global .env file not found. Please create it."
  exit 1
fi

# Checks if Docker Daemon is running
if ! docker stats --no-stream &> /dev/null; then
  echo "Docker Daemon not running ❌"
  exit 1
fi

# Use the token values from .env vars 
SCRAPY_TOKEN="$SCRAPY_TOKEN"
REWRITER_TOKEN="$REWRITER_TOKEN"

# SQL script to insert tokens
SQL_QUERY=$(cat <<EOF
-- Insert tokens into the Tokens table
INSERT INTO Tokens (token, module) VALUES ('$SCRAPY_TOKEN', 'scrapy');
INSERT INTO Tokens (token, module) VALUES ('$REWRITER_TOKEN', 'reWriter');

-- Insert routes for SCRAPY_TOKEN
INSERT INTO Permissions (token_id, route_id)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$SCRAPY_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route_name = '/article.create_raw') AS route_id;

-- Insert routes for REWRITER_TOKEN
INSERT INTO Permissions (token_id, route_id)
SELECT
    (SELECT token_id FROM Tokens WHERE token = '$REWRITER_TOKEN') AS token_id,
    (SELECT route_id FROM Routes WHERE route_name = '/article.create') AS route_id;
EOF
)

# Execute the SQL script to insert tokens into the running container
docker exec -i "$DATABASE_CONTAINER_NAME" psql -U $POSTGRES_USER -d $POSTGRES_DB <<< "$SQL_QUERY"

echo ""
echo "Tokens added to the DB"
echo ""
echo "Scrapy token:     $SCRAPY_TOKEN"
echo "reWriter token:   $REWRITER_TOKEN"
