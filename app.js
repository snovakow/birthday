const birth = new Date("2013-07-18T12:38:00.000-04:00");

const locale = undefined;// undefined "fa-IR";

const display = document.createElement('div');
document.body.appendChild(display);

function step(timeStamp) {

	const now = new Date();
	const diff = now - birth;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	let weeks = Math.floor(days / 7);
	const years = now.getFullYear() - birth.getFullYear();

	const monthDiff = now.getMonth() - birth.getMonth();
	let monthAge = (years * 12) + monthDiff;

	let age = years;
	let percent;
	const birthday = new Date(birth);
	birthday.setFullYear(now.getFullYear());
	if (birthday > now) {
		const previousBirthday = new Date(birthday);
		previousBirthday.setFullYear(now.getFullYear() - 1);
		percent = (now - previousBirthday) / (birthday - previousBirthday);
		age--;
		monthAge--;
	} else {
		const nextBirthday = new Date(birthday);
		nextBirthday.setFullYear(now.getFullYear() + 1);
		percent = (now - birthday) / (nextBirthday - birthday);
	}

	const makeNumber = (num) => {
		const backing = document.createElement('span');
		backing.className = 'number';
		backing.appendChild(document.createTextNode(num));
		return backing;
	}
	const makeText = (text) => {
		const backing = document.createElement('span');
		backing.appendChild(document.createTextNode(text));
		return backing;
	}
	const add = (parent, ...args) => {
		const backing = document.createElement('div');
		for (const arg of args) backing.appendChild(arg);
		parent.appendChild(backing);
		return backing;
	}

	const exactAge = age + percent;

	while (display.firstChild) display.removeChild(display.firstChild);

	const output = "Born " + birth.toLocaleString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	const titleBacking = document.createElement('div');
	titleBacking.className = 'titleBacking';
	display.appendChild(titleBacking);

	const title = document.createElement('span');
	title.appendChild(document.createTextNode("Raya Papaya"));
	title.className = 'title';
	titleBacking.appendChild(title);

	const subtitle = add(display, makeText(output));
	subtitle.className = 'subtitle';

	const leadup = "Raya Papaya is... ";

	const statsBacking = document.createElement('div');
	statsBacking.className = 'statsBacking';
	const stats = document.createElement('div');
	stats.className = 'stats';
	statsBacking.appendChild(stats);

	display.appendChild(statsBacking);

	add(stats, makeText(leadup), makeNumber(age.toLocaleString(locale)), makeText(" years old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(monthAge.toLocaleString(locale)), makeText(" months old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(weeks.toLocaleString(locale)), makeText(" weeks old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(days.toLocaleString(locale)), makeText(" days old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(hours.toLocaleString(locale)), makeText(" hours old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(minutes.toLocaleString(locale)), makeText(" minutes old")).className = 'stat';
	add(stats, makeText(leadup), makeNumber(seconds.toLocaleString(locale)), makeText(" seconds old")).className = 'stat';

	const fullAge = document.createElement('div');
	display.appendChild(fullAge);

	const mainAge = add(fullAge, makeNumber(exactAge.toFixed(10)), makeText(" years old!!!"));
	mainAge.className = 'mainAge';

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
