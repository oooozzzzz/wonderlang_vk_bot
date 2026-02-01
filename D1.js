import * as fs from "fs";
import {
	Document,
	ExternalHyperlink,
	Packer,
	Paragraph,
	SectionType,
	ShadingType,
	Table,
	TableCell,
	TableRow,
	TextRun,
	WidthType,
} from "docx";
import moment from "moment";
// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section

const total = [
	{
		text1: "№ 1",
		text2:
			"Глагол ‘be’. Контексты использования. ‘Be в утвердительных предложениях. Полные и краткие формы.",
		text3: "Модуль 1",
	},
	{
		text1: "№ 2",
		text2:
			"Конструкция ‘have got’. Контексты использования. ‘Have got’ в утвердительных предложениях. Полные и краткие формы.",
		text3: "Модуль 1",
	},
	{
		text1: "№ 3",
		text2: "‘Be’ в отрицательных предложениях. Полные и краткие формы.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 4",
		text2: "‘Have got‘ в отрицательных предложениях. Полные и краткие формы.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 5",
		text2: "‘Can’ в утвердительных и отрицательных предложениях.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 6",
		text2: "Общие вопросы с глаголами ‘be’, ‘can’, ‘have got’.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 7",
		text2: "Краткие ответы с глаголами ‘be’, ‘can’, ‘have got’.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 8",
		text2: "Специальные вопросы с глаголами ‘be’, ‘can’, ‘have got’.",
		text3: "Модуль 2",
	},
	{
		text1: "№ 9",
		text2:
			"Утвердительные предложения в Present Simple. Особенности произношения и написания форм глаголов с окончанием ‘-s’.",
		text3: "Модуль 3",
	},
	{
		text1: "№ 10",
		text2:
			"Отрицательные предложения в Present Simple. Полные и краткие формы.",
		text3: "Модуль 3",
	},
	{
		text1: "№ 11",
		text2: "Общие вопросы в Present Simple.",
		text3: "Модуль 3",
	},
	{
		text1: "№ 12",
		text2: "Краткие ответы в Present Simple.",
		text3: "Модуль 3",
	},
	{
		text1: "№ 13",
		text2: "Специальные вопросы в Present Simple.",
		text3: "Модуль 3",
	},
	{
		text1: "№ 14",
		text2: "Конструкция “there is/are” в предложениях разных типов.",
		text3: "Модуль 4",
	},
	{
		text1: "№ 15",
		text2: "“Have” и “have got”: разница в использовании.",
		text3: "Модуль 4",
	},
	{
		text1: "№ 16",
		text2:
			"Вопросы к подлежащему: особенности структуры. Разница между вопросами к подлежащему и специальными вопросами, начинающимися с ‘who’ и ‘what’.",
		text3: "Модуль 4",
	},
	{
		text1: "№ 17",
		text2:
			"Наречия частотности (‘sometimes’, ‘always’ и т.п.) и их место в предложении.",
		text3: "Модуль 4",
	},
	{
		text1: "№ 18",
		text2:
			"Наречные выражения частотности (‘once a week’ и т.п.) и их место в предложениях.",
		text3: "Модуль 4",
	},
	{
		text1: "№ 19",
		text2:
			"Формы глагола ‘be’ в Past Simple. ‘Be’ в утвердительных предложениях.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 20",
		text2:
			"‘Be’ в отрицательных предложениях в Past Simple. Полные и краткие формы.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 21",
		text2: "‘There was/were’.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 22",
		text2: "‘Be’ в вопросах в Past Simple.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 23",
		text2: "‘Be’ в кратких ответах в Past Simple.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 24",
		text2: "“Can” в предложениях разных типов в Past Simple.",
		text3: "Модуль 5",
	},
	{
		text1: "№ 25",
		text2:
			"Правильные глаголы в форме Past Simple. Особенности произношения и написания правильных глаголов с окончанием “-ed”.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 26",
		text2:
			"Правильные глаголы в форме Past Simple. Особенности произношения и написания правильных глаголов с окончанием “-ed”.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 27",
		text2: "Утвердительные предложения в Past Simple.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 28",
		text2: "Отрицательные предложения в Past Simple.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 29",
		text2: "Общие вопросы и краткие ответы в Past Simple.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 30",
		text2: "Специальные вопросы в Past Simple.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 31",
		text2: "Специальные вопросы vs вопросы к подлежащему в Past Simple.",
		text3: "Модуль 6",
	},
	{
		text1: "№ 32",
		text2: "Особенности написания форм глаголов с окончанием “-ing”.",
		text3: "Модуль 7",
	},
	{
		text1: "№ 33",
		text2: "Утвердительные и отрицательные предложения в Present Continuous.",
		text3: "Модуль 7",
	},
	{
		text1: "№ 34",
		text2: "Вопросительные предложения в Present Continuous.",
		text3: "Модуль 7",
	},
	{
		text1: "№ 35",
		text2: "Краткие ответы в Present Continuous.",
		text3: "Модуль 7",
	},
	{
		text1: "№ 36",
		text2:
			"Основные функции Present Continuous в сопоставлении с функциями Present Simple.",
		text3: "Модуль 8",
	},
	{
		text1: "№ 37",
		text2:
			"Основные функции Present Continuous в сопоставлении с функциями Present Simple.",
		text3: "Модуль 8",
	},
	{
		text1: "№ 38",
		text2: "Глаголы состояния и особенности их использования.",
		text3: "Модуль 8",
	},
	{
		text1: "№ 39",
		text2: "Глаголы состояния и особенности их использования.",
		text3: "Модуль 8",
	},
	{
		text1: "№ 40",
		text2: "Глагольные формы в Present Simple vs Present Continuous.",
		text3: "Модуль 8",
	},
	{
		text1: "№ 41",
		text2: "Разные типы предложений с ‘be going to’.",
		text3: "Модуль 9",
	},
	{
		text1: "№ 42",
		text2: "Специальные вопросы с  ‘be going to’.",
		text3: "Модуль 9",
	},
	{
		text1: "№ 43",
		text2: "Краткие ответы с ‘be going to’.",
		text3: "Модуль 9",
	},
	{
		text1: "№ 44",
		text2:
			"Краткие и полные формы глаголов в утвердительных и отрицательных предложениях Future Simple.",
		text3: "Модуль 10",
	},
	{
		text1: "№ 45",
		text2: "Вопросительные предложения в Future Simple.",
		text3: "Модуль 10",
	},
	{
		text1: "№ 46",
		text2: "Разница между ‘will’ и ‘shall’.",
		text3: "Модуль 10",
	},
	{
		text1: "№ 47",
		text2:
			"Разница между контекстами использования Future Simple, ‘be going to’ и Present Continuous.",
		text3: "Модуль 10",
	},
	{
		text1: "№ 48",
		text2:
			"Разница между контекстами использования Future Simple, ‘be going to’ и Present Continuous.",
		text3: "Модуль 10",
	},
	{
		text1: "№ 49",
		text2: "Неправильные глаголы в Present Perfect.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 50",
		text2: "Правильные и неправильные глаголы в Present Perfect.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 51",
		text2: "Утвердительные и отрицательные предложения в Present Perfect.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 52",
		text2: "Вопросительные предложения в Present Perfect.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 53",
		text2: "Разница между ‘been to’ и ‘gone to’.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 54",
		text2:
			"Наречия (already, just, yet, never и т.п.), используемые с временем Present Perfect. Их место в предложении и особенности использования.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 55",
		text2:
			"Предлоги (for, since) и особенности их использования в предложениях с временем Present Perfect.",
		text3: "Модуль 11",
	},
	{
		text1: "№ 56",
		text2:
			"Разница между контекстами использования Present Perfect и Past Simple.",
		text3: "Модуль 12",
	},
	{
		text1: "№ 57",
		text2:
			"Разница между контекстами использования Present Perfect и Past Simple.",
		text3: "Модуль 12",
	},
	{
		text1: "№ 58",
		text2:
			"Разница между контекстами использования Present Perfect и Present Simple.",
		text3: "Модуль 12",
	},
	{
		text1: "№ 59",
		text2:
			"Разница между контекстами использования Present Perfect, Past Simple и Present Simple.",
		text3: "Модуль 12",
	},
	{
		text1: "№ 60",
		text2:
			"Разница между контекстами использования Present Perfect и Present Perfect Continuous.",
		text3: "Модуль 12",
	},
];

const paragraph = (text, color = "000000", align = "start") => {
	return new Paragraph({
		alignment: align,
		indent: { left: 80, right: 0, top: 150, bottom: 0 },
		// spacing: {
		// 	before: 80,
		// },
		children: [new TextRun({ text, color, size: 23 })],
	});
};

const cell = (text, width, fill = "FFFFFF", color, align) => {
	return new TableCell({
		width: {
			size: width,
			type: "pct",
		},
		shading: {
			fill: fill,
		},
		children: [paragraph(text, color, align)],
	});
};

const row = (
	text1,
	text2,
	text3,
	{ fill = "FFFFFF", color = "000000", align = "start" } = {
		fill: "FFFFFF",
		color: "000000",
		align: "start",
	},
) => {
	return new TableRow({
		children: [
			cell(text1, 25, fill, color, align),
			cell(text2, 50, fill, color, align),
			cell(text3, 25, fill, color, align),
		],
	});
};

const headline = (text, fill, color) => {
	return new TableRow({
		children: [
			new TableCell({
				shading: {
					fill: fill,
				},
				verticalAlign: "center",
				columnSpan: 3,
				margins: { top: 10, bottom: 10 },
				children: [paragraph(text, color, "center")],
			}),
		],
	});
};

const processResults = (results) => {
	let presentSimple = [headline("PRESENT SIMPLE", "#b6d7a8")];
	let pastSimple = [headline("PAST SIMPLE", "#a4c2f4")];
	let presentContinuous = [headline("PRESENT CONTINUOUS", "#ffe599")];
	let futureForms = [headline("FUTURE FORMS", "#ea9999")];
	let presentPerfect = [headline("PRESENT PERFECT", "#b4a7d6")];

	results.forEach((item, i) => {
		if (item) {
			return;
		}
		const texts = [total[i].text1, total[i].text2, total[i].text3];

		if (i < 19) {
			const textRow = row(...texts, {
				fill: "#f2f8f0",
				color: "000000",
			});
			presentSimple.push(textRow);
		} else if (i < 31) {
			const textRow = row(...texts, {
				fill: "#deebf6",
				color: "000000",
			});
			pastSimple.push(textRow);
		} else if (i < 41) {
			const textRow = row(...texts, {
				fill: "#fffaea",
				color: "000000",
			});
			presentContinuous.push(textRow);
		} else if (i < 49) {
			const textRow = row(...texts, {
				fill: "#ffebeb",
				color: "000000",
			});
			futureForms.push(textRow);
		} else if (i <= 60) {
			const textRow = row(...texts, {
				fill: "#e5e0f0",
				color: "000000",
			});
			presentPerfect.push(textRow);
		}
	});
	if (presentSimple.length === 1) {
		presentSimple = [];
	}

	if (pastSimple.length === 1) {
		pastSimple = [];
	}

	if (presentContinuous.length === 1) {
		presentContinuous = [];
	}

	if (futureForms.length === 1) {
		futureForms = [];
	}

	if (presentPerfect.length === 1) {
		presentPerfect = [];
	}
	return [
		...presentSimple,
		...pastSimple,
		...presentContinuous,
		...futureForms,
		...presentPerfect,
	];
};

const table = (rows) => {
	return new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE,
		},
		layout: "fixed",
		columnWidths: [2257, 4508, 2257],
		rows: [
			row(
				"Вопрос теста",
				"Тема, в которой есть пробелы",
				'Модуль курса "Tense Matters"',
				{ fill: "#0b5394", color: "FFFFFF", align: "center" },
			),
			...rows,
		],
	});
};

const header = new Paragraph({
	children: [
		new TextRun({
			text: "Анализ результатов грамматического теста WonderLang School",
			size: 32,
			bold: true,
			color: "#080f59",
		}),
	],
	spacing: {
		after: 500,
	},
});

export const addName = (name) => {
	return new Paragraph({
		children: [
			new TextRun({
				text: `Имя: `,
				size: 25,
				bold: true,
			}),
			new TextRun({
				text: name,
				size: 25,
			}),
		],
		spacing: {
			after: 250,
		},
	});
};
export const date = () => {
	return new Paragraph({
		children: [
			new TextRun({
				text: `Дата прохождения теста: `,
				size: 25,
				bold: true,
			}),
			new TextRun({
				text: moment().format("DD.MM.YYYY"),
				size: 25,
			}),
		],
		spacing: {
			after: 250,
		},
	});
};

export const addPoints = (number, outOf = 60) => {
	return new Paragraph({
		children: [
			new TextRun({
				text: `Количество баллов: `,
				size: 25,
				bold: true,
			}),
			new TextRun({
				text: `${number}/${outOf}`,
				size: 25,
			}),
		],
		spacing: {
			after: 250,
		},
	});
};

const description = () => {
	return new Paragraph({
		children: [
			new TextRun({
				text: `В следующей таблице вы найдете: перечень базовых тем (А1-А2), в которых у Вас есть пробелы, + модули `,
				size: 25,
			}),
			new ExternalHyperlink({
				children: [
					new TextRun({
						text: "курса “Tense Matters”",
						style: "Hyperlink",
						size: 25,
					}),
				],
				link: "https://nativelike.school/tense-matters",
			}),
			new TextRun({
				text: ", где вы можете изучить эти правила и автоматизировать их использование.",
				size: 25,
			}),
		],
		spacing: {
			after: 200,
		},
	});
};

export const createD1File = async ({ results, name, points, fileName }) => {
	const rows = processResults(results);
	const doc = new Document({
		styles: {
			default: {
				document: {
					run: {
						size: "13pt",
						font: "Arial",
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
					addPoints(points),
					description(),
					table(rows),
				],
			},
		],
	});

	// Used to export the file into a .docx file
	const buffer = await Packer.toBuffer(doc);
	fs.writeFileSync(`docs/${fileName}`, buffer);
	console.log("File created!");
	return `${fileName}`;
};
// Done! A file called 'My Document.docx' will be in your file system.
