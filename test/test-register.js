import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('tsx', pathToFileURL('./'), {
	extensionHooks: {
		'.js': (module, filename) => {
			return register('tsx', pathToFileURL(filename));
		},
	},
});
