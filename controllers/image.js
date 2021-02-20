const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c896552bf0db465999fe31324de4138f'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).josn('API Problem Bro'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	  	db('users').where('id', '=', id)
	  	.increment('entries', 1)
	  	.returning('entries')
	  	.then(entries => {
	  		res.json(entries[0]);
	  	})
	  	.catch(err => res.status(400).json('No Entries Bro'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
