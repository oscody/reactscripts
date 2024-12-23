import React, { useEffect, useState } from "react";
import axios from "axios";

interface Repo {
  languages_url: string;
}

const GitHubLanguagesV2: React.FC = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const username: string = "oscody"; // Replace with your GitHub username
  const token: string | undefined = undefined; // Replace with your GitHub token or set as undefined

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const headers = token ? { Authorization: `token ${token}` } : undefined;

        // Fetch repositories
        const reposResponse = await axios.get<Repo[]>(
          `https://api.github.com/users/${username}/repos`,
          { headers }
        );

        console.log("responsev2", reposResponse);

        const allLanguages: Set<string> = new Set();

        await Promise.all(
          reposResponse.data.map(async (repo) => {
            const languagesResponse = await axios.get<Record<string, number>>(
              repo.languages_url,
              { headers }
            );
            // Add languages to the Set
            Object.keys(languagesResponse.data).forEach((language) => {
              allLanguages.add(language);
            });
          })
        );

        // Convert Set to Array and update state
        setLanguages(Array.from(allLanguages));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub languages:", error);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [username, token]);

  if (loading) {
    return <p>Loading languages...</p>;
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
      <h2>Unique Programming Languages Used in Your GitHub Repos</h2>
      {languages.length === 0 ? (
        <p>No languages found.</p>
      ) : (
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitHubLanguagesV2;
