const esbuild = require("esbuild");

const IS_WATCH_MODE = process.env.IS_WATCH_MODE;

const TARGET_ENTRIES = [
    {
        target: "es2020",
        entryPoints: ["src/index.ts"],
        platform: "node",
        outfile: "./dist/server.js",
    }
];

const buildBundle = async () => {
    try {
        const baseOptions = {
            logLevel: "info",
            bundle: true,
            loader: {
                ".ts": "ts",
                ".js": "js",
            },
            minify: !IS_WATCH_MODE,
            minifyWhitespace: !IS_WATCH_MODE,
            charset: "utf8",
            absWorkingDir: process.cwd(),
        };

        for (const targetOpts of TARGET_ENTRIES) {
            const mergedOpts = { ...baseOptions, ...targetOpts };

            const ctx = await esbuild.context({ ...mergedOpts });

            if (IS_WATCH_MODE) {
                console.log("starting watch");
                await ctx.watch();
            } else {
                console.log(`[ESBUILD] Starting build ${JSON.stringify(targetOpts.entryPoints)}`);
                const { errors, warnings } = ctx.rebuild();
                if (errors?.length || warnings?.length) {
                    if (errors?.length > 0) {
                        console.error(`[ESBUILD] Bundle failed with ${errors.length} errors`);
                        process.exit(1);
                    }

                    console.log(`[ESBUILD] Bundle failed with ${warnings.length} errors`);
                }

                console.log(`[ESBUILD] Builder finished successfully ${JSON.stringify(targetOpts.entryPoints)}`);
                ctx.dispose();
            }
        }
    } catch (e) {
        console.log("[ESBuild] Build failed with error");
        console.error(e);
        process.exit(1);
    }
};

buildBundle().catch(() => process.exit(1));
