"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core3 = require("@keystone-6/core");
var import_dotenv = __toESM(require("dotenv"));

// src/Models/user.model.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    firstName: (0, import_fields.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields.text)({ validation: { isRequired: true } }),
    profileImage: (0, import_fields.image)({
      storage: "my_local_images"
    }),
    email: (0, import_fields.text)({
      validation: {
        isRequired: true,
        match: {
          regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        }
      },
      isIndexed: "unique"
    }),
    facebookLink: (0, import_fields.text)({
      validation: {
        isRequired: false,
        match: {
          regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        }
      }
    }),
    twitterLink: (0, import_fields.text)({
      validation: {
        isRequired: false,
        match: {
          regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        }
      }
    }),
    githubLink: (0, import_fields.text)({
      validation: {
        isRequired: false,
        match: {
          regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        }
      }
    }),
    linkedInLink: (0, import_fields.text)({
      validation: {
        isRequired: false,
        match: {
          regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        }
      }
    }),
    description: (0, import_fields.text)(),
    ratings: (0, import_fields.float)({
      validation: {
        max: 5,
        min: 0.5
      }
    }),
    is_admin: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    role: (0, import_fields.select)({
      defaultValue: "member",
      options: [
        { label: "Member", value: "member" },
        { label: "Staff", value: "staff" }
      ],
      validation: {
        isRequired: true
      }
    }),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    }),
    posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
    likes: (0, import_fields.relationship)({ ref: "Post.likes", many: true }),
    comments: (0, import_fields.relationship)({ ref: "Comment.author", many: true })
  }
});

// src/Models/post.model.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// src/utils/helper.ts
var generateNanoId = () => {
  const randomNumber = Math.round(Math.random() * 1e5);
  return randomNumber.toString(16);
};
var slugify = (value) => {
  return value.trim().toLowerCase().replace(" ", "_");
};

// src/Models/post.model.ts
var Post = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    title: (0, import_fields2.text)({
      validation: {
        isRequired: true
      }
    }),
    slug: (0, import_fields2.virtual)({
      field: import_core2.graphql.field({
        type: import_core2.graphql.String,
        resolve(item, args, context) {
          if (!item.title || typeof item.title !== "string") {
            return generateNanoId();
          }
          const title = item.title;
          return slugify(title);
        }
      })
    }),
    overview: (0, import_fields2.text)({
      validation: {
        isRequired: true
      }
    }),
    coverImage: (0, import_fields2.image)({
      storage: "my_local_images"
    }),
    thumbnail: (0, import_fields2.image)({
      storage: "my_local_images"
    }),
    socialImage: (0, import_fields2.image)({
      storage: "my_local_images"
    }),
    body: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    pageTitle: (0, import_fields2.text)({
      validation: {
        isRequired: true
      }
    }),
    status: (0, import_fields2.select)({
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft"
        },
        {
          label: "Under Review",
          value: "under_review"
        },
        {
          label: "Published",
          value: "published"
        }
      ]
    }),
    publishDate: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    }),
    author: (0, import_fields2.relationship)({
      ref: "User.posts",
      many: false
    }),
    likes: (0, import_fields2.relationship)({
      ref: "User.likes",
      many: true
    }),
    category: (0, import_fields2.relationship)({
      ref: "Category.posts",
      many: true
    }),
    comments: (0, import_fields2.relationship)({
      ref: "Comment.posts",
      many: true
    })
  }
});
var Category = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({
      validation: {
        isRequired: true
      }
    }),
    slug: (0, import_fields2.virtual)({
      field: import_core2.graphql.field({
        type: import_core2.graphql.String,
        resolve(item, args, context) {
          if (!item.name || typeof item.name !== "string") {
            return generateNanoId();
          }
          const title = item.name;
          return slugify(title);
        }
      })
    }),
    posts: (0, import_fields2.relationship)({
      ref: "Post.category",
      many: true
    })
  }
});
var Comment = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    message: (0, import_fields2.text)({
      validation: {
        isRequired: true
      }
    }),
    author: (0, import_fields2.relationship)({
      ref: "User.comments",
      ui: {
        displayMode: "cards",
        cardFields: ["firstName", "email"],
        inlineEdit: { fields: ["firstName", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      many: false
    }),
    posts: (0, import_fields2.relationship)({
      ref: "Post.comments",
      many: false
    })
  }
});

// schema.ts
var lists = {
  User,
  Post,
  Category,
  Comment
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "email createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["firstName", "lastName", "profileImage", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
import_dotenv.default.config();
var keystone_default = withAuth(
  (0, import_core3.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${process.env.HOSTNAME}/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
