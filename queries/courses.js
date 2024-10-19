import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/modul-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonial";

export const getCourses = async () => {
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
      "testimonials",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
};

export const getCourseById = async (id) => {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId) => {
  //total course from instructor
  const courses = await Course.find({ instructor: instructorId }).lean();
  // total number of enrollment from instructor
  const enrollmentArr = await Promise.all(
    courses.map(async (course) => {
      let enrollment = await getEnrollmentForCourse(course._id.toString());
      return enrollment;
    })
  );
  const totalEnrollment = enrollmentArr.reduce((prevItem, currentItem) => {
    return currentItem.length + prevItem.length;
  });

  //total testimonial
  const testimonialArr = await Promise.all(
    courses.map(async (course) => {
      let testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonialArr.flat();
  const avgRating =
    totalTestimonials.reduce((prevItem, currentItem) => {
      return prevItem + currentItem.rating;
    }, 0) / totalTestimonials.length;


  return {
    courses: courses.length,
    enrollments: totalEnrollment,
    reviews: totalTestimonials.length,
    rating: avgRating.toPrecision(2),
  };
};
