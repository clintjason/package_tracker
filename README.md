# INSTALLATION INSTRUCTIONS

## BACKEND INSTALLATION

Navigate to the backend folder and execute the following command:
_npm install --save_

Afterwards:
Copy the env variables added via mail and replace the mongo_uri with it or with yours.

Execute the backend:
_npm run dev_

## FRONTEND INSTALLATION

Navigate to all the web-\* folders and do an _npm install_

If you have difficulties with installing the _google-maps-react_ package
Delete it from the package.json then run this command:
_npm install google-maps-react@latest --save-dev --legacy-peer-deps_

To execute any of those projects do: _npm run dev_
