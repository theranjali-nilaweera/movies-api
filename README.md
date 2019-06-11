# movies-api

## Assumptions
*The Movies will be merged from both sites based on the value of the id after removing the prefix
*The server will attempt to retry with a increasing time delay.
*For the details retrieval if 404 recieved it will not retry
*That you would have nvm and node 10.16 installed =D next step would be to spin up a docker container so this assumption can be taken out

## Steps
* Download the code base
* run the run-local.sh file to get the server running

## Tests
Test all
![picture alt](https://github.com/theranjali-nilaweera/movies-api/blob/master/test-all.png "all tests")

Test retry
![picture alt](https://github.com/theranjali-nilaweera/movies-api/blob/master/test-retry.png "test-retry")

