import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/modul-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

export const getCourses = async () => {
  const courses = await Course.find({})
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
    })
    .populate({
      path: "modules",
      model: Module,
    });
  return courses;
};
