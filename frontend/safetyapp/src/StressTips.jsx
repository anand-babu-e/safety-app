import React from 'react';
import './StressManagement.css';

const StressManagement = () => {
  return (
    <div className="stress-management">
      <h1>Stress Management Tips</h1>
      
      <section className="intro">
        <p>Life is full of challenges, whether it's school, work, money, relationships, health, or major life changes. All people have, at some point, faced the pressure of dealing with these issues while taking care of themselves.</p>
        <img src="/images/stress/placeholder1.gif" alt="Person holding head" />
      </section>
      <section className="subintro">
      <div className="contents">
        <div className="texts">
      <h2>Have No Fear - Stress Management Is Here!</h2>
      <p>Stress management is an acquired skill, and often something you learn through life experience. But there are strategies you can use to help you prevent, cope with, and reduce stress in ways that are physically, 
          mentally and emotionally healthy — resulting in better productivity and overall wellbeing.</p>
          </div>
        <img src="/images/stress/placeholder2.jpg" alt="Person holding head" />
        </div>
      </section>

      <section className="exercise">
      <div className="contents">
        <div className="texts">
        <h2>Exercise — It's Not Just Good For Your Body</h2>
        <p>Not only will your body thank you, but research shows that exercise reduces stress and anxiety by decreasing stress hormone levels and increasing endorphins.</p>
        </div>
        <img src="/images/stress/placeholder3.jpg" alt="Woman doing yoga" />
        </div>
      </section>

      <section className="sleep">
      <div className="contents">
        <div className="texts">
        <h2>Catch More Zzz's</h2>
        <p>Getting enough good quality sleep at night helps break the stress cycle, making you more productive and less irritable.</p>
        </div>
        <img src="/images/stress/placeholder4.jpg" alt="Person sleeping" />
        </div>
      </section>

      <section className="talk">
      <div className="contents">
        <div className="texts">
        <h2>Don't Bottle It Up</h2>
        <p>Stress is a part of life and is nothing to be ashamed of. Share your feelings with someone you trust or write them down to relieve stress.</p>
        </div>
        <img src="/images/stress/placeholder5.jpg" alt="Person leaning on shoulder" />
        </div>
      </section>

      <section className="hobbies">
      <div className="contents">
        <div className="texts">
        <h2>Engage In Your Hobbies</h2>
        <p>Make time in your life for things you enjoy. Leisure activities like reading or sports help reduce stress in the long term.</p>
        </div>
        <img src="/images/stress/placeholder6.jpg" alt="Person reading a book" />
        </div>
      </section>

      <section className="balance">
      <div className="contents">
        <div className="texts">
        <h2>Balance is Key</h2>
        <p>To work well, you need to be in a healthy state of body and mind. Prioritize your needs and balance productivity with self-care.</p>
        </div>
        <img src="/images/stress/placeholder7.jpg" alt="Person meditating" />
        </div>
      </section>
    </div>
  );
};

export default StressManagement;
