import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const username = "agarwalpranav0711";

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, { cache: "no-store" }),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { cache: "no-store" })
        ]);

        if (!userRes.ok || !reposRes.ok) {
            throw new Error("GitHub API Connection Unstable");
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        // Find the most recent update across all repos
        const lastActiveRepo = reposData.sort((a: any, b: any) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        )[0];

        return NextResponse.json({
            publicRepos: userData.public_repos,
            followers: userData.followers,
            totalStars,
            lastUpdated: lastActiveRepo ? lastActiveRepo.pushed_at : userData.updated_at
        });
    } catch (error) {
        return NextResponse.json({ error: "GitHub connection unstable" }, { status: 500 });
    }
}
