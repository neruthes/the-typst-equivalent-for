const fs = require('fs');
const ejs = require('ejs');
const marked = require('marked');

const files_arr = fs.readdirSync('db');
console.log(`Processing ${files_arr.length} entries...`);




const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getLastModifiedTime(filePath) {
    try {
        const gitLogCommand = `git log -1 --format=%ad --date=iso8601-strict "${filePath}"`;
        const { stdout } = await exec(gitLogCommand);
        return stdout;
    } catch (error) {
        console.error(`Error getting last modified time: ${error.message}`);
        throw error;
    }
}





const get_fancy_name = function (bare_name) {
    let fancy_name = bare_name;
    if (bare_name[0] === '+') {
        // Do nothing for package name
    } else if (bare_name[0] === '_') {
        // Do nothing
    } else {
        // It is a command! Should add backslash as prefix!
        fancy_name = '\\' + fancy_name;
    };
    return fancy_name;
};












(async function () {
    // getLastModifiedTime('db/input.md')
    //     .then(date => console.log(`Last modified time: ${date.toISOString()}`))
    //     .catch(error => console.error('Error:', error));

    files_arr.forEach(async function (filename) {
        const bare_name = filename.replace(/\.md$/, '');
        const fancy_name = get_fancy_name(bare_name);
        const filepath = `./db/${filename}`;
        const modif_time = await getLastModifiedTime(filepath);
        let result = await ejs.renderFile(`src/tmpl/detail.ejs`, {
            data: {
                bare_name, fancy_name, modif_time,
                text: marked.parse(fs.readFileSync(filepath).toString()),
                doc_title: `What is the Typst equivalent for ${bare_name}?`,
                page_title: `What is the Typst equivalent for ${fancy_name}?`,
            }
        });
        fs.writeFile(`./docs/db/${filename.replace('.md', '.html')}`, result, function (err) { });
    });
    let list_html = files_arr.map(function (filename) {
        const bare_name = filename.replace(/\.md$/, '');
        const fancy_name = get_fancy_name(bare_name);
        return `<li>
            <a href="./db/${bare_name}.html">
                ${fancy_name}
            </a>
        </li>`
    }).join('\n');
    const index_html = await ejs.renderFile(`src/tmpl/index.ejs`, {
        data: {
            list_html
        }
    })
    fs.writeFile(`./docs/index.html`, index_html, function (err) { });
})();
