import { NextResponse } from "next/server";
import { getPinnedBookmarks } from "@/lib/data";

export async function GET() {
  const pinned = await getPinnedBookmarks();
  return NextResponse.json(pinned, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
  });
}
