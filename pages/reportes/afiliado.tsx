import { Button, Container, Grid, Tooltip } from '@mui/material';
import Layout from '@/components/layout/Layout';
import CustomTablePagination from '@/components/tables/CustomTablePagination';
import { useState } from 'react';
import { reporte } from '@/services/reportes.afilidado';
import { withProtected } from '@/middleware/public/withProtected';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext } from 'react';
import AuthContext from '@/stores/authContext';
import useSafeLayoutEffect from '@/utilis/use-safe-layout-effect';
import { Terminal } from '@/interfaces/reportes/terminals';

function Afiliado(): JSX.Element {
	const { user, logout } = useContext(AuthContext);

	const [data, setData] = useState<any[]>([]);
	const [terminales, setTerminales] = useState<Terminal[]>([]);
	const [terminal, setTerminal] = useState<Terminal | null>(null);

	const getTransFromTermianl = async () => {
		console.log(terminal);
	};

	const preData = async () => {
		if (user) {
			const res: any = await reporte.getTerminals(user);
			if (res) {
				console.log('res data', res);
				setTerminales(res);
			}
		}
	};

	useSafeLayoutEffect(() => {
		preData();
	}, [user]);

	return (
		<Layout>
			<Container component='main' maxWidth='xl'>
				{terminales.length ? (
					<>
						<Grid container sx={{ mt: 3 }} spacing={2}>
							<Grid item sx={{ mt: 3, ml: 4 }}>
								<Autocomplete
									disablePortal
									id='id-box-terminals'
									onChange={(event, value: Terminal | null) => {
										setTerminal(value);
									}}
									options={terminales}
									value={terminal}
									getOptionLabel={(option: Terminal) => option.terminal || ''}
									sx={{ width: 250 }}
									renderInput={(params) => <TextField {...params} label='Terminal' />}
								/>
							</Grid>
							<Grid item sx={{ mt: 2 }}>
								<Tooltip title='Buscar transacciones aprobadas'>
									<Button
										disabled={terminal ? false : true}
										type='submit'
										onClick={getTransFromTermianl}
										variant='contained'
										sx={{ mt: 2, mb: 1 }}>
										<SearchIcon />
									</Button>
								</Tooltip>
							</Grid>
							<Grid item xs={8}></Grid>
						</Grid>
						<Grid item xs={12}>
							{/*data.length ? <CustomTablePagination rows={data} /> : null*/}
						</Grid>
					</>
				) : (
					<h1>loading</h1>
				)}
			</Container>
		</Layout>
	);
}

export default Afiliado;
