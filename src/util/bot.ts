import chalk from "chalk";
import Telebot from "telebot";
import secretConfig from "../util/secretConfig";

let bot = null;
if (secretConfig?.telegram?.bot) {
	bot = new Telebot(secretConfig.telegram.bot);
	bot.start();
	bot.on("text", (message) => {
		console.info(
			`The Telegram bot has received a message from ID: ${message.from.id} (@${message.from.username})`
		);
	});
} else {
	console.error(
		chalk.red("[SECRET]") +
			" There is no Telegram bot token in the secret-config. As a result of that, you won't be notified of new chapters through Telegram."
	);
}

class Bot {
	get() {
		return bot ?? null;
	}
	send(message: string) {
		const bot = this.get();
		if (bot && secretConfig?.telegram?.user) {
			bot.sendMessage(secretConfig.telegram.user, message, {
				parseMode: "markdown",
			});
		} else {
			console.error(
				secretConfig.telegram.user
					? "[TELEGRAM] No bot token found"
					: "[TELEGRAM] No user ID found"
			);
		}
	}
}

export default new Bot();
