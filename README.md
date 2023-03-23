CPSC 559 - Advance Blockchain Technology
Mid Term Project
By Team DOGE

Team members:
Divyansh Mohan Rao : divyanshrao@csu.fullerton.edu (885191403)
Janhvi Guha: 
Harshavardhan Jamedar  : 
Shrinivas Patil :


Professor
Prof. Wenlin Han, CSU Fullerton: whan@fullerton.edu

Additional Work
Updated the user interface using React framework.
Added customized images to Zombie
Updated the contract to have more than 1 zombies per owner
Added UI code to handle more than 1 zombies per owner
Added function OwnerOf to check the ownership of Zombie.

Project Repo URL
https://github.com/divyanshrao38/zombie_blockchain.git 


Instructions:
Requirments:
Metamask account
Node.js
npx-create-react-app
Ganache


Setting Up Enviorment:
Insatlling Metamask wallet either via using chromium extentions link
Installing Node.js
Installing ganache
1. Clone/download the repos
2. Configure the dependency
 Make sure you have replaced the ownership in doge-fronent/app.js with your own contract ownership address.
 and then do npm install both from the root and then from doge-frontend
3. Verify:
Check wheather contracts are visible on ganache and if not make sure they are initalized and migrated using 'truffle init' and 'truffle migrate' once the initialization is done make sure truffle configuration is correct with the ganache localhost.

4. Connect development blockchain accounts to Metamask
  Use any of the accounts private key and import it into metamask to use the development accounts
  For the "Network Name" field enter "localhost".
  For the "New RPC URL" field enter "http://127.0.0.1:5000".
  For the chain ID enter "5777". Then click save.
5. Test Run:
Run the front end after you have deployed the app using truffle comple and truffle migrate and then do npm start
