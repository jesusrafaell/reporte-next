import { Button, Container, Grid } from '@mui/material';
import Layout from '@/components/layout/Layout';
import CustomTablePagination from '@/components/tables/CustomTablePagination';
import { useState } from 'react';
import { reporte } from '@/services/reportes.afilidado';
import { withProtected } from '@/middleware/public/withProtected';

import { useContext } from 'react';
import AuthContext from '@/stores/authContext';

function Afiliado(): JSX.Element {
	const { user, logout } = useContext(AuthContext);

	const [data, setData] = useState<any[]>([]);

	const preData = async () => {
		if (user) {
			const res: any = await reporte.reporteTest(user);
			if (res) {
				console.log('res data', res);
				setData(res);
			}
		}
	};

	return (
		<Layout>
			<Container component='main' maxWidth='xl'>
				<Grid container sx={{ mt: 3 }}>
					<Grid item xs={12}>
						{data.length ? <CustomTablePagination rows={data} /> : null}
						<Button type='submit' onClick={preData} fullWidth variant='contained' sx={{ mt: 2, mb: 1 }}>
							Cargar Data
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}

export default Afiliado;

export const getServerSideProps = withProtected(async (ctx: any) => {
	return {
		props: {},
	};
});
