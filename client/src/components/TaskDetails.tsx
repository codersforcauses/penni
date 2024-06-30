import React from "react";

// Change this to modify the default placeholder
const default_emptyContentPlaceholder: string = "N/A";

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
  emptyContentPlaceholder = default_emptyContentPlaceholder,
}: TaskDetailsProps) => {
  return (
    <>
      {Object.keys(sectionNamesMap).map((dbName, index) => (
        <div
          key={index}
          className="py-[0.65rem] text-[1rem] font-[350] leading-[1.125rem] text-[#485358]"
        >
          {dbName}
          <p className="py-[0.5rem] text-[1.25rem] font-[350] leading-[1.7rem] text-[#000000]">
            {
              data[dbName] === null ||
              data[dbName] === undefined ||
              data[dbName] === ""
                ? emptyContentPlaceholder
                : data[
                    dbName
                  ] /* Handle null, undefined and empty section data */
            }
          </p>
        </div>
      ))}
    </>
  );
};

const TaskDetails = ({ data, emptyContentPlaceholder }: TaskDetailsProps) => {
  return (
    <div className="fontSans.variable max-w-screen-sm overflow-hidden px-[1.3rem]">
      <div className="mb-2 pb-2 pt-8 text-[1.3rem] font-[450] leading-[1.375rem]">
        Task Details
      </div>
      <TaskDetailsSection
        data={data}
        emptyContentPlaceholder={emptyContentPlaceholder}
      />
    </div>
  );
};

export default TaskDetails;
