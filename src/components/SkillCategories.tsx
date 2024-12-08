// src/components/SkillCategories.tsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

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

interface SkillCategoriesProps {
  categories: Categories;
}

const SkillCategories: React.FC<SkillCategoriesProps> = ({ categories }) => {
  return (
    <>
      {categories.data.map((category: Category) => {
        const skills: Skills = category.attributes.Skills;

        return (
          <div key={category.id} className="w-full lg:max-w-5xl">
            <h3 className="mb-8 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">
              {category.attributes.Name}
            </h3>
            <div className="mb-16 grid text-center grid-cols-2 lg:grid-cols-4 lg:text-left gap-4">
              {skills.data.map((skill: Skill) => {
                let icon;

                if (skill.attributes.FA_Brand_Icon) {
                  icon = fab["fa" + skill.attributes.FA_Brand_Icon];
                }
                if (skill.attributes.FA_Solid_Icon) {
                  icon = fas["fa" + skill.attributes.FA_Solid_Icon];
                }

                return (
                  <div
                    className="border-solid border border-white p-4 "
                    key={skill.id}
                  >
                    {icon ? (
                      <FontAwesomeIcon icon={icon} size="3x" className="mb-4" />
                    ) : null}
                    <h3 className="mb-4 font-bold ">{skill.attributes.Name}</h3>
                    <p className="mb-4 text-sm">
                      {skill.attributes.Description[0].children[0].text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SkillCategories;
