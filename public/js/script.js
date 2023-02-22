const xhhtp = new XMLHttpRequest();

xhhtp.open('GET', 'https://whois.fdnd.nl/api/v1/members?first=200', true);
xhhtp.send();
console.log(xhhtp);