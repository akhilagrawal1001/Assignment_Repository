### Block Header
The block consists of index of block, hash of parent block, hash of current block body, a target value, timestamp of mining, and a nonce value.

`Nonce is a minimum non-negative value such that hash of the block is less than target`

This code calculates the nonce value, and notes the corresponding timestamp of mining.

### Running the code
1. Clone the repository by executing the command `git clone "https://github.com/akhilagrawal1001/Blocks_and_Chains_Assignments"`
2. Change the directory to `Blocks_and_Chains_Assignments/Assignment5`
3. Execute the command `node main.js`

Sample Input :

    7
    41a82375fb23603aeb2129e6d05e2b4eb63b576db435f8e4ff2ad62ad4200fda
    0000000f00000000000000000000000000000000000000000000000000000000
    sample.dat

Sample Output #1: 

    The nonce value for the block is :
    97442025
    The timestamp when the block is mined is :
    1624645552344834500
    The hash of the block is :
    000000056a576a321e250072170a8ef11c55834ee9acde9865d4b8d1599e5c96
    Time taken to run the code is :
    496 seconds


