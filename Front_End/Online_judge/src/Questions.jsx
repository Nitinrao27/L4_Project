import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/Question", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          // Not logged in, send to login
          navigate("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setQuestions(data.ques);
          setUsername(data.name);
          // console.log(data);
        }
      });
  }, [navigate]);

  // 1️⃣ Default active is Home
  const [activeTab, setActiveTab] = useState("Home");

  // 2️⃣ Define all left + right tabs
  const leftTabs = ["Problems", "Submissions", "Leaderboard"];
  const rightTabs = ["Home", "Profile"];

  return (
    <>
      <header className="bg-slate-800 h-20 min-w-screen flex justify-between">
        {/* LEFT SIDE NAV */}
        <div className="flex items-center">
          <ul className="flex space-x-9 ml-5 tracking-widest text-2xl">
            {leftTabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-2 py-1  rounded ${
                  activeTab === tab
                    ? "bg-white text-black ring-2 "
                    : "text-amber-50"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE NAV */}
        <div className="flex items-center">
          <ul className="flex mr-5 tracking-widest text-2xl space-x-9">
            <li
              onClick={() => setActiveTab("Home")}
              className={`cursor-pointer px-2 py-1 rounded ${
                activeTab === "Home" ? "bg-white text-black" : "text-amber-50"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => setActiveTab("Profile")}
              className={`cursor-pointer px-2 py-1 rounded ${
                activeTab === "Profile"
                  ? "bg-white text-black"
                  : "text-amber-50"
              }`}
            >
              <i className="fas fa-user"></i>
            </li>
          </ul>
        </div>
      </header>

      {activeTab === "Problems"  && (
        <div className="flex justify-center mt-8">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
              Available Problems
            </h2>
            <ul className="space-y-4">
              {questions.map((item, index) => (
                <li
                  key={item._id}
                  onClick={() => navigate("/run")}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:bg-slate-50 transition duration-200 flex items-start cursor-pointer"
                >
                  <span className="font-bold text-slate-600 mr-4">
                    {index + 1}.
                  </span>
                  <span className="text-lg text-slate-800">{item.Title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Home" && (
        <div className="flex justify-center items-center min-h-[60vh] animate-fade-in">
          <div className="bg-gradient-to-br from-blue-100 to-purple-200 shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-4 drop-shadow-md">
                 {username ? `Welcome , ${username}` : 'Welcome'}
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              This is your beautifully designed home page. Enjoy the vibrant
              colors and smooth experience!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Question;
