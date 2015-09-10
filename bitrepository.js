BitRepository = function(db) {
	this.db = db;
};

BitRepository.prototype.getPublishedBits = function(callback) {

	// Published on or before the current day = ok
	var publishedBefore = new Date(); // today
	publishedBefore.setHours(23,59,59,999);

	// Format the date so the query system can understand it
	var publishedBeforeFormatted = publishedBefore.toJSON();

	console.log('Showing all bits published before ' + publishedBeforeFormatted);

    // Find posts published before or on current date in DB + sort on date
	this.db.find({publishDate : { $lte: publishedBeforeFormatted }}).sort({ publishDate: +1 }).exec(function (err, docs) {
		callback(docs);
	});
};

BitRepository.prototype.createBit = function(title, icon, content, publishdate, callback) {

	var doc = {
		title: title,
		icon: icon,
		content: content,
		publishDate: publishdate,
		notes: []
	};

	this.db.insert(doc, function (err, newDoc) {
	  console.log('entry posted, will be published at: ' + publishdate);
	  callback();
	});
};

BitRepository.prototype.createNote = function(bitId, name, contentb, callback) {
	console.log('trying to find post with id ' + bitId);

    this.db.update({ _id: bitId }, { $push: { notes: { name: name, content: contentb } } }, {}, function(err, numReplaced) {
       console.log("Comment succesfully added!");
       callback();
    });

};

exports.BitRepository = BitRepository;
