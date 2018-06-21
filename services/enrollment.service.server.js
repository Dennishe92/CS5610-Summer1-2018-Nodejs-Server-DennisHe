module.exports = function (app) {
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findEnrollmentsForStudent);
    app.delete('/api/section/:sectionId/enrollment', unenrollStudentInSection);

    var enrollmentModel = require('../models/enrollment/enrollment.model.server');
    var sectionModel = require('../models/section/section.model.server');

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        }

        sectionModel.decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel.enrollStudentInSection(enrollment)
            })
            .then(function(enrollment) {
                res.json(enrollment);
            })
    }

    function unenrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        }
        sectionModel.incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel.unenrollStudentInSection(enrollment);
            });
    }

    function findEnrollmentsForStudent(req, res) {
        var currentUser = req.session['currentUser'];

        if (currentUser === undefined) {
            res.sendStatus(404);
        }
        else {
            var studentId = currentUser._id;
            enrollmentModel.findEnrollmentsForStudent(studentId)
                .then(function (enrollments) {
                    res.json(enrollments);
                })
        }
    }



};