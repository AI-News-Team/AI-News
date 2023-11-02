# Let's set you up with **_Scrapy_**
### 1. Python installation
* Let's install [**_Python_**](https://www.python.org/downloads/)
* After installation, we need to add **_Python_** to `path` in `environmet variable`
* Press `Win` key, type: "env"
* Above cancel button you will see `Environmet Variable` button. Open it
* In the `Variable` column find a field called **_Path_**. Open it (Double click)
* Press `New` and paste the path that we will find in the steps described below
* Press `Win` key again, and paste in the search bar:
``` shell
%APPDATA%
```  
* Find **_Python_** in this directory and open it
* Copy an **absolute** path of `Python311\Scripts` + `Python311\site-packages` and paste it in your new `Environmet Variable` that we opened before
**NOTE: `Python311\Scripts` + `Python311\site-packages` should be two different environmet variables**
* Click `OK` on the previously opened tabs
* Make sure that **_Python_** is installed. Run this(those) command(s) in the terminal:
``` shell
python3 --version
``` 
OR
``` shell
python --version
```
NOTE: You might need to restart your PC if you won't be able to run **_scrapy_** commands

NOTE: If you use **_VS CODE_**, I would suggest to install **_Python_** through extensions in **_VS CODE_** 

---
### 2. Scrapy installation
* Let's install [**_Scrapy_**](https://scrapy.org/) with [**_pip_**](https://pip.pypa.io/en/stable/cli/pip_install/)
* Open any terminal
* Paste in the terminal:
``` shell
pip install scrapy
```

---

### 3. Create `local.env` or `virtual.env` file 
* It should be created inside project's root directory
* Set `SCRAPY_TOKEN` along with `API_PORT` & `API_HOST`
* More documentation for setting `scrapy` tokens can be found in `api`'s `README` file
* That should be it!
--- 

### How to run Spiders with a script?
* Add `.env` to `/newsscrapper` directory. There is a `template.env` in `/scraper` that will help you with other sub-setup
* Then go to `scraper` directory
``` shell
cd scraper/
```
* Run the following to start scraping data with `cnn`, `bbc`, `newYorkTimes` and `foxNews` spiders:
``` shell
./runspiders.sh
```
### How to run a Spider manually?
* Open the cloned project with any IDE
* Open terminal and get into `spiders` directory
``` shell
cd scraper/newsscrapper/spiders/
``` 
* If you want to run a spider paste in the console (where **_bbc_** name of the spider):
``` shell
scrapy crawl bbc
```
* If you want to test your `xpath` commands without running a spider everytime, you can run:
``` shell
scrapy shell "Your link to the website here. Yes, wrap it in quotes"
```
