import React from "react";
import "../css/home.css";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Home = () => {
  const currentR = useSelector(x => x.request.current)
    const nav = useNavigate();
    const current = useSelector(x => x.users.current);
  //דף הבית
  return (
    <div className="home-container">
      {console.log(currentR)}
{  console.log(current)}
      {/* HEADER */}
      <header className="header">
        <div className="logo">🎓 Scholarships Hub</div>
        {/* <button className="login-button">Login</button> */}
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Find the Perfect Scholarship for You</h1>
        <p className="hero-text">
          Our platform gathers all opportunities in one place – apply, track status, and get guidance every step of the way.
        </p>
        <button className="cta-button" onClick={()=>{ current&&  nav(`/SendRequest`);}}>Get Started
        </button>
      </section>

      {/* CARDS */}
      <section className="cards">
        <div className="card">
          <div className="card-icon">🔑</div>
          <h3>Secure Login</h3>
          <p>Access your account safely to submit applications and track your progress.</p>
        </div>
        <div className="card">
          <div className="card-icon">📝</div>
          <h3>Submit Application</h3>
          <p>Fill in your details and submit applications easily with step-by-step guidance.</p>
        </div>
        <div className="card">
          <div className="card-icon">🔍</div>
          <h3>Track Status</h3>
          <p>Monitor your application status in real-time and receive updates instantly.</p>
        </div>
      </section>

      {/* INFO */}
      <section className="info-section">
        <div className="info-block">
          <div className="info-icon">👩‍🎓</div>
          <h3>Expert Team</h3>
          <p>Professional team with years of experience in scholarships and student applications.</p>
        </div>
        <div className="info-block">
          <div className="info-icon">📚</div>
          <h3>Guides & Tips</h3>
          <p>Detailed guides for every step of the application process, with examples and success tips.</p>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="cta-footer">
        <h2>Ready to Get Started?</h2>
        <p>Join hundreds of students already benefiting from our fast and simple platform.</p>
        <button className="cta-button-white" onClick={()=>{  current&& nav(`/SendRequest`);}}>Start Now</button>
      </section>

    </div>
  );
};
