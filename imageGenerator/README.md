# Image Generator

Only works on the server Rob gave us, so cannot be run on existing server.

Fetches articles that do not have images (by checking article table "image_gen" field)
Generates images using the original titles as prompts
Saves images to client/public using article ID as name
Records image generation in Article table "image_gen" field
Front end renders images based on values in image_gen, else uses original images
Also cleaned up a few bits and pieces in the front end

Categories with no stories are no longer rendered on the home page
Headlines section renders first 4 stories from 'world' category

## To run the image generator:
Make sure the database is poultated with articles.  From the cmd line on the server:

```shell
python3 imageGen.py
```

Files are stored in the public folder of the application and will be fetched on the front end accordingly.  If an article does not have a generated image associated with it, the default original article image will be displayed
