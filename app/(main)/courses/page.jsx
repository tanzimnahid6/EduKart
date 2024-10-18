import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { BookOpen } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { SearchCourse } from "./_components/SearchCourse";
import { SortCourses } from "./_components/SortCourses";
import { FilterCoursesMobile } from "./_components/FilterCoursesMobile";
import { ActiveFilter } from "./_components/ActiveFilter";
import { FilterCourse } from "./_components/FilterCourse";
import { formatPrice } from "@/lib/formatePrice";
import { CourseCard } from "./_components/CourseCard";
import { getCourses } from "@/queries/courses";

const CoursesPage = async () => {
  const courses = await getCourses();
  console.log(courses);
  
  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
      {/* header */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        {/* Search courses=========================== */}
        <SearchCourse></SearchCourse>

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          {/* sort courses==================== */}
          <SortCourses></SortCourses>

          {/* Filter Menus For Mobile */}

          <FilterCoursesMobile></FilterCoursesMobile>
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilter
        filter={{
          categories: ["development"],
          price: ["free"],
          sort: "",
        }}
      ></ActiveFilter>
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          {/* these component can be re use for mobile also */}

          <FilterCourse></FilterCourse>

          {/* Course grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((category) => (
              <CourseCard key={category.id} course={category}></CourseCard>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
