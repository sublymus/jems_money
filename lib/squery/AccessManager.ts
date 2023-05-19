import Log from "sublymus_logger";
import { ContextSchema } from "./Context";

export function accessValidator(option: {
  ctx: ContextSchema,
  isOwner?: boolean,
  type: "controller" | "property",
  rule: {
    access?:
    | "public"
    | "share"
    | "admin"
    | "secret"
    | "private"
    | "default"
    | undefined,
    share?: {
      add?: string[],
      ony?: string[],
      exc?: string[],
    },
  }
  property?: string,
}) {
  let { ctx, type, isOwner, property , rule } = option;
  let {access , share } = rule;
  let { service, signup } = ctx;
  const accessMap = {
    controller: {
      create: {
        public: ["any", "client", "shared", "owner", "admin"],
        share: ["shared", "admin"],
        admin: ["admin"],
        secret: ["admin"],
      },
      read: {
        public: ["any", "client", "shared", "owner", "admin"],
        share: ["shared", "admin"],
        admin: ["any", "client", "shared", "owner", "admin"],
        secret: ["admin"],
      },
      list: {
        public: ["any", "client", "shared", "owner", "admin"],
        share: ["shared", "admin"],
        admin: ["any", "client", "shared", "owner", "admin"],
        secret: ["admin"],
      },
      update: {
        public: ["any", "client", "shared", "owner", "admin"],
        share: ["shared", "admin"],
        admin: ["admin"],
        secret: ["admin"],
      },
      delete: {
        public: ["any", "client", "shared", "owner", "admin"],
        share: ["shared", "admin"],
        admin: ["admin"],
        secret: ["admin"],
      },
    },
    property: {
      read: {
        public: ["any", "client", "shared", "owner", "admin"],
        default: ["any", "client", "shared", "owner", "admin"],
        private: ["owner", "admin"],
        admin: ["any", "client", "shared", "owner", "admin"],
        secret: ["admin"],
        share: ["shared", "owner", "admin"],
      },
      list: {
        public: ["any", "client", "shared", "owner", "admin"],
        default: ["any", "client", "shared", "owner", "admin"],
        private: ["owner", "admin"],
        admin: ["any", "client", "shared", "owner", "admin"],
        secret: ["admin"],
        share: ["shared", "owner", "admin"],
      },
      update: {
        public: ["any", "client", "shared", "owner", "admin"],
        default: ["owner", "admin"],
        private: ["owner", "admin"],
        admin: ["admin"],
        secret: ["admin"],
        share: ["shared", "owner", "admin"],
      },
    },
  };

  if (service == "store") service = "create";
  else if (service == "destroy") service = "delete";

  if (type == "controller" && access == undefined) access = "public";
  if (type == "controller" && access == "private") access = "secret";
  if (type == "property" && access == undefined) access = "default";

  let clientPermission = ctx.__permission?.startsWith("client:") ? "client" : (ctx.__permission || 'any');

  if (clientPermission == "client") {
    if (share) {
      if (Array.isArray(share.ony) && share.ony.includes(ctx.__permission)) {
        clientPermission = isOwner?'owner':'shared';
      }
      if (Array.isArray(share.add) && [ctx.__permission, ...share.add].includes(ctx.__permission)) {
        clientPermission = isOwner?'owner':'shared';
      }
      if (Array.isArray(share.exc) && !share.exc.includes(ctx.__permission)) {
        clientPermission = isOwner?'owner':'shared';
      }
    }else{
      if (isOwner) {
        clientPermission = 'owner';
      } 
    }
  }
  let valid = accessMap[type]?.[service]?.[access].includes(clientPermission);
  // if (!valid) Log('access',
  //   {
  //     access,
  //     type,
  //     isOwner,
  //     property,
  //     share
  //   },
  //   {
  //     __permision: ctx.__permission,
  //     clientPermission,
  //     service,
  //     signup
  //   },
  //   {
  //     valid,
  //     start: ctx.__permission?.startsWith("client:"),
  //     rest: ctx.__permission?.startsWith("client:") ? "client" : (ctx.__permission || 'any')
  //   })

  return valid;
}
