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
import MaterialUIDate from '@/components/dateTime';
import AletCustomSnackbars from '@/components/alert/alert-custom-snackbars';

function Afiliado(): JSX.Element {
	const { user } = useContext(AuthContext);
	const [progress, setProgress] = useState<number>(0);
	const [progressTrans, setProgressTrans] = useState<number>(0);

	const [terminales, setTerminales] = useState<Terminal[]>([]);
	const [terminal, setTerminal] = useState<Terminal | null>(null);

	const [trans, setTrans] = useState<Transaction[] | []>([]);
	const [loadTrans, setLoadTrans] = useState<boolean>(false);

	const [dateInit, setDateInit] = useState<Date | null>(new Date());
	const [dateEnd, setDateEnd] = useState<Date | null>(new Date());

	const [alert, setAlert] = useState<boolean>(false);
	const [error, setError] = useState<string>('Error');

	const getTransFromTermianl = async () => {
		setTrans([]);
		setLoadTrans(true);
		setAlert(false);
		if (terminal && dateInit && dateEnd) {
			const data = {
				terminal: Number(terminal.terminal),
				dateInit,
				dateEnd,
			};
			const res = await reporte.getTrans(data);
			if (res.code === 400) {
				setProgressTrans(0);
				setLoadTrans(false);
				setAlert(true);
				setError(res.message);
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
			<>
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
									<MaterialUIDate
										dateInit={dateInit}
										dateEnd={dateEnd}
										setDateInit={setDateInit}
										setDateEnd={setDateEnd}
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

				<AletCustomSnackbars alertType='error' open={alert} setOpen={setAlert}>
					{error}
				</AletCustomSnackbars>
			</>
		</Layout>
	);
}

export default Afiliado;
