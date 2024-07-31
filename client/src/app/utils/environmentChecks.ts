// Client
function setVariable(variable: string): string {
	const value = import.meta.env[variable];
	if (!value) throw new Error(`${variable} not set`);
	return value;
}

// function logVariable(variable: string) {
// 	const value = import.meta.env[variable];
// 	console.log(`${variable}: ${value}`);
// }

export const reactEnv = setVariable('VITE_REACT_ENV');
// logVariable('VITE_REACT_ENV');

export const apiBaseDev = setVariable('VITE_API_BASE__DEVELOPMENT');
export const apiBaseProd = setVariable('VITE_API_BASE__PRODUCTION');

export const currentApiBase =
	reactEnv === 'production' ? apiBaseProd : apiBaseDev;
// console.log(`Current API base: ${currentApiBase}`);
