import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  image,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { generateNanoId, slugify } from "../utils/helper";

export const Post = list({
  access: allowAll,
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    slug: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: any, args, context) {
          if (!item.title || typeof item.title !== "string") {
            return generateNanoId();
          }
          const title = item.title;
          return slugify(title);
        },
      }),
    }),
    overview: text({
      validation: {
        isRequired: true,
      },
    }),
    coverImage: image({
      storage: "my_local_images",
    }),
    thumbnail: image({
      storage: "my_local_images",
    }),
    socialImage: image({
      storage: "my_local_images",
    }),
    body: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    pageTitle: text({
      validation: {
        isRequired: true,
      },
    }),
    // keywords:
    status: select({
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Under Review",
          value: "under_review",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    }),
    publishDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    // ! relation
    author: relationship({
      ref: "User.posts",
      many: false,
    }),
    likes: relationship({
      ref: "User.likes",
      many: true,
    }),
    category: relationship({
      ref: "Category.posts",
      many: true,
    }),
    comments: relationship({
      ref: "Comment.posts",
      many: true,
    }),
  },
});
export const Category = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    slug: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: any, args, context) {
          if (!item.name || typeof item.name !== "string") {
            return generateNanoId();
          }
          const title = item.name;
          return slugify(title);
        },
      }),
    }),
    // ! relation
    posts: relationship({
      ref: "Post.category",
      many: true,
    }),
  },
});
export const Comment = list({
  access: allowAll,
  fields: {
    message: text({
      validation: {
        isRequired: true,
      },
    }),
    author: relationship({
      ref: "User.comments",
      ui: {
        displayMode: "cards",
        cardFields: ["firstName", "email"],
        inlineEdit: { fields: ["firstName", "email"] },
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    posts: relationship({
      ref: "Post.comments",
      many: false,
    }),
  },
});
