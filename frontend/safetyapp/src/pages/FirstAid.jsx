import React from 'react';
import '../styles/FirstAid.css';

function FirstAidPage() {
  return (
    <div className="container">
      <nav className="sidenav">
        <a href="#first-aid-intro">First Aid Instructions</a>
        <a href="#abc-first-aid">ABCs of First Aid</a>
        <a href="#heart-stopped">Stopped Heart</a>
        <a href="#bleeding">Bleeding</a>
        <a href="#choking">Choking</a>
        <a href="#blisters">Blisters</a>
        <a href="#fractures">Broken Bones</a>
        <a href="#sprains">Sprains</a>
        <a href="#nosebleeds">Nosebleeds</a>
        <a href="#frostbite">Frostbite</a>
        <a href="#bee-stings">Bee Stings</a>
        <a href="#first-aid-kit">First Aid Kit</a>
      </nav>
      
      <main className="content">
        <section id="first-aid-intro" className="section">
          <h1>First Aid Instructions for 10 Medical Emergencies</h1>
          <p>
            First aid is the immediate care a sick or injured person gets. In some cases, it may be the only care a person needs. In others, first aid is a way to prevent a person's condition from worsening and keep them alive until paramedics arrive or they are taken to the hospital. The best way to prepare for these events is to get official first-aid training. In the meantime, there are some basic life-saving steps you can learn.
          </p>
          <img src="/images/placeholder1.jpg" alt="First Aid Instructions" className="section-image" />
        </section>
    
        <section id="abc-first-aid" className="section">
            <br />
            <br/>
          <h2>ABCs of First Aid</h2>
          <p>
            If someone is unconscious or unresponsive, the basic principle of first aid that you need to know is ABC: airway, breathing, and circulation.
            <ul> 
            <li><strong>Airway:</strong> If someone’s not breathing, the first thing you need to do is open their airway.
            </li>
            <li>
            <strong>Breathing:</strong> If you have cleared a person’s airway but they’re still not breathing, provide rescue breathing.
            </li>
            <li>
            <strong>Circulation:</strong> As you are doing rescue breathing, perform chest compressions to keep the person’s blood circulating. If the person is not responsive, check their pulse. If their heart has stopped, provide chest compressions.
            </li>
            </ul>
            A simpler version of the ABCs is:
            <ul> 
            <li>
            <strong>Awake?</strong> If the person is not awake, try to wake them. If they don’t wake up, make sure someone is calling 911 and move on to the next step.
            </li>
            <li>
            <strong>Breathing?</strong> If a person is not awake and not breathing, start rescue breathing and chest compressions. Then, move to the next step.
            </li>
            <li>
            <strong>Continue care:</strong> When you call for help, follow instructions from 911 or continue treatment until an ambulance arrives.
            </li>
            </ul>
          </p>
         
        </section>
    
        <section id="heart-stopped" className="section">
        <br/><br/>
          <h2>First Aid for a Stopped Heart</h2>
          <img src="/images/placeholder2.jpg" alt="CPR" className="section-images" />
          <p>
            Cardiopulmonary resuscitation (CPR) is one of the most important emergency medical procedures that a person can know. When a person is in cardiac arrest (heart is not beating), doing CPR and/or using an AED could restart their heart and/or recirculate blood until their heart can be restarted with a defibrillator. This can restore their life.
            <br /><br />
            AEDs are available in many public areas and businesses. These first aid devices are made to be easy to use even if you have no training.
            <br /><br />
            <strong>What to Do:</strong>
            <ul>
              <li>Find a person nearby. Make eye contact, point to them, and say: “Call 911.”</li>
              <li>Start doing chest compressions on the person who needs help. Using both your hands, push down hard and fast in the center of the person’s chest. Let their chest come back up naturally between compressions. You may hear pops or snaps; this is normal.</li>
              <li>Keep going until someone with more training arrives.</li>
              <li>If you’re trained in CPR, you can use chest compressions and rescue breathing.</li>
              <li>If it’s available, use an AED. However, do not put off doing chest compressions to go look for an AED. If possible, instruct someone else to go find the device and bring it to you.</li>
            </ul>
          </p>
        </section>
    
        <section id="bleeding" className="section">
        <br/><br/>
          <h2>First Aid for Bleeding</h2>
          <img src="/images/placeholder3.jpg" alt="bleeding" className="section-images" />
          <p>
            If someone is injured and bleeding, there are a few basics about how blood works that will be helpful for you to know.
          </p>
          <p>
            The color of the blood and how it’s leaving the body can give you a sense of the extent of the injury:
            <ul>
              <li><strong>Capillaries:</strong> Bleeding from the smallest blood vessels (capillaries) looks like a trickle. This kind of bleeding usually stops on its own.</li>
              <li><strong>Veins:</strong> A consistent blood flow and blood that’s a dark red color is most likely coming from the veins. This type of bleeding can range from mild to severe.</li>
              <li><strong>Arteries:</strong> Arteries are the largest blood vessels and carry a lot of oxygen. If they are injured, bright red blood will spurt out. Blood can be lost very fast with this kind of bleeding.</li>
            </ul>
          </p>
          <p>
            Almost all bleeding can be controlled with first aid. If severe bleeding keeps going, a person can go into shock and may die.
          </p>

          <strong>What to Do</strong>
          <p>While it is important to stop bleeding, begin with the ABCs of first aid. The next steps are to:</p>
          <ul>
            <li>Put on disposable gloves if you have them. This will protect you from infectious diseases like viral hepatitis and HIV/AIDS that can be spread in a person’s blood.</li>
            <li>Rinse the wound with water.</li>
            <li>Cover the wound with a gauze or cloth (e.g., towel, blanket, clothing).</li>
            <li>Apply direct pressure to stop the flow of blood and encourage clotting (when blood naturally thickens to stop blood loss).</li>
            <li>Elevate the bleeding body part above the person’s heart if you can.</li>
            <li>Do not remove the cloth if it becomes soaked. Removing the first layer will interfere with the clotting process and result in more blood loss. Instead, add more layers if needed.</li>
            <li>Once bleeding has stopped, put a clean bandage on the wound.</li>
          </ul>

          <strong>Get Medical Help If:</strong>
          <ul>
            <li>The wound is deep.</li>
            <li>The wound has widely separated sides.</li>
            <li>The injury oozes blood after pressure has been applied.</li>
            <li>The injury is from an animal or human bite.</li>
            <li>The injury is a puncture, burn, or electrical injury.</li>
            <li>You think there is arterial bleeding.</li>
            <li>Blood is soaking through the bandages.</li>
            <li>The bleeding is not stopping.</li>
          </ul>
          <p>If you are taking the person to the hospital, make sure that you have someone else who can keep administering first aid while you drive.</p>
        </section>
        <section id="choking" className="section">
        <br/><br/>
          <h2>First Aid for Choking</h2>
          <img src="/images/placeholder4.jpg" alt="Choking" className="section-images" />
          <p>
            Choking happens when a person’s windpipe (trachea) gets blocked by food or an object. It is a serious event that can lead to unconsciousness or even death.
          </p>
          <h4>Signs of Choking:</h4>
          <ul>
            <li>Gagging, gasping, or wheezing</li>
            <li>Inability to talk or make noise</li>
            <li>Turning blue in the face</li>
            <li>Grabbing at the throat</li>
            <li>Waving arms</li>
            <li>Looking panicked</li>
          </ul>

          <h4>Using the Heimlich Maneuver</h4>
          <p>The Heimlich maneuver is a series of abdominal thrusts that can help dislodge the object a person is choking on. This technique should only be done if someone is truly choking. Before doing anything, ask the person if they are choking. Remember: If someone is coughing or talking, they are not choking.</p>
          
          <h4>What to Do:</h4>
          <p>If someone is choking, follow these steps:</p>
          <ul>
            <li>Stand behind the person and lean them slightly forward.</li>
            <li>Put your arms around their waist.</li>
            <li>Clench your fist and place it between their belly button (navel) and rib cage.</li>
            <li>Grab your fist with your other hand.</li>
            <li>Pull your clenched fist sharply backward and upward under the person’s rib cage in five quick thrusts.</li>
            <li>Repeat until the object is coughed up.</li>
          </ul>

          <h4>For Someone Who Is Obese or Pregnant:</h4>
          <p>Perform the thrusts around the chest instead of the abdomen.</p>

          <h4>If Someone Becomes Unconscious:</h4>
          <p>If someone is choking and becomes unconscious, follow these steps:</p>
          <ul>
            <li>Place them on their back and kneel over them.</li>
            <li>Place the heel of your hand slightly above their belly button.</li>
            <li>Place your other hand on top of it.</li>
            <li>Give quick upward thrusts to dislodge the object.</li>
          </ul>

          <h4>Helping a Choking Infant:</h4>
          <p>If a baby is choking, use different first aid techniques:</p>
          <h5>Start with Back Blows:</h5>
          <ul>
            <li>Lay the baby across your forearm, face down.</li>
            <li>Support them with your lap or upper thigh.</li>
            <li>Hold their chest in your hand and jaw between your fingers (the baby’s head should be pointed down so it’s lower than their body).</li>
            <li>With the heel of your free hand, give five quick, forceful blows to the baby’s back between the shoulder blades.</li>
          </ul>

          <h5>If Back Blows Don’t Work, Try Chest Thrusts:</h5>
          <ul>
            <li>Turn the baby face up, keeping them on your lap for support.</li>
            <li>Keeping their head angled down (lower than their body), hold the back of their head with your hand to steady it.</li>
            <li>Place two or three of your fingers in the center of the baby’s chest just below the nipples.</li>
            <li>Give five quick thrusts downward so the breastbone gets pushed in about 1.5 inches.</li>
          </ul>

          <h4>If a Choking Infant Loses Consciousness:</h4>
          <p>If a choking infant loses consciousness, you may need to do CPR until emergency help arrives.</p>

          <h4>What to Do if You're Alone and Choking:</h4>
          <p>If you are alone and choking, follow these steps:</p>
          <ul>
            <li>Call 911 first, even though you won’t be able to speak. Leave the phone connected so 911 can pinpoint your location and send emergency help.</li>
            <li>Grasp one fist with the other hand and place it above your belly button.</li>
            <li>Thrust inward and upward with your fist. Repeat until the object is dislodged.</li>
            <li>You can also bend over a hard surface such as the back of a chair. Use the hard surface to apply repeated thrusts to your abdomen until the object is dislodged.</li>
          </ul>
        </section>
        <section id="blisters" className="section">
        <br/><br/>
          <h2>First Aid for Blisters</h2>
          <img src="/images/placeholder5.jpg" alt="blisters" className="section-images" />
          <p>Blisters protect damaged skin while it heals. Some blisters need treatment, and others don’t, depending on their severity and your health.</p>
          
          <h4>What to Do for Small, Non-Open Blisters:</h4>
          <p>If the blister is small, not open, and doesn’t hurt, it's best to leave it alone. You can cover it to prevent rubbing, which could cause it to swell and burst. Do not pop a small blister as this could lead to infection.</p>
          
          <h4>What to Do for Bigger or Painful Blisters:</h4>
          <p>If the blister is big or painful, follow these steps:</p>
          <ul>
            <li>Wash your hands.</li>
            <li>Sterilize a needle with alcohol.</li>
            <li>Make small holes at the edge of the blister.</li>
            <li>Gently push out the fluid.</li>
            <li>Apply antibiotic ointment.</li>
            <li>Put on a bandage.</li>
            <li>If possible, protect the area from further rubbing or pressure.</li>
          </ul>

          <h4>Special Considerations:</h4>
          <p>If you have a compromised immune system, do not drain the blister on your own. Consult a healthcare provider to safely drain it and prevent infection.</p>

          <h4>If the Blister Breaks Open:</h4>
          <ul>
            <li>Gently wash the area with clean water only.</li>
            <li>Smooth the flap of broken skin over the newly exposed skin unless it’s dirty, torn, or there is pus under it.</li>
            <li>Apply petroleum jelly.</li>
            <li>Cover it with a bandage.</li>
            <li>Change the bandage if it gets wet and remove it at night to allow the area to air out.</li>
          </ul>
        </section>

        <section id="fractures" className="section">
            <br/><br/>
          <h2>First Aid for a Broken Bone or Fracture</h2>
          <img src="/images/placeholder6.jpg" alt="brokenbone" className="section-images" />
          <p>Injuries to limbs, hands, or feet should be treated as a broken bone until an X-ray can be done. Some fractures may not require an emergency trip to the hospital but need stabilization to avoid further damage.</p>
          
          <h4>When to Call 911:</h4>
          <p>Call 911 if:</p>
          <ul>
            <li>The person is bleeding a lot, is unresponsive, is not breathing, or has multiple injuries.</li>
            <li>You suspect a fracture in the spinal column, head, hip, pelvis, or thigh. Do not move the person.</li>
            <li>A broken bone is poking through the skin (open fracture).</li>
            <li>The area below the injured joint feels cold and clammy or looks bluish.</li>
            <li>You cannot immobilize the injury sufficiently to transport the person.</li>
          </ul>

          <h4>What to Do if the Bone is Not Immediately Life-Threatening:</h4>
          <p>If you don't need emergency care, follow these first aid steps:</p>
          <ul>
            <li>Do not try to straighten the bone.</li>
            <li>For a limb injury, use a splint and padding to keep the bone still, then elevate it.</li>
            <li>Apply a cold pack to the injury (not directly on the skin), using a barrier like a towel.</li>
            <li>Administer anti-inflammatory drugs like Advil (ibuprofen) or Aleve (naproxen) for pain. If concerned about slowing bone healing, consider using Tylenol (acetaminophen) instead.</li>
          </ul>
        </section>
        <section id="sprains" className="section">
        <br/><br/>
          <h2>First Aid for Sprains</h2>
          <img src="/images/placeholder7.png" alt="sprain" className="section-images" />
          <p>A sprain is an injury to the connective tissues that hold bones, cartilage, and joints together (ligaments). Sprains commonly occur in the ankles, knees, and wrists.</p>
          
          <h4>Symptoms:</h4>
          <p>The symptoms of a sprain can resemble those of a broken bone, including pain, swelling, bruising, and difficulty moving the joint. To differentiate between a sprain and a break, an X-ray is required.</p>

          <h4>When to Seek Immediate Medical Care:</h4>
          <p>If the injured person has any of the following symptoms, seek immediate medical care:</p>
          <ul>
            <li>Severe pain when moving or touching the joint</li>
            <li>Unable to put weight on the injured joint</li>
            <li>Increased bruising or swelling</li>
            <li>Numbness or tingling near the sprain</li>
            <li>Signs of infection</li>
            <li>No improvement during the first week</li>
          </ul>

          <h4>What to Do if Emergency Care is Not Needed:</h4>
          <ul>
            <li>Keep the injured limb as still as possible.</li>
            <li>Apply a cold pack to reduce swelling.</li>
            <li>Elevate the injured area if safe to do so.</li>
            <li>Take NSAIDs (non-steroidal anti-inflammatory drugs) for pain.</li>
            <li>Consult your healthcare provider about other treatments for sprains.</li>
          </ul>
        </section>

        <section id="nosebleeds" className="section">
        <br/><br/>
          <h2>First Aid for Nosebleeds</h2>
          <img src="/images/placeholder8.jpg" alt="nosebleed" className="section-images" />
          <p>Nosebleeds can be caused by dry air, trauma, or various health conditions. Some common causes include nose picking, chemical fumes, colds, and allergies.</p>

          <h4>What to Do for a Nosebleed:</h4>
          <ul>
            <li>Lean slightly forward, not back, to avoid blood running down the throat.</li>
            <li>Pinch your nose just below the bridge. Avoid pinching the nostrils closed.</li>
            <li>After 5 minutes, check if the bleeding has stopped. If not, continue pinching for an additional 10 minutes.</li>
            <li>Apply a cold pack to the bridge of your nose while pinching to help constrict blood vessels.</li>
          </ul>

          <h4>When to Call a Healthcare Provider:</h4>
          <p>Contact your provider if:</p>
          <ul>
            <li>You have frequent nosebleeds.</li>
            <li>You experience anemia symptoms (weakness, faintness, fatigue, pale skin).</li>
            <li>You are taking blood thinners or have a bleeding disorder.</li>
            <li>You notice unusual bruising or started a new medication.</li>
          </ul>

          <h4>When to Seek Emergency Medical Care:</h4>
          <p>If any of the following occur, seek emergency care:</p>
          <ul>
            <li>The bleeding does not stop after 15 minutes of pressure.</li>
            <li>There is significant blood loss.</li>
            <li>You have difficulty breathing.</li>
            <li>You have swallowed blood and vomited it up.</li>
            <li>You’ve had a serious injury or blow to the head.</li>
          </ul>
        </section>
        <section id="frostbite" className="section">
        <br/><br/>
          <h2>First Aid for Frostbite</h2>
          <img src="/images/placeholder9.jpg" alt="frostbite" className="section-images" />
          <p>Frostbite occurs when the body’s tissues freeze in extremely cold conditions, causing skin and underlying tissues to freeze. It can cause similar damage as burns, but the treatment approach is different.</p>

          <h4>What to Do:</h4>
          <ol>
            <li>Get out of the cold immediately.</li>
            <li>Submerge the affected area in warm water (98 to 105°F) for 20-30 minutes.</li>
            <li>Do not rub the frostbitten area.</li>
            <li>Avoid using dry heat sources, such as heating pads or fireplaces.</li>
            <li>For fingers and toes, place clean cotton balls between them once they warm up.</li>
            <li>Loosely wrap the affected area with bandages to protect it.</li>
            <li>Take pain relievers like Tylenol (acetaminophen) or Advil (ibuprofen) for pain relief.</li>
            <li>Seek medical attention as soon as possible for further care.</li>
          </ol>

          <h4>Important Notes:</h4>
          <p>If the skin is turning white and hard, or if the person shows signs of severe frostbite, seek emergency treatment immediately.</p>

          <p>For small frostbite areas, warming can also be done through skin-to-skin contact, such as placing the affected part against another person's skin, if help is not immediately available.</p>
        </section>

        <section id="bee-stings" className="section">
        <br/><br/>
          <h2>First Aid for Bee Stings</h2>
          <img src="/images/placeholder10.jpg" alt="bee" className="section-images" />
          <p>Bee stings can cause pain, swelling, and potential allergic reactions. It’s crucial to monitor for signs of an allergic reaction, as it can become life-threatening in some cases.</p>

          <h4>What to Do for a Bee Sting:</h4>
          <ol>
            <li>Remove the stinger immediately to prevent more venom from entering the skin. Use a straight-edged object like a credit card to scrape it out.</li>
            <li>Wash the sting area with soap and water.</li>
            <li>Apply a cold pack to reduce swelling, but do not apply ice directly to the skin.</li>
            <li>Administer an antihistamine like Benadryl to reduce itching and swelling.</li>
            <li>For pain relief, take Tylenol (acetaminophen) or Advil (ibuprofen).</li>
          </ol>

          <h4>When to Call for Help:</h4>
          <p>Immediately seek emergency help if the person shows signs of an allergic reaction, such as:</p>
          <ul>
            <li>Swelling away from the sting area</li>
            <li>Flushing or hives</li>
            <li>Chest pain, confusion, or trouble breathing (signs of anaphylaxis)</li>
          </ul>

          <h4>If the Person Has Known Allergies:</h4>
          <p>If the person is allergic to bee stings, use an EpiPen as directed to prevent anaphylaxis and call 911 immediately.</p>
        </section>
        <section id="first-aid-kit" className="section">
        <br/><br/>
          <h2>First Aid Kit List</h2>
          <p>First aid kits are essential for handling medical emergencies, whether at home, in your vehicle, or when traveling. You can purchase a pre-made first aid kit, or you can create your own by assembling the necessary supplies. Below is a basic list of items to include in your first aid kit:</p>

          <ul>
            <li>Adhesive bandages in multiple sizes and shapes</li>
            <li>Gauze pads in multiple sizes</li>
            <li>Compress dressings</li>
            <li>Adhesive cloth tape</li>
            <li>A roll of gauze</li>
            <li>Gloves</li>
            <li>Antiseptic wipes</li>
            <li>Antibiotic ointment</li>
            <li>Hydrocortisone ointment</li>
            <li>A breathing barrier for performing CPR</li>
            <li>An instant cold compress</li>
            <li>Baby aspirin</li>
            <li>Tweezers</li>
            <li>An oral thermometer</li>
            <li>An emergency blanket</li>
          </ul>

          <h4>Summary</h4>
          <p>While formal first aid training is the best way to prepare for medical emergencies, it’s important to be familiar with the basic concepts such as the ABCs (Airway, Breathing, Circulation) and how to perform CPR. In some cases, providing first aid quickly can save a life.</p>
        </section>
      </main>
    </div>
  );
}

export default FirstAidPage;
