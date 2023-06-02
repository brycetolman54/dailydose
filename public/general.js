function insertRule(rule) {
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(rule, sheet.cssRules.length);
}