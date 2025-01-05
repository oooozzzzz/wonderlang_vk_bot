export const delay = async (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const IELTSPoints = (points) => {
	let level;
	let result;
	if (points <= 17) {
		level = "пока не достиг B1";
		result = "не выше 4 баллов";
	} else if (points <= 19) {
		level = "A2-B1";
		result = "4-4.5 баллов";
	} else if (points <= 25) {
		level = "B1";
		result = "4-5 баллов";
	} else if (points <= 29) {
		level = "B1-B2";
		result = "5-5.5 баллов";
	} else if (points <= 35) {
		level = "B2";
		result = "5.5-6.5 баллов";
	} else if (points <= 39) {
		level = "B2-C1";
		result = "6.5-7 баллов";
	} else if (points <= 45) {
		level = "C1";
		result = "7-8 баллов";
	} else if (points <= 50) {
		level = "не ниже C1";
		result = "8 баллов и выше";
	}

	return { level, result };
};
