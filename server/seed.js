import colors from "colors";
import dotEnv from 'dotenv';
import mongoDB from "./config/db.js"; 

import User from "./models/user.model.js";
import Course from './models/course.model.js';
import Testimonial from './models/testimonial.model.js';

import userData from "./data/users.js";
import CoursesData from "./data/courses.js";
import testimonialsData from "./data/testimonials.js";

dotEnv.config();
mongoDB();

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();
        await Testimonial.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Destroy: ${error}`.red.inverse);
        process.exit(1);
    }
};

const importData = async () => {
    let createUsers;
    
    // delete all collections
    try {
        await User.deleteMany();
        await Course.deleteMany();
        await Testimonial.deleteMany();
        console.log('models have been removed'.blue.inverse);
    } catch (error) {
        console.error(`Delete: ${error}`.red.inverse);
        process.exit();
    }

    // insert users
    try {
        createUsers = await User.insertMany(userData);
        console.log('users have been inserted'.blue.inverse);
    } catch (error) {
        console.error(`User insert: ${error}`.red.inverse);
        process.exit();
    }

    // insert courses
    try {
        const adminUser = createUsers[0]._id;
        const sampleCourses = CoursesData.map((course) => {
            return { ...course, user: adminUser };
        });
        await Course.insertMany(sampleCourses);
        console.log('Course have been inserted'.blue.inverse);
    } catch (error) {
        console.error(`Course Insert: ${error}`.red.inverse);
        process.exit();
    }

    // insert testimonials
    try {
        const adminUser = createUsers[0]._id;
        const sampleTestimonials = testimonialsData.map((testimonial) => {
            return { ...testimonial, user: adminUser };
        });
        await Testimonial.insertMany(sampleTestimonials);
        console.log('testimonials have been inserted'.blue.inverse);
    } catch (error) {
        console.error(`Testimonial Insert: ${error}`.red.inverse);
        process.exit();
    }

    console.log('Data imported!'.green.inverse);
    process.exit();
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}