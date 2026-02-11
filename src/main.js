const CONFIG = {
  emailjsUserID: 'ovOHfYVUcS3iouP9j',
  emailjsServiceID: 'service_nuokyrb',
  emailjsTemplateID: 'template_7y8pyfw',           // YES template
  emailjsRejectionTemplateID: 'template_qe5oqvr',  // NO template
  
  emailSubjectYes: 'She Said YES NIGGAGAA! 💜',
  emailBodyYes: 'SHEE SAID YES FUCKK YEAHHHHDBVHARAAHH!',
  
  emailSubjectNo: 'She Said no nigga ',
  emailBodyNo: 'She said no nigga, time to move on.'
};

const sentences = [
  "Gel?",
  "may gusto paren akong sabihin sayo.",
  "at baka isipin m kinakausap kita ah",
  "Hindi kita kinakausap", 
  "Website to", "n may nilalaman n mga gusto k sabihin",
  "Binago k lang lahat ng nakalagay",
  "So ayun",
  "Gel", 
  "hindi ko talaga kaya mag walk away sayo.",
  "Nakita n ren kita sa wakas tas ganon lang ule?",
  "Ang hirap",
  "Ang hirap m panoorin mawala nanaman sa buhay k",
  "kung kelan nakausap n ren kita",
  "papanoorin nanaman kita umalis",
  "Ang sakit kaya",
  "At napapaisip aq", "Pano kung sinabe k lahat ng gusto k",
  "Pano kung ginawa k lahat ng gusto k gawin para sayo",
  "Magbabago kaya isip m?",
  "Soryy Gel,",
  "Pero alam m naman n to",
  "Napaka selfish k talaga",
  "Kaya pwede m bang bigyan ule ng chance ung napaka selfish n lalaking to?",
  "Alam k napaka late k na nga magbago ",
  "and alam k nakamove on ka na",
  "Pero late ba kapag nagsimula ule tayo?",
  "A fresh start forgetting the past",
  "and me just geting to know you all over again",
  "kagaya nga ng sinasabe k kapag late ako sa klase",
  "late b talaga kung magsisimula plang?",
  "and I know",
  "Gusto m muna magfocus sa sarili m",
  "and I respect that",
  "But may I be apart of that?",
  "It's all I've ever wanted.",
  "It's all up to you Gel",
  "I won't force you to do anything you don't want to do",
  "But just to let you know",
  "I am begging",
  "and I am pleading to you",
  "Making this last effort to show you how much I care",
  "Sorry ule gel", 
  "pero ayaw k talaga kita makita umalis", 
  "ng di man lang ako nagtry baguhin isip m",
  "Kaya let me ask you again one last time",
  "Please"
];

const rejectionSentences = [
  "So ayun.",
  "Naiintindihan k at irerespeto k paren desisyon m.",
  "But I just want to say a few things before we end this.",
  "May I say it one last time?",
];

const finalLetterSentences = {
  yes: [
    "I love you Gel and always will.",
    "and I hope you find happiness in whatever you choose to do.",
    "Thank you for hearing me out.",
    "No matter what, I wish you and pray for you nothing but happiness."
  ],
  no: [
    "Okay Gel, I understand.",
    "I hope you find happiness in whatever you choose to do.",
    "No matter what, I wish and pray for you nothing but happiness."
  ]
};

let currentSentence = 0;
let noClickCount = 0;
let emailSent = false;
let currentLetterType = 'yes';
let showingConfirmation = false;
let finalLetterResponse = null;

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
  let sentenceArray;
  
  if (currentLetterType === 'yes') {
    sentenceArray = sentences;
  } else if (currentLetterType === 'no') {
    sentenceArray = rejectionSentences;
  } else if (currentLetterType === 'final') {
    sentenceArray = finalLetterSentences[finalLetterResponse];
  }
  
  if (currentSentence >= sentenceArray.length) {
    showQuestion();
    return;
  }

  const textEl = document.getElementById('letterText');
  const writer = new Typewriter(textEl, sentenceArray[currentSentence], 45, () => {
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
  
  if (currentLetterType === 'yes') {
    document.getElementById('questionSection').classList.remove('hidden');
  } else if (currentLetterType === 'no') {
    document.getElementById('rejectionQuestionSection').classList.remove('hidden');
  } else if (currentLetterType === 'final') {
    setTimeout(() => {
      handleFinalLetterEnd();
    }, 1000);
  }
}

async function handleYes() {
  if (currentLetterType === 'no') {
    await handleNoConfirmation();
  } else {
    if (!emailSent) {
      await sendEmail(true);
      emailSent = true;
    }
    const overlay = document.getElementById('letterOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.add('hidden');
      showPhotoScreen();
    }, 500);
  }
}

async function sendEmail(isYes = true) {
  try {
    if (!window.emailjs) {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    }
    
    emailjs.init(CONFIG.emailjsUserID);
    
    const subject = isYes ? CONFIG.emailSubjectYes : CONFIG.emailSubjectNo;
    const body = isYes ? CONFIG.emailBodyYes : CONFIG.emailBodyNo;
    const templateId = isYes ? CONFIG.emailjsTemplateID : CONFIG.emailjsRejectionTemplateID;
    
    const response = await emailjs.send(
      CONFIG.emailjsServiceID,
      templateId,
      {
        from_name: 'Valentine Website',
        to_name: 'You',
        message: body,
        subject: subject,
        time: new Date().toLocaleString(),
        reply_to: 'noreply@example.com'
      }
    );
    
    console.log('✅ Email sent successfully!', response);
    
  } catch (error) {
    console.error('❌ EmailJS failed:', error);
  }
}

async function sendRejectionEmail() {
  try {
    if (!window.emailjs) {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    }
    
    emailjs.init(CONFIG.emailjsUserID);
    
    const response = await emailjs.send(
      CONFIG.emailjsServiceID,
      CONFIG.emailjsRejectionTemplateID,
      {
        from_name: 'Valentine Website',
        to_name: 'You',
        message: CONFIG.emailBodyNo,
        subject: CONFIG.emailSubjectNo,
        time: new Date().toLocaleString(),
        reply_to: 'noreply@example.com'
      }
    );
    
    console.log('✅ Rejection email sent using separate template!', response);
    emailSent = true;
    
  } catch (error) {
    console.error('❌ Rejection email failed:', error);
  }
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
  if (!showingConfirmation) {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    showingConfirmation = true;
    
    yesBtn.classList.add('hidden');
    noBtn.textContent = 'Are you sure?';
    noBtn.classList.remove('shrunk', 'tiny');
    noBtn.style.opacity = '1';
    noBtn.style.pointerEvents = 'auto';
  } else {
    console.log('Sending rejection email with template:', CONFIG.emailjsRejectionTemplateID);
    sendRejectionEmail();
    resetLetterForRejection();
  }
}

function resetLetterForRejection() {
  currentLetterType = 'no';
  currentSentence = 0;
  noClickCount = 0;
  showingConfirmation = false;
  
  document.getElementById('questionSection').classList.add('hidden');
  document.getElementById('letterNav').classList.remove('hidden');
  
  const textEl = document.getElementById('letterText');
  textEl.textContent = '';
  textEl.style.opacity = '1';
  
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = '...';
  
  setTimeout(() => {
    typeSentence();
  }, 300);
}

async function handleNoConfirmation() {
  if (!emailSent) {
    await sendEmail(false);
    emailSent = true;
  }
  
  const overlay = document.getElementById('letterOverlay');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.classList.add('hidden');
    showPhotoScreen();
  }, 500);
}

function handleFinalLetterEnd() {
  const overlay = document.getElementById('letterOverlay');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.getElementById('scene').classList.remove('blurred');
  }, 500);
}

function showFinalLetter(response) {
  currentLetterType = 'final';
  finalLetterResponse = response;
  currentSentence = 0;
  
  document.getElementById('rejectionQuestionSection').classList.add('hidden');
  document.getElementById('letterNav').classList.remove('hidden');
  
  const textEl = document.getElementById('letterText');
  textEl.textContent = '';
  textEl.style.opacity = '1';
  
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = '...';
  
  setTimeout(() => {
    typeSentence();
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Garden ready 🌸');
  
  const startBtn = document.getElementById('startBtn');
  console.log('Start button found:', startBtn);
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      console.log('Button clicked!');
      startGarden();
    });
    
    startBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      console.log('Button touched!');
      startGarden();
    });
  }
  
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSentence);
    nextBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      nextSentence();
    });
  }
  
  const yesBtn = document.getElementById('yesBtn');
  if (yesBtn) {
    yesBtn.addEventListener('click', handleYes);
    yesBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleYes();
    });
  }
  
  const noBtn = document.getElementById('noBtn');
  if (noBtn) {
    noBtn.addEventListener('click', handleNo);
    noBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleNo();
    });
  }

  const rejectionYesBtn = document.getElementById('rejectionYesBtn');
  if (rejectionYesBtn) {
    rejectionYesBtn.addEventListener('click', () => {
      showFinalLetter('yes');
    });
    rejectionYesBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      showFinalLetter('yes');
    });
  }

  const rejectionNoBtn = document.getElementById('rejectionNoBtn');
  if (rejectionNoBtn) {
    rejectionNoBtn.addEventListener('click', () => {
      showFinalLetter('no');
    });
    rejectionNoBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      showFinalLetter('no');
    });
  }
});