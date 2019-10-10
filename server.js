var cheerio = require('cheerio');
var axios = require('axios');

async function getPedals(next) {
	const result = await axios.get(
		'https://reverb.com/marketplace?query=tube%20screamer'
	);

	next(result);
}

function getCheerioElements(result) {
	const $ = cheerio.load(result.data);
	const output = [];
	$('a.csp-square-card__inner').each(function(index, element) {
		const title = $(element)
			.children()
			.text();
		const link = $(element).attr('href');
		const price = '$' + title.substr(title.indexOf('$') + 1);
		output.push({
			index,
			title,
			link,
			price
		});
	});
	console.log(output);
}

getPedals(getCheerioElements);
