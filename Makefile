.DEFAULT_GOAL := all
SHELL         :=  bash

# run react app
run:
	cd front-end && npm run start

# get git log
group01.log.txt:
	git log > group01.log.txt
