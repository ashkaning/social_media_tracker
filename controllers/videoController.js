const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = {
    saveVideoCategory: (req, res) => {
        console.log(req.body)
        db.VideoCategories.findOne({ where: { videoCategoriesName: req.body.videoCategoriesName } })
            .then(categoryName => {
                if (categoryName) {

                    res.json({ result: "The Video Category Name Existed" })
                }
                else {
                    db.VideoCategories.create({
                        videoCategoriesName: req.body.videoCategoriesName
                    }).then(res.json({ result: "The Video Category Name Saved" }))
                        .catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
    },
    gettVideoCategory: (req, res) => {
        db.VideoCategories.findAll({})
            .then(dbModel => {
                let result = {
                    allCategoryNames: dbModel,
                    result: 'Getting All Category Names'
                }
                res.json(result)
            })
            .catch(err => res.status(422).json(err));
    },
    saveVideo: (req, res) => {
        db.Videos.findOne({ where: { videoName: req.body.videoName } })
            .then(videoName => {
                if (videoName) {
                    res.json({ resultWarning: "The Video Name Existed" })
                }
                else {
                    db.Videos.create({
                        videoName: req.body.videoName,
                        url: req.body.url,
                        imgURL: req.body.imgURL,
                        videoDescription: req.body.videoDescription,
                        VideoCategoryId: req.body.VideoCategoryId
                    }).then(res.json({ resultSuccess: "The Video Name Saved" }))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    },
    allVideos: (req, res) => {
        db.Videos.findAll({
            include: [{ model: db.VideoCategories, require: true }],
            order: [['updatedAt', 'DESC']]
        })
            .then(allVideos => {
                // console.log(allVideos)
                res.json(allVideos)
            }).catch(err => console.log(err))
    },
    deleteVideo: function (req, res) {
        db.Videos.destroy({ where: { id: req.params.id } })
            .then(resModel => {
                res.json(resModel);
            })
            .catch(err => res.status(422).json(err));
    },
}