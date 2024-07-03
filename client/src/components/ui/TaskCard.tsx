// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// type TaskCardProps = {
//   title: string;
//   category: string;
//   state?: string; // OPTIONAL: task state ('BIDDING'/'EXPIRED')
//   time: string;
//   location: string;
//   duration: string;
//   price: string;
// };

// type TaskTagProps = {
//   state?: string; // Optional task state to be passed through
// };

// export const TaskTag = ({ state }: TaskTagProps) => {
//   return <div className="task-tag">{state}</div>;
// };

// const TaskCard = ({
//   title,
//   category,
//   state,
//   time,
//   location,
//   duration,
//   price,
// }: TaskCardProps) => {
//   // Correct and verify proper state information
//   const [properState, setProperState] = useState<string | undefined>("");

//   // Verify if the state is valid and ensure its capitalised on changes to 'state'
//   useEffect(() => {
//     const fixState: string | undefined = state?.toUpperCase();
//     if (fixState === "EXPIRED" || fixState === "BIDDING") {
//       setProperState(fixState);
//     } else {
//       setProperState(undefined);
//     }
//   }, [state]);

//   return (
//     <div className={`task-card ${properState === "EXPIRED" ? "expored" : ""}`}>
//       <TaskTag state={properState} />
//       <p className="task-card-category">{category.toUpperCase()}</p>
//       <h3 className="task-card-title">{title}</h3>
//       <div className="task-card-details flex flex-row items-start justify-center">
//         <div>
//           <div>
//             <p>
//               <span>
//                 <Image
//                   src="/icons/calendar.svg"
//                   alt="Calendar Icon"
//                   width={20}
//                   height={20}
//                 />
//               </span>{" "}
//               {time}
//             </p>
//           </div>
//           <div>
//             <p>
//               <span>
//                 <Image
//                   src="/icons/marker.svg"
//                   alt="Location Marker Icon"
//                   width={20}
//                   height={20}
//                 />
//               </span>{" "}
//               {location}
//             </p>
//           </div>
//           <div>
//             <p>
//               <span>
//                 <Image
//                   src="/icons/clock.svg"
//                   alt="Clock Icon"
//                   width={20}
//                   height={20}
//                 />
//               </span>{" "}
//               {duration} hours
//             </p>
//           </div>
//         </div>
//         <div>
//           <p>${price}</p>
//           <p>{state == null ? "Estimated Price" : "My Price"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

// TaskCard.tsx
import React from "react";

type TaskCardProps = {
  title: string;
  category: string;
  date: string;
  location: string;
  duration: string;
  price: string;
  state: "BIDDING" | "EXPIRED";
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  category,
  date,
  location,
  duration,
  price,
  state,
}) => {
  return (
    <div className={`task-card ${state.toLowerCase()}`}>
      <div className="task-card-header">
        <h3>{title}</h3>
        <h5>{category}</h5>
      </div>
      <div className="task-card-info">
        <p>{date}</p>
        <p>{location}</p>
        <p>{duration} hours</p>
        <p>${price}</p>
      </div>
      <div className={`task-card-status ${state.toLowerCase()}`}>{state}</div>
    </div>
  );
};

export default TaskCard;
