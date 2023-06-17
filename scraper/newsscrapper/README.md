# How does everything work?
1. Each spider fetches the articles' data from all the categories on the website
2. Extracted data is going to be formated to match DB structure.
3. Once the data is scraped, it goes to the pipeline, where it sends it to the `API`
4. If the error occured, it will say in the console: "FAILED TO SEND DATA" + the error message
5. If there were no errors, it will print: "DATA SENT SUCCESSFULLY"
