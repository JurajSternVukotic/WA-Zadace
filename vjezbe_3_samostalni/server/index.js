const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;
app.get('/', (req, res) => {
res.send('Webshop API');
});
app.listen(PORT, error => {
if (error) {
console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
} else {
console.log(`Server dela na http://localhost:${PORT}`);
}
});