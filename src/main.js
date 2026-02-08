const CONFIG = {
  emailjsUserID: 'ovOHfYVUcS3iouP9j',
  emailjsServiceID: 'service_nuokyrb',
  emailjsTemplateID: 'template_7y8pyfw',
  
  emailSubject: 'She Said YES NIGGAGAA! 💜',
  emailBody: 'SHEE SAID YES FUCKK YEAHHHHDBVHARAAHH!'
};

const sentences = [
  "Hello, AHAHAHAHHAHAHHAHAHA",
  "Nakalimutan k sasabihin k😆",
  "Pero ayun, alam m naman n ren siguro to.",
  "Gusto k bumawi sayo, sa lahat ng nagawa k",
  "Aminado ako n kasalanan k lahat nangyari",
  "Inout grown k na lahat yon and I take accountability for it.",
  "Nung gabi talaga nagsama tayo parang panaingip nga talaga e",
  "Nagulat nlang talaga ako e",
  "Sa totoo nga lang dko ren inexpct magrereply ka nung nagamusta ako,",
  "Kase okay lang naman ren kung hindi.",
  "Pero nagreply ka e, tas ngaun tuwang tuwa si gago n gumawa neto",
  "Wala e, kahit anong gawin k, napaka laki ng ipikto m e",
  "Kainis wlang self react dito",
  "Sorry kung nakakaabala ren pla sau to",
  "So eto bossing ang million dollar question",
  "Di ka na talo boiii."
];

let currentSentence = 0;
let noClickCount = 0;
let emailSent = false;

class Typewriter {
  constructor(element, text, speed = 50, callback = null) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.callback = callback;
    this.element.classList.add('typing-cursor');
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    } else {
      this.element.classList.remove('typing-cursor');
      if (this.callback) setTimeout(this.callback, 300);
    }
  }

  start() {
    this.element.textContent = '';
    this.type();
  }
}

function startGarden() {
  document.getElementById('introScreen').classList.add('hidden');
  const growthScreen = document.getElementById('growthScreen');
  growthScreen.classList.remove('hidden');
  setTimeout(() => {
    growthScreen.classList.add('hidden');
    growFlowers();
  }, 2000);
}

function growFlowers() {
  document.getElementById('garden').classList.remove('hidden');
  document.getElementById('grass').classList.remove('hidden');
  document.getElementById('fireflies').classList.remove('hidden');

  const wrappers = ['wrapper1', 'wrapper2', 'wrapper3', 'tulipWrapper1', 'tulipWrapper2'];
  wrappers.forEach((id, index) => {
    setTimeout(() => {
      document.getElementById(id).classList.add('growing');
    }, index * 200);
  });

  setTimeout(() => {
    bloomAllFlowers();
  }, 4000);
}

function bloomAllFlowers() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      document.getElementById(`head${i}`).classList.add('flower__head--bloomed');
    }, i * 150);
  }

  for (let i = 1; i <= 2; i++) {
    setTimeout(() => {
      document.getElementById(`tulipFlower${i}`).classList.add('tulip__flower--bloomed');
    }, (i + 3) * 150);
  }

  setTimeout(() => {
    showLetter();
  }, 2500);
}

function showLetter() {
  document.getElementById('scene').classList.add('blurred');
  const overlay = document.getElementById('letterOverlay');
  overlay.classList.remove('hidden');
  void overlay.offsetWidth;
  overlay.classList.add('show');
  setTimeout(() => {
    typeSentence();
  }, 800);
}

function typeSentence() {
  if (currentSentence >= sentences.length) {
    showQuestion();
    return;
  }

  const textEl = document.getElementById('letterText');
  const writer = new Typewriter(textEl, sentences[currentSentence], 45, () => {
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('nextBtn').textContent = 'Next';
  });
  writer.start();
}

function nextSentence() {
  const btn = document.getElementById('nextBtn');
  btn.disabled = true;
  btn.textContent = '...';
  const textEl = document.getElementById('letterText');
  textEl.style.opacity = '0';
  textEl.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    currentSentence++;
    textEl.style.opacity = '1';
    textEl.textContent = '';
    typeSentence();
  }, 400);
}

function showQuestion() {
  document.getElementById('letterNav').classList.add('hidden');
  document.getElementById('questionSection').classList.remove('hidden');
}

async function handleYes() {
  if (!emailSent) {
    await sendEmail();
    emailSent = true;
  }
  const overlay = document.getElementById('letterOverlay');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.classList.add('hidden');
    showPhotoScreen();
  }, 500);
}

async function sendEmail() {
  try {
    if (!window.emailjs) {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    }
    
    emailjs.init(CONFIG.emailjsUserID);
    
    const response = await emailjs.send(
      CONFIG.emailjsServiceID,
      CONFIG.emailjsTemplateID,
      {
        from_name: 'Valentine Website',
        to_name: 'You',
        message: CONFIG.emailBody,
        time: new Date().toLocaleString(),
        reply_to: 'noreply@example.com'
      }
    );
    
    console.log('✅ Email sent successfully!', response);
    
  } catch (error) {
    console.error('❌ EmailJS failed:', error);
  }
}

async function sendEmailFallback() {
  console.log('=== VALENTINE ALERT ===');
  console.log('She said YES!');
  console.log('Time:', new Date().toLocaleString());
  console.log('Configure EmailJS to get real notifications');
  console.log('=======================');
  localStorage.setItem('valentineYes', JSON.stringify({
    saidYes: true,
    time: new Date().toISOString(),
    userAgent: navigator.userAgent
  }));
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function showPhotoScreen() {
  const photoScreen = document.getElementById('photoScreen');
  photoScreen.classList.remove('hidden');
  void photoScreen.offsetWidth;
  photoScreen.classList.add('show');
  const img = document.getElementById('yourPhoto');
  const placeholder = document.getElementById('photoPlaceholder');
  img.onload = function() {
    img.classList.add('show');
    placeholder.style.display = 'none';
  };
  img.onerror = function() {
    console.log('Add your photo to /your-photo.jpg or update the path in HTML');
  };
  if (img.complete) {
    img.onload();
  }
}

function handleNo() {
  const btn = document.getElementById('noBtn');
  noClickCount++;
  if (noClickCount === 1) {
    btn.classList.add('shrunk');
    btn.textContent = 'Sure ka ba dyan?';
  } else if (noClickCount === 2) {
    btn.classList.add('tiny');
    btn.textContent = 'talaga?';
  } else if (noClickCount >= 3) {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.textContent = '...';
  }
}

// Initialize all event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Garden ready 🌸');
  
  // DEBUG: Check if button exists
  const startBtn = document.getElementById('startBtn');
  console.log('Start button found:', startBtn);
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      console.log('Button clicked!');
      startGarden();
    });
    
    // Also add touch for mobile
    startBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      console.log('Button touched!');
      startGarden();
    });
  }
  // Next button
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSentence);
    nextBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      nextSentence();
    });
  }
  
  // Yes button
  const yesBtn = document.getElementById('yesBtn');
  if (yesBtn) {
    yesBtn.addEventListener('click', handleYes);
    yesBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleYes();
    });
  }
  
  // No button
  const noBtn = document.getElementById('noBtn');
  if (noBtn) {
    noBtn.addEventListener('click', handleNo);
    noBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleNo();
    });
  }
});