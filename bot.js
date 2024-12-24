import dotenv from "dotenv";
import { VK } from "vk-io";

dotenv.config();

export const vk = new VK({
	token: process.env.TOKEN,
});

export const users = vk.api.users;
