/*!***************************************************
 * google-translate.js v1.0.5
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/

const googleTranslateConfig = {
	/* Original language */
	lang: "id",

	/* The language we translate into on the first visit*/
	/* langFirstVisit: 'en', */

	/* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */
	/* domain: "Get-Web.Site" */
};

document.addEventListener("DOMContentLoaded", (event) => {
	/* Connecting the google translate widget */
	let script = document.createElement("script");
	script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
	document.getElementsByTagName("head")[0].appendChild(script);
});

function TranslateWidgetIsLoaded() {
	TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
	if (config.langFirstVisit && !Cookies.get("googtrans")) {
		/* If the translation language is installed for the first visit and cookies are not assigned */
		TranslateCookieHandler("/auto/" + config.langFirstVisit);
	}

	let code = TranslateGetCode(config);

	TranslateHtmlHandler(code);

	if (code == config.lang) {
		/* If the default language is the same as the language we are translating into, then we clear the cookies */
		TranslateCookieHandler(null, config.domain);
	}

	/* Initialize the widget with the default language */
	new google.translate.TranslateElement({
		pageLanguage: config.lang,
		multilanguagePage: true, // Your page contains content in more than one languages
	});

	/* Assigning a handler to the flags */
	TranslateEventHandler("click", "[data-google-lang]", function (e) {
		TranslateCookieHandler(
			"/" + config.lang + "/" + e.getAttribute("data-google-lang"),
			config.domain
		);
		/* Перезагружаем страницу */
		/* Reloading the page */
		window.location.reload();
	});
}

function TranslateGetCode(config) {
	/* If there are no cookies, then we pass the default language */
	let lang =
		Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
			? Cookies.get("googtrans")
			: config.lang;
	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
	/* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
	Cookies.set("googtrans", val);
	Cookies.set("googtrans", val, {
		domain: "." + document.domain,
	});
	Cookies.remove('googtrans', { domain: "." + "www.dewicode.my.id" }); // removed!

	if (domain == "undefined") return;
	/* записываем куки для домена, если он назначен в конфиге */
	/* Writing down cookies for the domain, if it is assigned in the config */
	Cookies.set("googtrans", val, {
		domain: domain,
	});

	Cookies.set("googtrans", val, {
		domain: "." + domain,
	});
}

function TranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector);
		if (el) handler(el);
	});
}

function TranslateHtmlHandler(code) {
	/* We get the language to which we translate and produce the necessary manipulations with DOM */
	if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
		document
			.querySelector('[data-google-lang="' + code + '"]')
			.classList.add("active");
	}
}
