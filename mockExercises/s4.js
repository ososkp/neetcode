class Parser {
    constructor() {
        this.LANGUAGE_DELIMITER_PATTERN = /\s*,\s*/;
        this.QUALITY_DELIMITER_PATTERN = /\s*;\s*/;
        this.LANGUAGE_PATTERN = /^[A-Za-z]{2}(-[A-Za-z]{2})?$/;
    }

    mapToLanguageAndQuality = (header) => {
        const [lang, qualityString] = header.split(this.QUALITY_DELIMITER_PATTERN);
        let qValue = 1.0;

        if (qualityString && qualityString.startsWith('q=')) {
            const parsedQ = parseFloat(qualityString.substring(2));
            if (!isNaN(parsedQ)) qValue = parsedQ;
        }

        return { lang: lang, q: qValue };
    }

    parseAcceptLanguage(string) {
        if (!string) return [];

        // Split string based on delimiter
        return string
            .split(/\s*,\s*/)
            // Parse quality params, first making sure they exist and using a default
            .map(header => this.mapToLanguageAndQuality(header))

            // Filter after map so don't repeat parsing
            .filter(item => this.LANGUAGE_PATTERN.test(item.lang))

            // Sort in descending order by quality
            .sort((a, b) => b.q - a.q)

            // Only need the language
            .map(item => item.lang);

    }
}

const parser = new Parser();

const input1 = "fr-CH    , fr, en, 17324871";
console.log(parser.parseAcceptLanguage(input1));
const input2 = "fr-CH;q=INVALID, fr;q=5.0, en;q=3.0, es";
console.log(parser.parseAcceptLanguage(input2));
const input3 = 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5';
console.log(parser.parseAcceptLanguage(input3));
