import React, { useState } from "react";
import aboutImg from "../images/About.png";
import Navbar from "../components/Navbar";
import { TextField, Button, Paper } from "@mui/material";
import { api_base_url } from "../helper";
import { Link } from "react-router-dom";

const About = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(api_base_url + "/api/contacts/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    setResponse(data.msg);
    if (data.success) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center bg-black rounded-b-xl overflow-hidden shadow-lg">
        <img
          src={aboutImg}
          alt="Blogging Illustration"
          className="max-h-full max-w-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-8 md:space-y-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Who We Are
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Welcome to{" "}
          <span className="text-purple-400 font-semibold">BlogApp</span> 🚀 — a
          simple yet powerful platform where ideas, stories, and knowledge come
          together. We believe that everyone has a voice, and through blogging,
          we empower people to share their thoughts, experiences, and expertise
          with the world. Whether you're a student, a professional, or just a
          curious learner, this is the space to grow and inspire.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Our Mission
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Our mission is to create a community-driven platform where learning
          and sharing knowledge is easy, fun, and impactful. From technology
          trends like{" "}
          <span className="text-purple-400">
            MERN Stack, Artificial Intelligence, Blockchain, IoT
          </span>
          to personal growth and creative writing — we bring diverse content to
          help readers stay updated, motivated, and skilled.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
          What We Offer
        </h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 text-base md:text-lg">
          <li>Engaging blogs on technology, lifestyle, and innovation</li>
          <li>Step-by-step tutorials and coding guides</li>
          <li>Real-world project ideas for students & professionals</li>
          <li>Tips & tricks for writing better blogs</li>
          <li>
            A platform to learn, share, and connect with like-minded people
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Why Choose Us?
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          ✅ Beginner-friendly & easy to use <br />
          ✅ Covers latest industry trends & updates <br />
          ✅ Encourages creativity & collaboration <br />
          ✅ Designed for learners, developers & creators <br />
        </p>

        <div className="text-center mt-8 md:mt-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Start Your Blogging Journey Today
          </h3>
          <Link
            to="/blogs"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white rounded-lg shadow-lg mr-4 transition inline-block"
          >
            Explore Blogs
          </Link>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-purple-400 mt-12 md:mt-16">
          Get in Touch
        </h2>
        <Paper className="p-4 md:p-6 bg-[#111] text-white" elevation={3}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#aaa",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#222",
                  cursor: "text",
                  userSelect: "auto",
                  WebkitUserSelect: "auto",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9c27b0",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              label="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#aaa",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#222",
                  cursor: "text",
                  userSelect: "auto",
                  WebkitUserSelect: "auto",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9c27b0",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#aaa",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#222",
                  cursor: "text",
                  userSelect: "auto",
                  WebkitUserSelect: "auto",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9c27b0",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                },
              }}
            />
            <Button type="submit" variant="contained" color="secondary">
              Send Message
            </Button>
          </form>
          {response && <p className="mt-3 text-green-400">{response}</p>}
        </Paper>
      </div>
    </div>
  );
};

export default About;
