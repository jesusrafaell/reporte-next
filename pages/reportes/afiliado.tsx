import { Container, Grid } from '@mui/material';
import Layout from '@/components/layout/Layout';
import CustomTablePagination from '@/components/tables/CustomTablePagination';
import { useEffect } from 'react';
import { reporte } from '@/services/reportes.afilidado';

export default function Afiliado() {
	const preData = async () => {
		console.log(preData);
		const res: any = await reporte.reporteTest();
		if (res) {
			console.log('res data', res);
		}
	};

	useEffect(() => {
		preData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<Container component='main' maxWidth='xl'>
				<Grid container sx={{ mt: 3 }}>
					<Grid item xs={12}>
						<CustomTablePagination />
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}
