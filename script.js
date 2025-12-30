document.addEventListener('DOMContentLoaded', function() {
    

    setupNavigation();
    setupSmoothScroll();
    setupPlanCalculator();
    setupItineraryModals();
    setupFormValidation();
    setupBackToTop();
    setupMobileMenu();
    
});

function setupNavigation() {
    const header = document.getElementById('header');
    const planTripBtn = document.getElementById('plan-trip-btn');
    
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
     
    
    if (planTripBtn) {
        planTripBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#planner');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function setupSmoothScroll() {
    
    const navLinks = document.querySelectorAll('.nav__link, .hero__buttons a, .footer__links a');
    
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            
            if (href.startsWith('#')) {
                e.preventDefault(); 
                
                const targetId = href.substring(1); 
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    
                    closeMobileMenu();
                }
            }
        });
    });
}

function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        
        const navItems = navMenu.querySelectorAll('.nav__item');
        navItems.forEach(function(item) {
            item.addEventListener('click', closeMobileMenu);
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

function setupPlanCalculator() {
    const generateBtn = document.getElementById('generate-plan-btn');
    
    if (generateBtn) {
          generateBtn.addEventListener('click', function() {
            generateTripPlan();
        });
    }
}

function generateTripPlan() {
   
    const destination = document.getElementById('planner-destination').value;
    const days = parseInt(document.getElementById('planner-days').value);
    const tripType = document.getElementById('planner-type').value;
    const resultDiv = document.getElementById('planner-result');
    
   
    if (!destination || !days || !tripType) {
        resultDiv.innerHTML = '<p style="color: #E55555;">Please fill in all fields.</p>';
        return;
    }
    
   
    if (days < 1 || days > 30) {
        resultDiv.innerHTML = '<p style="color: #E55555;">Please enter days between 1 and 30.</p>';
        return;
    }
    
   
    const destinationSelect = document.getElementById('planner-destination');
    const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;
    
   
    const itinerary = generateItinerary(destination, days, tripType);
    
   
    const budget = calculateBudget(days, tripType);
    

    resultDiv.innerHTML = 
        '<div class="planner__itinerary active">' +
        '<h3>Your ' + days + '-Day ' + capitalizeFirst(tripType) + ' Trip to ' + destinationName + '</h3>' +
        '<p><strong>Destination:</strong> ' + destinationName + '</p>' +
        '<p><strong>Duration:</strong> ' + days + ' ' + (days === 1 ? 'day' : 'days') + '</p>' +
        '<p><strong>Trip Style:</strong> ' + capitalizeFirst(tripType) + '</p>' +
        '<h4>Suggested Itinerary:</h4>' +
        '<p>' + itinerary + '</p>' +
        '<div class="planner__budget"><strong>Estimated Budget:</strong> ' + budget + '</div>' +
        '</div>';
}

function generateItinerary(destination, days, tripType) {
   
    let itinerary = '';
    
    if (days <= 3) {
        itinerary = 'Day 1: Arrival and explore the city. Day 2: Visit main attractions. Day 3: Final exploration and departure.';
    } else if (days <= 5) {
        itinerary = 'Day 1: Arrival. Day 2-3: Explore main attractions and landmarks. Day 4: Local experiences. Day 5: Departure.';
    } else {
        itinerary = 'A comprehensive ' + days + '-day journey with time to explore at your own pace, visit multiple attractions, and immerse yourself in the local culture.';
    }
    
    
    const tripNotes = {
        'relax': 'This trip focuses on relaxation and leisurely activities.',
        'adventure': 'This trip includes exciting activities and adventures.',
        'budget': 'This trip maximizes value with affordable options.',
        'luxury': 'This trip features premium experiences and accommodations.'
    };
    
    itinerary += ' ' + (tripNotes[tripType] || '');
    
    return itinerary;
}

function calculateBudget(days, tripType) {
        const baseCost = 100;
    
    
    const multipliers = {
        'relax': 1.2,
        'adventure': 1.5,
        'budget': 0.7,
        'luxury': 3.0
    };
    
    const multiplier = multipliers[tripType] || 1.0;
    const totalCost = days * baseCost * multiplier;
    
    
    const minCost = Math.round(totalCost * 0.85);
    const maxCost = Math.round(totalCost * 1.15);
    
    return '$' + minCost.toLocaleString() + ' - $' + maxCost.toLocaleString() + ' USD';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setupItineraryModals() {
    const itineraryButtons = document.querySelectorAll('.package-itinerary-btn');
    const modal = document.getElementById('itinerary-modal');
    const modalClose = document.getElementById('modal-close');
    

    const itineraries = {
        'weekend': {
            title: 'Weekend Getaway - 3 Days / 2 Nights',
            content: '<h4>Day 1: Arrival & City Exploration</h4><ul><li>Morning: Arrival and hotel check-in</li><li>Afternoon: Guided city walking tour</li><li>Evening: Welcome dinner</li></ul><h4>Day 2: Main Attractions</h4><ul><li>Morning: Visit top landmarks</li><li>Afternoon: Free time</li><li>Evening: Optional cultural show</li></ul><h4>Day 3: Departure</h4><ul><li>Morning: Breakfast and last exploration</li><li>Afternoon: Check-out</li></ul>'
        },
        'cultural': {
            title: 'Cultural Explorer - 7 Days / 6 Nights',
            content: '<h4>Days 1-2: Historical Sites</h4><ul><li>Museum visits</li><li>Heritage site tours</li></ul><h4>Days 3-4: Local Culture</h4><ul><li>Cooking class</li><li>Market tour</li><li>Cultural performances</li></ul><h4>Days 5-6: Community Visits</h4><ul><li>Village visits</li><li>Traditional workshops</li></ul><h4>Day 7: Departure</h4>'
        },
        'backpacker': {
            title: 'Backpacker Route - 14 Days / 13 Nights',
            content: '<h4>Days 1-4: City Exploration</h4><ul><li>Hostel check-in</li><li>Free walking tours</li><li>Budget-friendly food</li></ul><h4>Days 5-9: Regional Travel</h4><ul><li>Travel to nearby cities</li><li>Budget accommodations</li></ul><h4>Days 10-13: Adventure</h4><ul><li>Flexible itinerary</li><li>Optional day trips</li></ul><h4>Day 14: Departure</h4>'
        },
        'luxury': {
            title: 'Luxury Escape - 5 Days / 4 Nights',
            content: '<h4>Day 1: Premium Welcome</h4><ul><li>Private transfer</li><li>5-star hotel</li><li>Fine dining</li></ul><h4>Day 2: Exclusive Experiences</h4><ul><li>Private tours</li><li>VIP access</li><li>Luxury spa</li></ul><h4>Day 3: Bespoke Activities</h4><ul><li>Customized tours</li><li>Private chef</li></ul><h4>Day 4: Relaxation</h4><ul><li>Premium spa</li><li>Exclusive dining</li></ul><h4>Day 5: Departure</h4>'
        }
    };
    

    itineraryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            const itinerary = itineraries[packageType];
            
            if (itinerary && modal) {
               
                document.getElementById('modal-title').textContent = itinerary.title;
                document.getElementById('modal-body').innerHTML = itinerary.content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });
    
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('itinerary-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}


function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const formMessage = document.getElementById('form-message');
            
            
            if (!name) {
                showFormMessage('Please enter your name.', 'error');
                return;
            }
            
            
            if (!email) {
                showFormMessage('Please enter your email.', 'error');
                return;
            }
            
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            
            if (!message) {
                showFormMessage('Please enter a message.', 'error');
                return;
            }
            
            
            showFormMessage('Thank you, we\'ll contact you soon!', 'success');
            contactForm.reset(); 
            
           
            setTimeout(function() {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        });
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function isValidEmail(email) {
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
