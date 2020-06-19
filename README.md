# Language Redirector

Pure JavaScript for detecting browser language and make an *automatic language redirection* (all on the client side)

## Feature

This javascript only makes the automatic redirection when visiting the root website (for example, `www.something.com`). Or when explicitly telling so, by adding the `?languageRedirection=yes` query string to the website request (for example, using `www.something.com/NonMilkyWayLanguage?languageRedirection=yes`)

## Install

Just add this javascript to your website. Maybe `<script src="lang.min.js" crossorigin="anonymous"></script>` will work :wink:

Still, there is something to configure.

## Necessary Configuration

This javascript targets website that have the main root page (for example: `www.something.com` page) with the default main language or root language. And the rest of the language pages reside on `www.something.com/lang` (for other international languages), for example:
- Portuguese in `www.someting.com`
- English in `www.something.com/en`
- French in `www.something.com/fr`
- Japanese in `www.something.com/jp`

You just set the website (that has the languages living in each path), and then set the array variable `languagesOfWebsite`, inside the lang.js javascript, to correspond with each language path.

For example: `const languagesOfWebsite = [ 'pt', 'en' ]` will have a website with the `www.something.com` in Portuguese and `www.something.com/en` in English.


As off right now, website international language pages must correspond with to the begining of each language code. For example, American English must live `www.something.com/en` because the code for American English is `en-US`. The American English page must *not* live in `www.something.com/us` or something else.

## Different countries with the same language and Countries with multiple languages

For example, if the website root language is English (`www.something.com`) and is translated for Brazil's *Portuguese* and also Portugal's *Portuguese*, the variable `const doDistinctionsOfCountriesWithTheSameLanguage` must be set from `false` to `true`. And with this set to true, the Portugal's Portuguese translated website must live in `www.something.com/pt-PT` and the Brazil's Portuguese website must live in `www.something.com/pt-BR`.

Also, with this example, the variable `languagesOfWebsite` must be set as `const languagesOfWebsite = [ 'pt-PT', 'pt-BR' ]` (notice that the root language, which is English, is ommited this time).

## Stop automatic redirection

There is the use case when you want disable the language redirection. For example, when you are on a translated international language (for example, `www.something.com/jp`) of your website and want to code an anchor link tag to the root language of the website (for example, English in `www.something.com`).

In this case you want to code the anchor link tag as `<a href="www.something.com?*languageRedirection=no*" ... >` (notice the addition of `?languageRedirection=no`).

Why must you add this query string?

Because when you are redirecting to the root of the website (`www.something.com`) this script gets activated and if the language of the browser is different than the configured root language of your website, this script will redirect the visitor to the corresponding language version of the website (for example, using a Japonese browser, clicking on a anchor link to English page `www.something.com` will automatically redirect this visitor to `www.something.com/jp`).

## Force automatic redirection

Add the query string `?languageRedirection=yes`.

For example, using a Japonese browser, visiting the link `www.something.com/playing/blog?languageRedirection=yes` will redirect the visitor to `www.something.com/jp/playing/blog`

## LICENSE

UNLICENSE (Public Domain)
