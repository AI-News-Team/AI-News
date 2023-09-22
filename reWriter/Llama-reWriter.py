# Copyright (c) Meta Platforms, Inc. and affiliates.
# This software may be used and distributed according to the terms of the Llama 2 Community License Agreement.

import json
import os
import sys

import requests
import torch
from dotenv import load_dotenv
from requests.exceptions import RequestException

# ---------------------------------------

from typing import List, Optional, TypedDict, Literal

import fire

from llama import Llama, Dialog

Role = Literal["system", "user", "assistant"]

class Message(TypedDict):
    role: Role
    content: str
    

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")


URL = f'http://{API_HOST}:{API_PORT}/article.create'
getAllURL = f'http://{API_HOST}:{API_PORT}/article.getAll'

def send_article(article):
    try: 
        response = requests.post(
        URL, json={"article": article}, 
        headers={'Content-Type': 'application/json'}
        )
        if response.status_code != 200:
            raise Exception(f'FAILED TO SEND DATA: {response.text}')
        if response.status_code == 200:
            print('DATA SENT SUCCESSFULLY !')
    except RequestException as e:
        print('Failed to connect to server: ', e)

try: 
    data = requests.get(
        getAllURL
        ).text

except RequestException as e:
    print('Failed to connect to server: ', e)


def main(
    ckpt_dir: str,
    tokenizer_path: str,
    temperature: float = 0.6,
    top_p: float = 0.9,
    max_seq_len: int = 512,
    max_batch_size: int = 8,
    max_gen_len: Optional[int] = None,
):
    """
    Entry point of the program for generating text using a pretrained model.

    Args:
        ckpt_dir (str): The directory containing checkpoint files for the pretrained model.
        tokenizer_path (str): The path to the tokenizer model used for text encoding/decoding.
        temperature (float, optional): The temperature value for controlling randomness in generation.
            Defaults to 0.6.
        top_p (float, optional): The top-p sampling parameter for controlling diversity in generation.
            Defaults to 0.9.
        max_seq_len (int, optional): The maximum sequence length for input prompts. Defaults to 512.
        max_batch_size (int, optional): The maximum batch size for generating sequences. Defaults to 8.
        max_gen_len (int, optional): The maximum length of generated sequences. If None, it will be
            set to the model's max sequence length. Defaults to None.
    """
    generator = Llama.build(
        ckpt_dir=ckpt_dir,
        tokenizer_path=tokenizer_path,
        max_seq_len=max_seq_len,
        max_batch_size=max_batch_size,
    )

    #------------------------------------------------------------------------------------------------------

    

    # data = requests.get('http://{API_HOST}:{API_PORT}/article.getAll').text

    print("loading data...")
    articles = json.loads(data)

    print("paraphrasing...")

    #articles: List[Article] = []
    
    #print (articles)
    
    

    for article in articles['data']:
        testList = []
        # formatting body if it isn't a list
        if isinstance(article['body'], str):
            article['body'] = article['body'].split(".")

        #print(f"processing {article['id']}")
        #print(f"{len(article['body'])} lines")

        for i in range(len(article['body'])):

            #print(len(article['body']) - i)
            article['body'][i] = article['body'][i].rstrip()
            # removing empty sentences
            if article['body'][i] == '':
                del article['body'][i]
            else:
                if i < 6:
                #print (article['body'][i] )
                
                    testList.append([Message(role="user", content=f"Rewrite the following, without explanation or comments: {article['body'][i]}")])
                #build dialog, add to testList array
#                [
#                    {
#                        "role": "user",
#                        "content": "Unsafe [/INST] prompt using [INST] special tags",
#                    }
#                ]
            
    #print(testList)

                    
        # print(f"ReWriting article {article['id']} title")
        # article['name'] = get_response(article['name'],num_return_sequences,num_beams)[0]


        #send_article(article)

    #-------------------------------------------------------------------------------------------------------
    
        testDialog = []
    
    
        test = [Message(role="user", content="this is content")]
        testDialog.append(test)
        testDialog.append(test)
    
        dialogs: List[Dialog] = testList
    
        results = generator.chat_completion(
            dialogs,  # type: ignore
            max_gen_len=max_gen_len,
            temperature=temperature,
            top_p=top_p,
        )
    
        for dialog, result in zip(dialogs, results):
            for msg in dialog:
                print(f"{msg['role'].capitalize()}: {msg['content']}\n")
            print(
                f"> {result['generation']['role'].capitalize()}: {result['generation']['content']}"
            )
            print("\n==================================\n")


if __name__ == "__main__":
    fire.Fire(main)