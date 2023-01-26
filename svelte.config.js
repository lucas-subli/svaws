import { vitePreprocess } from '@sveltejs/kit/vite';
import * as path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: edgeAdapter()
	}
};

/** @param {AdapterSpecificOptions} options */
function edgeAdapter(options) {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		name: 'MAGIC',
		async adapt(builder) {
			const targetPath = path.join('.infra', '.svelte-deploy')
			const dirs = {
                prerendered: path.join(targetPath, 'prerendered'),
                static: path.join(targetPath, 'static'),
                lambda: path.join(targetPath, 'lambda'),
            }

			const prerendered = builder.writePrerendered(dirs.prerendered)
            const clientfiles = builder.writeClient(dirs.static)
			const serverfiles = builder.writeServer(dirs.lambda)
		}
	};

	return adapter;
}

export default config;
