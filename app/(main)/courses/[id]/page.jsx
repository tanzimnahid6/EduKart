import { CourseDetailsIntro } from "./_components/CourseDetailsIntro";
import { CourseDetails } from "./_components/CourseDetails";
import { Testimonials } from "./_components/Testimonials";
import { RelatedCourses } from "./_components/RelatedCourses";
import { getCourseById } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseById(id);


  return (
    <>
      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      ></CourseDetailsIntro>

      <CourseDetails course={course}></CourseDetails>

      {/* Testimonials */}
      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      {/* Releated Course */}
      <RelatedCourses></RelatedCourses>
    </>
  );
};
export default SingleCoursePage;
