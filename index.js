require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

const BillsModel = require('./models/Bills');

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
  }
);

app.get("/allBills", async (req, res) => {
  BillsModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send({ data: result });
  })
})

app.post('/addBill', async (req, res) => {
  const invoiceIdReq = req.body.invoiceId;
  const billNoReq = req.body.billNo;
  const isBillPaid = req.body.isPaid;
  const totalAmount = req.body.totalAmount;

    const bills = new BillsModel({ invoiceId: invoiceIdReq, billNo: billNoReq, isPaid: isBillPaid, totalAmount: totalAmount, billDate: req.body.billDate  });

    try {
        const data = await bills.save();
        res.send({_id: data._id, invoiceId: data.invoiceId, billNo: data.billNo, isPaid: data.isPaid, totalAmount: data.totalAmount, billDate: data.billDate })
    } catch (error) {
        console.log('err: ', error)
    }
})

app.get('/bill/:id', async (req, res) => {
  BillsModel.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send({data: result})
  })
})

app.delete('/delete/:id', async (req, res) => {
  BillsModel.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.put('/update/:id', async (req, res) => {
  BillsModel.findByIdAndUpdate(
    req.params.id,
    {
      invoiceId: req.body.invoiceId,
      billNo: req.body.billNo,
      isPaid: req.body.isPaid,
      totalAmount: req.body.totalAmount,
      billDate: req.body.billDate,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
