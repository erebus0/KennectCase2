const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { addDays, addWeeks, subDays, parse } = require('date-fns');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);

  if (parsedUrl.pathname === '/calendar') {
    const action = query.action;
    const baseDate = query.baseDate ? parse(query.baseDate, 'dd-MMM-yyyy', new Date()) : new Date();

    let resultDate;

    if (action === 'addDays') {
      const daysToAdd = parseInt(query.value);
      resultDate = addDays(baseDate, daysToAdd);
    } else if (action === 'addWeeks') {
      const weeksToAdd = parseInt(query.value);
      resultDate = addWeeks(baseDate, weeksToAdd);
    } else if (action === 'subDays') {
      const daysToSubtract = parseInt(query.value);
      resultDate = subDays(baseDate, daysToSubtract);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid action');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(resultDate.toDateString());
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
