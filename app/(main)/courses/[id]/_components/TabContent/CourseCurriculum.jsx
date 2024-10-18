import {
  BookCheck,
  CheckCheck,
  Clock10,
  FileQuestion,
  MessageSquare,
  NotepadText,
  Presentation,
  Radio,
  Star,
  StickyNote,
  Tv,
  UsersRound,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseModuleList } from "../module/CourseModuleList";
export const CourseCurriculum = ({ course }) => {
  const duration = course.modules.reduce((prev, crr) => {
    return prev + crr.duration;
  }, 0);
  return (
    <>
      <div class="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(duration / 60).toPrecision(2)} Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span>
      </div>
      <Accordion defaultValue={["item-0"]} type="multiple" collapsible className="w-full">
        {course?.modules &&
          course.modules.map((module, i) => {
            return (
              <CourseModuleList module={module} key={i} i={i}></CourseModuleList>
            );
          })}
      </Accordion>
    </>
  );
};
