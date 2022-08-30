const cryptoJS = require('crypto-js');
const ethCrypto = require('eth-crypto');
const ethers = require('ethers');

export const keys = (privateKey: string) => {
	return [ethCrypto.publicKeyByPrivateKey(privateKey), privateKey];
}

export const keccak = (value: string, salt: string = '') =>
	ethers.utils.keccak256(Buffer.from(value + salt));

export const asymEncrypt = async (publicKey: string, message: string) => {
	const encrypted = await ethCrypto.encryptWithPublicKey(publicKey, message);
	return ethCrypto.cipher.stringify(encrypted);
};

export const asymDecrypt = async (privateKey: string, message: string) => {
	const encrypted = ethCrypto.cipher.parse(message);
	return ethCrypto.decryptWithPrivateKey(privateKey, encrypted);
};

export const symEncrypt = (key: string, message: string) => {
	return cryptoJS.AES.encrypt(message, key).toString();
}

export const symDecrypt = (key: string, message: string) => {
	return cryptoJS.AES.decrypt(message, key).toString(cryptoJS.enc.Utf8);
}