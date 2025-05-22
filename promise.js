app.post('/postUser', (req, res) => {
    let { id, name, role } = req.body;

    const newUser = new User({ id, name, role });

    newUser.save()
        .then((response) => {
            res.status(200).json({
                message: "Successfully Post Created on Mongodb",
                data: response
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to save data on mongoDB",
                data: err
            });
        });
});
