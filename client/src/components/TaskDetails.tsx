import React from "react";

import { Heading, Paragraph, Subheading } from "./ui/text";

// Mapping between database column names and display subheading titles to reduce further data processesing
const sectionNamesMap: { [key: string]: string } = {
  category: "Task Category",
  title: "Task Title",
  created_at: "Date",
  suburb: "Suburb",
  state: "State",
  estimated_time: "Estimated Time", // Missing ERD column name (fix later when db added)
  budget: "Estimated Price",
  description: "Task Details",
};

// Type of the section data to be passed
type SectionData = {
  [key: string]: string | null; // Allow database column to have null for item (prints 'N/A')
};

// Props for TaskDetails (and the sections)
type TaskDetailsProps = {
  data: SectionData;
  emptyContentPlaceholder?: string; // OPTIONAL: What to show if missing content for a subheading.
};

const TaskDetailsSection = ({
  data,
  emptyContentPlaceholder = "N/A", // Change this to modify default placeholder
}: TaskDetailsProps) => {
  return (
    <>
      {Object.keys(sectionNamesMap).map((dbName, index) => (
        <div key={index}>
          <Subheading text={sectionNamesMap[dbName]}>
            <Paragraph
              text={
                data[dbName] === null ||
                data[dbName] === undefined ||
                data[dbName] === ""
                  ? emptyContentPlaceholder
                  : data[dbName]
              }
            />
          </Subheading>
        </div>
      ))}
    </>
  );
};

/**
 * Task details component for a more in-depth explanation of a single task.
 *
 * @param props - The properties of the TaskDetails component.
 * @param props.data - The details of a single task.
 * @param props.emptyContentPlaceholder - (OPTIONAL) The replacement string for missing data in a field.
 * @returns Task details component
 *
 * @example
 * // Example Usage:
 * const sampleTaskData = {
 *   category: "Cleaning",
 *   title: "Cleaning Up My House",
 *   created_at: "10 Dec, 2022",
 *   suburb: "Richmond",
 *   state: "VIC",
 *   estimated_time: "4 Hours",
 *   budget: "$250",
 *   description: "I need someone to help me clean my 2 bedroom apartment. I am moving out and I need to make sure it’s all clean.",
 * };
 * <TaskDetails data={sampleTaskData} />
 */
const TaskDetails = ({ data, emptyContentPlaceholder }: TaskDetailsProps) => {
  return (
    <div className="max-w-screen-sm overflow-hidden px-7">
      <Heading text="Task Details" />
      <TaskDetailsSection
        data={data}
        emptyContentPlaceholder={emptyContentPlaceholder}
      />
    </div>
  );
};

export default TaskDetails;
