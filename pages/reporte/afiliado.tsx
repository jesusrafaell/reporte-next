import { Container, Grid } from '@mui/material';
import Layout from '@/components/layout/Layout';
import CustomTablePagination from '@/components/tables/CustomTablePagination';

export default function Afiliado() {
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
