import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { getMax } from '@/utilis/ramdom-max';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

interface Props {
	progress: number;
	setProgress: any;
}

export default function LinearWithValueLabel({ progress, setProgress }: Props) {
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress: any) =>
				prevProgress >= getMax(80, 60) ? prevProgress : prevProgress + Math.floor(Math.random() * 11)
			);
		}, 300);
		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgressWithLabel value={progress} />
		</Box>
	);
}
