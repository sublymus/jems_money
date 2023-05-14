
import {
  Controllers,
  DescriptionSchema,
  GlobalMiddlewares,
  ModelControllers,
  ResultSchema,
  UrlDataType,
} from "./Initialize";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Log from "sublymus_logger";
import {
  ContextSchema,
  DataSchema,
  authDataOptionSchema,
} from "./Context";
import EventEmiter from "./event/eventEmiter";
import { SQuery_auth } from "./SQuery_auth";
import { SQuery_cookies } from "./SQuery_cookies";
import { SQuery_files } from "./SQuery_files";
import { SQuery_io } from "./SQuery_io";
import { SQuery_Schema } from "./SQuery_schema";
import { SQuery_service } from "./SQuery_service";

type MapUserCtxSchema = {
  [p: string]: {
    exp: number;
    ctx: any;
    isAvalaibleCtx: boolean;
  };
};
type MainType = ( socket: Socket )=>( (ctrlName: string, service: string) =>  (data: DataSchema, cb?: CallBack) => Promise<void>);
type GlobalSchema = {
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
};
type SQuerySchema = (( socket: Socket )=> (ctrlName: string, service: string) => ( (data: DataSchema, cb?: CallBack) =>Promise<void>)) & {
  emiter: EventEmiter;
  io: ( server?: any ) => Server;
  Schema: (description: DescriptionSchema) => any;
  auth: (authData: authDataOptionSchema) => void;
  files: {
    accessValidator: (url: string, cookies: any) => Promise<UrlDataType>
  },
  service:(ctrlName:string, service:string, data:DataSchema, ctx:ContextSchema)=>Promise<any>,
  cookies(
    socket: Socket,
    key?: string,
    value?: any
  ): Promise<any>;
};
export const MapUserCtx: MapUserCtxSchema = {};
export const modelServiceEnabled = ["create", "read", "list", "update", "delete"];
export type CallBack = (result: ResultSchema | void) => any;
export const Global: GlobalSchema = {
  io: null,
};
export async function defineContext(
  socket: Socket,
  ctrlName: string,
  service: string,
  data: DataSchema
): Promise<ContextSchema> {
  const decoded = await SQuery.cookies(socket);
  const token = decoded.token;
  const ctx: ContextSchema = {
    signup: {
      id: token?.__signupId,
      modelPath: token?.__signupModelPath,
    },
    login: {
      id: token?.__loginId,
      modelPath: token?.__loginModelPath,
    },
    ctrlName,
    service,
    data,
    socket,
    __key: token?.__key, /// pour le moment data.__key = cookies[__key]
    __permission: token?.__permission || "any", ///  data.__permission = undefined
  };
  MapUserCtx[token?.__key] = {
    ctx: ctx.socket.id,
    exp: decoded.exp,
    isAvalaibleCtx: true,
  };
  return ctx;
}

const main : MainType=  function (
  socket: Socket
) {
  return (ctrlName: string, service: string) => {
    return async (data: DataSchema, cb?: CallBack) => {
      Log("squery:data", data, { ctrlName }, { service });

      const ctx: ContextSchema = await defineContext(
        socket,
        ctrlName,
        service,
        data
      );

      const midList = [...GlobalMiddlewares];

      for (let i = 0; i < midList.length; i++) {
        const res = await midList[i](ctx);

        if (res !== undefined) return cb?.(res);
      }
      let res: ResultSchema = null;
      let modelRequest = !!(ModelControllers[ctrlName]?.()[service]) && modelServiceEnabled.includes(service);
      Log("ERROR_Controller", {modelRequest});
      try {
        if (modelRequest) {
          res = await ModelControllers[ctrlName]?.()[service]?.(ctx);
        } else {
          res = await Controllers[ctrlName]?.()[service]?.(ctx);
        }
      } catch (error) {
        Log("ERROR_Controller", error);
        if (MapUserCtx[ctx.__key]) MapUserCtx[ctx.__key].isAvalaibleCtx = false;
        return cb?.({
          error: "ERROR_CTRL_UNDEFINED",
          status: 404,
          code: "ERROR_CTRL_UNDEFINED",
          message: "ERROR_CTRL_UNDEFINED",
        });
      }

      if (MapUserCtx[ctx.__key]) MapUserCtx[ctx.__key].isAvalaibleCtx = false;
      if (res === undefined) {
        return cb?.({
          error: "NOT_FOUND",
          status: 404,
          code: "UNDEFINED",
          message: "access not found for Path: " + ctrlName + "." + service,
        });
      }
      // Log('res', res)
      cb?.(res);
    };
  };
};

const SQuery: SQuerySchema = main as SQuerySchema;

SQuery.emiter = new EventEmiter();
SQuery.auth = SQuery_auth;
SQuery.files = SQuery_files;
SQuery.cookies = SQuery_cookies;
SQuery.io = SQuery_io;
SQuery.Schema = SQuery_Schema;
SQuery.service = SQuery_service;

export { SQuery };