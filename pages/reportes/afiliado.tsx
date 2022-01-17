import { Button, Container, Grid } from '@mui/material';
import Layout from '@/components/layout/Layout';
import CustomTablePagination from '@/components/tables/CustomTablePagination';
import { useEffect, useState } from 'react';
import { reporte } from '@/services/reportes.afilidado';

export default function Afiliado() {
	const [data, setData] = useState<any[]>([]);

	const preData = async () => {
		const res: any = await reporte.reporteTest();
		if (res) {
			console.log('res data', res);
			setData(res);
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
