import { getUserInfo } from "./db.js";
import { builder } from "./keyboards.js";
import { delay } from "./services.js";

export const handleB2 = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	if (userInfo.points < 26) {
		await ctx.send(
			`Важно: guided learning – это не просмотр сериала или small talk с носителем.
Дополнительная практика не будет лишней, но она не входит в те обязательные 180 часов.
Вам нужно организовать работу над языком так, чтобы она была:
✅ целенаправленной и регулярной
✅ идеально выстроенной с методической точки зрения.
В противном случае для достижения результата вам потребуется не 180 часов, и даже не 260, а гораздо больше.`,
			// { keyboard: builder([{ label: "Как достичь В2?" }]).oneTime(true) },
		);
		await delay(1500);
		await ctx.send(
			`По этой причине под 'guided learning' обычно подразумевается работа с преподавателем.
Так, необходимые в вашем случае 180 часов guided learning могут включать, например:
▫️ 90 уроков с репетитором/на курсах + по 1 часу Д/з к каждому
▫️ или: 60 уроков + по 2 часа Д/з
"А можно вообще свести количество занятий с преподавателем к минимуму, ведь это так дорого? От 100 тыс. р. за 1 уровень английского – это too much..."
Да, можно👇`,
			{ keyboard: builder([{ label: "Хочу сам(а)!" }]).oneTime(true) },
		);
	} else {
		await ctx.send(
			`Важно: guided learning – это не просмотр сериала или small talk с носителем.
Дополнительная практика не будет лишней, но она не входит в те обязательные 90 часов.
Вам нужно организовать работу над языком так, чтобы она была:
✅ целенаправленной и регулярной
✅ идеально выстроенной с методической точки зрения.
В противном случае для достижения результата вам потребуется не 90 часов, и даже не 130, а гораздо больше.`,
			// { keyboard: builder([{ label: "Как достичь В2?" }]).oneTime(true) },
		);
		await delay(1500);
		await ctx.send(
			`По этой причине под 'guided learning' обычно подразумевается работа с преподавателем.
Так, необходимые в вашем случае 90 часов guided learning могут включать, например:
▫️ 90 уроков с репетитором без Д/з
▫️ или: 45 уроков + по 1 часу Д/з
"А можно вообще свести количество занятий с преподавателем к минимуму, ведь это так дорого?"
Да, можно👇`,
			{ keyboard: builder([{ label: "Хочу сам(а)!" }]).oneTime(true) },
		);
	}
};
export const handleC1 = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	if (userInfo.points < 36) {
		await ctx.send(
			`Важно: guided learning – это не просмотр сериала или small talk с носителем.
Дополнительная практика не будет лишней, но она не входит в те обязательные 100 часов.
Вам нужно организовать работу над языком так, чтобы она была:
✅ целенаправленной и регулярной
✅ идеально выстроенной с методической точки зрения.
В противном случае для достижения результата вам потребуется не 100 часов, и даже не 150, а гораздо больше.`,
		);
		await delay(1500);
		await ctx.send(
			`По этой причине под 'guided learning' обычно подразумевается работа с преподавателем.
Так, необходимые в вашем случае 200 часов guided learning могут включать, например:
▫️ 100 уроков с репетитором/на курсах + по 1 часу Д/з к каждому
▫️ или: 67 уроков + по 2 часа Д/з
"А можно вообще свести количество занятий с преподавателем к минимуму, ведь это так дорого? От 100 тыс. р. за 1 уровень английского – это too much..."
Да, можно👇`,
			{ keyboard: builder([{ label: "Хочу сам(а)!" }]).oneTime(true) },
		);
	} else {
		await ctx.send(
			`Важно: guided learning – это не просмотр сериала или small talk с носителем.
Дополнительная практика не будет лишней, но она не входит в те обязательные 200 часов.
Вам нужно организовать работу над языком так, чтобы она была:
✅ целенаправленной и регулярной
✅ идеально выстроенной с методической точки зрения.
В противном случае для достижения результата вам потребуется не 200 часов, и даже не 300, а гораздо больше.`,
		);
		await delay(1500);
		await ctx.send(
			`По этой причине под 'guided learning' обычно подразумевается работа с преподавателем.
Так, необходимые в вашем случае 100 часов guided learning могут включать, например:
▫️ 67 уроков с репетитором/на курсах + по 30 минут Д/з к каждому
▫️ или: 50 уроков + по 1 часу Д/з
"А можно вообще свести количество занятий с преподавателем к минимуму, ведь это так дорого?"
Да, можно👇`,
			{ keyboard: builder([{ label: "Хочу сам(а)!" }]).oneTime(true) },
		);
	}
};

export const handleRecommendations = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	if (userInfo.points < 17) {
		await ctx.send(
			`Ближайшая задача, которая стоит перед вами сейчас, – полностью закрыть уровень А2.
И здесь хочу предостеречь вас от самой частой ошибки, которую допускают English learners на этом уровне.
Что за ошибка?

Рассказываю👇`,
			{ keyboard: builder([{ label: "Избежать ошибки" }]).oneTime(true) },
		);
	} else {
		await ctx.send(
			`Ближайшая задача, которая стоит перед вами сейчас, – выйти на уверенный B1.
И здесь хочу предостеречь вас от самой частой ошибки, которую допускают English learners на этом уровне.
Что за ошибка?

Рассказываю👇`,
			{ keyboard: builder([{ label: "Избежать ошибки" }]).oneTime(true) },
		);
	}
};

export const myselfHandler = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	if (userInfo.points < 30) {
		await ctx.send(`В 18 лет я самостоятельно подготовилась к кембриджскому экзамену CAE (уровень C1) и успешно его сдала.

⚙️ Те принципы и приемы, которые я использовала тогда, легли в основу моего метода "NativeLike".

Овладев этим методом, вы сможете эффективно повышать свой уровень самостоятельно с минимальной помощью преподавателя.

Посмотрите, какой скачок сделал мой выпускник Александр Маслей за 2 месяца обучения на курсе "NativeLike" и 3 месяца самостоятельной практики.`);
		await delay(1500);
		await ctx.send(`https://vk.com/video-213318868_456239070`);
		await delay(25000);
		await ctx.send(
			`Рассказать подробнее, как Александру удалось сделать такой скачок за 5 месяцев и... за 21 тыс. р.?`,
			{ keyboard: builder([{ label: "Хочу знать!" }]).oneTime(true) },
		);
	} else if (userInfo.points < 46) {
		await ctx.send(
			`В 18 лет я самостоятельно подготовилась к кембриджскому экзамену CAE (уровень C1) и успешно его сдала.

⚙️ Те принципы и приемы, которые я использовала тогда, легли в основу моего метода "NativeLike".

Овладев этим методом, вы научитесь самостоятельно черпать продвинутые слова, выражения, структуры из речи носителей и наполнять ими свою собственную речь.

Показываю, как этому учились на моем курсе:

▫️ Елизавета – преподаватель английского, стюардесса (Россия - ОАЭ - Испания)
▫️ Влада – учитель математики (Россия - Англия)
▫️ Мария – преподаватель английского из МГУ`,
		);
		await delay(1500);
		await ctx.send(`https://vk.com/video-213318868_456239036`);
		await delay(25000);
		await ctx.send(`Каких результатов они достигли за 2-4 месяца обучения?

Кейсы Елизаветы, Влады, Марии и нескольких других выпускниц "NativeLike" вы найдете на странице курса: https://wonderlang-school.com/nativelike`);
		await delay(1500);
		await ctx.send(
			`Вы хотите овладеть методом "NativeLike" и начать быстро повышать свой уровень самостоятельно?

Сегодня это возможно за 1495 р.!`,
			{ keyboard: builder([{ label: "Узнать подробнее" }]).oneTime(true) },
		);
	}
};

export const handlePromocode = async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	const test = userInfo.test;
	let text;
	switch (test) {
		case "d1":
			text = `1. Пройдите по ссылке: https://edvibe.com/MarathonRegister/52986
2. Введите свое имя и email, нажмите на кнопку "Proceed to payment".
3. На платежной странице введите свой промокод и нажмите на кнопку "Применить". 

Все, можно оплачивать!

Если у вас возникли сложности с оплатой или появились вопросы, напишите мне: https://vk.com/im?sel=-213318868

Что потом?

Рассказываю👇`;

			break;
		case "d2":
			if (userInfo.points < 20) {
				text = `1. Пройдите по ссылке: https://edvibe.com/MarathonRegister/52986
2. Введите свое имя и email, нажмите на кнопку "Proceed to payment".
3. На платежной странице введите свой промокод и нажмите на кнопку "Применить". 
				
Все, можно оплачивать!
				
Если у вас возникли сложности с оплатой или появились вопросы, напишите мне: https://vk.com/im?sel=-213318868				
Что потом?

Рассказываю👇`;
			} else
				text = `1. Пройдите по ссылке: https://edvibe.com/MarathonRegister/44981
2. Введите свое имя и email, нажмите на кнопку "Proceed to payment".
3. На платежной странице введите промокод и нажмите на кнопку "Применить".

Все, можно оплачивать!

Если у вас возникли сложности с оплатой или появились вопросы, напишите мне: https://vk.com/im?sel=-213318868

Что потом?

Рассказываю👇`;
			break;
		case "d2IELTS":
			text = `1. Пройдите по ссылке: https://new.edvibe.com/marathon-register/62433
2. Введите свое имя и email, нажмите на кнопку "Proceed to payment".
3. На платежной странице введите промокод и нажмите на кнопку "Применить".

Все, можно оплачивать!

Если у вас возникли сложности с оплатой или появились вопросы, напишите мне: https://vk.com/im?sel=-213318868

Что потом?

Рассказываю👇`;
			break;
		default:
			break;
	}
	await ctx.send(text, {
		keyboard: builder([{ label: "Что после оплаты?" }]).oneTime(true),
	});
};