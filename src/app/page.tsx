// src/app/page.tsx

import React from "react";
import SkillCategories from "../components/SkillCategories";
import HomepageContentCategories from "../components/HomepageContentCategories";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import "./styles.css";
import fs from "fs";
import path from "path";

interface Attributes {
  FA_Brand_Icon: string | null;
  FA_Solid_Icon: string | null;
  Name: string;
  Description: BlocksContent;
}

interface Relation {
  id: number;
  attributes: Attributes;
}

interface Relations {
  data: Relation[];
}

interface CategoryAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Name: string;
  Weight: number | null;
  skills: Relations;
  homepage_contents: Relations;
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface Categories {
  data: Category[];
}

async function fetchCategories(fileName: string): Promise<Categories> {
  const filePath = path.join(process.cwd(), "src/data", fileName);
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

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
  const skillCategories = await fetchCategories("skillCategories.json");
  const homepageContentCategories = await fetchCategories(
    "homepageContentCategories.json"
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 lg:p-24">
      <h2 className="mb-16 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-zinc-100 ">
        Introduction
      </h2>
      <p className="container mx-auto max-w-screen-lg mb-12 text-jus">
        Welcome to my portfolio! On this portfolio website, I've used a modern
        tech stack to create a seamless user experience. The site is built with
        React, following a component-based architecture that allows for reusable
        and modular components. Tailwind CSS is used for flexible styling that
        ensures a responsive design. Additionally, TypeScript enhances the
        functionality with strong typing, improving code quality,
        maintainability, and scalability. This combination of technologies
        results in a fast, dynamic, and polished portfolio that effectively
        showcases my skills and projects.
      </p>
      <HomepageContentCategories categories={homepageContentCategories} />
      <h2 className="mb-16 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-zinc-100 ">
        Services
      </h2>
      <SkillCategories categories={skillCategories} />
    </main>
  );
};

export default Home;
