import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { keccak } from '../util/crypto';

interface UnlockProps {
	onUnlock: () => void;
}
export const Unlock = ({ onUnlock }: UnlockProps) => {
	const passwordField = useRef<HTMLInputElement>();
	const [error, setError] = useState<boolean>(false);
	const unlock = () => {
		if (passwordField === undefined) return;
		const password = keccak(passwordField!.current!.value);
		chrome.runtime.sendMessage({ name: 'unlockSession', params: password }, (response: boolean) => {
			if (response) onUnlock();
			else setError(true);
		});
	};
	return (
		<Container sx={{ textAlign: 'center', padding: 2 }}>
			<Container>
				<Typography variant='h2' gutterBottom>
					Wallet Locked
				</Typography>
				<Typography gutterBottom>
					Enter your password to unlock
				</Typography>
				<TextField
					type='password'
					inputRef={passwordField}
					error={error}
					helperText={error ? 'Incorrect password' : undefined}
					variant='outlined'
					label='Password'
					margin='normal'
					fullWidth
				/>
			</Container>
			<Button fullWidth onClick={unlock}>
				Unlock
			</Button>
		</Container>
	);
};