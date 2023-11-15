# delete article where name is "test"
TEST_ARTICLE_NAME="Test article"

docker exec \
  -it $DATABASE_CONTAINER_NAME  \
    psql \
      -U $POSTGRES_USER \
      -d $POSTGRES_DB \
      -c "DELETE FROM Article_Raw WHERE name = "Test article";"