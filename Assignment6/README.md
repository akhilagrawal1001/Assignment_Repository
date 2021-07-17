## Webserver
This is code for creating a locally hosted webserver, at a given port.

#### Run the code to host the server:
1. git clone "https://github.com/akhilagrawal1001/Blocks_and_Chains_Assignments"
2. cd ./Blocks_and_Chains_Assignments/Assignment6
3. node main.js

To get the hash of `any string`, send a POST request to the `./hash` endpoint of the server

#### Sending a POST request:
To send your own post request run the command `node request.js` and enter the string for which hash has to be calculated.
The program will send a post request to the required destination with the given data as `request body`.