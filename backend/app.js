import fs from 'node:fs/promises'; //用于异步读取/写入文件（如 JSON 数据）

import bodyParser from 'body-parser';
import express from 'express';
import { resolve } from 'node:path';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); //提供静态资源访问，如 HTML/CSS/JS 文件

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  //To show the sending condition in the page
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (orderData === null || orderData.items === null || orderData.items.length === 0) { //校验订单是否为空
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if ( //校验用户资料完整性
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }
  //创建新订单并保存
  const newOrder = {
    ...orderData, //... 是 JavaScript 的扩展语法（Spread Syntax），用于展开一个对象或数组
    id: (Math.random() * 1000).toString(), //为新订单生成一个随机的字符串 ID，把这个数字转换成字符串
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
