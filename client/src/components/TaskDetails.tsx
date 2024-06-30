import React from "react";

// Change this to modify the default placeholder
const default_emptyContentPlaceholder: string = "N/A";

// The following section names need to be modified to final database column names to allow straight import into this component without further data processing
const SectionNames = [
  "Task Category",
  "Task Title",
  "Date",
  "Suburb",
  "State",
  "Estimated Time",
  "Estimated Price",
  "Task Details",
];

// Mapping between database column names and display subheading titles - if database column name and display subheading differs (remove above sectionnames)
// const sectionNamesMap: { [key: string]: string } = {
//   task_category: "Task Category",
//   task_title: "Task Title",
//   date: "Date",
//   suburb: "Suburb",
//   state: "State",
//   estimated_time: "Estimated Time",
//   estimated_price: "Estimated Price",
//   task_details: "Task Details",
// };
//
// then use this map function in TaskDetailsSection: `{Object.keys(sectionNamesMap).map((dbName, index) => (`

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
      {SectionNames.map((name, index) => (
        <div
          key={index}
          className="py-[0.65rem] text-[1rem] font-[350] leading-[1.125rem] text-[#485358]"
        >
          {name}
          <p className="py-[0.5rem] text-[1.25rem] font-[350] leading-[1.7rem] text-[#000000]">
            {
              data[name] === null ||
              data[name] === undefined ||
              data[name] === ""
                ? emptyContentPlaceholder
                : data[name] /* Handle null, undefined and empty section data */
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
