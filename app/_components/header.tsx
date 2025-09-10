interface HeaderProps {
	totalPatients: number;
}

export function Header({ totalPatients }: HeaderProps) {
	return (
		<div className='relative bg-blue-500 text-white px-8 py-12 overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-20'>
				<div className='grid grid-cols-12 gap-4 h-full'>
					{Array.from({ length: 48 }).map((_, i) => (
						<div key={i} className='flex items-center justify-center'>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M12 2v20M2 12h20' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
							</svg>
						</div>
					))}
				</div>
			</div>

			{/* Content */}
			<div className='relative z-10'>
				<h1 className='text-4xl font-bold mb-2'>Patient Directory</h1>
				<p className='text-xl opacity-90'>{totalPatients} Patient Found</p>
			</div>
		</div>
	);
}
