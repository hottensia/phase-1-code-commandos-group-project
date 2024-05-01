const http = require('http');
const fs = require('fs');

console.log(req)
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submitForm.js') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = JSON.parse(body);
            fs.readFile('players.json', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                    const players = JSON.parse(data).players;
                    formData.id = players.length + 1;
                    players.push(formData);
                    fs.writeFile('players.json', JSON.stringify({ players }), 'utf8', err => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ message: 'Form data submitted successfully' }));
                        }
                    });
                }
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});
