const express = require('express');
const companyRoutes = require('./modules/companies/application/companyRoutes');
const transferRoutes = require('./modules/transfers/application/transferRoutes');

const app = express();

app.use(express.json());
app.use('/companies', companyRoutes);
app.use('/transfers', transferRoutes);

module.exports = app;