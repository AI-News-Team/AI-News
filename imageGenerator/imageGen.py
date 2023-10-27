import json
import os
import sys

import requests
from dotenv import load_dotenv
from requests.exceptions import RequestException

# stable-diffusion-xl image gen-------------------------------------------------

from diffusers import DiffusionPipeline
from PIL import Image 
import torch

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
pipe.to("cuda")

# --------------------------------------------------------------------

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")

recordImageURL = f'http://{API_HOST}:{API_PORT}/article.recordImage'
getAllImageURL = f'http://{API_HOST}:{API_PORT}/article.getAllImageGen'

def record_image(id):

    try: 
        response = requests.put(
        f'{recordImageURL}/{id}'
        )
        if response.status_code != 200:
            raise Exception(f'FAILED TO UPDATE DATA: {response.text}')
        if response.status_code == 200:
            print('DATA UPDATED SUCCESSFULLY !')
    except RequestException as e:
        print('Failed to connect to server: ', e)

try: 
    data = requests.get(
        getAllImageURL
        ).text

except RequestException as e:
    print('Failed to connect to server: ', e)

print("Generating images...")
articles = json.loads(data)

print("paraphrasing...")

for article in articles['data']:
    print(article['name'])
    print(article['id'])
    try:
        prompt = f"{article['name']}, Photorealistic, highly detailed, Fujifilm X-T4, Sony FE 85mm f/1.4 GM"

        image = pipe(prompt=prompt).images[0]

        #resize image
        newsize = (976, 976)
        resized = image.resize(newsize)

        # Setting cropped image size if required
        left = 0
        top = 213
        right = 976
        bottom = 763

        # crop image if required
        cropped = resized.crop((left, top, right, bottom))

        resized.save(f"../client/public/article_images/{article['id']}.png")
        
        #records image generation in the database
        record_image(article['id'])
        
    except RequestException as e:
        print('Error generating image: ', e)

sys.exit("exiting")