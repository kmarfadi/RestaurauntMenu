import type { Pizza } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

// Fetch pizza data from an API endpoint
import React from "react";

export const usePizzaData = () => {
  const [pizzaData, setPizzaData] = React.useState<Pizza[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/menu");
        setPizzaData(response.data.items);
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      }
    };

    fetchData();
  }, []);

  return pizzaData || [];
};





// Example static data for development purposes
// export const pizzaData: Pizza[] = [
//   {
//     id: "1",
//     name: "مارغريتا",
//     description: "بيتزا كلاسيكية مع صلصة الطماطم، جبنة الموزاريلا، وريحان طازج",
//     price: 12.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "classic",
//   },
//   {
//     id: "2",
//     name: "بيبروني",
//     description: "صلصة طماطم، جبنة موزاريلا، وشرائح بيبروني حارة",
//     price: 14.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "classic",
//   },
//   {
//     id: "3",
//     name: "سوبريم",
//     description: "محملة بالبيبروني، النقانق، الفلفل، البصل، والزيتون",
//     price: 16.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "specialty",
//   },
//   {
//     id: "4",
//     name: "نباتية",
//     description: "خضروات طازجة تشمل الفلفل، الفطر، البصل، والزيتون",
//     price: 15.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "vegetarian",
//   },
//   {
//     id: "5",
//     name: "دجاج باربكيو",
//     description: "دجاج مشوي، بصل أحمر، وكزبرة مع صلصة باربكيو",
//     price: 17.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "specialty",
//   },
//   {
//     id: "6",
//     name: "هاواي",
//     description: "لحم وأناناس على قاعدة صلصة طماطم مع جبنة موزاريلا",
//     price: 15.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "specialty",
//   },
//   {
//     id: "7",
//     name: "فطر بالكمأة",
//     description: "فطر متنوع، زيت الكمأة، وجرجير على قاعدة صلصة بيضاء",
//     price: 18.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "vegetarian",
//   },
//   {
//     id: "8",
//     name: "لحوم متنوعة",
//     description: "بيبروني، نقانق، لحم مقدد، ولحم بقري مفروم لتجربة لحوم مثالية",
//     price: 19.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "specialty",
//   },
//   {
//     id: "9",
//     name: "دجاج بافلو",
//     description: "دجاج بافلو حار مع قطع جبنة زرقاء وصلصة رانش",
//     price: 17.99,
//     image: "/placeholder.svg?height=400&width=400",
//     category: "specialty",
//   },
// ]
