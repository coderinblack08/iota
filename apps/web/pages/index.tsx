import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="dotted-background h-screen">
      <header className="max-w-2xl mx-auto px-5 py-40 space-y-6">
        <h1 className="text-2xl leading-relaxed text-center">
          <span className="text-red-500">Iota</span>: A Spacial Journal, Habit
          Tracker, <br />
          Personal Site, and Knowledge Base
        </h1>
        <div className="space-y-2 max-w-xl mx-auto">
          <button className="flex items-center justify-center px-7 py-2.5 rounded-xl w-full border-2 border-gray-700/75 text-gray-500">
            <FaGoogle className="mr-3 w-5 h-5" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center px-7 py-2.5 rounded-xl w-full border-2 border-gray-700/75 text-gray-500">
            <FaGithub className="mr-3 w-5 h-5" />
            Continue with GitHub
          </button>
          <button className="flex items-center justify-center px-7 py-2.5 rounded-xl w-full border-2 border-gray-700/75 text-gray-500">
            <FaTwitter className="mr-3 w-5 h-5" />
            Continue with Twitter
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <a className="text-gray-500 hover:underline">Source Code: GitHub</a>
          <span className="text-2xl leading-none font-bold text-gray-600">
            ·
          </span>
          <a
            href="https://hack4pan.com"
            className="text-gray-500 hover:underline"
            rel="noreferrer"
            target="_blank"
          >
            Built for Hack4Pan
          </a>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
