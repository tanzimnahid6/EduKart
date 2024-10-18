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
import { CourseLesson } from "./CourseLesson";

export const CourseModuleList = ({ module, i }) => {
  return (
    <AccordionItem className="border-none" value={`item-${i}`}>
      <AccordionTrigger>{module.title}</AccordionTrigger>
      <AccordionContent>
        {/* header */}
        <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            {(module?.duration / 60).toPrecision(2)} Hours
          </span>
        </div>

        <div className="space-y-3">
          {module?.lessonIds &&
            module.lessonIds.map((lesson, i) => {
              return <CourseLesson key={i} lessonId={lesson}></CourseLesson>;
            })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
