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
import LinearWithValueLabel from '@/components/progress/linearLabel';

const rows = [
	{
		nroTerminal: 38005389,
		nroLote: '0343',
		origin: 'Debito',
		pan: 6012888274999615,
		fecha: '1/10/2021',
		hora: '07:44:50.66',
		nroReferencia: 1037724947,
		autCodigo: 764529,
		montoBs: 0.01,
	},
	{
		nroTerminal: 38005389,
		nroLote: '0343',
		origin: 'Debito',
		pan: 6012886190440946,
		fecha: '1/10/2021',
		hora: '08:13:14.46',
		nroReferencia: 1037725808,
		autCodigo: 832793,
		montoBs: 34.0,
	},
];

function Afiliado(): JSX.Element {
	const { user } = useContext(AuthContext);
	const [progress, setProgress] = useState<number>(0);

	const [data, setData] = useState<any[]>([]);
	const [terminales, setTerminales] = useState<Terminal[]>([]);
	const [terminal, setTerminal] = useState<Terminal | null>(null);

	const getTransFromTermianl = async () => {
		if (terminal) {
			const res: any = await reporte.getTrans(Number(terminal.terminal));
			console.log(res);
			setData(rows);
		}
	};

	const preData = async () => {
		if (user) {
			const res: any = await reporte.getTerminals(user);
			if (res) {
				console.log('res data', res);
				setProgress(100);
				setTimeout(() => {
					setTerminales(res);
				}, 200);
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
										setData([]);
									}}
									options={terminales}
									value={terminal}
									getOptionLabel={(option: Terminal) => option.terminal || ''}
									sx={{ width: 250 }}
									renderInput={(params) => <TextField {...params} label='Terminal' />}
								/>
							</Grid>
							<Grid item sx={{ mt: 2 }}>
								<Button
									disabled={terminal ? false : true}
									type='submit'
									onClick={getTransFromTermianl}
									variant='contained'
									sx={{ mt: 2, mb: 1 }}>
									<Tooltip title='Buscar transacciones aprobadas'>
										<SearchIcon />
									</Tooltip>
								</Button>
							</Grid>
							<Grid item xs={8}></Grid>
						</Grid>
						<Grid item xs={12}>
							{data.length ? <CustomTablePagination rows={data} /> : null}
						</Grid>
					</>
				) : (
					<div
						style={{
							marginTop: '3rem',
							width: '400px',
							position: 'absolute',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 0,
							right: 0,
							textAlign: 'center',
						}}>
						<LinearWithValueLabel progress={progress} setProgress={setProgress} />
					</div>
				)}
			</Container>
		</Layout>
	);
}

export default Afiliado;
