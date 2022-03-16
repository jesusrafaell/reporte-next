import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';

interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: 'right' | 'center' | 'left';
	format?(row: any): string;
	valueFormatter?: (value: any) => string;
}

let columns: Column[] = [
	/*
	{
		id: 'terminal',
		label: 'Nro. de Terminal',
		minWidth: 200,
		align: 'left',
	},
	*/
	{
		id: 'lote',
		label: 'Nro. de Lote',
		minWidth: 100,
		/*
		format: (row: any) => {
			return `${row?.idenTUser}${row?.identNum}`;
		},
		*/
	},
	{
		id: 'origen',
		label: 'Origen',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'pan',
		label: 'Pan',
		minWidth: 200,
		align: 'center',
	},
	{
		id: 'fecha',
		label: 'Fecha',
		minWidth: 170,
		align: 'center',
		format: (row: any) => {
			return DateTime.fromISO(row?.fecha.toString()).toFormat('dd/LL/yyyy').toLocaleString();
		},
	},
	{
		id: 'referencia',
		label: 'Nro. Referencia',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'authoriz',
		label: 'Autoriz. Codigo',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'tp_transaction',
		label: 'Tipo de transaccion',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'monto',
		label: 'Monto Bs.',
		minWidth: 170,
		align: 'right',
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
	const [rowsPerPage, setRowsPerPage] = React.useState(25);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 500 }}>
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
				rowsPerPageOptions={[25, 100, 200]}
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
