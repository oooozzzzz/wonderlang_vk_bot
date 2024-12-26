import * as fs from "fs";
import {
	Document,
	ExternalHyperlink,
	Packer,
	PageBreak,
	Paragraph,
	SectionType,
	Table,
	TableCell,
	TableRow,
	TextRun,
	WidthType,
} from "docx";
import { addName, addPoints, date } from "./D1.js";

const tableVocInfo = [
	{
		number: "№1",
		phrase: "come up with sth",
		level: "B1",
		category: "phrasal verb",
		module: "Module 1: Communication",
	},
	{
		number: "№2",
		phrase: "leave sth out",
		level: "B1",
		category: "phrasal verb",
		module: "Module 1: Communication",
	},
	{
		number: "№3",
		phrase: "evidence",
		level: "B1",
		category: "word grammar",
		module: "Module 2: Science",
	},
	{
		number: "№4",
		phrase: "research",
		level: "B1",
		category: "word grammar, collocation",
		module: "Module 2: Science",
	},
	{
		number: "№5",
		phrase: "take sth on",
		level: "B1",
		category: "phrasal verb",
		module: "Module 4: Reading books",
	},
	{
		number: "№6",
		phrase: "powerful",
		level: "B1",
		category: "word",
		module: "Module 5: Art",
	},
	{
		number: "№7",
		phrase: "endangered",
		level: "B1",
		category: "word",
		module: "Module 5: The natural world",
	},
	{
		number: "№8",
		phrase: "vehicle",
		level: "B1",
		category: "word",
		module: "Module 6: Technology",
	},
	{
		number: "№9",
		phrase: "hire",
		level: "B1",
		category: "word",
		module: "Module 7: Business",
	},
	{
		number: "№10",
		phrase: "run a company",
		level: "B1",
		category: "collocation",
		module: "Module 7: Business",
	},
	{
		number: "№11",
		phrase: "fire sb",
		level: "B1",
		category: "word",
		module: "Module 7: Business",
	},
	{
		number: "№12",
		phrase: "graduate from college/university",
		level: "B1",
		category: "word grammar",
		module: "Module 7: Education and learning",
	},
	{
		number: "№13",
		phrase: "maintain eye contact",
		level: "B2",
		category: "collocation",
		module: "Module 1: Communication",
	},
	{
		number: "№14",
		phrase: "figure sth out",
		level: "B2",
		category: "phrasal verb",
		module: "Module 2: Science",
	},
	{
		number: "№15",
		phrase: "species",
		level: "B2",
		category: "word grammar",
		module: "Module 2: Science",
	},
	{
		number: "№16",
		phrase: "curriculum",
		level: "B2",
		category: "word",
		module: "Module 3: Work and jobs",
	},
	{
		number: "№17",
		phrase: "miss out on sth",
		level: "B2",
		category: "phrasal verb",
		module: "Module 3: Work and jobs",
	},
	{
		number: "№18",
		phrase: "convey",
		level: "B2",
		category: "word",
		module: "Module 5: Art",
	},
	{
		number: "№19",
		phrase: "capture",
		level: "B2",
		category: "word",
		module: "Module 5: Art",
	},
	{
		number: "№20",
		phrase: "medium",
		level: "B2",
		category: "word grammar",
		module: "Module 5: Art",
	},
	{
		number: "№21",
		phrase: "preserve",
		level: "B2",
		category: "word",
		module: "Module 5: The natural world",
	},
	{
		number: "№22",
		phrase: "suburb",
		level: "B2",
		category: "word",
		module: "Module 6: Cities",
	},
	{
		number: "№23",
		phrase: "carbon footprint",
		level: "B2",
		category: "collocation",
		module: "Module 6: Cities",
	},
	{
		number: "№24",
		phrase: "at the heart of sth",
		level: "B2",
		category: "idiom",
		module: "Module 7: Business",
	},
	{
		number: "№25",
		phrase: "meet sb’s expectations",
		level: "B2",
		category: "collocation",
		module: "Module 7: Business",
	},
	{
		number: "№26",
		phrase: "drop out",
		level: "B2",
		category: "phrasal verb",
		module: "Module 7: Education and learning",
	},
	{
		number: "№27",
		phrase: "determination",
		level: "B2",
		category: "word",
		module: "Module 8: Personality and relationships",
	},
	{
		number: "№28",
		phrase: "capacity",
		level: "B2",
		category: "word grammar",
		module: "Module 8: Personality and relationships",
	},
	{
		number: "№29",
		phrase: "vulnerable",
		level: "C1",
		category: "word",
		module: "Module 1: Communication",
	},
	{
		number: "№30",
		phrase: "think outside the box",
		level: "C1",
		category: "idiom",
		module: "Module 2: Science",
	},
	{
		number: "№31",
		phrase: "one-size-fits-all",
		level: "C1",
		category: "word",
		module: "Module 3: Work and jobs",
	},
	{
		number: "№32",
		phrase: "from scratch",
		level: "C1",
		category: "idiom",
		module: "Module 4: Reading books",
	},
	{
		number: "№33",
		phrase: "look at sth through (different) eyes",
		level: "C1",
		category: "idiom",
		module: "Module 4: Reading books",
	},
	{
		number: "№34",
		phrase: "awe",
		level: "C1",
		category: "word",
		module: "Module 5: Art",
	},
	{
		number: "№35",
		phrase: "contributing factor",
		level: "C1",
		category: "collocation",
		module: "Module 5: The natural world",
	},
	{
		number: "№36",
		phrase: "tuition fees",
		level: "C1",
		category: "collocation",
		module: "Module 7: Education and learning",
	},
	{
		number: "№37",
		phrase: "embarrassment",
		level: "C1",
		category: "word",
		module: "Module 7: Education and learning",
	},
	{
		number: "№38",
		phrase: "sympathize with sb ",
		level: "C1",
		category: "word grammar",
		module: "Module 8: Personality and relationships",
	},
	{
		number: "№39",
		phrase: "hit rock bottom",
		level: "C1",
		category: "idiom",
		module: "Module 8: Success and failure",
	},
	{
		number: "№40",
		phrase: "strike a balance between sth and sth",
		level: "C1",
		category: "idiom",
		module: "Module 8: Success and failure",
	},
];

const tableGramInfo = [
	{
		number: "№41",
		topic: "Verb Patterns (Verb + Gerund/to-Infinitive)",
		module: "Module 1",
	},
	{
		number: "№42",
		topic: "Past tenses: Past Simple, Past Perfect, Past Continuous",
		module: "Module 2",
	},
	{
		number: "№43",
		topic: "Present Perfect vs Present Perfect Continuous",
		module: "Module 3",
	},
	{
		number: "№44",
		topic: "First Conditionals",
		module: "Module 4",
	},
	{
		number: "№45",
		topic: "Second Conditionals",
		module: "Module 4",
	},
	{
		number: "№46",
		topic: "Articles with Geographical Names",
		module: "Module 5",
	},
	{
		number: "№47",
		topic: "Articles with Common Nouns",
		module: "Module 5",
	},
	{
		number: "№48",
		topic: "Modal verbs: have to, must, should etc.",
		module: "Module 6",
	},
	{
		number: "№49",
		topic: "Third Conditionals",
		module: "Module 7",
	},
	{
		number: "№50",
		topic: "The Passive Voice",
		module: "Module 8",
	},
];

const header = new Paragraph({
	children: [
		new TextRun({
			text: "Vocabulary and Grammar Test (B1-C1): анализ ошибок",
			size: 32,
			// bold: true,
			color: "#2f5496",
		}),
	],
	spacing: {
		after: 500,
	},
});

const createRow5 = (
	text1,
	text2,
	text3,
	text4,
	text5,
	{
		backgroundColor = "FFFFFF",
		textColor = "000000",
		textAlign = "start",
	} = {},
) =>
	new TableRow({
		children: [
			createCell(text1, 8, backgroundColor, textColor, textAlign),
			createCell(text2, 25, backgroundColor, textColor, textAlign),
			createCell(text3, 12, backgroundColor, textColor, textAlign),
			createCell(text4, 20, backgroundColor, textColor, textAlign),
			createCell(text5, 35, backgroundColor, textColor, textAlign),
		],
	});
const createRow3 = (
	text1,
	text2,
	text3,
	{
		backgroundColor = "FFFFFF",
		textColor = "000000",
		textAlign = "start",
	} = {},
) =>
	new TableRow({
		children: [
			createCell(text1, 10, backgroundColor, textColor, textAlign),
			createCell(text2, 60, backgroundColor, textColor, textAlign),
			createCell(text3, 35, backgroundColor, textColor, textAlign),
		],
	});

const createCell = (text, width, backgroundColor, textColor, textAlign) =>
	new TableCell({
		verticalAlign: "center",
		width: { size: width, type: "pct" },
		shading: { fill: backgroundColor },
		children: [createParagraph(text, textColor, textAlign)],
	});

const createParagraph = (text, textColor, textAlign) =>
	new Paragraph({
		alignment: textAlign,
		children: [new TextRun({ text, color: textColor, size: 23 })],
	});

const descriptionVocab = () => {
	return new Paragraph({
		children: [
			new TextRun({
				text: "В следующей таблице Вы найдете перечень пунктов, где Вы допустили ошибки, модули ",
				size: 25,
			}),
			new ExternalHyperlink({
				children: [
					new TextRun({
						text: "курса “NativeLike”",
						style: "Hyperlink",
						size: 25,
					}),
				],
				link: "https://wonderlang-school.com/nativelike/",
			}),
			new TextRun({
				text: ", где прорабатываются соответствующие слова/выражения, + лексические темы, которым посвящены эти модули.",
				size: 25,
			}),
		],
		spacing: {
			after: 200,
		},
	});
};

const descriptionGram = () => {
	return new Paragraph({
		children: [
			new TextRun({
				text: "В следующей таблице Вы найдете перечень пунктов, где Вы допустили грамматические ошибки, названия соответствующих тем + модули ",
				size: 25,
			}),
			new ExternalHyperlink({
				children: [
					new TextRun({
						text: "курса “NativeLike”",
						style: "Hyperlink",
						size: 25,
					}),
				],
				link: "https://wonderlang-school.com/nativelike/",
			}),
			new TextRun({
				text: ", где прорабатываются эти темы.",
				size: 25,
			}),
		],
		spacing: {
			after: 200,
		},
	});
};

const tableVoc = (rows) => {
	return new Table({
		width: {
			size: 9000,
			type: "dxa",
		},
		columnWidths: [720, 2250, 1077, 1798, 3153],
		layout: "fixed",
		rows: [
			createRow5(
				"",
				"Слово/фраза",
				"Уровень",
				"Категория",
				"Модуль курса “NativeLike” и лексическая тема",
				{
					backgroundColor: "#deebf6",
					textColor: "000000",
					textAlign: "center",
				},
			),
			...rows,
		],
	});
};

const tableGram = (rows) => {
	if (rows.length === 0) {
		rows = [
			new TableRow({
				children: [
					new TableCell({
						// rowSpan: 5,
						columnSpan: 3,
						verticalAlign: "center",
						margins: { top: 10, bottom: 10 },
						children: [
							new Paragraph({
								alignment: "center",
								children: [
									new TextRun({
										text: "У Вас нет грамматических ошибок",
										size: 27,
									}),
								],
							}),
						],
					}),
				],
			}),
		];
	}
	return new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE,
		},
		columnWidths: [902, 5409, 2704],
		layout: "fixed",
		rows: [
			createRow3("", "Тема", "Модуль курса “NativeLike” и лексическая тема", {
				backgroundColor: "#deebf6",
				textColor: "000000",
				textAlign: "center",
			}),
			...rows,
		],
	});
};

const handleRusultsVoc = (results) => {
	const rows = [];
	tableVocInfo.forEach((item, i) => {
		if (!results[i]) {
			rows.push(
				createRow5(
					item.number,
					item.phrase,
					item.level,
					item.category,
					item.module,
					{
						fill: "#FFFFFF",
						color: "#000000",
						align: "start",
					},
				),
			);
		}
	});
	return rows;
};

const handleResultsGram = (results) => {
	const rows = [];
	tableGramInfo.forEach((item, i) => {
		if (!results[i]) {
			rows.push(
				createRow3(item.number, item.topic, item.module, {
					fill: "#FFFFFF",
					color: "#000000",
					align: "start",
				}),
			);
		}
	});
	return rows;
};

export const createD2File = async ({ results, name, points, fileName }) => {
	const resultsVoc = results.slice(0, 40);
	const resultsGram = results.slice(40, 50);
	const rowsVoc = handleRusultsVoc(results);
	const rowsGram = handleResultsGram(resultsGram);
	const doc = new Document({
		// compatibility: {
		// 	version: 17,
		// 	displayHangulFixedWidth: true,
		// 	useFELayout: true,
		// 	spaceWidth: true,
		// 	layoutRawTableWidth: true,
		// 	layoutTableRowsApart: true,
		// },
		styles: {
			default: {
				document: {
					run: {
						size: "14pt",
						font: "Calibri",
					},
				},
			},
		},
		sections: [
			{
				properties: {
					type: SectionType.CONTINUOUS,
				},
				children: [
					header,
					addName(name),
					date(),
					addPoints(points, 50),
					descriptionVocab(),
					tableVoc(rowsVoc),
					new Paragraph({
						spacing: { after: 500 },
						children: [new TextRun({ text: "" })],
					}),
					descriptionGram(),
					tableGram(rowsGram),
				],
			},
		],
	});
	const buffer = await Packer.toBuffer(doc);
	fs.writeFileSync(`docs/${fileName}.docx`, buffer);
	console.log("File created!");
	return `${fileName}.docx`;
};
