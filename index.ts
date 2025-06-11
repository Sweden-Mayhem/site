import * as marked from 'https://deno.land/x/marked@1.0.2/mod.ts';

import { Eta } from 'https://deno.land/x/eta@v3.5.0/src/index.ts';

const eta = new Eta({ views: 'template', useWith: true });

function print_help() {
	console.log('Supported actions:');
	console.log('  clean - erase the generated html files');
	console.log('  generate - generate the html files');
}

function get_pretty_filename_title(name:string) {
	name = name.replaceAll('-', ' ');
	name = name.split(' ').map(x => x.substring(0, 1).toUpperCase()+x.substring(1)).join(' ');
	return name;
}

function escape_html(x:string) {
	return x
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
	;
}

async function get_stat(path:string) {
	try{
		const stat = await Deno.stat(path);
		return stat;
	}catch(error){
		return false;
	}
}

async function clear_site() {
	const stat = await get_stat('output');
	if(!stat||!stat.isDirectory) return;

	for await(const entry of Deno.readDir('output')){
		await Deno.remove(`output/${entry.name}`, { recursive: true });
	}
}

async function generate_site() {
	await clear_site();
	await copy_assets();

	async function walk_dir(readPath:string, writePath:string, templatePath:string) {
		const pages:{
			name:string,
			title:string,
			filename:string,
			markdown:string,
			html:string
		}[] = [];

		const childSections:{
			name:string,
			title:string
		}[] = [];

		for await(const entry of Deno.readDir(readPath)){
			if(entry.isDirectory){
				const nestedPages = await walk_dir(`${readPath}/${entry.name}`, `${writePath}/${entry.name}`, `${templatePath}/${entry.name}`);
				if(nestedPages.some(x => x.name=='index')){
					childSections.push({
						name: entry.name,
						title: get_pretty_filename_title(entry.name)
					});
				}
				continue;
			}

			if(!entry.isFile) continue;

			if(entry.name.match(/\.md$/i)){
				const name = entry.name.replace(/\..*/, '');
				const title = get_pretty_filename_title(name);
				const markdown = await Deno.readTextFile(`${readPath}/${entry.name}`);
				const html = await marked.parse(markdown, {
					breaks:true
				});
				pages.push({
					name,
					title,
					filename: entry.name,
					markdown,
					html
				});
			}
		}

		const childPages = pages.filter(page => page.name!='index');

		if(!await get_stat(writePath)){
			await Deno.mkdir(writePath);
		}

		for(const page of pages){
			let templateFilename = `${templatePath}/${page.name=='index'?'index.html':'page.html'}`;

			// fall back to the default toplevel template if the one for this section is not found
			if(!await get_stat(`template/${templateFilename}`)){
				templateFilename = `./${page.name=='index'?'index.html':'page.html'}`;
			}

			await Deno.writeTextFile(`${writePath}/${page.name}.html`, eta.render(templateFilename, {
				currentPage: page,
				pages: childPages,
				sections: childSections,
			}));
		}

		return pages;
	}

	await walk_dir('content', 'output', '.');
}

async function copy_assets() {
	if(!await get_stat('output')){
		await Deno.mkdir('output');
	}

	async function copy_dir(readPath:string, writePath:string) {
		for await(const entry of Deno.readDir(readPath)){
			if(entry.isDirectory){
				copy_dir(`${readPath}/${entry.name}`, `${writePath}/${entry.name}`);

			}else if(entry.isFile){
				if(entry.name.match(/\.html$/)) continue; // skip template files

				if(!await get_stat(writePath)){
					await Deno.mkdir(writePath);
				}

				await Deno.copyFile(`${readPath}/${entry.name}`, `${writePath}/${entry.name}`);
			}
		}
	}

	await copy_dir('template', 'output');
}

if(Deno.args.length<1){
	print_help();
	Deno.exit(1);
}

const action = Deno.args[0];

switch(action){
	case 'clean':
		clear_site();
	break;
	case 'generate':
		generate_site();
	break;
	default:
		console.error(`Unsupported action: ${action}`);
		print_help();
		Deno.exit(1);
	break;
}
