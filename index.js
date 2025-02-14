import { Keyboard } from "vk-io";
import { users, vk } from "./bot.js";
import { builder } from "./keyboards.js";
import { aboutYou, createUser, getUserInfo, setPoints, setTest } from "./db.js";
import { delay, IELTSPoints } from "./services.js";
import { app } from "./app.js";
import { configDotenv } from "dotenv";
import { handleOS } from "./handleOS.js";
import { handleCountTime, handleWhatNext } from "./handleCountTime.js";
import {
	handleB2,
	handleC1,
	handlePromocode,
	handleRecommendations,
	myselfHandler,
} from "./gradeHandlers.js";
import { startTimer, updateTimer } from "./timers.js";
import { getPromocode } from "./sheets.js";
import moment from "moment";
import { updateDeal } from "./crm.js";
import { customFields, statuses } from "./config.js";
import { sendPhoto } from "./upload.js";
configDotenv();
const port = process.env.PORT || 3000;
// const builder = Keyboard.builder()
// 	.textButton({
// 		label: "Go back",
// 		payload: {
// 			command: "back",
// 		},
// 	})
// 	.row()
// 	.textButton({
// 		label: "Buy a tea",
// 		payload: {
// 			command: "buy",
// 			item: "tea",
// 		},
// 		color: Keyboard.POSITIVE_COLOR,
// 	})
// 	.textButton({
// 		label: "Buy a coffee",
// 		payload: {
// 			command: "buy",
// 			item: "coffee",
// 		},
// 		color: Keyboard.POSITIVE_COLOR,
// 	})
// 	.row()
// 	.textButton({
// 		label: "Cancel",
// 		payload: {
// 			command: "cancel",
// 		},
// 		color: Keyboard.NEGATIVE_COLOR,
// 	}); //

vk.updates.on("message_new", async (ctx) => {
	const userInfo = await getUserInfo(ctx.senderId);
	switch (ctx.text) {
		case "Начать":
			await createUser(ctx.senderId);
			await ctx.send(
				`Пожалуйста, ответьте на пару вопросов, чтобы я подобрала для вас подходящий тест`,
				{ keyboard: builder([{ label: "К вопросам" }]) },
			);
			break;
		case "К вопросам":
			await ctx.send("Какая цель у вас сейчас в изучении английского?", {
				keyboard: builder([
					{ label: "Повысить свой уровень" },
					{ label: "Сдать IELTS" },
				]),
			});
			break;
		case "Повысить свой уровень":
			await updateDeal(userInfo.amoId, undefined, [
				{
					field_id: customFields.purpose.id,
					values: [{ value: "Повысить уровень" }],
				},
			]);
			await ctx.send(
				`Эта фраза – про вас?

😒Говорю как попало, многих правил не помню, проверить себя не могу, из-за этого чувствую себя неуверенно.`,
				{
					keyboard: builder([{ label: "Скорее да" }, { label: "Нет" }]).oneTime(
						true,
					),
				},
			);
			break;
		case "Скорее да":
			await setTest(ctx.senderId, "d1");
			await updateDeal(userInfo?.amoId, undefined, [
				{ field_id: customFields.gaps.id, values: [{ value: "Да" }] },
			]);
			await ctx.send(
				`Тогда пройдите 20-минутный тест на знание самых важных грамматических тем, без которых невозможно преодолеть планку B1-B2.

✅ Узнайте, какие именно темы вам нужно проработать, чтобы сделать рывок в английском за считанные недели.

✅ Получите подробную обратную связь с информацией о своем уровне, анализом каждой ошибки и индивидуальными рекомендациями.

Приступим?👇`,
				{ keyboard: builder([{ label: "Пройти тест" }]) },
			);
			break;
		case "Нет":
			await updateDeal(userInfo?.amoId, undefined, [
				{ field_id: customFields.gaps.id, values: [{ value: "Нет" }] },
			]);
			await setTest(ctx.senderId, "d2");
			await ctx.send(
				`Тогда пройдите 20-минутный диагностический тест. 

✅ Вы узнаете, на каком уровне у вас сейчас знание лексики и грамматики.

✅ Вы получите подробные рекомендации, которые помогут вам сфокусироваться на главном и быстро повысить свой уровень.

Приступим?👇
`,
				{
					keyboard: builder([{ label: "Пройти тест" }]),
				},
			);
			break;
		case "Пройти тест":
			await ctx.send(
				`Для прохождения теста вам потребуется индивидуальный код.
Скопируйте его👇
`,
			);
			await delay(1000);
			await ctx.send(`${ctx.senderId}`);
			await delay(1000);
			await ctx.send(
				`Теперь можно приступать к диагностике.
Получите ссылку на тест👇
`,
				{ keyboard: builder([{ label: "Получить ссылку" }]).oneTime(true) },
			);
			break;
		case "Получить ссылку":
			await updateDeal(userInfo?.amoId, statuses.got_link.id);
			startTimer(ctx.senderId);
			if (userInfo.test === "d1") {
				await ctx.send(`Тест доступен по ссылке: https://forms.gle/JvvxphzWKN8XHPgr8
⏰ Пройдите его в течение 24 часов и получите 3 подарка:

▫️ Гайд "Как научиться использовать грамматику на автомате" 

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса`);
			} else if (userInfo.test === "d2") {
				ctx.send(`Тест доступен по ссылке: 

https://forms.gle/Qp9UNcqhewRh5Zkz8
⏰ Пройдите его в течение 24 часов и получите 3 подарка:
▫️ Гайд "15 TED talks по 15 темам"

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса`);
			} else if (userInfo.test === "d2IELTS") {
				await ctx.send(`Тест доступен по ссылке:

https://forms.gle/CrLxDyM5NabgCjeX8

⏰ Пройдите его в течение 24 часов и получите 3 подарка:

▫️ видео-урок из курса "IELTS INSIGHT" "Как быстро спланировать монолог на экзамене в части Speaking"

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса`);
			}
			break;
		case "Получить обратную связь":
			await handleOS(ctx);
			break;
		case "Рассчитать время":
			await handleCountTime(ctx);
			break;
		case "Как достичь В2?":
			await handleB2(ctx);
			break;
		case "Как достичь С1?":
			await handleC1(ctx);
			break;
		case "Как достичь С2?":
			await ctx.send(`Важно: guided learning – это не просмотр сериала или small talk с носителем.

Дополнительная практика не будет лишней, но она не входит в те обязательные 100 часов.

Вам нужно организовать работу над языком так, чтобы она была:

✅ целенаправленной и регулярной

✅ идеально выстроенной с методической точки зрения.

В противном случае для достижения результата вам потребуется не 300 часов, и даже не 400, а гораздо больше.`);
			await delay(1500);
			await ctx.send(
				`По этой причине под 'guided learning' обычно подразумевается работа с преподавателем.

Так, необходимые в вашем случае 300 часов guided learning могут включать, например:

▫️ 150 уроков с репетитором/на курсах + по 1 часу Д/з к каждому

▫️ или: 100 уроков + по 2 часа Д/з

"А можно вообще свести количество занятий с преподавателем к минимуму, ведь это так дорого?"

Да, можно👇`,
				{ keyboard: builder([{ label: "Хочу сам(а)!" }]) },
			);
			break;
		case "Получить рекомендации":
			await handleRecommendations(ctx);
			break;
		case "Избежать ошибки":
			await ctx.send(
				`❌ Главная ошибка – переходить к изучению более сложных тем, когда базовые не усвоены на 100%.

Бессмысленно браться за Past Perfect или Conditionals, если делаешь ошибки в Present Simple и Past Simple; если путаешься, где нужен 'be', а где – 'do'; если расставляешь слова в вопросах в неправильном порядке.

К чему приводит эта ошибка?

Вот к чему👇`,
				{ keyboard: builder([{ label: "Хочу знать" }]) },
			);
			break;
		case "Хочу знать":
			await ctx.send(
				`Вот что происходит, если переходишь к "продвинутым" темам с пробелами в базе:

❌ в голове – каша

❌ количество ошибок в речи растет в геометрической прогрессии, и от них не получается избавиться годами

❌ появляется неуверенность в себе и своих "языковых способностях"

❌ страдаешь от ощущения "языкового барьера".

И всех этих проблем можно легко избежать, если вовремя заложить прочный грамматический фундамент.
Как понять, что фундамент у вас уже есть?

Рассказываю👇`,
				{
					keyboard: builder([{ label: "Как понять, что все ОК?" }]).oneTime(
						true,
					),
				},
			);
			break;
		case "Как понять, что все ОК?":
			await ctx.send(
				`С вашей базой все в порядке, если:

✅ вы можете свободно общаться о прошлом, настоящем и будущем, сообщать информацию и задавать вопросы

✅ вы знаете, как использовать самые частотные времена и структуры: Present Simple, Past Simple, Present Continuous, Future Simple, Present Perfect, going to

✅ вы можете легко проверить себя и исправить свои ошибки в пройденных темах

✅ когда вы общаетесь на английском, то используете верные формы слов "на автомате"; вы успеваете подумать о том, что хотите сказать (а не перебираете в голове правила).

Собрали все 4 галочки? Отлично! Продолжайте учить английский в том же духе.

Если пока нет, то вот что нужно сделать👇`,
				{ keyboard: builder([{ label: "Что нужно сделать?" }]) },
			);
			break;
		case "Что нужно сделать?":
			await ctx.send(
				`Закройте пробелы в знании основных тем, которые вы проходили на уровне А1-А2, и научитесь применять эти правила "на автомате".

Именно "дыры" в базе – та самая "ловушка", которая чаще всего мешает прогрессу.

Вы хотите узнать, как закрыть пробелы всего за несколько недель?`,
				{ keyboard: builder([{ label: "Как починить базу?" }]) },
			);
			break;
		case "Как починить базу?":
			await ctx.send(
				`Самый быстрый способ это сделать – пройти курс "Tense Matters".
Несколько недель обучения – и вы:

✅ говорите грамотно и естественно

✅ можете в любой момент опереться на твердое знание правил, проверить себя

✅ быстро пишете и уверенно говорите на английском о себе, своей семье, друзьях, увлечениях, работе, учебе, путешествиях, планах на будущее

✅ можете с чистой совестью переходить к более сложным темам и больше никогда не тратить время на азы.

Подробная информация о курсе: https://wonderlang-school.com/tense-matters/

По любым вопросам пишите сюда: https://vk.com/im?sel=-213318868`,
			);
			await delay(1500);
			await ctx.send(
				`Хотите пройти один из 12 модулей курса "Tense Matters" всего за 495 р. и сразу увидеть первые результаты?`,
				{ keyboard: builder([{ label: "Хочу попробовать" }]) },
			);
			break;
		case "Хочу попробовать":
			await ctx.send(
				`Стоимость тестового доступа к "Tense Matters" – 990 р., но сегодня вам доступен индивидуальный промокод на скидку 50%.
Что вы получите за 495 р.?

✅ 3-дневный доступ к любому модулю курса "Tense Matters" на удобной онлайн-платформе

✅ подробную обратную связь преподавателя по пройденному модулю

✅ возможность приобрести полный курс со скидкой 15%.

Готовы? Тогда нажмите на кнопку👇`,
				{
					keyboard: builder([{ label: "Получить промокод" }]).oneTime(true),
				},
			);
			break;
		case "Хочу закрыть пробелы":
			await ctx.send(`Предлагаю вам пройти один из модулей курса "Tense Matters".



Подробная информация о курсе: https://wonderlang-school.com/tense-matters/

По любым вопросам пишите сюда: https://vk.com/im?sel=-213318868`);
			await delay(1500);
			await ctx.send(
				`Стоимость тестового доступа – 990 р., но сегодня вам доступен индивидуальный промокод на скидку 50%.
За три дня самостоятельной работы на удобной онлайн-платформе вы сможете:

✅ изучить правило, которое всю жизнь не укладывалось в голове

✅ научиться использовать его в своей речи грамотно и естественно.

Вы также получите подробную обратную связь преподавателя с анализом всех ошибок и индивидуальными рекомендациями.

Готовы? Тогда нажмите на кнопку👇`,
				{ keyboard: builder([{ label: "Получить промокод" }]) },
			);
			break;
		case "Немного телепатии))":
			await ctx.send(
				`Вы подумали:
"Как же так! Учу английский столько лет, но даже в таких простых темах ошибаюсь... Что мне теперь – снова возвращаться к Present Simple?! Да я так потеряю остатки мотивации и только зря потрачу время и силы..."

Сейчас открою вам страшную тайну о Present Simple, и у вас больше не будет повода для уныния и самобичевания;) 

Хотите?`,
				{ keyboard: builder([{ label: "Открыть тайну" }]) },
			);
			break;
		case "Открыть тайну":
			await ctx.send(
				`Present Simple – самое сложное время английского языка. 
Честное слово!

Если в начале вашего English learning journey вам объяснили его кое-как, то корень Ваших проблем с грамматикой как раз в этом.

Не поняли, как использовать Present Simple; запутались, где 'be', а где – 'do'; где нужен вспомогательный глагол, а где – нет; где 'have' – c 'got', а где – 'без'... 

Все. Английская грамматика кажется нелогичной. Появляется привычка "лепить" все формы наобум. Чем больше пытаешься применять правила, тем больше ошибаешься. Правда, когда говоришь "по наитию", тоже ошибаешься. Проверить себя не можешь. Чувствуешь себя неуверенно.

Что же делать?

Рассказываю👇`,
				{ keyboard: builder([{ label: "Что делать?" }]) },
			);
			break;
		case "Что делать?":
			await ctx.send(
				`Номер 1 – ИЗУЧИТЬ:

✅ основные принципы, по которsм строятся предложения разных типов в английском языке

Зная эти принципы, вы сможете с ходу задать вопрос даже в каком-нибудь сложном времени типа Past Perfect Continuous.

✅ все нюансы, связанные с использованием самых частотных времен: Present Simple, Past Simple, Present Continuous, Present Perfect, Future Simple + be going to.

Зачастую именно незнание нюансов (где 'been in', а где 'been to'? и т.п.) приводит к потере баллов на важных тестах, да и просто снижает качество речи.

❌ Но это еще не все. Самая частая ошибка – останавливаться на изучении правил.

Рассказать, что еще необходимо сделать, чтобы заговорить на английском грамотно и свободно?👇`,
				{ keyboard: builder([{ label: "Что еще сделать?" }]) },
			);
			break;
		case "Что еще сделать?":
			await ctx.send(
				`Номер 2 – АВТОМАТИЗИРОВАТЬ все эти правила, то есть научиться использовать их в своей речи не задумываясь.

Если этого не сделать, правила будут лежать в голове мертвым грузом и постепенно оттуда выветриваться, а вас будет все время преследовать ощущение языкового барьера.

Номер 3 – ПОНЯТЬ, какой логикой руководствуются носители при выборе каждого времени.

Тогда вы и сами сможете легко определить, в какой ситуации подойдет, скажем, Present Perfect, а в какой – Past Simple или Present Simple.`,
			);
			await delay(1500);
			await ctx.send(
				`❗️И все это можно понять, изучить, автоматизировать за 6-12 недель регулярных занятий! 

Так, чтобы больше никогда в жизни не возвращаться к этим темам, а только двигаться вперед.

Как этого добиться?

Рассказываю👇

`,
				{ keyboard: builder([{ label: "Как сделать прорыв?" }]) },
			);
			break;
		case "Как сделать прорыв?":
			await ctx.send(
				`Самый быстрый способ понять логику английских времен, изучить правила и автоматизировать их – это пройти курс "Tense Matters".

Несколько недель обучения – и вы:

✅ быстро пишете и уверенно говорите на английском о себе, своей семье, друзьях, увлечениях, работе, учебе, путешествиях, планах на будущее

✅ можете в любой момент проверить себя

✅ можете с чистой совестью переходить к более сложным темам и больше никогда не тратить время на азы.

Подробная информация о курсе: https://wonderlang-school.com/tense-matters/

По любым вопросам пишите сюда: https://vk.com/im?sel=-213318868`,
			);
			await delay(1500);
			await ctx.send(
				`Хотите пройти один из 12 модулей курса "Tense Matters" всего за 495 р. и сразу увидеть первые результаты?`,
				{ keyboard: builder([{ label: "Хочу попробовать" }]) },
			);
			break;
		case "Сдать IELTS":
			await updateDeal(userInfo?.amoId, undefined, [
				{
					field_id: customFields.purpose.id,
					values: [{ value: "Сдать IELTS" }],
				},
			]);
			await setTest(ctx.senderId, "d2IELTS");
			await ctx.send(
				`Пройдите 20-минутный диагностический тест.

Вы узнаете:
✅ на каком уровне у вас знание лексики и грамматики

✅ на какой балл по IELTS вы можете рассчитывать сейчас

✅ на чем вам следует сфокусироваться, чтобы сдать IELTS на нужный балл с первой попытки.

Приступим?👇`,
				{ keyboard: builder([{ label: "Пройти тест" }]) },
			);
			break;
		case "Хочу сам(а)!":
			await myselfHandler(ctx);
			break;
		case "Хочу знать!":
			await ctx.send(`Каждый из 8-и модулей курса он проходил в таком формате:

▫️ 10 часов самостоятельной работы по материалам курса на онлайн-платформе

▫️ обратная связь по письменным и устным заданиям

▫️ 1 групповое занятие.

(10+1) x 8 = 88 часов guided learning.

И все это – по цене 8-10 занятий с репетитором!

А дальше – самостоятельная работа над своим языком по методу "NativeLike" в более "лайтовом" режиме.

Итог – скачок от B1 до уверенного B2 за 5 месяцев`);
			await delay(1500);
			await ctx.send(
				`Вы хотите овладеть методом "NativeLike", чтобы сделать такой же прорыв в английском, как Александр?

Сегодня это возможно за 1495 р.!`,
				{
					keyboard: builder([{ label: "Узнать подробнее" }]),
				},
			);
			break;
		case "Узнать подробнее":
			if (userInfo.test == "d2IELTS") {
				await ctx.send(`Начните подготовку к IELTS с "IELTS Strategy" и постройте самый быстрый и надежный маршрут к нужному баллу.

Что входит в IELTS Strategy?

1️⃣ диагностический тест в формате IELTS 

2️⃣ подробная обратная связь преподавателя по эссе  (Writing Part 2) и монологу (Speaking Part 2)

3️⃣ индивидуальная стратегическая сессия с преподавателем (30 минут) + урок по IELTS Speaking или Writing (30 минут)

IELTS Strategy проводит Мария Дятлова:

▫️ выпускница МГУ и Оксфордского университета

▫️ автор курса "IELTS INSIGHT"

Подробнее об IELTS Strategy: https://wonderlang-school.com/ielts-strategy/

Если появились вопросы, напишите нам: https://vk.com/im?sel=-213318868`);
				await delay(1500);
				await ctx.send(
					`Только сегодня до конца дня (23:59 мск.) вам доступна скидка 50% на IELTS Strategy по индивидуальному промокоду.



И это еще не все!



🎁 Воспользовавшись промокодом, вы получите в подарок интенсив "Up Your Writing Score", который поможет вам за несколько часов очистить свою письменную речь от самых распространенных ошибок в IELTS Writing:



▫️ запятые

▫️ британская vs. американская орфография

▫️ формальный vs. неформальный стиль

Заберите промокод👇`,
					{ keyboard: builder([{ label: "Получить промокод" }]) },
				);
			} else {
				await ctx.send(
					`Пройдите интенсив по речи Стива Джобса!
					
					Это один из модулей курса "NativeLike".
					
					Узнать подробнее: https://wonderlang-school.com/steve-jobs/
					
					На любые вопросы об интенсиве отвечу вам здесь: https://vk.com/im?sel=-213318868`,
				);
				await delay(1500);
				await ctx.send(
					`Стоимость интенсива – 2990 р., но сегодня вам доступен индивидуальный промокод на скидку 50%.
				
Что вы получите за 1495 р.:
				
✅ 5+ часов guided learning 

✅ прорыв в английском по 6-и направлениям: 
Vocabulary, Grammar, Listening, Reading, Speaking, Writing
✅ 24+ продвинутых слов и выражений по темам "Работа" и "Образование" – в "активном" словаре

✅ полное понимание одной из самых сложных тем английской грамматики – Conditionals (все 4 типа + Mixed).
				
А главное, вы овладеете навыками самостоятельного изучения языка, благодаря которым сможете повышать свой уровень с минимальными тратами времени, сил и денег!
				
Готовы? Тогда нажмите на кнопку👇`,
					{ keyboard: builder([{ label: "Получить промокод" }]) },
				);
			}
			break;
		case "Получить промокод":
			await updateDeal(userInfo?.amoId, statuses.got_promocode.id);
			await ctx.send(await getPromocode(moment().format("DD")));
			await delay(1500);
			await ctx.send(
				`Скопируйте промокод☝️

Обратите внимание: он действует до конца сегодняшнего дня (23:59 мск.).

Узнайте, как им воспользоваться👇`,
				{
					keyboard: builder([{ label: "Как применить промокод?" }]).oneTime(
						true,
					),
				},
			);
			break;
		case "Как применить промокод?":
			await handlePromocode(ctx);
			break;
		case "Что после оплаты?":
			await handleWhatNext(ctx);
			break;
		case "В письме нет кода":
			await ctx.send(`Если в письме нет кода, значит, у вас уже есть аккаунт на платформе Edvibe или ProgressMe (это одна и та же платформа с двумя разными названиями).

Возможно, вы уже проходили там курс другой школы.

Пройдите по ссылке https://edvibe.com и введите свои email и пароль. Если вы не помните свой пароль, его можно легко восстановить по email.

По любым вопросам пишите сюда: https://vk.com/im?sel=-213318868`);
			break;
		case "Что дальше?":
			if (userInfo.isTeacher) {
				await ctx.send(
					`Если вы хотите и дальше повышать свой уровень, то оптимальная стратегия для вас – брать больше продвинутых students с уровнем B2... или даже выше.

Страшно? Чувствуете себя неуверенно?

Тогда вот с чего предлагаю начать👇`,
					{ keyboard: builder([{ label: "С чего начать?" }]) },
				);
			} else {
				await ctx.send(
					`Вот два совета для вас:
			
1. Отточите свои self-study skills
			
Вы уже точно умеете развивать свой язык самостоятельно, иначе вы не достигли бы такого высокого уровня. Чтобы ускорить прогресс, поэкспериментируйте с новыми приемами и инструментами и выберите те, которые дают вам максимальный эффект.
			
2. Сформируйте привычку заниматься английским регулярно
			
На уровне С1-С2, даже чтобы стоять на месте, "нужно очень быстро бежать". Полезные привычки – от регуларного повторения новой лексики за чашечкой кофе до еженедельных созвонов со study buddy – будут помогать вам шаг за шагом приближаться к уровню носителя.
			
Как все это осуществить на практике? С чего начать?
			
Рассказываю👇`,
					{ keyboard: builder([{ label: "А конкретнее?" }]) },
				);
			}
			break;
		case "А конкретнее?":
			await ctx.send(`Пройдите интенсив по речи Стива Джобса, и вы:

✅ овладеете самыми эффективными приемыми изучения языка

✅ сформируете полезные привычки за 1-2 недели!

Вы научитесь главному:
📍 брать продвинутые слова, выражения, структуры из речи носителей и наполнять ими свою речь

📍 выстраивать свою работу над языком как систему, в которой навыки Listening, Reading, Speaking и Writing развиваются в тесной взаимосвязи и усиливают друг друга.

Узнать об интенсиве: https://wonderlang-school.com/steve-jobs/`);
			await delay(1500);
			await ctx.send(
				`Стоимость интенсива – 2990 р., но сегодня вам доступен индивидуальный промокод на скидку 50%👇`,
				{ keyboard: builder([{ label: "Получить промокод" }]) },
			);
			break;
		case "С чего начать?":
			await ctx.send(
				`Организуйте Speaking Clubs/Discussion Clubs для продвинутых English learners

Даже бесплатные встречи для друзей/коллег – отличный старт. Вы получите главное: практику языка, опыт работы с сильными students и ощущение "I can!"

В чем преимущества такого формата для вас как English teacher и English learner?

Рассказываю👇`,
				{ keyboard: builder([{ label: "В чем преимущества?" }]).oneTime(true) },
			);
			break;
		case "В чем преимущества?":
			await ctx.send(
				`1️⃣ В процессе подготовки к встречам клуба вы будете проделывать огромную работу над своим языком.

2️⃣ В то же время вам не придется переживать, что ваш уровень языка лишь немного выше уровня участников.

Ведь на speaking clubs люди приходят в первую очередь за практикой, и ваша главная задача – не научить их чему-то, а организовать и направить дискуссию. В этой ситуации вы можете позволить себе быть "первым среди равных" за круглым столом😃

Чтобы вас вдохновить, делюсь историей своей ученицы Ксении Мельниковой: https://vk.com/wall-213318868_49`,
			);
			break;
		case "Сколько это баллов?":
			await ctx.send(
				`Ваш приблизительный балл на IELTS: ${
					IELTSPoints(userInfo.points).result
				}

❓А поточнее?

❓Сколько времени потребуется, чтобы подготовиться к экзамену на нужный балл?

❓На чем фокусироваться при подготовке?

Получите ответы на эти вопросы👇`,
				{ keyboard: builder([{ label: "Получить ответы" }]) },
			);
			break;
		case "Получить ответы":
			await ctx.send(
				`Чтобы оценить ваш уровень более точно и составить четкий план подготовки к IELTS, необходимо также протестировать ваши навыки:

▫️ Listening
▫️ Reading
▫️ Speaking
▫️ Writing. 

Для этих целей в WonderLang School мы:

✅ проводим глубокую диагностику в формате IELTS

✅ разрабатываем индивидуальную стратегию подготовки к экзамену для каждого exam candidate с учетом результатов диагностического теста.

До конца сегодняшнего дня эта услуга доступна вам со скидкой 50%.`,
				{
					keyboard: builder([{ label: "Узнать подробнее" }]),
				},
			);
			break;
		default:
			await sendPhoto({
				userId: ctx.senderId,
				message: `Я понимаю только кнопки, поэтому, пожалуйста, используйте их для общения со мной.
Если кнопка пропала, нажмите на этот значок, и она вернется👇`,
				fileName: "image.png",
			});
			break;
	}
});

await vk.updates.start();
app.listen(port, () => console.log("Server started on port " + port));
