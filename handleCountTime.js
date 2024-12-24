import { getUserInfo } from "./db.js";
import { builder } from "./keyboards.js";
import { delay } from "./services.js";

export const handleCountTime = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	if (userInfo.points < 26) {
		await ctx.send(
			`Чтобы достичь уровня B2, вам потребуется от 180 до 260 часов целенаправленной работы над языком.
Откуда эти цифры?
Они основаны на исследованиях Бена Найта (Ben Knight), директора отдела методологии Cambridge English. Его исследования помогли разработать программы обучения для миллионов студентов по всему миру.
По подсчетам Найта, у взрослых мотивированных English learners путь от B1 до B2 занимает "between 180 and 260 hours of guided learning". 
Что же такое guided learning и как его организовать, чтобы выйти на уровень B2 за 180 часов?
`,
			{ keyboard: builder([{ label: "Как достичь В2?" }]).oneTime(true) },
		);
	} else if (userInfo.points < 30) {
		await ctx.send(
			`Чтобы достичь уровня B2, вам потребуется от 90 до 130 часов целенаправленной работы над языком.
Откуда эти цифры?
Они основаны на исследованиях Бена Найта (Ben Knight), директора отдела методологии Cambridge English. Его исследования помогли разработать программы обучения для миллионов студентов по всему миру.
По подсчетам Найта, у взрослых мотивированных English learners путь от B1 до B2 занимает "between 180 and 260 hours of guided learning", а половину этого пути вы уже прошли.
Что же такое guided learning и как его организовать, чтобы выйти на уровень B2 за 90 часов?`,
			{ keyboard: builder([{ label: "Как достичь В2?" }]).oneTime(true) },
		);
	} else if (userInfo.points < 36) {
		await ctx.send(
			`Чтобы достичь уровня С1, вам потребуется от 200 до 300 часов целенаправленной работы над языком.
Откуда эти цифры?
Они основаны на исследованиях Бена Найта (Ben Knight), директора отдела методологии Cambridge English. Его исследования помогли разработать программы обучения для миллионов студентов по всему миру.
По подсчетам Найта, у взрослых мотивированных English learners путь от B2 до C1 занимает "between 200 and 300 hours of guided learning".
Что же такое guided learning и как его организовать, чтобы выйти на уровень C1 за 200 часов?
`,
			{ keyboard: builder([{ label: "Как достичь С1?" }]).oneTime(true) },
		);
	} else if (userInfo.points < 40) {
		await ctx.send(
			`Чтобы достичь уровня С1, вам потребуется от 100 до 150 часов целенаправленной работы над языком.
Откуда эти цифры?
Они основаны на исследованиях Бена Найта (Ben Knight), директора отдела методологии Cambridge English. Его исследования помогли разработать программы обучения для миллионов студентов по всему миру.
По подсчетам Найта, у взрослых мотивированных English learners путь от B2 до C1 занимает "between 200 and 300 hours of guided learning", а половину этого пути вы уже прошли.
Что же такое guided learning и как его организовать, чтобы выйти на уровень C1 за 100 часов?
`,
			{ keyboard: builder([{ label: "Как достичь С1?" }]).oneTime(true) },
		);
	} else if (userInfo.points < 46) {
		await ctx.send(
			`Чтобы достичь уровня С2, вам потребуется от 300 до 400 часов целенаправленной работы над языком.
Откуда эти цифры?
Они основаны на исследованиях Бена Найта (Ben Knight), директора отдела методологии Cambridge English. Его исследования помогли разработать программы обучения для миллионов студентов по всему миру.
По подсчетам Найта, у взрослых мотивированных English learners путь от C1 до C2 занимает "between 300 and 400 hours of guided learning", а половину этого пути вы уже прошли.
Что же такое guided learning и как его организовать, чтобы выйти на уровень C2 за 300 часов?`,
			{ keyboard: builder([{ label: "Как достичь С2?" }]).oneTime(true) },
		);
	}
};

export const handleWhatNext = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	const test = userInfo.test;
	let text;
	switch (test) {
		case "d1":
			text = `💌 Сразу после оплаты вы получите письмо с платформы Edvibe на почту, указанную при регистрации.

Активируйте свой аккаунт на Edvibe, следуя инструкции в письме. После этого вы увидите "Тестовый доступ к курсу "Tense Matters" в своем личном кабинете.

Можете приступать к вводному модулю. В течение нескольких часов мы свяжемся с вами и откроем вам любой модуль, который вы выберете.`;
			break;
		case "d2":
			if (userInfo.points < 20)
				text = `💌 Сразу после оплаты вы получите письмо с платформы Edvibe на почту, указанную при регистрации.

			Активируйте свой аккаунт на Edvibe, следуя инструкции в письме. После этого вы увидите "Тестовый доступ к курсу "Tense Matters" в своем личном кабинете.
			
			Можете приступать к вводному модулю. В течение нескольких часов мы свяжемся с вами и откроем вам любой модуль, который вы выберете.`;
			else
				text = `Сразу после оплаты вы получите письмо с платформы Edvibe на почту, указанную при регистрации.

Активируйте свой аккаунт на Edvibe, следуя инструкции в письме. После этого вы увидите "Интенсив по речи Стива Джобса" в своем личном кабинете.

Можете приступать к обучению!`;
			break;
		case "d2IELTS":
			text = `Сразу после оплаты вы получите письмо с платформы Edvibe на почту, указанную при регистрации.

Активируйте свой аккаунт на Edvibe, следуя инструкции в письме. После этого вы увидите "IELTS Strategy" в своем личном кабинете. 

Можете приступать к тесту. 

Доступ к бонусному интенсиву "Up Your Writing Score" откроется вам в течение 24 часов после покупки "IELTS Strategy".`;
			break;
		default:
			break;
	}
	await ctx.send(text);
	await delay(1500);
	await ctx.send(
		`Если вам пришло приветственное письмо с Edvibe без кода, нажмите на кнопку👇

Если вы столкнулись с любой другой проблемой, напишите сюда: https://vk.com/im?sel=-213318868`,
		{ keyboard: builder([{ label: "В письме нет кода" }]).oneTime(true) },
	);
};
