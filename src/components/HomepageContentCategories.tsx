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
  homepage_contents: Relations;
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
        const homepageContents: Relations =
          category.attributes.homepage_contents;

        return (
          <div key={category.id} className="w-full lg:max-w-5xl">
            <h3 className="mb-8 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-center text-zinc-100">
              {category.attributes.Name}
            </h3>
            <div className="mb-16 grid grid-cols-1 lg:grid-cols-1 lg:text-left gap-4">
              {homepageContents.data.map((homepageContent: Relation) => {
                let icon;

                if (homepageContent.attributes.FA_Brand_Icon) {
                  icon = fab["fa" + homepageContent.attributes.FA_Brand_Icon];
                }
                if (homepageContent.attributes.FA_Solid_Icon) {
                  icon = fas["fa" + homepageContent.attributes.FA_Solid_Icon];
                }

                return (
                  <div className="p-4 text-left" key={homepageContent.id}>
                    {icon ? (
                      <FontAwesomeIcon
                        icon={icon}
                        size="5x"
                        className="mb-4 text-sky-300"
                      />
                    ) : null}
                    <h3 className="mb-4 font-extrabold text-lg lg:text-xl text-sky-300">
                      {homepageContent.attributes.Name}
                    </h3>
                    <BlockRendererClient
                      content={homepageContent.attributes.Description}
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
