const jwt = require('jsonwebtoken');
const secretkey = 'howdoyoudo'; //密钥

// 生成token
const sign = (data={}) => {
	return jwt.sign(data, secretkey, {
		expiresIn: 30*24*60*60,
		// expiresIn: 30,
	});
};

// 验证token
const verify = (req, res, next) => {
	let authorization = req.headers.token || req.body.token || req.query.token || '';
	let token = '';
	if (authorization.includes('Bearer')) {
		token = authorization.replace('Bearer ', '');
	} else {
		token = authorization;
	}

    jwt.verify(token, secretkey, (error, data) => {
		if (error) {
			res.json({ error: 1, type: 'tokenError' });
		} else {
			req._id = data._id;
			// console.log('next');
			next();
		}
	});
};

module.exports = {
	sign,
	verify,
};