import { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

interface HeaderProps {
	connected: boolean;
}
export const Header = ({ connected }: HeaderProps): ReactElement => (
	<AppBar position='sticky'>
		<Toolbar sx={{ justifyContent: 'center' }}>
			<Typography variant='h6'>
				Wallet
			</Typography>
			<Typography variant='body2' sx={{
				marginLeft: 'auto',
				marginRight: '8px',
			}}>
				{connected ? 'Connected' : 'Not Connected'}
			</Typography>
			<CircleIcon sx={{
				color: connected ? 'success.light' : 'error.light'
			}} />
		</Toolbar>
	</AppBar>
);