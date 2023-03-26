import { config } from "dotenv"
import axios from "axios";
import { useEffect, useState } from "react";
import {Configuration, OpenAIApi } from "openai"

config()

const rewrittenArticles = [];

const getData = async () => {
  try {
    const response = await axios.get(`http://localhost:3002/article.list`);
    return response.data.data
    // console.log(data.data)
  } catch (error) {
    console.log(error);
  }
};

const data = await getData();

console.log(data);

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

data.forEach(async story => {
    await openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `re-write the following: ${story.body}` }],
    })
    .then((res) => {
        // console.log(res.data.choices[0].message.content);
        rewrittenArticles.push(res.data.choices[0].message.content);
        // console.log(res.data.choices);
    }); 

    console.log(rewrittenArticles[2]);
});





