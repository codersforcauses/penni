import React from "react";

type Props = {};

const SectionNames = ["Task Category", "Task Title", "Date", "Suburb", "State", "Estimated Time", "Estimated Price", "Task Details"]

const SectionText = ["Cleaning", "Cleaning Up My House", "10 Dec, 2022", "Richmond", "VIC", "4 Hours", "$250", "I need someone to help me clean my 2 bedroom apartment. I am moving out and I need to make sure it’s all clean."]

const TaskDetailsSection = () => {
    return (
        <div>
          {SectionNames.map((Name, Index) => (
            <div key={Index} className="py-[0.65rem] text-[1rem] leading-[1.125rem] font-[350] text-[#485358]">
              {Name}
              <p className="py-[0.5rem] text-[1.25rem] leading-[1.7rem] font-[350] text-[#000000]">
                {SectionText[Index]}
              </p>
            </div>
          ))}
        </div>
      );
    };


const TaskDetails = (props: Props) => {
    return (
        <div className="max-w-screen-sm overflow-hidden fontSans.variable px-[1.3rem]">
            <div className="mb-2 pt-8 pb-2 text-[1.3rem] leading-[1.375rem] font-[450]">Task Details</div>
            <div>
            <TaskDetailsSection /> 
            </div>
        </div>
    );
};

export default TaskDetails;
