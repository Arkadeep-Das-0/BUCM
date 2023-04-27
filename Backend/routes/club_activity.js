const router = require('express').Router();
const ClubActivity = require('../Models/club_activity');

router.route('/').get((req, res) => {
  ClubActivity.find()
    .then((club_activities) => res.json(club_activities))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { club_name, room_number, financial_request } = req.body;

  const newClubActivity = new ClubActivity({
    club_name,
    room_number,
    financial_request,
  });

  newClubActivity
    .save()
    .then(() => res.json('Club Activity added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ClubActivity.findById(req.params.id)
    .then((club_activity) => {
      club_activity.club_name = req.body.club_name;
      club_activity.room_number = req.body.room_number;
      club_activity.financial_request = req.body.financial_request;

      club_activity
        .save()
        .then(() => res.json('Club Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
