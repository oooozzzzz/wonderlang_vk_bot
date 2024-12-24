import { PrismaClient } from "@prisma/client";
import { amoCRM } from "./crm.js";
import { pipeline } from "./config.js";
import { users } from "./bot.js";

const prisma = new PrismaClient();

export const addAmoId = async (id, amo_id) => {
	id = id.toString();
	amo_id = amo_id.toString();
	try {
		const user = await prisma.user.update({
			where: { vk_id: id },
			data: { amoId: amo_id },
		});
		return true;
	} catch (error) {
		console.log(error.message);
	}
};

export const addToPipline = async (
	userId,
	pipeline_id,
	firstName,
	lastName,
) => {
	const res = await amoCRM.post("leads", [
		{ pipeline_id, name: `${firstName} ${lastName}` },
	]);
	const leadId = res.data._embedded.leads[0].id;
	await addAmoId(userId, leadId);
	console.log(`Lead ID: ${leadId}`);
};

const getName = async (id) => {
	const user = await users.get({ user_ids: id });
	const firstName = user[0].first_name;
	const lastName = user[0].last_name;
	return { firstName, lastName };
};

export const createUser = async (id) => {
	id = id.toString();
	const { firstName, lastName } = await getName(id);
	await addToPipline(id, pipeline.id, firstName, lastName);
	try {
		const user = await prisma.user.create({
			data: { vk_id: id, first_name: firstName, last_name: lastName },
		});
		return true;
	} catch (error) {
		// console.log(error.message);
		return false;
	}
};

export const aboutYou = async (id, about_you) => {
	id = id.toString();
	try {
		const user = await prisma.user.update({
			where: { vk_id: id },
			data: { about_you },
		});
		return true;
	} catch (error) {
		console.log(error.message);
	}
};

export const getUserInfo = async (id) => {
	id = id.toString();
	try {
		const user = await prisma.user.findUnique({
			where: { vk_id: id },
		});
		return user;
	} catch (error) {
		console.log(error.message);
	}
};

export const setPoints = async (id, points) => {
	id = id.toString();
	try {
		const user = await prisma.user.update({
			where: { vk_id: id },
			data: { points },
		});
		return true;
	} catch (error) {
		console.log(error.message);
	}
};

export const setTest = async (id, test) => {
	id = id?.toString();
	try {
		const user = await prisma.user.update({
			where: { vk_id: id },
			data: { test },
		});
		return true;
	} catch (error) {
		console.log(error.message);
	}
};

export const setOutdated = async (id) => {
	id = id.toString();
	try {
		const user = await prisma.user.update({
			where: { vk_id: id },
			data: { outdated: true },
		});
		return true;
	} catch (error) {
		console.log(error.message);
	}
};
