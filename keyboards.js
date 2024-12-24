import { Keyboard } from "vk-io";

export const builder = (keyboards) => {
	const keyboard = Keyboard.builder();
	keyboards.forEach(({ label = "button", color = "primary" }) => {
		keyboard.textButton({
			label,
			color,
		});
		keyboard.row();
	});
	return keyboard;
};
