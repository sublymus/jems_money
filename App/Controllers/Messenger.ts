import Log from "sublymus_logger";
import { ContextSchema } from "../../lib/squery/Context";
import { CtrlManager } from "../../lib/squery/CtrlManager";
import { ControllerSchema, Controllers, ModelControllers, ResponseSchema } from "../../lib/squery/Initialize";
import { Global } from "../../lib/squery/SQuery";

const Messenger: ControllerSchema = {
    createDiscussion: async (ctx: ContextSchema): ResponseSchema => {
        try {
            if (ctx.signup.modelPath != 'user') {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: ctx.signup.modelPath + " can not create discussion",
                    status: 404
                }
            }
            const user = await ModelControllers[ctx.signup.modelPath].option.model.findOne({ _id: ctx.signup.id });
            if (!user) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "User don't exist",
                    status: 404
                }
            }
            if (user.opened.length > 0) {
                return {
                    code: "OPERATION_SUCCESS",
                    message: "You allready have a opened discussion",
                    response: user.opened[user.opened.length - 1],
                    status: 200,
                }
            }
            const res = await ModelControllers['discussion']()['store']({
                ...ctx,
                service: 'store',
                data: {
                    user: ctx.login.id,
                    closed: false,
                }
            });
            if (res.error) return res;


            const etp = await ModelControllers['entreprise'].option.model.findOne();
            if (!etp) {
                return {
                    error: "Messenger_createDiscussion",
                    code: "NOT_FOUND",
                    message: "entreprise don't exist",
                    status: 404
                }
            }
            const reslist = await ModelControllers['discussion']()['list']({
                ...ctx,
                service: 'list',
                data: {
                    addId: [res.response],
                    paging: {
                        query: {
                            __parentModel: `entreprise_${etp._id.toString()}_openedDiscussion_discussion`
                        }
                    }
                }
            });

            if (reslist.error) return reslist.error;

            return {
                code: "OPERATION_SUCCESS",
                message: "OPERATION_SUCCESS",
                response: res.response,
                status: 200,
            }
        } catch (error) {
            return {
                error: "NOT_FOUND",
                code: "NOT_FOUND",
                message: "Server ERROR",
                status: 404
            }
        }
    },
    joinDiscussion: async (ctx: ContextSchema): ResponseSchema => {
        try {
            if (ctx.signup.modelPath != 'manager') {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: ctx.signup.modelPath + " can not join discussion",
                    status: 404
                }
            }
            const discussion = await ModelControllers['discussion'].option.model.findOne({ _id: ctx.data.discussionId });
            if (!discussion) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "discussion not found",
                    status: 404
                }
            }
            if (discussion.manager) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "this discussion allready have a manager ",
                    status: 404
                }
            }
            discussion.manager = ctx.login.id;
            await discussion.save();
            return {
                code: "OPERATION_SUCCESS",
                message: "OPERATION_SUCCESS",
                response: discussion._id,
                status: 200,
            }
        } catch (error) {
            return {
                error: "NOT_FOUND",
                code: "NOT_FOUND",
                message: "Server ERROR",
                status: 404
            }
        }
    },
    closeDiscussion: async (ctx: ContextSchema): ResponseSchema => {
        try {
            if (ctx.signup.modelPath != 'manager') {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: ctx.signup.modelPath + " can not join discussion",
                    status: 404
                }
            }
            const discussion = await ModelControllers['discussion'].option.model.findOne({ _id: ctx.data.discussionId });
            if (!discussion) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "discussion not found",
                    status: 404
                }
            }

            discussion.closed = true;

            await discussion.save();
            if (!discussion.user) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "discussion.user not found",
                    status: 404
                }
            }
            const user = await ModelControllers['user'].option.model.findOne({ _id: discussion.user });
            if (!discussion.user) {
                return {
                    error: "NOT_FOUND",
                    code: "NOT_FOUND",
                    message: "user not found",
                    status: 404
                }
            }
            const reslist = await ModelControllers['discussion']()['list']({
                ...ctx,
                service: 'list',
                data: {
                    addId: [discussion._id.toString()],
                    paging: {
                        query: {
                            __parentModel: `messenger_${user.messenger}_closed_discussion`
                        }
                    }
                }
            });

            if (reslist.error) return reslist.error;

            const reslist2 = await ModelControllers['discussion']()['list']({
                ...ctx,
                service: 'list',
                data: {
                    remove: [discussion._id.toString()],
                    paging: {
                        query: {
                            __parentModel: `messenger_${user.messenger}_opened_discussion`
                        }
                    }
                }
            });

            if (reslist2.error) return reslist2.error;

            return {
                code: "OPERATION_SUCCESS",
                message: "OPERATION_SUCCESS",
                response: discussion._id,
                status: 200,
            }

        } catch (error) {
            return {
                error: "NOT_FOUND",
                code: "NOT_FOUND",
                message: "Server ERROR",
                status: 404
            }
        }
    }
}

const ctrlMaker = CtrlManager({
    ctrl: { Messenger },
    access: {
        createDiscussion: "any"
    }
})



















