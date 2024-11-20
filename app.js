const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

// 設定靜態檔案
app.use(express.static('public'));

// 解析 JSON 請求
app.use(bodyParser.json());

// 處理表單提交路由
app.post('/submit', (req, res) => {
    const { username, email, password } = req.body;

    // 插入數據到資料庫
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('插入數據錯誤：', err); // 打印出錯誤詳情
            return res.status(500).json({ message: '資料儲存失敗！', error: err }); // 返回錯誤信息
        }
        res.json({ message: '資料成功儲存！' });
    });
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('伺服器已啟動，請訪問 http://localhost:3000');
});
