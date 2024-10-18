
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import { formateDate } from "@/lib/date";
import { CourseOverView } from "./TabContent/CourseOverView";
import { CourseCurriculum } from "./TabContent/CourseCurriculum";
import { CourseInstructor } from "./TabContent/CourseInstructor";
export const CourseDetails = ({ course }) => {
  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className=" px-4 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white inline-block">
          {course?.category?.title}
        </span>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {course.subtitle}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">Master React JS & Next JS</p>
        {/*  */}
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              className="w-[40px] h-[40px] rounded-full"
              src={course?.instructor?.profile_picture}
              alt={course?.instructor?.firstName}
              width={20}
              height={20}
            />
            <p className="font-bold">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>{formateDate(course.modifiedOn)}</span>
          </div>
        </div>

        {/* =====================================Tab======================================= */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Carriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview">
              {/* each tab content can be independent component */}
              <CourseOverView course={course}></CourseOverView>
            </TabsContent>

            <TabsContent value="curriculum">
              {/* each tab content can be independent component */}
              <CourseCurriculum course={course}></CourseCurriculum>
            </TabsContent>

            <TabsContent value="instructor">
              {/* each tab content can be independent component */}
              <CourseInstructor course={course}></CourseInstructor>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
