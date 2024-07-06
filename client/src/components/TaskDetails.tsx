import React from "react";

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
  emptyContentPlaceholder = "N/A",
}: TaskDetailsProps) => {
  return (
    <>
      {Object.keys(sectionNamesMap).map((dbName, index) => (
        <div
          key={index}
          className="py-2.5 text-base font-normal leading-5 text-[#485358]"
        >
          {sectionNamesMap[dbName]}
          <p className="py-1.5 text-xl font-normal leading-7 text-[#000000]">
            {data[dbName] === null ||
            data[dbName] === undefined ||
            data[dbName] === ""
              ? emptyContentPlaceholder
              : data[dbName]}
          </p>
        </div>
      ))}
    </>
  );
};

const TaskDetails = ({ data, emptyContentPlaceholder }: TaskDetailsProps) => {
  return (
    <div className="max-w-screen-sm overflow-hidden px-7">
      <div className="mb-2 pb-3 pt-8 text-2xl font-normal leading-6">
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
