import { Message } from './types';
import {
	PRIVATE_KEY,
	MASTER_HASH
} from '../config/constants';

type Session = {
	unlocked: boolean;
	masterHash?: string;
	privateKey?: string;
};

let session: Session = {
	unlocked: false,
	masterHash: undefined,
	privateKey: undefined,
};

chrome.runtime.onInstalled.addListener((details) => {
	console.log('[background.js] onInstalled', details);
	// Master hash aes encrypted with iteself
	// Private key aes encrypted with master hash
	// TODO: Account creation & generate values
	chrome.storage.local.set({
		masterHash: 'U2FsdGVkX18UOlAlaPGhvvgP7Lx0f9yHl87RxIK3iqnMP49o3IS9nxTngAMcDRls2Xps5JIFcYMtZeezYmPUDIsi+zg6yaMq/V6UFeRikZLFsAIdlR+PWm7XvE4UuORr',
		privateKey: 'U2FsdGVkX19ou6Va8ECmlLVP5MumpfTGHuovdSGRmwYARnrEof7/U42Oj3P7vuk4KMGhm/rhhAVQPbuq5C/QAH2Qyc6Nic2lzr3TEJ2cNnQ8QTPtuylI0p/I7nngeDDb'
	}, function () {
		console.log('[background.js] Initialized storage');
	});
});

chrome.runtime.onConnect.addListener((port) => {
	console.log('[background.js] onConnect', port);
});

chrome.runtime.onStartup.addListener(() => {
	console.log('[background.js] onStartup');
});

type MessageResponse = (response?: any) => void;
type MessageHandler = (message: Message, sendResponse: MessageResponse) => void;

chrome.runtime.onMessage.addListener(
	(message: Message, sender: chrome.runtime.MessageSender, sendResponse: MessageResponse) => {
		console.log('[background.js] onMessage: ', message, sender);

		const handler: MessageHandler | undefined = {
			'isUnlocked': isUnlockedHandler,
			'unlockSession': unlockSessionHandler,
			'lockSession': lockSessionHandler,
			'getSession': getSessionHandler,
		}[message.name];
		if (handler) handler(message, sendResponse);

		return true;
	}
);

chrome.runtime.onSuspend.addListener(() => {
	console.log('[background.js] onSuspend');
});

const isUnlockedHandler: MessageHandler = (message, sendResponse) => {
	sendResponse(session.unlocked);
};

const unlockSessionHandler: MessageHandler = (message, sendResponse) => {
	const enteredHash: string = message.params as string;
	//TODO: Get from local storage
	if (enteredHash === MASTER_HASH) {
		session.unlocked = true;
		session.masterHash = MASTER_HASH;
		session.privateKey = PRIVATE_KEY;
	} else {
		session.unlocked = false;
		session.masterHash = undefined;
		session.privateKey = undefined;
	}
	sendResponse(session.unlocked);
};

const lockSessionHandler: MessageHandler = (message, sendResponse) => {
	session.unlocked = false;
	session.masterHash = undefined;
	session.privateKey = undefined;
	sendResponse(session.unlocked);
};

const getSessionHandler: MessageHandler = (message, sendResponse) => {
	sendResponse({
		privateKey: session.privateKey,
		masterHash: session.masterHash
	});
};