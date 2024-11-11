import React from 'react';
import '../styles/SafetyTips.css';
import awarenessImage from '/images/idea.png';
import avoidRiskImage from '/images/avoidance.png';
import emergencyImage from '/images/siren.png';
import travelSmartImage from '/images/insurance.png';
import resilienceImage from '/images/challenge.png';

const SafetyTips = () => {
  const tips = [
    {
      title: "Stay Aware and Alert",
      content: `
        - **Know Your Surroundings**: Familiarize yourself with your regular routes and look out for exits or safe places.
        - **Trust Your Instincts**: If something feels wrong, remove yourself from the situation if possible.
        - **Limit Distractions**: Avoid excessive phone use while walking, and be mindful of wearing headphones.
      `,
      image: awarenessImage
    },
    {
      title: "Avoid High-Risk Areas",
      content: `
        - **Plan Routes**: Choose well-lit, busy streets, and avoid deserted areas, especially at night.
        - **Share Your Location**: Let trusted friends or family know your expected route and arrival time.
        - **Emergency Hotspots**: Identify locations of police stations, hospitals, and other safe zones on your route.
      `,
      image: avoidRiskImage
    },
    {
      title: "Prepare for Emergencies",
      content: `
        - **Learn Self-Defense Basics**: Basic self-defense moves can make a difference in unexpected situations.
        - **Keep Emergency Contacts Ready**: Program emergency numbers into your phone, and know the local numbers for emergencies.
        - **First Aid Knowledge**: Consider taking a basic first-aid course to handle minor injuries or provide initial help to others.
      `,
      image: emergencyImage
    },
    {
      title: "Travel Smartly",
      content: `
        - **Use Reliable Transportation**: Opt for trusted rideshare or taxi services; always verify the driver and vehicle details.
        - **Limit Carrying Valuables**: Only carry essential items to reduce the risk of theft or loss.
        - **Maintain Personal Space**: Be cautious when approached by strangers and keep a comfortable distance when possible.
      `,
      image: travelSmartImage
    }
  ];

  return (
    <>
    <h1 style={{textAlign:'center'}}>4 Safety Tips Everyone Must follow</h1>
    <div className="tips-container">
      {tips.map((tip, index) => (
        <div key={index} className="tip-box">
          <img src={tip.image} alt={tip.title} className="tip-image" />
          <h2>{tip.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: tip.content.replace(/(\*\*.+?\*\*)/g, "<b>$1</b>").replace(/\*\*/g, "") }} />
        </div>
      ))}
    </div>
    </>
  );
};

export default SafetyTips;
