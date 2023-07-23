const { build } = require('esbuild');
const { red, blueBright, yellowBright } = require('colorette');

const isWatchEnabled =
    process.argv.findIndex((arg) => arg === '--mode=watch') !== -1;

function handleRebuild() {
    return (error, result) => {
        if (error) {
            console.error(
                `${yellowBright(new Date().toLocaleTimeString())} [${red(
                    'ERROR',
                )}] - Unable to rebuild project.`,
                error,
            );
            return;
        }

        console.log(
            `${yellowBright(new Date().toLocaleTimeString())} [${blueBright(
                'INFO',
            )}] - Project rebuilt ${!result.warnings.length ? 'successfully' : `with ${red('warnings')}`
            }.`,
            result.warnings.length ? result.warnings : '',
        );
    };
}

build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    outfile: 'dist/server.js',
    minify: false,
    platform: 'node',
    target: ['node16'],
    format: 'cjs',
    watch: isWatchEnabled && { onRebuild: handleRebuild() },
    minify: !isWatchEnabled,
    minifyWhitespace: !isWatchEnabled,
})
    .then(() =>
        console.log(
            `${yellowBright(new Date().toLocaleTimeString())} [${blueBright(
                'INFO',
            )}] - ${isWatchEnabled
                ? 'Watching for changes...'
                : 'Project built successfully!'
            }`,
        ),
    )
    .catch(() => {
        throw new Error('Fatal error occurred during build process.');
    });
