// src/app/page.tsx

import React from "react";
import SkillCategories from "../components/SkillCategories";
import HomepageContentCategories from "../components/HomepageContentCategories";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import "./styles.css";

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

async function fetchCategories(endpoint: string): Promise<Categories> {
  const res = await fetch("http://strapi.marcelm.org/api/" + endpoint);

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
  const skillCategories = await fetchCategories("skill-categories?populate=*");
  const homepageContentCategories = await fetchCategories(
    "homepage-content-categories?populate=*"
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 lg:p-24">
      <h2 className="mb-16 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-zinc-100 ">
        Introduction
      </h2>
      <HomepageContentCategories categories={homepageContentCategories} />
      <h2 className="mb-16 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-zinc-100 ">
        Services
      </h2>
      <SkillCategories categories={skillCategories} />
    </main>
  );
};

export default Home;
