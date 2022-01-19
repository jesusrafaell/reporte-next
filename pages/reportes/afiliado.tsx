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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ label: '1111011', year: 1994 },
	{ label: '1111012', year: 1972 },
	{ label: '1111013', year: 1974 },
	{ label: '1111014', year: 2008 },
	{ label: '1111015', year: 1957 },
	{ label: '1111016', year: 1993 },
	{ label: '1111017', year: 1994 },
];

function Afiliado(): JSX.Element {
	const { user, logout } = useContext(AuthContext);

	const [data, setData] = useState<any[]>([]);

	const preData = async () => {
		if (user) {
			const res: any = await reporte.getTerminals(user);
			if (res) {
				console.log('res data', res);
				setData(res);
			}
		}
	};

	return (
		<Layout>
			<Container component='main' maxWidth='xl'>
				<Grid container sx={{ mt: 3 }} spacing={2}>
					<Grid item sx={{ mt: 3, ml: 4 }}>
						<Autocomplete
							disablePortal
							id='id-box-terminals'
							options={top100Films}
							sx={{ width: 250 }}
							renderInput={(params) => <TextField {...params} label='Terminal' />}
						/>
					</Grid>
					<Grid item sx={{ mt: 2 }}>
						<Tooltip title='Buscar transacciones aprobadas'>
							<Button type='submit' onClick={preData} variant='contained' sx={{ mt: 2, mb: 1 }}>
								<SearchIcon />
							</Button>
						</Tooltip>
					</Grid>
					<Grid item xs={8}></Grid>
				</Grid>
				<Grid item xs={12}>
					{data.length ? <CustomTablePagination rows={data} /> : null}
				</Grid>
			</Container>
		</Layout>
	);
}

export default Afiliado;
