// src/app/page.tsx

import React from "react";
import SkillCategories from "../components/SkillCategories";

interface SkillAttributes {
  FA_Brand_Icon: string | null;
  FA_Solid_Icon: string | null;
  Name: string;
  Description: Array<{
    children: Array<{ text: string }>;
  }>;
}

interface Skill {
  id: number;
  attributes: SkillAttributes;
}

interface Skills {
  data: Skill[];
}

interface CategoryAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Name: string;
  Weight: number | null;
  Skills: Skills;
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface Categories {
  data: Category[];
}

async function fetchSkillCategories(): Promise<Categories> {
  const res = await fetch(
    "http://localhost:1337/api/skill-categories?populate=Skills"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  data.data.sort((a: Category, b: Category) => {
    const weightA = a.attributes.Weight;
    const weightB = b.attributes.Weight;

    if (weightA === null) return 1;
    if (weightB === null) return -1;
    return weightA - weightB;
  });

  return data;
}

const Home = async () => {
  const categories = await fetchSkillCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 lg:p-24">
      <h2 className="mb-16 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white ">
        Skills
      </h2>
      <SkillCategories categories={categories} />
    </main>
  );
};

export default Home;
