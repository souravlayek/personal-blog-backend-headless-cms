import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  float,
  image,
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const User = list({
  access: allowAll,
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    profileImage: image({
      storage: "my_local_images",
    }),
    email: text({
      validation: {
        isRequired: true,
        match: {
          regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        },
      },
      isIndexed: "unique",
    }),
    facebookLink: text({
      validation: {
        isRequired: false,
        // match: {
        //   regex:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        // },
      },
    }),
    twitterLink: text({
      validation: {
        isRequired: false,
        // match: {
        //   regex:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        // },
      },
    }),
    githubLink: text({
      validation: {
        isRequired: false,
        // match: {
        //   regex:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        // },
      },
    }),
    linkedInLink: text({
      validation: {
        isRequired: false,
        // match: {
        //   regex:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        // },
      },
    }),
    description: text(),
    ratings: float({
      validation: {
        max: 5.0,
        min: 0.5,
      },
    }),
    is_admin: checkbox({
      defaultValue: false,
    }),
    role: select({
      defaultValue: "member",
      options: [
        { label: "Member", value: "member" },
        { label: "Staff", value: "staff" },
      ],
      validation: {
        isRequired: true,
      },
    }),
    password: password({ validation: { isRequired: true } }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),

    // ! RELATION SHIP
    posts: relationship({ ref: "Post.author", many: true }),
    likes: relationship({ ref: "Post.likes", many: true }),
    comments: relationship({ ref: "Comment.author", many: true }),
  },
});
