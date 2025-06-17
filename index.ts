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

type ParsedPage = {
	name:string,
	title:string,

	markdown:string,
	html:string,
	markdownSummary:string,
	htmlSummary:string,

	contentFilename:string,
	outputFilename:string,
	templateFilename:string,

	previousPage?:ParsedPage,
	nextPage?:ParsedPage,
};

type ParsedSection = {
	parent?:ParsedSection,
	outputPath:string,
	name: string,
	title: string,
	hasIndex: boolean,
	pages: ParsedPage[],
	contentPages: ParsedPage[],
	sections: ParsedSection[]
}

async function parse_site() {
	async function walk_dir(name:string, title:string, readPath:string, writePath:string, templatePath:string):Promise<ParsedSection> {
		const section:ParsedSection = {
			name,
			title,
			hasIndex: false,
			outputPath: writePath,
			pages: [],
			contentPages: [],
			sections: []
		};

		const entries:Deno.DirEntry[] = [];
		for await(const entry of Deno.readDir(readPath)){
			entries.push(entry);
		}
		entries.sort((x, y) => x.name.localeCompare(y.name));

		for(const entry of entries){
			if(entry.isDirectory){
				const name = entry.name;
				const title = get_pretty_filename_title(name);
				const newSection = await walk_dir(name, title, `${readPath}/${entry.name}`, `${writePath}/${entry.name}`, `${templatePath}/${entry.name}`);
				newSection.parent = section;
				section.sections.push(newSection);
				continue;
			}

			if(!entry.isFile) continue;

			if(entry.name.match(/\.md$/i)){
				const name = entry.name.replace(/\..*/, '');
				const filename = `${readPath}/${entry.name}`;
				const output = `${name}.html`;
				const isIndex = name=='index';
				if(isIndex){
					section.hasIndex = true;
				}
				const title = get_pretty_filename_title(name);
				let templateFilename = `${templatePath}/${isIndex?'index.html':'page.html'}`;

				const markdown = await Deno.readTextFile(`${readPath}/${entry.name}`);
				const html = await marked.parse(markdown, {
					breaks:true
				});

				const maxSummaryLength = 128;
				const maxSummaryLines = 3;
				const markdownLines = markdown.split('\n');
				let markdownSummary = markdownLines.slice(0, maxSummaryLines).join('\n');
				if(markdownSummary.length>maxSummaryLength){
					markdownSummary = markdownSummary.substring(0, maxSummaryLength-1)+'…';
				}else if(markdownLines.length>maxSummaryLines){
					markdownSummary += '…';
				}
				const htmlSummary = await marked.parse(markdownSummary, {
					breaks:true
				});

				// fall back to the default toplevel template if the one for this section is not found
				if(!await get_stat(templateFilename)){
					templateFilename = `template/${isIndex?'index.html':'page.html'}`;
				}

				const parsedPage:ParsedPage = {
					name,
					title,
					markdown,
					html,
					markdownSummary,
					htmlSummary,
					contentFilename: filename,
					outputFilename: output,
					templateFilename
				}

				let previousPage =
					section.pages.length>0&&section.pages[section.pages.length-1].name!='index'?section.pages[section.pages.length-1]:
					section.pages.length>1?section.pages[section.pages.length-22]:
					undefined
				;

				if(previousPage&&!isIndex){
					previousPage.nextPage = parsedPage;
					parsedPage.previousPage = previousPage;
				}

				section.pages.push(parsedPage);

				if(!isIndex){
					section.contentPages.push(parsedPage);
				}
			}
		}

		return section;
	}

	return await walk_dir('/', 'Home', 'content', 'output', 'template');
}

async function generate_site() {
	await clear_site();
	await copy_assets();

	const parsed = await parse_site();

	async function generate_section(section:ParsedSection) {
		if(!await get_stat(section.outputPath)){
			await Deno.mkdir(section.outputPath);
		}

		for(const page of section.pages){
			await Deno.writeTextFile(`${section.outputPath}/${page.outputFilename}`, eta.render(`../${page.templateFilename}`, {
				currentPage: page,
				currentSection: section,
				parentSection: section.parent,
				pages: section.contentPages,
				sections: section.sections
			}));
		}

		for(const childSection of section.sections){
			await generate_section(childSection);
		}
	}

	await generate_section(parsed);
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
