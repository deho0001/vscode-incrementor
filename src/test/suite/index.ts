import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

// eslint-disable-next-line import/prefer-default-export
export function run(): Promise<void> {
    //> Create the mocha test
    const mocha = new Mocha({
        ui: 'bdd',
    });
    // ((mocha as Record<string, any>).useColors as (...args: any[]) => any)(true);

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((c, e) => {
        glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }

            //> Add files to the test suite
            files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                //> Run the mocha test
                mocha.run((failures) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    } else {
                        c();
                    }
                });
            } catch (err) {
                e(err);
            }
        });
    });
}
