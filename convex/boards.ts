import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Fetch favorite boards
    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((b) => b.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    let boards = [];

    // Handle search query properly
    if (args.search) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId)) // Use a regular index instead of search
        .collect();
    }

    // Fetch favorite status for each board
    const boardsWithFavoriteRelation = await Promise.all(
      boards.map(async (board) => {
        const favorite = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_board_org", (q) =>
            q.eq("userId", identity.subject).eq("boardId", board._id)
          )
          .unique();

        return {
          ...board,
          isFavorite: !!favorite,
        };
      })
    );

    return boardsWithFavoriteRelation;
  },
});