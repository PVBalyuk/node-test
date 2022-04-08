import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.send('Hello 123 123');
});

app.listen(3000, () => console.log('server running at port'));
