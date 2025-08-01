import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";
export const CreareWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      users: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  arg:{workspaceId:v.id("workspace")},
  handler:async(ctx,args)=>{
const result = await ctx.db.get(args.workspaceId);
    return result;
  }
})