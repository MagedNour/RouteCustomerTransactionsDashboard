// api/data.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

app.get('/api/data', (req, res) => {
  const data = {
    "customers": [
      { "id": 1, "name": "Ahmed Ali" },
      { "id": 2, "name": "Aya Elsayed" },
      { "id": 3, "name": "Mina Adel" },
      { "id": 4, "name": "Sarah Reda" },
      { "id": 5, "name": "Mohamed Sayed" },
      { "id": 6, "name": "Maged Nour" },
      { "id": 7, "name": "Nora Kamal" },
      { "id": 8, "name": "Hassan Mostafa" },
      { "id": 9, "name": "Laila Hassan" },
      { "id": 10, "name": "Youssef Amin" }
    ],
    "transactions": [
      { "id": 1, "customer_id": 1, "date": "2022-01-01", "amount": 1000 },
      { "id": 2, "customer_id": 1, "date": "2022-01-02", "amount": 2000 },
      { "id": 3, "customer_id": 2, "date": "2022-01-01", "amount": 550 },
      { "id": 4, "customer_id": 3, "date": "2022-01-01", "amount": 500 },
      { "id": 5, "customer_id": 2, "date": "2022-01-02", "amount": 1300 },
      { "id": 6, "customer_id": 4, "date": "2022-01-01", "amount": 750 },
      { "id": 7, "customer_id": 3, "date": "2022-01-02", "amount": 1250 },
      { "id": 8, "customer_id": 5, "date": "2022-01-01", "amount": 2500 },
      { "id": 9, "customer_id": 5, "date": "2022-01-02", "amount": 875 },
      { "id": 10, "customer_id": 1, "date": "2022-01-10", "amount": 700 },
      { "id": 11, "customer_id": 2, "date": "2022-01-11", "amount": 1010 },
      { "id": 12, "customer_id": 3, "date": "2022-01-12", "amount": 30 },
      { "id": 13, "customer_id": 5, "date": "2022-01-11", "amount": 2400 },
      { "id": 14, "customer_id": 4, "date": "2022-01-10", "amount": 1700 },
      { "id": 15, "customer_id": 4, "date": "2022-01-13", "amount": 3400 },
      { "id": 16, "customer_id": 1, "date": "2022-01-14", "amount": 200 },
      { "id": 17, "customer_id": 1, "date": "2022-01-15", "amount": 3000 },
      { "id": 18, "customer_id": 6, "date": "2022-02-01", "amount": 1000 },
      { "id": 19, "customer_id": 6, "date": "2022-02-05", "amount": 300 },
      { "id": 20, "customer_id": 6, "date": "2022-02-10", "amount": 1200 },
      { "id": 21, "customer_id": 7, "date": "2022-02-11", "amount": 800 },
      { "id": 22, "customer_id": 7, "date": "2022-02-12", "amount": 1500 },
      { "id": 23, "customer_id": 8, "date": "2022-02-13", "amount": 2000 },
      { "id": 24, "customer_id": 8, "date": "2022-02-14", "amount": 950 },
      { "id": 25, "customer_id": 9, "date": "2022-02-15", "amount": 1300 },
      { "id": 26, "customer_id": 9, "date": "2022-02-16", "amount": 400 },
      { "id": 27, "customer_id": 10, "date": "2022-02-17", "amount": 1800 },
      { "id": 28, "customer_id": 10, "date": "2022-02-18", "amount": 1600 },
      { "id": 29, "customer_id": 10, "date": "2022-02-19", "amount": 1200 },
      { "id": 30, "customer_id": 9, "date": "2022-02-20", "amount": 750 }
    ]
  };

  res.json(data);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
export default app;
