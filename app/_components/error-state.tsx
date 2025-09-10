interface ErrorStateProps {
	error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold text-red-600 mb-2'>Error</h2>
				<p className='text-gray-600'>{error}</p>
			</div>
		</div>
	);
}
