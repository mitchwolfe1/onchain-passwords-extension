# On-Chain Encrypted Data Manager Extension

Chrome extension to store encrypted data on-chain

## Getting Started

1. Clone the repository

2. Install node modules: `npm i`

3. Build the extension: `npm run build`

4. Install the extension into Chrome:
	- Open Chrome and navigate to `chrome://extensions`
	- In the top right corner, switch on developer mode
	- In the top bar, select `Load unpacked extension`
	- Select the `build` folder created by `npm run build`
	- The extension is now installed

5. Deploy the wallet contract (other repository)

6. Select the extensions icon on the right side of your chrome toolbar, and pin the extension.

7. Open the extension popup and interact.

## Interaction

When first opening the extension, it will prompt a password. The default is 'Password'. This unlocks the interaction session.

The store tab allows you to store data for the website.

The retrieve tab allows you to retrieve any stored data.

## Config

The file `src/config/constants.ts` contains several important variables:

- `PRIVATE_KEY`: This is the private key of the wallet owner. Default is the PK of the first local HardHat account.

- `MASTER_HASH`: The hash (keccak256) of the master password used to unlock interaction. Default is the hash of 'Password'.

- `WALLET_ADDRESS`: This is the address of the deployed wallet contract. Default is the address on the local node.

- `WALLET_ABI`: This is the ABI of the deployed wallet contract. It references the abi field from `Wallet.json` in the same directory.

- `FORWARDER_ADDRESS`: This is the address of the deployed Forwarder GSN contract.

- `PAYMASTER_ADDRESS`: This is the address of the deployed Paymaster GSN contract.

- `PENALIZER_ADDRESS`: This is the address of the deployed Penalizer GSN contract.

- `RELAYHUB_ADDRESS`: This is the address of the deployed RelayHub GSN contract.

- `STAKEMANAGER_ADDRESS`: This is the address of the deployed StakeManager GSN contract.

- `VERSIONREGISTRY_ADDRESS`: This is the address of the deployed VersionRegistry GSN contract.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
