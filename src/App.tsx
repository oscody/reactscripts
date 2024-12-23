import "./App.css";
import GitHubLanguages from "./githubQuery";
import GitHubLanguagesV2 from "./githubQueryv2";
import Toolstack from "./Toolstack";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
      <div>
        <GitHubLanguages />

        <GitHubLanguagesV2 />

        <Toolstack />
      </div>
    </>
  );
}

export default App;
