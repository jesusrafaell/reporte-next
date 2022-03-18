import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { es } from 'date-fns/locale';

interface Props {
	dateInit: Date | null;
	dateEnd: Date | null;
	setDateInit: (date: Date | null) => void;
	setDateEnd: (date: Date | null) => void;
}

export default function MaterialUIDate({ dateInit, dateEnd, setDateInit, setDateEnd }: Props) {
	const handleChangeInit = (newValue: Date | null) => {
		setDateInit(newValue);
		if (newValue && dateEnd) {
			if (dateEnd < newValue) {
				setDateEnd(newValue);
			}
		}
	};

	const handleChangeEnd = (newValue: Date | null) => {
		if (newValue && dateInit) {
			if (newValue < dateInit) {
				return;
			}
			setDateEnd(newValue);
			return;
		}
		setDateEnd(newValue);
	};

	return (
		<LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
			<Stack spacing={2}>
				<DesktopDatePicker
					label='Fecha de Inicio'
					inputFormat='dd/MM/yyyy'
					value={dateInit}
					onChange={handleChangeInit}
					renderInput={(params) => <TextField {...params} />}
				/>
				<DesktopDatePicker
					label='Fecha Final'
					inputFormat='dd/MM/yyyy'
					value={dateEnd}
					onChange={handleChangeEnd}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
}
