import React, { useEffect, useState } from "react";
import axios from "axios";

interface Repo {
  name: string;
  languages: string[];
}

const GitHubLanguages: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const username: string = "oscody";
  const token: string | undefined = undefined;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const headers = token ? { Authorization: `token ${token}` } : undefined;

        // Fetch repositories
        const reposResponse = await axios.get<
          { name: string; languages_url: string }[]
        >(`https://api.github.com/users/${username}/repos`, { headers });

        console.log("response", reposResponse);

        const reposWithLanguages: Repo[] = await Promise.all(
          reposResponse.data.map(async (repo) => {
            const languagesResponse = await axios.get<Record<string, number>>(
              repo.languages_url,
              { headers }
            );
            return {
              name: repo.name,
              languages: Object.keys(languagesResponse.data), // List of languages
            };
          })
        );

        setRepos(reposWithLanguages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub repos or languages:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, token]);

  if (loading) {
    return <p>Loading repositories...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#121212",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      <h2>Programming Languages in Your GitHub Repos</h2>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.name}>
              <strong>{repo.name}</strong>: {repo.languages.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitHubLanguages;
