# Contributing
## Setup

1. Install the following tools, if they are not already installed:
### Required
* [Git](https://git-scm.com/downloads)
* [Docker](https://docs.docker.com/engine/install/)
* [Node.js](https://nodejs.org/en/download/)
### Optional (but recommended)
* [Visual Studio Code](https://code.visualstudio.com/download)

2. Clone the repository ```git clone https://github.com/TheMasterGeese/Discord-Integration master```

3. Install npm dependencies ``` npm ci ```

4. Create a copy of the env-sample file, fill out each variable with values appropriate to your dev environment, then rename it to .env. DO NOT COMMIT THIS FILE, as this may contain sensitive and/or private information.

5. Update the `package.json` and `module.json` files with your Module's details.

6. (Optional) To set up a Foundry instance that uses HTTPS, you will need to generate an SSL Certificate and an SSL key. For development a self-signed certificate is fine, instructions for generating these can be found [here.](https://helpcenter.gsx.com/hc/en-us/articles/115015960428-How-to-Generate-a-Self-Signed-Certificate-and-Private-Key-using-OpenSSL#:~:text=Right%2Dclick%20the%20openssl.exe,key%20%2Dout%20certificate)

7. (Optional): If you are using Visual Studio Code as your IDE, the following extensions will be helpful during development:
* https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
* https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github
* https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
* https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright
## Releases

Be sure to check off all the following items before releasing a new version:

* Increment the version number in package.json and make sure it is incremented in bundle/module.json as well.
* Update Changelog based on all the changes made.
* Ensure all new code has been documented.
* Ensure all issues for the milestone representing the new version have been completed.

