var models = require('../models/index');
var Band = require('../models/band');

//밴드 만들기
exports.create = function(req, res) {
    // 리퀘스트바디로 밴드의 새 인스턴스 생성
    models.Band.create(req.body).then(function(band) {

        res.redirect('/bands');
    });
};

//밴드 리스트
exports.list = function(req, res) {
    //Date기준으로 밴드 정렬(즉 최근에 넣은 기준)
    models.Band.findAll({

        order: [ ['createdAt', 'DESC'] ]
    }).then(function(bands) {


        res.render('band-list', {
            title: 'List bands',
            bands: bands
        });
    });
};

//밴드 get
exports.byId = function(req, res) {
    models.Band.find({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      res.json(band);
    });
};
//id로 업데이트
exports.update = function (req, res) {
    models.Band.find({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      if(band){
        band.updateAttributes({
            name: req.body.name,
            description: req.body.description,
            album: req.body.album,
            year: req.body.year,
            UserId: req.body.user_id
        }).then(function(band) {
          res.send(band);
        });
      }
    });
};

//id로 삭제
exports.delete = function (req, res) {
    models.Band.destroy({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      res.json(band);
    });
};
