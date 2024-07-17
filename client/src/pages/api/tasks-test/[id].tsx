import type { NextApiRequest, NextApiResponse } from "next";

const tasks = [
  {
    task_id: 6,
    name: "Leanne Graham",
    username: "Bret",
    title: "Clean up my house",
    category: "CLEANING",
    date: "21/03/2024",
    duration: "4 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "EXPIRED",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    title: "Clean up my house",
    category: "CLEANING",
    date: "21/05/2024",
    duration: "4 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "COMPLETED",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 3,
    name: "Leanne Graham",
    username: "Bret",
    title: "Clean up my house",
    category: "CLEANING",
    date: "11/08/2024",
    duration: "4 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "BIDDING",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "Perth",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 4,
    name: "Leanne Graham",
    username: "Bret",
    title: "Clean up my house",
    category: "CLEANING",
    date: "21/06/2024",
    duration: "6 hours",
    estimatePrice: "300",
    myOfferPrice: "300",
    state: "COMPLETED",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 5,
    name: "Leanne Graham",
    username: "Bret",
    title: "Clean up my house",
    category: "CLEANING",
    date: "30/08/2024",
    duration: "3 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "COMPLETED",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 1,
    name: "Leanne Graham",
    username: "Bret",
    title: "Clean up my house",
    category: "CLEANING",
    date: "21/02/2024",
    duration: "5 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "ONGOING",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
  {
    task_id: 7,
    name: "Ervin Howell",
    username: "Antonette",
    title: "Clean up my house",
    category: "CLEANING",
    date: "11/08/2024",
    duration: "4 hours",
    estimatePrice: "300",
    myOfferPrice: "250",
    state: "COMPLETED",
    priceType: "Estimated Price",
    description: "Need cleaning services",
    location: "New York,NY",
    budget: 100,
    deadline: "2024-12-31",
    status: "open",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Define a regex pattern for a valid task ID (only numbers)
  const validTaskIDPattern = /^[0-9]+$/;

  // Validate the taskID
  if (!id || !validTaskIDPattern.test(id as string)) {
    return res.status(404).json({ message: "Invalid task ID" });
  }

  const task = tasks.find(
    (task) => task.task_id === parseInt(id as string, 10),
  );

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
}
