if [ -z .env ] ; then
  echo "Unable to initalize search engine!"
  echo "Missing `.env` file ❌";
  exit 1;
fi
source .env;

pip install -r --user requirements.txt
# python main.py # cmdln version
python -m flask --app main.py run --debug -h $SEARCH_ENGINE_HOST -p $SEARCH_ENGINE_PORT
