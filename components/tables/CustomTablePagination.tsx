import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
	id: 'email' | 'idenNumCC' | 'numA' | 'name' | 'idenNumCC';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?(row: any): string;
	valueFormatter?: (value: any) => string;
}

const columns: Column[] = [
	{ id: 'email', label: 'Email', minWidth: 170 },
	{
		id: 'idenNumCC',
		label: 'RifCliente',
		minWidth: 100,
		format: (row: any) => {
			return `${row?.idenTUser}${row?.identNum}`;
		},
	},
	{
		id: 'numA',
		label: 'Nro Afiliado',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'name',
		label: 'Nombre Comercio',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'idenNumCC',
		label: 'Rif Comercio',
		minWidth: 170,
		align: 'right',
		format: (row: any) => {
			return `${row?.idenTCC}${row?.idenNumCC}`;
		},
	},
];

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
	density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
	const density = population / size;
	return { name, code, population, size, density };
}

export default function CustomTablePagination({ rows }: any) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 400 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column, index: number) => (
								<TableCell
									key={index}
									align={column.align}
									style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map((column: Column, index: number) => {
										let value = row[column.id];
										if (column.format) value = column.format(row);
										console.log(value);
										return (
											<TableCell key={index} align={column.align}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				labelRowsPerPage={'Lineas por Pagina'}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
