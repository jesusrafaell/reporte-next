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
import { Terminal, Transaction } from '@/interfaces/reportes/reporte';
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
	const [progressTrans, setProgressTrans] = useState<number>(0);

	const [terminales, setTerminales] = useState<Terminal[]>([]);
	const [terminal, setTerminal] = useState<Terminal | null>(null);

	const [trans, setTrans] = useState<Transaction[] | []>([]);
	const [loadTrans, setLoadTrans] = useState<boolean>(false);

	const getTransFromTermianl = async () => {
		setTrans([]);
		setLoadTrans(true);
		if (terminal) {
			const res = await reporte.getTrans(Number(terminal.terminal));
			if (res.code) {
				console.log('error api trans');
				return;
			}
			setProgressTrans(100);
			setTimeout(() => {
				setTrans(res);
				setProgressTrans(0);
				setLoadTrans(false);
				console.log(res);
			}, 200);
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
								<TextField
									id='id-num-afiliado'
									label='Nro. Afiliado'
									value={user?.numAfiliado}
									sx={{ width: 200, mr: '5rem' }}
									disabled
								/>
							</Grid>
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
						</Grid>
						{loadTrans || trans.length ? (
							<Grid item xs={12} sx={{ mt: 5 }}>
								{trans.length ? (
									<CustomTablePagination rows={trans} />
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
										<LinearWithValueLabel progress={progressTrans} setProgress={setProgressTrans} />
									</div>
								)}
							</Grid>
						) : null}
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
