import { getUserInfo, setOutdated } from "./db.js";
import { delay } from "./services.js";
import { sendMessage } from "./upload.js";

const timers = {}; // Объект для хранения таймеров пользователей
async function function24(userId) {
	await setOutdated(userId);
	console.log(`Функция 1 выполнена для пользователя ${userId}.`);
}

const sendMessages = async (userId, text1, text2) => {
	await sendMessage(userId, text1);
	await delay(1500);
	await sendMessage(userId, text2);
};

async function function21(userId) {
	const userInfo = await getUserInfo(userId);
	const test = userInfo.test;
	let text1;
	let text2;
	switch (test) {
		case "d1":
			text1 = `⏰Заботливое напоминание: пройдите 20-минутный тест в течение 3-х часов, и вы получите:

✅подробную информацию о своем уровне + индивидуальные рекомендации
✅ 3 подарка.`;
			text2 = `🎁 Почему подарки стоят того, чтобы за них побороться?

▫️ Вы узнаете, как использовать верную грамматику в речи не задумываясь.
▫️ Вы сможете в любой момент проверить за пару секунд, перед каким названием нужен артикль 'the', а перед каким – нет.
▫️ Вы легко запомните фразы, которые использовал сам Джобс, рассказывая о своем профессиональном пути.

Пройти тест сейчас и получить подарки:

👉 https://forms.gle/JvvxphzWKN8XHPgr8`;
			await sendMessages(userId, text1, text2);
			break;
		case "d2":
			text1 = `⏰Заботливое напоминание: пройдите 20-минутный тест в течение 3-х часов, и вы получите:

✅подробную информацию о своем уровне + индивидуальные рекомендации

✅ 3 подарка.`;
			text2 = `🎁 Почему подарки стоят того, чтобы за них побороться?

▫️ Вы получите 15 TED talks, от которых в восторге все мои ученики, и сможете использовать их для собственных занятий.
▫️ Вы сможете в любой момент проверить за пару секунд, перед каким названием нужен артикль 'the', а перед каким – нет.
▫️ Вы легко запомните фразы, которые использовал сам Джобс, рассказывая о своем профессиональном пути.

Пройти тест сейчас и получить подарки:

👉 https://forms.gle/eb2cvMxsBbPbQypV8`;
			await sendMessages(userId, text1, text2);
			break;
		case "IELTS":
			text1 = `⏰Заботливое напоминание: пройдите 20-минутный тест в течение 3-х часов, и вы получите:

✅подробную информацию о своем уровне + индивидуальные рекомендации по подготовке к IELTS

✅ 3 подарка.`;
			text2 = `🎁 Почему подарки стоят того, чтобы за них побороться?

▫️ Вы узнаете, как использовать ту единственную минуту на IELTS Speaking, чтобы спланировать идеальный монолог.
▫️ Вы сможете в любой момент проверить за пару секунд, перед каким названием нужен артикль 'the', а перед каким – нет.
▫️ Вы легко запомните фразы, которые использовал сам Джобс, рассказывая о своем профессиональном пути.

Пройти тест сейчас и получить подарки:

👉 https://forms.gle/CrLxDyM5NabgCjeX8`;
			await sendMessages(userId, text1, text2);
			break;
		default:
			break;
	}
}
// Функция для запуска таймера
export function startTimer(userId) {
	// Проверка, есть ли уже таймер для этого пользователя
	if (timers[userId]) {
		console.log(`Таймер для пользователя ${userId} уже запущен.`);
		return;
	}

	// Установка таймера на 24 часа
	const timer24h = setTimeout(async () => {
		await function24(userId);
		delete timers[userId]; // Удаляем таймер после выполнения
	}, 24 * 60 * 60 * 1000); // 24 часа в миллисекундах

	// Установка таймера на 3 часа до истечения
	const timer3h = setTimeout(async () => {
		await function21(userId);
	}, 21 * 60 * 60 * 1000); // 21 час в миллисекундах (3 часа до конца)

	// Сохраняем оба таймера в объекте
	timers[userId] = { timer24h, timer3h };
	console.log(`Таймер для пользователя ${userId} запущен.`);
}

// Функция для удаления таймера
export function clearTimer(userId) {
	const userTimer = timers[userId];
	if (userTimer) {
		clearTimeout(userTimer.timer24h);
		clearTimeout(userTimer.timer3h);
		delete timers[userId]; // Удаляем запись о таймере
		console.log(`Таймер для пользователя ${userId} удален.`);
	} else {
		console.log(`Нет активного таймера для пользователя ${userId}.`);
	}
}

const sendGifts = async (userId) => {
	let text1;
	let text2;
	const userInfo = await getUserInfo(userId);
	switch (userInfo.test) {
		case "d1":
			text1 = `А вот и ваши подарки!

▫️ Гайд "Как научиться использовать грамматику на автомате"
👉 https://drive.google.com/file/d/1B4AZ5amhi_2Wzqn0s7rjQ0CuvCjEmPJZ/view?usp=drive_link

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"
👉 https://gitmind.com/app/docs/m2ylhcv6

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса
👉 https://quizlet.com/787010607/lesson-7-work-and-business-steve-jobs-commencement-speech-flash-cards/?i=4nac36&x=1jqt`;
			text2 = `Больше полезных материалов вы найдете в этой подборке постов в моем Телеграм-канале:

👉 https://t.me/wonderlang_learners/420`;
			break;
		case "d2":
			text1 = `А вот и ваши подарки!

▫️ Гайд "15 TED talks по 15 темам"
👉 https://drive.google.com/file/d/1MyvDs-b-07ytMo956df2jei7LNi9fMei/view?usp=sharing

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"
👉 https://gitmind.com/app/docs/m2ylhcv6

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса
👉 https://quizlet.com/787010607/lesson-7-work-and-business-steve-jobs-commencement-speech-flash-cards/?i=4nac36&x=1jqt`;
			text2 = `Больше полезных материалов вы найдете в этой подборке постов в моем Телеграм-канале:

👉 https://t.me/wonderlang_learners/419`;
			break;
		case "d2IELTS":
			text1 = `А вот и ваши подарки!

▫️ видео-урок из курса "IELTS INSIGHT" "Как быстро спланировать монолог на экзамене в части Speaking"
👉 https://kinescope.io/o6tQwfMqUDrjiE9zGTL9vL

▫️ Интерактивная майнд-карта "Артикли с именами и названиями"
👉 https://gitmind.com/app/docs/m2ylhcv6

▫️Набор карточек Quizlet с 12 словами и выражениями по теме "Работа" из знаменитой речи Стива Джобса
👉 https://quizlet.com/787010607/lesson-7-work-and-business-steve-jobs-commencement-speech-flash-cards/?i=4nac36&x=1jqt`;
			text2 = `Больше полезных материалов вы найдете в этой подборке постов в моем Телеграм-канале:

👉 https://t.me/wonderlang_learners/418`;
			break;
		default:
			break;
	}
	await sendMessages(userId, text1, text2);
	await delay(2000);
	await sendMessage(
		userId,
		`Благодарю вас за интерес к WonderLang School!

По любым вопросам пишите сюда:
 https://vk.com/im?sel=-213318868

Отвечу, помогу, сориентирую!`,
	);
	console.log("Подарки отправлены");
};

const giftTimers = {};
export async function updateTimer(userId) {
	const userInfo = await getUserInfo(userId);
	const userTimer = giftTimers[userId];
	if (userTimer) {
		clearTimeout(userTimer);
		delete giftTimers[userId]; // Удаляем запись о таймере
	} else {
		console.log(`Нет активного таймера для пользователя ${userId}.`);
	} // Clear existing timer
	if (userInfo.outdated) {
		return;
	}
	const giftTimer = setTimeout(async () => {
		await sendGifts(userId);
	}, 90 * 60 * 1000);

	giftTimers[userId] = giftTimer;
	console.log(`Таймер для пользователя ${userId} обновлен.`);
}
