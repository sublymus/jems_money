import Log from "sublymus_logger";
import { ContextSchema } from "../lib/squery/Context";
import { GlobalMiddlewares } from "../lib/squery/Initialize";
import { MapUserCtx, SQuery } from "../lib/squery/SQuery";
import { ExecException } from "child_process";

GlobalMiddlewares.push(async (ctx: ContextSchema) => {

  try {
    
  } catch (error : any) {
    Log("GlobalMiddlewares_jwtError", error.message);
  }

});
