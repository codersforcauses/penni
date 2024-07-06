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
          className="py-2.5 footnote text-penni-text-secondary-light-mode"
        >
          {sectionNamesMap[dbName]}
          <p className="py-1.5 body text-penni-text-regular-light-mode">
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
      <div className="pb-2.5 pt-7 body-medium">
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
