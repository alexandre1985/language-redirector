(function() {
    // ignoring bots
    if(/bot/i.test(navigator.userAgent)) { return }

    // do you want to make distinctions of countries with the same language?
    const doDistinctionsOfCountriesWithTheSameLanguage = false

    // put in here all the languages of your website
    // if you DON'T want to make distinctions of countries with the same language put the root language in this variable, such as, en or es or pt (instead of en-US or pt-BR or es-MX)
    const languagesOfWebsite = [ 'pt', 'en' ]

    // default language
    const languageOfRootWebpage = languagesOfWebsite[0];

    const pathnamesOfAllLanguagesOfWebsite= languagesOfWebsite.map(lang => `/${lang}/`)

    // browser language
    let browserLang = navigator.language ? navigator.language : navigator.userLanguage;

    if ( (browserLang) && (! doDistinctionsOfCountriesWithTheSameLanguage) ) {
        const separatorIndex = browserLang.indexOf('-')
        browserLang = (separatorIndex) ? browserLang.substr(0, separatorIndex) : browserLang
    }

    const isBrowserLanguageSameLanguageAsRootWebpage = ( browserLang === languageOfRootWebpage )

    // is language being forced
    let urlParams = new URLSearchParams(location.search);
    const automaticLanguageRedirectionStatus = urlParams.get('languageRedirection')

    const isPathnameTheDefaultLanguage = ( location.pathname === pathnamesOfAllLanguagesOfWebsite[0] )

    const actualPathname = isPathnameTheDefaultLanguage ? '/' : location.pathname

    const hashOfLocation = location.hash

    let doAutomaticLanguageRedirection
    switch(automaticLanguageRedirectionStatus) {
        case 'no':
        case 'false':
        case 'done':
            doAutomaticLanguageRedirection = false
            break;
        case 'yes':
        case 'true':
            doAutomaticLanguageRedirection = true
            break;
        default:
            doAutomaticLanguageRedirection = (actualPathname === '/' && (! hashOfLocation)) ? true : false
    }


    // this is an assumption that browserLang (pt or pt-PT, for example) corresponds to the pathname (/pt/ or /pt-PT/, following the example)
    const languageTargetPathname = (isBrowserLanguageSameLanguageAsRootWebpage) ? '/' : ( isPathnameTheDefaultLanguage ? '/' : `/${browserLang}/` )

    // if you are not on a language page (or locale page); dont do redirection
    if ( ! pathnamesOfAllLanguagesOfWebsite.find(str => str.startsWith(actualPathname)) ) {
        doAutomaticLanguageRedirection = false
    }


    // maybe do the redirection ??
    if (doAutomaticLanguageRedirection) {
        urlParams.set('languageRedirection', "done")
        const urlParamsString = urlParams.toString()
        const targetHref = `${location.origin}${languageTargetPathname}?${urlParamsString}${hashOfLocation}`
        location.replace(targetHref)
    }
}());
