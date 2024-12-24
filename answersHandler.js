const message = {
	values: [
		[
			"2024-11-27T17:50:24.875Z",
			"lobovdima27@gmail.com",
			0,
			124,
			123,
			"He from Spain., She's fine.",
			"He’s got a cat., We have got a car.",
			"Dan isn’t old.",
			"We haven’t got much time.",
			"Rob cannot come.",
			"Has he got a laptop?",
			"Have you got a camera? - Yes, I am.",
			"What time we can meet?",
			"He trys to behave well.",
			"He does not speak French.",
			"Do they work in an office?",
			"Does he live here? - Yes, he live.",
			"Where do your parents live?",
			"There are a lot of food in the fridge.",
			"Have you got a car?",
			"Who does like this painting?",
			"He often comes late.",
			"They every day do the housework.",
			"They were at home last night.",
			"She was in the office yesterday.",
			"There was a lot of people at the party last night.",
			"Did Mary be happy at the party?",
			"Were you tired yesterday? – Yes, I were.",
			"How well could you read at the age of 5?",
			"The baby cried last night.",
			"The sun rose at 6:38 yesterday morning and it set at 9 p.m.",
			"Max felt and broken his leg.",
			"She did not come home late.",
			"Did you like the film?, Did you liked the film?, Was the film good?, Did the film good?",
			"Why did you come late again?, Why did you be late again?",
			"Who did break the window?, What happened here last night?",
			"He's runing.",
			"They talking loud.",
			"Who is she talking to?",
			"Are they joking? – Yes, they are.",
			"Water boils at 100 degrees Celsius.",
			"How often do you go to the cinema?",
			"Alan says he’s 90 years old, but I don't believe him.",
			"Sorry, he can’t answer the phone now. He has a shower.",
			"Sarah is a vegetarian. She does not eat meat at all.",
			"Are you going read a book?",
			"Who are you going to invite?",
			"Is she going to watch a film? – No, she is not.",
			"I'm sure I will pass the exam.",
			"Who they will invite?",
			"Shall we order a pizza tonight? – Great idea!",
			"I'll have a party next Saturday. I hope you can come.",
			"Tim's going to prepare for an important test on Sunday. So, he's going to be very busy.",
			"I've maden you a cup of coffee.",
			"The sun has risen.",
			"She hasn't read this book.",
			"Have it got warmer?",
			"The secretary isn’t here. She’s gone out for lunch.",
			"I've just seen her.",
			"Helen has lived in Italy all her life.",
			"Her boyfriend has given her a ring for her last birthday.",
			"My best friend is a writer. He wrote two novels.",
			"Where do you live?",
			"How long have you had this car?",
			"They've been on holiday for a week.",
		],
	],
};

const correctAnswersD1 = [
	"He from Spain., She's fine.",
	"He’s got a cat., We have got a car.",
	"Dan isn’t old., We aren’t in London.",
	"We haven’t got much time. She has not got a bike.",
	"We can’t do this task. Rob cannot come.",
	"Has he got a laptop?, Can she sing well?",
	"Have you got a camera? - Yes, I have., Have you got a camera? - No, I haven’t.",
	"Where’s my bag?, How many children have they got?",
	"The baby cries a lot., Dan plays football every Saturday.",
	"They don’t know this rule., He does not speak French.",
	"Do you agree?, Do they work in an office?",
	"Does he live here? - Yes, he does., Does he live here? - No, he doesn’t.",
	"Where do your parents live?, When does the first lesson start?",
	"How many people are there?, There’s a book on the desk. Is it yours?",
	"Have you got a car?, Has he got a brother?",
	"Who knows the answer?, Which do you prefer: tea or coffee?",
	"He is always late., He often comes late.",
	"We go to the gym twice a week., Sally meets up with friends every Friday.",
	"They were at home last night., He was tired yesterday.",
	"We were in Paris a month ago., She was in the office yesterday.",
	"There weren't many people at the party last night., There was a lot of food at the party last night.",
	"Was Mary happy at the party?, Did Mary look happy at the party?",
	"Was the food good? – Yes, it was., Were the guests pleased? – Yes, they were.",
	"Could you swim at the age of 5?, How well could you read at the age of 5?",
	"It stopped raining an hour ago., The baby cried last night.",
	"The sun rose at 6:38 yesterday morning and it set at 9 p.m., He put the book on the desk and left the room.",
	"Max fell and broke his leg., The room cost a lot! We paid $50 per night.",
	"He didn't go to work yesterday., She did not come home late.",
	"Did you like the film?, Was the film good?",
	"Why did you come late again?, Why were you late again?",
	"Who did you invite to your birthday party?, What happened here last night?",
	"He's crying., He's lying on the sofa.",
	"She is playing the guitar., We aren't doing homework.",
	"Are you staying at a hotel?, Who is she talking to?",
	"Are they joking? – Yes, they are., Is she walking? – No, she is not.",
	"Water boils at 100 degrees Celsius., We are going to France tomorrow morning.",
	"How often do you go to the cinema?, Can you hear those people? What are they talking about?",
	"Alan says he’s 90 years old, but I don't believe him., Are you enjoying the party? – Well, I don't like the music, to be honest.",
	"Sorry, he can’t answer the phone now. He's having a shower., How much time do we have?",
	"Sarah is a vegetarian. She does not eat meat at all., What are you doing this Sunday?",
	"I'm going to read a book., She is not going to read a book.",
	"Who are you going to invite?, What is she going to wear?",
	"Is he going to call us? – Yes, he is., Is she going to watch a film? – No, she is not.",
	"I'm sure I will pass the exam., I'm sure the boys won't win.",
	"Where will they be?, When will it stop raining?",
	"Shall we order a pizza tonight? – Great idea!, Will we get the first prize? – I hope so!",
	"I'm having a party next Saturday. I hope you can come., I don’t think Jack will pass this exam. He isn't a very smart guy.",
	"Tim's going to prepare for an important test on Sunday. So, he's going to be very busy., Tim's going to prepare for an important test on Sunday. So, he'll be very busy, I guess.",
	"She's taught over 1000 students., We've run 4 kilometres.",
	"The sun has risen., She's sung a nice song.",
	"We have not seen this film., She hasn't read this book.",
	"What have the children done?, What has Max bought?",
	"The secretary isn’t here. She’s gone out for lunch., We have lots of food. I’ve been to the supermarket.",
	"I've just seen her., I've never seen her.",
	"Helen has lived in Italy since 2012., Helen has lived in Italy all her life.",
	"Her boyfriend gave her a ring for her last birthday., Shakespeare never travelled abroad.",
	"My best friend is a writer. He's written two novels., Kathy travels a lot. She's visited dozens of countries.",
	"Where do you live?, John and Polly have been married for 5 years.",
	"Do you have a car?, How long have you had this car?",
	"They've been on holiday for a week., Tom has been playing the piano for 2 hours.",
];

const correctAnswersD2 = [
	"come up with",
	"leave them out",
	"evidence",
	"did research",
	"take on",
	"powerful",
	"Endangered",
	"vehicles",
	"hire",
	"run",
	"got fired",
	"graduated from",
	"maintain",
	"figure out",
	"an animal species",
	"curriculum",
	"miss out on",
	"convey",
	"capture",
	"medium",
	"preserve",
	"a suburb",
	"carbon footprint",
	"at the heart",
	"meet",
	"dropped out",
	"determination",
	"capacity",
	"vulnerable",
	"think outside the box",
	"one-size-fits-all",
	"from scratch",
	"through different eyes",
	"awe",
	"contributing factors",
	"tuition fees",
	"embarrassment",
	"sympathize with",
	"hit rock bottom",
	"strike",
	"I spent hours on this task., I spent hours walking around the town.",
	"I offered them something to eat, but they weren't hungry, They had just had lunch., I offered them something to eat, but they weren't hungry. So, we all went for a walk.",
	"I've been trying to get in touch with her for about an hour. Do you know where she is?, We've been in London for about a week now, but we haven't visited the British Museum yet.",
	"If Tommy does not get better tonight, Mary will call the doctor., Mary will call the doctor if Tommy doesn't get better tonight.",
	"If I could visit any country in the world this summer, I would go to Italy., If I could visit any country in the world, I'd go to Italy.",
	"Last year, I visited the Maldives., Last year, I visited Greenland and the Canary Islands.",
	"Art impacts our emotions more effectively than a scary news report., Art impacts our emotions more effectively than scary news reports.",
	"We don't have to wear a uniform at work, but we have to follow a certain dress code., We don't have to wear a uniform at work, but there's a dress code that we have to follow.",
	"I would not have met my future husband if I had not gone to study in Germany ten years ago., If I hadn't gone to study in Germany ten years ago, I wouldn't have met my future husband.",
	"The Notre-Dame Cathedral was nearly destroyed in 2019, but it is expected to be fully restored by 2024., The Notre-Dame Cathedral is currently being restored. The restoration work is expected to be completed in 2024.",
];

const correctAnswersD2IELTS = [
	"come up with",
	"leave them out",
	"evidence",
	"did research",
	"take on",
	"powerful",
	"Endangered",
	"vehicles",
	"hire",
	"run",
	"got fired",
	"graduated from",
	"maintain",
	"figure out",
	"an animal species",
	"curriculum",
	"miss out on",
	"convey",
	"capture",
	"medium",
	"preserve",
	"a suburb",
	"carbon footprint",
	"at the heart",
	"meet",
	"dropped out",
	"determination",
	"capacity",
	"vulnerable",
	"think outside the box",
	"one-size-fits-all",
	"from scratch",
	"through different eyes",
	"awe",
	"contributing factors",
	"tuition fees",
	"embarrassment",
	"sympathize with",
	"hit rock bottom",
	"strike",
	"I spent hours on this task., I spent hours walking around the town.",
	"I offered them something to eat, but they weren't hungry, They had just had lunch., I offered them something to eat, but they weren't hungry. So, we all went for a walk.",
	"I've been trying to get in touch with her for about an hour. Do you know where she is?, We've been in London for about a week now, but we haven't visited the British Museum yet.",
	"If Tommy does not get better tonight, Mary will call the doctor., Mary will call the doctor if Tommy doesn't get better tonight.",
	"If I could visit any country in the world this summer, I would go to Italy., If I could visit any country in the world, I'd go to Italy.",
	"Last year, I visited the Maldives., Last year, I visited Greenland and the Canary Islands.",
	"Art impacts our emotions more effectively than a scary news report., Art impacts our emotions more effectively than scary news reports.",
	"We don't have to wear a uniform at work, but we have to follow a certain dress code., We don't have to wear a uniform at work, but there's a dress code that we have to follow.",
	"I would not have met my future husband if I had not gone to study in Germany ten years ago., If I hadn't gone to study in Germany ten years ago, I wouldn't have met my future husband.",
	"The Notre-Dame Cathedral was nearly destroyed in 2019, but it is expected to be fully restored by 2024., The Notre-Dame Cathedral is currently being restored. The restoration work is expected to be completed in 2024.",
];

const data = message.values[0];
// const senderId = data[3];
const answers = data.slice(5);

function compareArrays(arr1, arr2) {
	const results = arr1.map((item, index) => {
		const compareWith = arr2[index];
		const res = item === compareWith;
		return res;
	});
	return results;
}

export const parseD1 = (message) => {
	const data = message.values[0];
	const email = data[1].toString();
	const points = data[2].toString();
	const senderId = data[3].toString();
	const name = data[4].toString();
	const answers = data.slice(5);
	const results = compareArrays(correctAnswersD1, answers);
	return { senderId, results, points, name, email };
};

export const parseD2 = (message) => {
	const data = message.values[0];
	const email = data[1].toString();
	const points = data[2].toString();
	const senderId = data[3].toString();
	const name = data[4].toString();
	const answers = data.slice(5, 55);
	const isTeacher = data[55].toLowerCase().includes("преподавание английского");
	const results = compareArrays(correctAnswersD2, answers);

	return { senderId, results, points, name, email, isTeacher };
};
export const parseD3 = (message) => {
	const data = message.values[0];
	const email = data[1].toString();
	const points = data[2].toString();
	const senderId = data[3].toString();
	const name = data[4].toString();
	const answers = data.slice(5, 55);
	const results = compareArrays(correctAnswersD2IELTS, answers);

	return { senderId, results, points, name, email };
};
// console.log(senderId);
