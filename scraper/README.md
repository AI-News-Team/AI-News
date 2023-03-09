# Let's set you up
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
* Copy an **absolute** path and paste it in your new `Environmet Variable` that we opened before
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
NOTE: If you use **_VS CODE_** I would suggest to install **_Python_** through extensions in **_VS CODE_** 

---
### 2. Scrapy installation
* Let's install [**_Scrapy_**](https://scrapy.org/) with [**_pip_**](https://pip.pypa.io/en/stable/cli/pip_install/)
* Open any terminal
* Paste in the terminal:
``` shell
pip install scrapy
```
* That should be it!

---
### How to run a Spyder?
* Open the cloned project with any IDE
* Open terminal and get into `spyders` directory
``` shell
cd scraper/newsscrap/newsscrapper/spiders/
``` 
* If you want to run a spider paste in the console (where **_bbc_** name of the spyder):
``` shell
scrapy crawl bbc
```
* If you want to test your `xpatth` commands without running a spyder everytime, you can run:
``` shell
scrapy shell "https://www.bbc.com/news"
```