export function cleanTailwindClassNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}
