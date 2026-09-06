import { NextResponse } from "next/server";

/**
 * Real GitHub contribution levels for the hero grid.
 *
 * The call to the upstream service happens here, on the server, rather than in
 * the browser: it's cached once for the whole site instead of once per visitor,
 * the third-party host never sees visitor IPs, and there's no CORS to satisfy.
 *
 * The upstream is a public, unauthenticated mirror of the contribution
 * calendar — GitHub's own API only exposes it through GraphQL, which needs a
 * token. To move to that later, only the fetch below has to change.
 */

const USER = "beamMiter";
const SOURCE = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;
const ONE_HOUR = 3600;

// must be a plain literal — Next statically analyses segment-config exports and
// rejects anything it can't read at build time (a `const` reference included)
export const revalidate = 3600;

type UpstreamDay = { date: string; count: number; level: number };
type Upstream = {
  total?: Record<string, number>;
  contributions?: UpstreamDay[];
};

export async function GET() {
  try {
    const res = await fetch(SOURCE, { next: { revalidate: ONE_HOUR } });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = (await res.json()) as Upstream;
    const days = data.contributions ?? [];
    if (!days.length) {
      return NextResponse.json({ error: "empty" }, { status: 502 });
    }

    return NextResponse.json({
      levels: days.map((d) => Number(d.level) || 0),
      total: data.total?.lastYear ?? null,
    });
  } catch {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  }
}
