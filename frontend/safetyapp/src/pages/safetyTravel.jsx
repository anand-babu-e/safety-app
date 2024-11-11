
import '../styles/SafetyTravel.css';
import React from 'react';


const SafetyTipBox = ({ title, tips }) => {
  return (
    <div className="safety-tip-box">
      <h3>{title}</h3>
      <div className="tips-list">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <p>
              <strong>{tip.split(':')[0]}:</strong> {tip.split(':')[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SafetyPage = () => {
  const busTravelTips = [
    'Choose a Busy Stop: Wait for buses in well-lit, busy areas, especially at night. Avoid isolated stops.',
    'Sit Near the Driver: When the bus is relatively empty, sit near the driver or in a well-populated area to increase visibility and access to help if needed.',
    'Keep Valuables Close: Keep your belongings within sight or on your lap, and avoid displaying valuable items like phones or cash.',
    'Stay Aware of Your Surroundings: Be cautious of who’s around you, especially if someone is acting suspiciously or sitting uncomfortably close.',
    'Avoid Engaging with Strangers: Friendly conversations are fine, but avoid giving out personal information, like where you’re headed or where you live.',
    'Plan an Exit Strategy: Be aware of emergency exits and the layout of the bus so that you can act quickly if necessary.',
  ];

  const carTravelTips = [
    'Check the Vehicle: Inspect the tires, brakes, lights, and fluids before a long trip. Make sure you have enough fuel for the journey.',
    'Plan Your Route: Use a GPS or map to plan your route in advance, avoiding areas with high crime rates or potential hazards if possible.',
    'Keep Doors Locked: Always keep doors and windows locked, especially at night or when stopped at traffic lights.',
    'Avoid Distractions: Avoid texting or calling while driving. If you need to use your phone, pull over in a safe spot.',
    'Don’t Pick Up Strangers: Even if someone appears to need help, it’s generally safer not to pick up strangers while driving. Instead, call for roadside assistance or emergency services if someone needs help.',
    'Emergency Kit: Carry a first aid kit, flashlight, water, and basic tools in case of an emergency.',
  ];

  const trainTravelTips = [
    'Stay Alert at the Station: Keep an eye on your surroundings and belongings, especially at busy train stations.',
    'Select the Right Car: When possible, choose a car near the conductor or in well-populated sections. Avoid isolated or empty cars.',
    'Secure Valuables: Keep bags and valuables close by or stored in sight rather than above or far from your seat.',
    'Stay Aware of Exits: Know where emergency exits are located in your train car. In case of an emergency, this can be crucial.',
    'Avoid Sleeping in Public: If traveling alone, try to avoid sleeping deeply. Staying alert and aware of your surroundings is important.',
    'Travel During Daylight: When possible, travel during daylight hours, especially on unfamiliar routes or if you feel less secure traveling at night.',
  ];

  const planeTravelTips = [
    'Listen to the Safety Briefing: Pay attention to the flight attendants’ safety briefing and know the closest exit and how to use emergency equipment.',
    'Stay Hydrated: Airplane cabins can be dry, so drink water throughout the flight to avoid dehydration.',
    'Avoid Alcohol Before & During the Flight: Drinking too much alcohol can impair judgment and coordination, which may be dangerous in an emergency.',
    'Buckle Up: Keep your seatbelt fastened whenever seated, as turbulence can be sudden and strong.',
    'Sanitize Surfaces: Wipe down your tray table, armrests, and seatbelt buckle with sanitizing wipes to minimize exposure to germs.',
    'Keep Valuables Close: Store essential items and valuables under the seat in front of you rather than in the overhead bin, where they may be harder to access.',
  ];

  return (
    <div className="safety-page">
      <h1>Travel Safety Tips</h1>
      <div className="safety-tips-grid">
        <SafetyTipBox title="Bus Travel Safety Tips" tips={busTravelTips} />
        <SafetyTipBox title="Car Travel Safety Tips" tips={carTravelTips} />
        <SafetyTipBox title="Train Travel Safety Tips" tips={trainTravelTips} />
        <SafetyTipBox title="Plane Travel Safety Tips" tips={planeTravelTips} />
      </div>
    </div>
  );
};

export default SafetyPage;
