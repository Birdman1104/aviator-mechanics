const fs = require('fs').promises;
const { join } = require('path');
const { exec } = require('child_process');

const modelsFolder = join(__dirname, '../src/models');
const eventsFolder = join(__dirname, '../src/events');

const SLASH = process.platform === 'win32' ? '\\' : '/';

async function runPrettierOn(file) {
    await exec(`prettier --write ${file}`);
}

async function getFolderContent(folderPath) {
    let result = [];
    const getFilesRecursively = async (path) => {
        const files = await fs.readdir(path);
        for (const f of files) {
            let newPath = join(path, f);
            const stat = await fs.stat(newPath);
            if (stat.isDirectory()) {
                await getFilesRecursively(newPath);
            } else {
                const dir = newPath.split(SLASH);
                if (dir.indexOf('ObservableModel.js') !== -1) continue;
                const fileDir = dir.slice(dir.indexOf('models') + 1, dir.length);
                newPath = fileDir.join(SLASH);
                result.push(newPath);
            }
        }
    };
    await getFilesRecursively(folderPath);
    return result;
}

async function getSetters(file) {
    const setters = [];
    let startIndex = 0;
    const boo = await fs.readFile(file, 'utf8');
    while (boo.indexOf(' set ', startIndex) > -1) {
        const firstIndex = boo.indexOf('set ', startIndex) + 4;
        const secondIndex = boo.indexOf('(', firstIndex);
        startIndex += secondIndex - firstIndex;
        const prop = boo.slice(firstIndex, secondIndex);
        setters.push(prop);
    }
    return setters;
}

function generateEventNames(modelName, props) {
    const objName = `${modelName}Events`;
    const events = {};
    props.forEach((p) => {
        const key = `${p.charAt(0).toUpperCase()}${p.slice(1)}Update`;
        const value = `${modelName}${key}`;
        events[key] = value;
    });

    return `export const ${objName} = ${JSON.stringify(events)} \n\n`;
}

async function start() {
    const models = await getFolderContent(modelsFolder);
    let events = '';
    for (const model of models) {
        const props = await getSetters(join(modelsFolder, model));
        if (props.length === 0) continue;
        const modelName = model.slice(0, model.indexOf('.'));
        events += generateEventNames(modelName, props);
    }

    const file = join(eventsFolder, 'ModelEvents.ts');
    await fs.writeFile(file, events);
    await runPrettierOn(file);
}
start();
