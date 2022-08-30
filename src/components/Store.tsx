import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Contract } from 'ethers';
import React, { ReactElement, useState } from 'react';
import { MASTER_HASH, PRIVATE_KEY } from '../config/constants';
import { asymEncrypt, keccak, keys, symDecrypt, symEncrypt } from '../util/crypto';

interface StoreProps {
	wallet: Contract | null;
}
export const Store = ({ wallet }: StoreProps): ReactElement => {
	const [website, setWebsite] = useState<string>('');
	const [values, setValues] = useState<string[]>(['']);
	type Status = {
		color: AlertColor | undefined;
		message: string;
	} | null;
	const [status, setStatus] = useState<Status>(null);

	const change = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValues(
			Object.assign([...values], {
				[index]: value
			})
		);
	};

	const add = () => {
		setValues([...values, '']);
	};

	const remove = () => {
		if (values.length === 0) return;
		setValues([...values.slice(0, values.length - 1)]);
	};

	const submit = async () => {
		if (!wallet) {
			setStatus({ color: 'error', message: 'Error: Not connected' });
			return;
		}

		if (website.trim().length === 0) {
			setStatus({ color: 'error', message: 'Error: No website entered' });
			return;
		}

		const filtered = values.filter(v => v.trim() !== '');
		if (filtered.length === 0) {
			setStatus({ color: 'error', message: 'Error: No values entered' });
			return;
		}

		try {
			const [publicKey] = keys(PRIVATE_KEY);
			const encrypted = [];
			for (const value of filtered) {
				encrypted.push(`0x${await asymEncrypt(publicKey, value)}`);
			}
			const key = keccak(website, MASTER_HASH);
			await wallet.store(key, encrypted);
			setWebsite('');
			setValues(['']);
			setStatus({ color: 'success', message: 'Successfully saved values' });
		} catch (error) {
			setStatus({ color: 'error', message: `Error: ${error}` });
		}
	};

	const closeAlert = () => setStatus(null);

	return (
		<Container sx={{ textAlign: 'center', padding: 2 }}>
			{!!wallet ?
				<>
					{status &&
						<Alert
							onClose={closeAlert}
							severity={status.color}
						>
							{status.message}
						</Alert>
					}
					<Container>
						<TextField
							size='small'
							variant='outlined'
							label='Website'
							onChange={(e) => setWebsite(e.target.value)}
							value={website}
							margin='normal'
							fullWidth
						/>
					</Container>
					<Divider sx={{ marginTop: 2, marginBottom: 1 }} />
					<Container>
						<IconButton onClick={add}>
							<AddCircle />
						</IconButton>
						<IconButton onClick={remove} disabled={values.length <= 1}>
							<RemoveCircle />
						</IconButton>
						<Box maxHeight={275} sx={{ overflow: 'auto' }} padding={1}>
							{values.map((v, i) =>
								<TextField
									key={i}
									size='small'
									onChange={change(i)}
									value={v}
									label={`Value ${i + 1}`}
									margin='dense'
									fullWidth
								/>
							)}
						</Box>
						<Button fullWidth onClick={submit}>Store</Button>
					</Container>
				</>
				:
				<Typography color='gray'>Not connected</Typography>
			}
		</Container>
	);
};