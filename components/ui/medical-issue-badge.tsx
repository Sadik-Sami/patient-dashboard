import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MedicalIssueBadgeProps {
	issue: string;
	className?: string;
}

const issueColors: Record<string, { bg: string; text: string; border: string }> = {
	fever: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
	headache: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
	'sore throat': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
	'sprained ankle': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
	rash: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
	'ear infection': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
	sinusitis: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
	'allergic reaction': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
	'stomach ache': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
	'broken arm': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
};

export function MedicalIssueBadge({ issue, className }: MedicalIssueBadgeProps) {
	const colors = issueColors[issue.toLowerCase()] || {
		bg: 'bg-gray-50',
		text: 'text-gray-700',
		border: 'border-gray-200',
	};

	return (
		<Badge
			variant='outline'
			className={cn('font-medium text-xs px-2.5 py-0.5 border', colors.bg, colors.text, colors.border, className)}>
			{issue}
		</Badge>
	);
}

export function getMedicalIssueColors(issue: string) {
	return (
		issueColors[issue.toLowerCase()] || {
			bg: 'bg-gray-50',
			text: 'text-gray-700',
			border: 'border-gray-200',
		}
	);
}
