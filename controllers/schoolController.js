const express = require("express");
const School = require("../models/School");
const moment = require('moment');

// Get all schools
exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find(); // Fetch all schools from the database
        res.status(200).json(schools); // Send the schools as JSON with a 200 status
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send error message with a 500 status
    }
};

// Get a school by ID
exports.getSchoolById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL parameters
        const school = await School.findById(id); // Find school by ID
        if (!school) {
            return res.status(404).json({ message: 'School not found' }); // If no school is found, return 404
        }
        res.status(200).json(school); // Send the found school as JSON with a 200 status
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new school
exports.createSchool = async (req, res) => {
    const { school_name, date, startTime, endTime, location, student_count, teacher_name, phone_teacher, faculty, count_participants } = req.body;

    if (!count_participants) {
        return res.status(400).json({ message: 'count_participants is required' });
    }

    const school = new School({
        school_name,
        date,
        startTime,
        endTime,
        location,
        student_count,
        teacher_name,
        phone_teacher,
        faculty,
        count_participants // Make sure this value is provided
    });

    try {
        const newSchool = await school.save();
        res.status(201).json(newSchool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Update an existing school
exports.updateSchool = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL parameters
        const school = await School.findById(id); // Find school by ID
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        // Update the school with new data
        const updatedSchool = Object.assign(school, req.body);
        await updatedSchool.save(); // Save the updated school

        res.status(200).json({
            success: true,
            message: 'School data updated successfully',
            data: updatedSchool
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a school
exports.deleteSchool = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL parameters
        const school = await School.findById(id); // Find school by ID
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        await School.findByIdAndDelete(id); // Delete the school
        res.status(200).json({ success: true, message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
