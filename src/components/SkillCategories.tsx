// src/components/SkillCategories.tsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "../app/BlockRendererClient";

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
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface Categories {
  data: Category[];
}

interface CategoriesProps {
  categories: Categories;
}

const SkillCategories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <>
      {categories.data.map((category: Category) => {
        const skills: Relations = category.attributes.skills;

        return (
          <div key={category.id} className="w-full lg:max-w-5xl">
            <h3 className="mb-8 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-zinc-100">
              {category.attributes.Name}
            </h3>
            <div className="mb-16 grid grid-cols-2 lg:grid-cols-4 lg:text-left gap-4">
              {skills.data.map((skill: Relation) => {
                let icon;

                if (skill.attributes.FA_Brand_Icon) {
                  icon = fab["fa" + skill.attributes.FA_Brand_Icon];
                }
                if (skill.attributes.FA_Solid_Icon) {
                  icon = fas["fa" + skill.attributes.FA_Solid_Icon];
                }

                return (
                  <div
                    className="border-solid border border-zinc-300 p-4 "
                    key={skill.id}
                  >
                    {icon ? (
                      <FontAwesomeIcon
                        icon={icon}
                        size="3x"
                        className="mb-4 text-sky-300"
                      />
                    ) : null}
                    <h3 className="mb-4 font-extrabold text-sky-300">
                      {skill.attributes.Name}
                    </h3>
                    <BlockRendererClient
                      content={skill.attributes.Description}
                    />
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
