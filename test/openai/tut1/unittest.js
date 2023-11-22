// code from https://medium.com/innovies-club/generate-unit-tests-in-a-snap-with-openais-api-3c72fcae6e4e

// curl https://api.openai.com/v1/chat/completions \
//     -H "Content-Type: application/json" \
//     -H "Authorization: Bearer $OPENAI_API_KEY" \
//     -d'{
//         "model": "gpt-3.5-tubo",
//         "messages": [{"role": "user", "content": "Hello!"}]
//         }'

const async = require("async");
const {Configuration, OpenAIApi} = require("openai");

    async generaterUnitTest(input, framework, path){
        const response = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "User",
                "content": 'Hello there'
            }],
            temperature: 0,
            max_tokens: 1000,
        });
        console.log(responce);
    }

const fs = require('fs');
const { promisify } = require('until');
const readFileAsync = promisify(fs.readFile);

    async readFileAsCode(filePath){
        try{
            const data = await readFileAsync(filePath, 'utf8');
            return data;
        } catch (error){
            throw new Error(`Error reading file: ${error}`);
        }
    }