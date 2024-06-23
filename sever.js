const express = require('express');
const bodyParser = require('body-parser');
const { exit } = require('process');

const app = express();
const PORT = 3000;

// 配置中间件，解析表单数据
app.use(bodyParser.urlencoded({ extended: true }));

// 假设已经有一个用户数组用于存储注册的用户信息
let users = [];

// 处理注册请求
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // 检查密码是否一致
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // 检查用户名和邮箱是否已经被注册
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already exists');
    }

    if (users.some(user => user.email === email)) {
        return res.status(400).send('Email already exists');
    }

    // 将用户信息添加到用户数组中
    users.push({ username, email, password });

    // 可以在这里进行一些其他操作，比如发送确认邮件等

    res.send('Registration successful');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 如何运行该node.js后端服务器、
// 首先安装nodejs
// 验证是否安装，node -v ，npm -v
// 然后在cmd中切换到nodejs文件所在指定路径，安装express模块，npm install express
// 在vscode终端输入node sever.js即可 


