import { Fragment, ReactElement, useState } from 'react';
import { keccak, asymDecrypt } from '../util/crypto';
import { MASTER_HASH, PRIVATE_KEY } from '../config/constants';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Contract } from 'ethers';

interface RetrieveProps {
	wallet: Contract | null;
}
export const Retrieve = ({ wallet }: RetrieveProps): ReactElement => {
	const [values, setValues] = useState<string[]>([]);
	const [website, setWebsite] = useState<string>('');

	const submit = async () => {
		if (!wallet) return;
		const key = keccak(website, MASTER_HASH);
		const encrypted = await wallet.retrieve(key);
		const decrypted: string[] = [];
		for (const value of encrypted) {
			decrypted.push(await asymDecrypt(PRIVATE_KEY, value.slice(2)));
		}
		setValues(decrypted);
	};
	return (
		<Container sx={{ textAlign: 'center', padding: 2 }}>
			{!!wallet ?
				<>
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
					<Button onClick={submit} fullWidth>Retrieve</Button>
					<Divider sx={{ margin: 2 }} />
					<Container>
						<Typography variant='body2' color='gray'>Found {values.length} values</Typography>
						<List>
							{values.map((v, i) =>
								<Fragment key={i}>
									<ListItem>
										<ListItemText>{v}</ListItemText>
									</ListItem>
									<Divider />
								</Fragment>
							)}
						</List>
					</Container>
				</>
				:
				<Typography color='gray'>Not connected</Typography>
			}
		</Container>
	);
};