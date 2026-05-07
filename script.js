/* ── LOAD HEADER & FOOTER ── */
function loadComponent(file, targetId) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(targetId);
      if (el) el.outerHTML = html;
      // Re-init hamburger after header loads
      if (file === 'header.html') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
          hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
          });
          navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
          }));
        }
        // Set active link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navMenu.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
          }
        });
      }
    });
}

if (document.getElementById('header-placeholder')) loadComponent('header.html', 'header-placeholder');
if (document.getElementById('footer-placeholder')) loadComponent('footer.html', 'footer-placeholder');

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }));
}

/* ── DEMO REVIEWS SEED ── */
const demoReviews = [
  {
    carName: 'Tata Nexon EV', variant: 'Max LR', year: '2024', category: 'electric', fuel: 'Electric', transmission: 'Automatic (AT)',
    ownership: '6 months – 1 year', kmsDriven: '12,000 km', actualMileage: '4.5 km/kWh',
    rating: 5, ratingPerformance: 5, ratingComfort: 4, ratingMileage: 5, ratingFeatures: 5, ratingSafety: 5, ratingService: 4, ratingValue: 5,
    pros: 'Incredible 465 km range, silent & smooth drive, low running cost ₹1/km',
    cons: 'Public charging infra still developing, boot space average',
    review: 'Switched from a diesel Brezza to Nexon EV — best decision ever. Running cost dropped from ₹8/km to ₹1/km. Charging at home overnight is super convenient. Highly recommend to anyone doing city commutes.',
    features: ['Connected Car App', 'Sunroof', '360 Camera', 'Cruise Control'],
    reviewer: 'Neha Joshi', city: 'Pune', primaryUse: 'Daily City Commute', recommend: 'yes',
    date: '2024-12-20T10:00:00.000Z'
  },
  {
    carName: 'Hyundai Creta', variant: 'SX(O) Turbo DCT', year: '2024', category: 'suv', fuel: 'Petrol', transmission: 'DCT / DSG',
    ownership: '6 months – 1 year', kmsDriven: '8,500 km', actualMileage: '14 km/l city, 18 km/l highway',
    rating: 4, ratingPerformance: 4, ratingComfort: 5, ratingMileage: 4, ratingFeatures: 5, ratingSafety: 5, ratingService: 4, ratingValue: 4,
    pros: 'Panoramic sunroof, Level 2 ADAS, stunning interior, smooth DCT gearbox',
    cons: 'Top variant is expensive, DCT can be jerky in slow traffic',
    review: 'The new Creta 2024 is a massive leap over the previous gen. Panoramic sunroof, Level 2 ADAS, and a premium cabin make it feel like a luxury car. Best family SUV under ₹20 lakh without any doubt.',
    features: ['Sunroof', 'ADAS', '360 Camera', 'Wireless Charging', 'Ventilated Seats', 'Connected Car App'],
    reviewer: 'Vikram Singh', city: 'Jaipur', primaryUse: 'Family Use', recommend: 'yes',
    date: '2024-12-18T10:00:00.000Z'
  },
  {
    carName: 'Maruti Suzuki Swift', variant: 'ZXi+', year: '2024', category: 'hatchback', fuel: 'Petrol', transmission: 'AMT',
    ownership: 'Less than 6 months', kmsDriven: '4,200 km', actualMileage: '20 km/l city, 24 km/l highway',
    rating: 5, ratingPerformance: 4, ratingComfort: 4, ratingMileage: 5, ratingFeatures: 4, ratingSafety: 4, ratingService: 5, ratingValue: 5,
    pros: 'Outstanding fuel efficiency, sporty new design, peppy engine, low maintenance',
    cons: 'No sunroof, rear seat tight for tall passengers',
    review: 'All-new Swift is a massive upgrade. The design is head-turning and the fuel efficiency is unbelievable — 20 km/l in city traffic. For anyone looking for a fun, practical, and affordable hatchback, Swift ZXi+ is the answer.',
    features: ['Cruise Control', 'Connected Car App'],
    reviewer: 'Rahul Sharma', city: 'Delhi', primaryUse: 'Daily City Commute', recommend: 'yes',
    date: '2024-12-15T10:00:00.000Z'
  },
  {
    carName: 'Mahindra Scorpio-N', variant: 'Z8 L Diesel AT 4WD', year: '2023', category: 'suv', fuel: 'Diesel', transmission: 'Automatic (AT)',
    ownership: '1 – 2 years', kmsDriven: '22,000 km', actualMileage: '13 km/l city, 17 km/l highway',
    rating: 4, ratingPerformance: 5, ratingComfort: 4, ratingMileage: 3, ratingFeatures: 4, ratingSafety: 4, ratingService: 3, ratingValue: 4,
    pros: 'Monstrous diesel engine, 4WD capability, 7-seater, commanding road presence',
    cons: 'Fuel economy not great, turning radius is wide',
    review: 'Scorpio-N Z8L is the ultimate road trip machine. Drove from Mumbai to Ladakh and it handled everything — highways, mountain roads, and off-road trails. If you want a true SUV with presence and power, nothing beats Scorpio-N.',
    features: ['360 Camera', 'Sunroof', 'Cruise Control', 'Ventilated Seats'],
    reviewer: 'Arjun Mehta', city: 'Mumbai', primaryUse: 'Mixed Use', recommend: 'yes',
    date: '2024-12-10T10:00:00.000Z'
  }
];

if (!localStorage.getItem('carReviews')) {
  localStorage.setItem('carReviews', JSON.stringify(demoReviews));
}

const reviews = JSON.parse(localStorage.getItem('carReviews')) || [];

function saveReview(review) {
  reviews.push(review);
  localStorage.setItem('carReviews', JSON.stringify(reviews));
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return diff + ' days ago';
  if (diff < 60) return '1 month ago';
  return Math.floor(diff / 30) + ' months ago';
}

function buildReviewCard(r) {
  return `
    <div class="review-card carousel-card">
      <div class="review-header">
        <div>
          <div class="review-car">${r.carName} (${r.year})</div>
          <div class="review-year">${(r.category || '').toUpperCase()} ${r.fuel ? '· ' + r.fuel : ''}</div>
        </div>
        <div class="stars">${stars(r.rating)}</div>
      </div>
      <p class="review-text">"${r.review}"</p>
      <div class="review-pros-cons">
        <div class="pros">✅ ${r.pros}</div>
        <div class="cons">❌ ${r.cons}</div>
      </div>
      <div class="review-footer">
        <span>— ${r.reviewer}, ${r.city || ''}</span>
        <span>${timeAgo(r.date)}</span>
      </div>
    </div>`;
}

/* ── CAROUSEL ── */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const btnPrev = document.getElementById('carouselPrev');
  const btnNext = document.getElementById('carouselNext');
  if (!track) return;

  const allReviews = [...reviews].reverse().slice(0, 9);
  track.innerHTML = allReviews.map(r => buildReviewCard(r)).join('');

  let current = 0;
  let autoTimer;

  function getVisible() {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function getTotal() {
    return Math.max(1, allReviews.length - getVisible() + 1);
  }

  function goTo(n) {
    const total = getTotal();
    current = (n + total) % total;

    // get actual card width including gap from CSS
    const card = track.querySelector('.carousel-card');
    if (!card) return;
    const gap = 24;
    const cardW = card.offsetWidth + gap;
    track.style.transform = `translateX(-${current * cardW}px)`;

    // update dots
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const total = getTotal();
    for (let i = 0; i < total; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.onclick = () => { goTo(i); resetAuto(); };
      dotsWrap.appendChild(d);
    }
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 3500);
  }

  btnPrev.onclick = () => { goTo(current - 1); resetAuto(); };
  btnNext.onclick = () => { goTo(current + 1); resetAuto(); };

  buildDots();
  resetAuto();

  window.addEventListener('resize', () => { current = 0; buildDots(); goTo(0); });
}

/* ── REVIEWS PAGE ── */
function renderUserReviews(containerId) {
  const container = document.getElementById(containerId);
  if (!container || reviews.length === 0) return;

  // Check for brand filter from URL
  const urlBrand = new URLSearchParams(location.search).get('brand');
  let filteredReviews = reviews.slice().reverse();
  
  if (urlBrand) {
    filteredReviews = filteredReviews.filter(r => 
      r.carName.toLowerCase().startsWith(urlBrand.toLowerCase())
    );
  }

  container.innerHTML = `
    <h3 style="margin-bottom:20px;font-size:1.3rem;font-weight:700;">User Submitted Reviews (${filteredReviews.length})</h3>
    <div class="reviews-grid">
      ${filteredReviews.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div>
              <div class="review-car">${r.carName} ${r.variant ? '— ' + r.variant : ''} (${r.year})</div>
              <div class="review-year">${r.category ? r.category.toUpperCase() : ''} ${r.fuel ? '· ' + r.fuel : ''} ${r.transmission ? '· ' + r.transmission : ''}</div>
            </div>
            <div class="stars">${stars(r.rating)}</div>
          </div>
          ${r.ratingPerformance || r.ratingComfort || r.ratingMileage ? `
          <div class="mini-ratings">
            ${r.ratingPerformance ? `<span>⚡ Performance: ${stars(r.ratingPerformance)}</span>` : ''}
            ${r.ratingComfort ? `<span>🛋️ Comfort: ${stars(r.ratingComfort)}</span>` : ''}
            ${r.ratingMileage ? `<span>⛽ Mileage: ${stars(r.ratingMileage)}</span>` : ''}
            ${r.ratingFeatures ? `<span>📱 Features: ${stars(r.ratingFeatures)}</span>` : ''}
            ${r.ratingSafety ? `<span>🛡️ Safety: ${stars(r.ratingSafety)}</span>` : ''}
            ${r.ratingService ? `<span>🔧 Service: ${stars(r.ratingService)}</span>` : ''}
            ${r.ratingValue ? `<span>💰 Value: ${stars(r.ratingValue)}</span>` : ''}
          </div>` : ''}
          ${r.actualMileage ? `<p style="font-size:0.82rem;color:#888;margin:6px 0;">⛽ Real Mileage: <strong>${r.actualMileage}</strong> ${r.kmsDriven ? '· 🛣️ ' + r.kmsDriven + ' driven' : ''}</p>` : ''}
          <p class="review-text">"${r.review}"</p>
          <div class="review-pros-cons">
            <div class="pros">✅ ${r.pros}</div>
            <div class="cons">❌ ${r.cons}</div>
          </div>
          ${r.features && r.features.length ? `<div style="margin-top:10px;font-size:0.8rem;color:#555;">🔧 <strong>Features:</strong> ${r.features.join(', ')}</div>` : ''}
          ${r.recommend ? `<div style="margin-top:8px;font-size:0.85rem;">${r.recommend === 'yes' ? '✅ <strong>Recommends this car</strong>' : r.recommend === 'no' ? '❌ <strong>Does not recommend</strong>' : '🤔 <strong>Recommends with conditions</strong>'}</div>` : ''}
          <div class="review-footer">
            <span>— ${r.reviewer}, ${r.city || ''} ${r.primaryUse ? '· ' + r.primaryUse : ''}</span>
            <span>${timeAgo(r.date)}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <hr style="margin:40px 0;">
  `;
}

/* ── EMI CALCULATOR ── */
function calculateEMI() {
  const price = parseFloat(document.getElementById('emiPrice').value) || 0;
  const down = parseFloat(document.getElementById('emiDown').value) || 0;
  const rate = parseFloat(document.getElementById('emiRate').value) / 12 / 100;
  const tenure = parseInt(document.getElementById('emiTenure').value) || 1;
  const loan = price - down;
  if (loan <= 0 || rate <= 0) return;
  const emi = (loan * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
  const total = emi * tenure;
  const interest = total - loan;
  const fmt = n => '₹ ' + Math.round(n).toLocaleString('en-IN');
  document.getElementById('resEMI').textContent = fmt(emi);
  document.getElementById('resLoan').textContent = fmt(loan);
  document.getElementById('resInterest').textContent = fmt(interest);
  document.getElementById('resTotal').textContent = fmt(total);
}

/* ── INIT ── */
if (document.getElementById('carouselTrack')) initCarousel();
if (document.getElementById('userReviews')) renderUserReviews('userReviews');

/* ── SUBMIT FORM ── */
const form = document.getElementById('reviewForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkedFeatures = [...document.querySelectorAll('input[name="features"]:checked')].map(cb => cb.value);
    saveReview({
      carName: document.getElementById('carName').value,
      variant: document.getElementById('variant')?.value || '',
      year: document.getElementById('year').value,
      category: document.getElementById('category').value,
      fuel: document.getElementById('fuel').value,
      transmission: document.getElementById('transmission')?.value || '',
      purchasePrice: document.getElementById('purchasePrice')?.value || '',
      ownership: document.getElementById('ownership').value,
      kmsDriven: document.getElementById('kmsDriven')?.value || '',
      actualMileage: document.getElementById('actualMileage')?.value || '',
      rating: parseInt(document.getElementById('rating').value),
      ratingPerformance: parseInt(document.getElementById('ratingPerformance')?.value) || null,
      ratingComfort: parseInt(document.getElementById('ratingComfort')?.value) || null,
      ratingMileage: parseInt(document.getElementById('ratingMileage')?.value) || null,
      ratingFeatures: parseInt(document.getElementById('ratingFeatures')?.value) || null,
      ratingSafety: parseInt(document.getElementById('ratingSafety')?.value) || null,
      ratingInterior: parseInt(document.getElementById('ratingInterior')?.value) || null,
      ratingService: parseInt(document.getElementById('ratingService')?.value) || null,
      ratingValue: parseInt(document.getElementById('ratingValue')?.value) || null,
      pros: document.getElementById('pros').value,
      cons: document.getElementById('cons').value,
      reviewPerformance: document.getElementById('reviewPerformance')?.value || '',
      reviewComfort: document.getElementById('reviewComfort')?.value || '',
      reviewFeatures: document.getElementById('reviewFeatures')?.value || '',
      reviewService: document.getElementById('reviewService')?.value || '',
      review: document.getElementById('review').value,
      features: checkedFeatures,
      reviewer: document.getElementById('reviewer').value,
      city: document.getElementById('city').value,
      primaryUse: document.getElementById('primaryUse')?.value || '',
      recommend: document.getElementById('recommend')?.value || '',
      date: new Date().toISOString()
    });
    alert('✅ Review submitted successfully! Thank you for helping the community.');
    form.reset();
    window.location.href = 'reviews.html';
  });
}
