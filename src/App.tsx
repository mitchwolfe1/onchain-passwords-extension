import { PropsWithChildren, useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { GSNConfig, RelayProvider } from '@opengsn/provider';
import { Retrieve } from './components/Retrieve';
import { Store } from './components/Store';
import { Header } from './components/Header';
import { Unlock } from './components/Unlock';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
	PAYMASTER_ADDRESS,
	WALLET_ADDRESS,
	WALLET_ABI,
} from './config/constants';
import { Message } from './chrome/types';

const Web3HttpProvider = require('web3-providers-http');

function App() {
	const [unlocked, setUnlocked] = useState<boolean>(false);
	const [masterHash, setMasterHash] = useState<string>('');
	const [privateKey, setPrivateKey] = useState<string>('');
	const [wallet, setWallet] = useState<Contract | null>(null);
	const [activeTab, setActiveTab] = useState<number>(0);

	const setupSession = () => {
		chrome.runtime.sendMessage(
			{ name: 'getSession' } as Message,
			(response: { privateKey: string | undefined, masterHash: string | undefined }) => {
				setMasterHash(response.masterHash ? response.masterHash : '');
				setPrivateKey(response.privateKey ? response.privateKey : '');
				setUnlocked(true);
		});
	};

	useEffect(() => {
		chrome.runtime.sendMessage({ name: 'isUnlocked' }, (response: boolean) => {
			if (response) setupSession();
		});
	}, []);

	useEffect(() => {
		const connect = async () => {
			const web3 = new Web3HttpProvider('http://localhost:8545');
			const config: Partial<GSNConfig> = {
				paymasterAddress: PAYMASTER_ADDRESS,
				loggerConfiguration: {
					logLevel: 'error'
				}
			};
			const gsn: RelayProvider = await RelayProvider.newProvider({ provider: web3, config }).init();
			gsn.addAccount(privateKey);
			const provider = new ethers.providers.Web3Provider(gsn as unknown as ethers.providers.ExternalProvider);
			setWallet(new Contract(WALLET_ADDRESS, WALLET_ABI as ethers.ContractInterface, provider.getSigner()));
		};

		if (unlocked)
			connect().catch(console.error);

	}, [unlocked, privateKey]);

	interface TabPanelProps {
		value: number;
		index: number;
	}
	const TabPanel = (props: PropsWithChildren<TabPanelProps>) => {
		const { children, value, index } = props;
		return (
			<div
				role='tabpanel'
				hidden={value !== index}
			>
				{value === index && children}
			</div>
		)
	};

	return (
		<div className='App'>
			<Header connected={!!wallet} />
			{unlocked ?
				<>
					<Tabs sx={{ width: '100%' }} value={activeTab} onChange={(_, value) => setActiveTab(value)}>
						<Tab label='Store' />
						<Tab label='Retrieve' />
					</Tabs>
					<TabPanel value={activeTab} index={0}>
						<Store wallet={wallet} />
					</TabPanel>
					<TabPanel value={activeTab} index={1}>
						<Retrieve wallet={wallet} />
					</TabPanel>
				</>
				:
				<Unlock onUnlock={setupSession} />
			}
		</div>
	);
}

export default App;
