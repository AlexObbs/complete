document.addEventListener('DOMContentLoaded', function() {
  // Wait for Elementor's scripts to initialize
  if(typeof window.Elementor !== 'undefined') {
      window.Elementor.on('frontend:init', function() {
          initSwiperSafely();
      });
  } else {
      initSwiperSafely();
  }

  function initSwiperSafely() {
      // Destroy existing instances
      if(typeof window.mySwiper !== 'undefined') {
          window.mySwiper.destroy(true, true);
      }

      // Initialize with noConflict
      window.mySwiper = new Swiper('.swiper', {
          // Your config
          loop: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          breakpoints: {
              320: {
                  slidesPerView: 1,
                  spaceBetween: 20
              },
              480: {
                  slidesPerView: 1.5,
                  spaceBetween: 30
              },
              640: {
                  slidesPerView: 2,
                  spaceBetween: 40
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 50
              }
          }
      });
          // ... rest of your config ...
          const testimonialContainer = document.querySelector('.testimonial-container');
      const testimonials = document.querySelectorAll('.testimonial');
      let currentTestimonial = 0;
      let isExpanded = false;
      let autoScrollInterval;

      function showTestimonial(index) {
          testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
          testimonials.forEach((testimonial, i) => {
              testimonial.classList.toggle('active', i === index);
          });
      }

      function nextTestimonial() {
          if (!isExpanded) {
              currentTestimonial = (currentTestimonial + 1) % testimonials.length;
              showTestimonial(currentTestimonial);
          }
      }

      function startAutoScroll() {
          autoScrollInterval = setInterval(nextTestimonial, 5000);
      }

      function stopAutoScroll() {
          clearInterval(autoScrollInterval);
      }

      // Read More functionality
      document.querySelectorAll('.read-more').forEach(button => {
          button.addEventListener('click', () => {
              const content = button.previousElementSibling;
              content.classList.toggle('expanded');
              isExpanded = content.classList.contains('expanded');
              button.textContent = isExpanded ? 'Read Less' : 'Read More';
              
              if (isExpanded) {
                  stopAutoScroll();
              } else {
                  startAutoScroll();
              }
          });
      });

      // FAQ Functionality
      document.querySelectorAll('.faq-item').forEach(item => {
          item.addEventListener('click', () => {
              const wasActive = item.classList.contains('active');
              
              // Close all FAQ items
              document.querySelectorAll('.faq-item').forEach(otherItem => {
                  otherItem.classList.remove('active');
              });
              
              // Toggle clicked item
              if (!wasActive) {
                  item.classList.add('active');
              }
          });
      });

      // Start the carousel
      startAutoScroll();
      
      // Add scroll animation for team members
      const observerOptions = {
          threshold: 0.2,
          rootMargin: '0px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.animation = 'fadeIn 0.5s forwards';
              }
          });
      }, observerOptions);

      document.querySelectorAll('.team-member').forEach(member => {
          observer.observe(member);
      });

      // Add hover animation for team member images
      document.querySelectorAll('.team-member').forEach(member => {
          member.addEventListener('mouseenter', () => {
              member.querySelector('img').style.animation = 'float 3s ease-in-out infinite';
          });
          member.addEventListener('mouseleave', () => {
              member.querySelector('img').style.animation = 'none';
          });
      });
  
  }
});

      document.addEventListener('DOMContentLoaded', function() {
      const bookButtons = document.querySelectorAll('.janet');
      const modal = document.getElementById('itineraryModal');
      const closeBtn = document.getElementById('closeModal');
      const form = document.getElementById('itineraryBookingForm');
      const submitBtn = form.querySelector('.submit-button');

      // Open modal with slide animation
      bookButtons.forEach(button => {
          button.addEventListener('click', function(e) {
              e.preventDefault();
              modal.classList.add('active');
              document.body.style.overflow = 'hidden';
          });
      });

      // Close modal with slide animation
      function closeModal() {
          modal.querySelector('.modal-content').style.transform = 'translateX(100%)';
          setTimeout(() => {
              modal.classList.remove('active');
              modal.querySelector('.modal-content').style.transform = '';
              document.body.style.overflow = 'auto';
          }, 500);
      }

      closeBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', function(e) {
          if (e.target === modal) {
              closeModal();
          }
      });

      // Handle form submission with loading animation
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          submitBtn.classList.add('loading');
          submitBtn.textContent = 'Planning...';
          
          // Simulate form submission (replace with actual submission)
          setTimeout(() => {
              const formData = {
                  email: document.getElementById('email').value,
                  travelDate: document.getElementById('travelDate').value,
                  currency: document.getElementById('currency').value,
                  referenceNumber: document.getElementById('reference').value,
                  numberOfDays: document.getElementById('numberOfDays').value
              };
              
              console.log('Form submitted:', formData);
              
              submitBtn.textContent = 'Trip Planned!';
              setTimeout(() => {
                  closeModal();
                  form.reset();
                  submitBtn.classList.remove('loading');
                  submitBtn.textContent = 'Plan My Trip';
              }, 1000);
          }, 1500);
      });
  });
      document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('itineraryModal');
  const closeBtn = document.getElementById('closeItineraryModal');
  const form = document.getElementById('itineraryForm');
  const submitBtn = form ? form.querySelector('.submit-button') : null;
  const numberOfDaysInput = document.getElementById('numberOfDays');

  // Add min and max attributes safely
  if (numberOfDaysInput) {
      numberOfDaysInput.setAttribute('min', '1');
      numberOfDaysInput.setAttribute('max', '30');
  }

  // Close modal with slide animation
  function closeModal() {
      modal.querySelector('.modal-content').style.transform = 'translateX(100%)';
      setTimeout(() => {
          modal.classList.remove('active');
          modal.querySelector('.modal-content').style.transform = '';
          document.body.style.overflow = 'auto';
      }, 500);
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
      if (e.target === modal) {
          closeModal();
      }
  });

  // Handle form submission with loading animation
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Processing...';
      
      // Simulate form submission
      setTimeout(() => {
          const formData = {
              email: document.getElementById('itineraryEmail').value,
              travelDate: document.getElementById('itineraryDate').value,
              currency: document.getElementById('currencyPreference').value,
              bookingReference: document.getElementById('readOnlyField').value,
              numberOfDays: document.getElementById('numberOfDays').value
          };
          
          console.log('Itinerary Form submitted:', formData);
          
          submitBtn.textContent = 'Journey Planned!';
          setTimeout(() => {
              closeModal();
              form.reset();
              submitBtn.classList.remove('loading');
              submitBtn.textContent = 'Plan My Journey';
          }, 1000);
      }, 1500);
  });
});
      document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('itineraryModal');
  const closeBtn = document.getElementById('closeItineraryModal');
  const form = document.getElementById('itineraryForm');
  const submitBtn = form.querySelector('.submit-button');

  // Close modal with slide animation
  function closeModal() {
      modal.querySelector('.modal-content').style.transform = 'translateX(100%)';
      setTimeout(() => {
          modal.classList.remove('active');
          modal.querySelector('.modal-content').style.transform = '';
          document.body.style.overflow = 'auto';
      }, 500);
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
      if (e.target === modal) {
          closeModal();
      }
  });

  // Handle form submission with loading animation
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Processing...';
      
      // Simulate form submission
      setTimeout(() => {
          const formData = {
              email: document.getElementById('itineraryEmail').value,
              travelDate: document.getElementById('itineraryDate').value,
              currency: document.getElementById('currencyPreference').value,
              bookingReference: document.getElementById('readOnlyField').value,
              numberOfDays: document.getElementById('numberOfDays').value
          };
          
          console.log('Itinerary Form submitted:', formData);
          
          submitBtn.textContent = 'Journey Planned!';
          setTimeout(() => {
              closeModal();
              form.reset();
              submitBtn.classList.remove('loading');
              submitBtn.textContent = 'Plan My Journey';
          }, 1000);
      }, 1500);
  });
});
      document.addEventListener('DOMContentLoaded', function() {
  const bookButtons = document.querySelectorAll('.obbs');
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('safariBookingForm');
  const submitBtn = form.querySelector('.submit-button');

  // Open modal with slide animation
  bookButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
      });
  });

  // Close modal with slide animation
  function closeModal() {
      modal.querySelector('.modal-content').style.transform = 'translateX(100%)';
      setTimeout(() => {
          modal.classList.remove('active');
          modal.querySelector('.modal-content').style.transform = '';
          document.body.style.overflow = 'auto';
      }, 500);
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
      if (e.target === modal) {
          closeModal();
      }
  });

  // Handle form submission with loading animation
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Booking...';
      
      // Simulate form submission (replace with actual submission)
      setTimeout(() => {
          const formData = {
              fullName: document.getElementById('fullName').value,
              email: document.getElementById('email').value,
              safariDate: document.getElementById('safariDate').value,
              safariTime: document.getElementById('safariTime').value
          };
          
          console.log('Form submitted:', formData);
          
          submitBtn.textContent = 'Success!';
          setTimeout(() => {
              closeModal();
              form.reset();
              submitBtn.classList.remove('loading');
              submitBtn.textContent = 'BOOK SAFARI';
          }, 1000);
      }, 1500);
  });
});
      document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const bookButtons = document.querySelectorAll('.obbs');
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('safariBookingForm');

  // Open modal
  bookButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
      });
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  });

  // Handle form submission
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          safariDate: document.getElementById('safariDate').value,
          safariTime: document.getElementById('safariTime').value
      };

      // Here you would typically send the data to your server
      console.log('Form submitted:', formData);
      
      // Close modal and reset form
      modal.classList.remove('active');
      form.reset();
      document.body.style.overflow = 'auto';
  });
});

      document.addEventListener('DOMContentLoaded', () => {
const bookButtons = document.querySelectorAll('.obbs');
const modal = document.getElementById('bookingModal');
const closeButton = modal.querySelector('.close-button');
const form = document.getElementById('safariForm');

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

const closeModal = () => {
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('active', 'closing');
    document.body.style.overflow = '';
  }, 300);
};

const openModal = (e) => {
  e.preventDefault();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

bookButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let isValid = true;
  form.querySelectorAll('input').forEach(input => {
    if (!input.value) {
      input.classList.add('error');
      isValid = false;
      setTimeout(() => input.classList.remove('error'), 500);
    }
  });

  if (isValid) {
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<div class="success-circle"></div>';
    submitBtn.style.width = '100px';
    submitBtn.style.borderRadius = '2spx';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitBtn.style.background = '#000';
    
    setTimeout(() => {
      closeModal();
      form.reset();
      // Reset button
      submitBtn.style = '';
      submitBtn.innerHTML = '<span>Book Safari</span><div class="success-circle"></div>';
    }, 1500);
  }
});

// Label animation
form.querySelectorAll('.form-group').forEach(group => {
  const input = group.querySelector('input');
  const label = group.querySelector('label');

  input.addEventListener('focus', () => {
    label.style.transform = 'translateY(-3px)';
    label.style.color = 'rgba(255, 255, 255, 0.9)';
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      label.style.transform = 'translateY(0)';
      label.style.color = '#000';
    }
  });
});
});
document.addEventListener('DOMContentLoaded', function() {
          const form = document.getElementById('travelForm');
          const formGroups = document.querySelectorAll('.form-group');

          // Add animation to form groups on scroll
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                  }
              });
          }, {
              threshold: 0.1
          });

          formGroups.forEach(group => {
              group.style.opacity = '0';
              group.style.transform = 'translateY(20px)';
              group.style.transition = 'all 0.5s ease';
              observer.observe(group);
          });

          // Form submission handling
          form.addEventListener('submit', async function(e) {
              e.preventDefault();

              const submitBtn = form.querySelector('.submit-btn');
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';

              try {
                  const formData = new FormData(form);
                  const response = await fetch(form.action, {
                      method: 'POST',
                      body: formData,
                      headers: {
                          'Accept': 'application/json'
                      }
                  });

                  if (response.ok) {
                      // Success message
                      alert('Thank you for your inquiry! We will contact you soon.');
                      form.reset();
                  } else {
                      throw new Error('Form submission failed');
                  }
              } catch (error) {
                  alert('Oops! There was a problem submitting your form. Please try again.');
              } finally {
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = 'Begin Your Journey <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
              }
          });
      });
  //Itenerary form 
  document.addEventListener('DOMContentLoaded', function() {
          // Set minimum date to today
          const dateInput = document.getElementById('travel-date');
          const today = new Date().toISOString().split('T')[0];
          dateInput.min = today;
          
          // Animate form submission
          const form = document.querySelector('form');
          form.addEventListener('submit', function(e) {
              e.preventDefault();
              const btn = this.querySelector('.submit-btn');
              btn.textContent = 'Submitting...';
              
              // Here you would typically handle the form submission
              // For demo purposes, we're just showing the animation
              setTimeout(() => {
                  this.submit();
              }, 1000);
          });
      });
  //trial
  const tourData = [
    {
      title: "Saver Package",
      image: "mara.jpg",
      days: "7 Days",
      people: " 1 person",
      price: "£850",
      link: "saver.html"
    },
    {
      title: "Standard Package",
      image: "giraffe.jpg",
      days: "7 days",
      people: "1 person",
      price: "£1,000",
      link: "standard.html"
    },
    {
      title: "Premium Package",
      image: "coast.jpg",
      days: "7 Days",
      people: "1 person",
      price: "£1,800",
      link: "premium.html"
    },
    {
      title: "Luxury Package",
      image: "ele.jpg",
      days: "7 Days",
      people: "1 person",
      price: "£2500",
      link: "luxury.html"
    },
    {
      title: "All Inclusive Family Package",
      image: "zeb.jpg",
      days: "9 Days",
      people: "4 people",
      price: "$3300",
      link: "family.html"
    }
  ];

  class InfiniteCarousel {
    constructor(container, data) {
      this.carousel = container.querySelector('.carousel');
      this.data = data;
      this.currentIndex = 0;
      this.isAnimating = false;
      this.autoScrollDelay = 3000;
      this.init();
    }

    createCard(data) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="image-overlay"></div>
        <div class="card-content">
          <h2 class="card-title">${data.title}</h2>
          <div class="card-info">
            <span class="info-item">📅 ${data.days}</span>
      <span class="info-item">💰 ${data.price}</span>
            <span class="info-item">👥 ${data.people}</span>
            
          </div>
          <a href="${data.link}" class="join-button">Explore Now →</a>
          <div class="progress-bar" style = 'color:red'></div>
        </div>
      `;
      return card;
    }

    init() {
      // Create initial cards
      this.data.forEach((item, index) => {
        const card = this.createCard(item);
        card.style.animationDelay = `${index * 0.1}s`;
        this.carousel.appendChild(card);
      });

      // Clone cards for infinite scroll
      const cardsToClone = Math.min(this.data.length, 3);
      for (let i = 0; i < cardsToClone; i++) {
        const clone = this.createCard(this.data[i]);
        this.carousel.appendChild(clone);
      }

      this.setupAutoScroll();
      this.setupEventListeners();
      this.updateProgressBars();
      this.updateActiveCards();
    }

    updateActiveCards() {
      const cards = this.carousel.querySelectorAll('.card');
      cards.forEach(card => card.classList.remove('active'));
      
      const visibleCards = this.getVisibleCards();
      visibleCards.forEach(card => card.classList.add('active'));
    }

    setupAutoScroll() {
      this.autoScrollInterval = setInterval(() => this.scroll(), this.autoScrollDelay);
    }

    setupEventListeners() {
      this.carousel.addEventListener('mouseenter', () => {
        clearInterval(this.autoScrollInterval);
      });

      this.carousel.addEventListener('mouseleave', () => {
        this.setupAutoScroll();
      });

      let touchStartX = 0;
      this.carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(this.autoScrollInterval);
      });

      this.carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.scroll();
          else this.scrollBack();
        }
        this.setupAutoScroll();
      });
    }

    updateProgressBars() {
      const progressBars = this.carousel.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        bar.style.width = '0%';
      });

      const visibleCards = this.getVisibleCards();
      visibleCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        progressBar.style.width = '100%';
        progressBar.style.transition = `width ${this.autoScrollDelay}ms linear`;
      });
    }

    getVisibleCards() {
      const cards = this.carousel.querySelectorAll('.card');
      const visibleCards = [];
      const viewportWidth = window.innerWidth;
      let cardsToShow = 3;
      
      if (viewportWidth <= 768) cardsToShow = 1;
      else if (viewportWidth <= 1200) cardsToShow = 2;

      for (let i = this.currentIndex; i < this.currentIndex + cardsToShow; i++) {
        if (cards[i]) visibleCards.push(cards[i]);
      }
      return visibleCards;
    }

    scroll() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const cards = this.carousel.querySelectorAll('.card');
      const cardWidth = cards[0].offsetWidth + 30; // Including gap
      this.currentIndex++;

      this.carousel.style.transform = `translateX(-${cardWidth * this.currentIndex}px)`;
      this.carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

      setTimeout(() => {
        if (this.currentIndex >= this.data.length) {
          this.currentIndex = 0;
          this.carousel.style.transition = 'none';
          this.carousel.style.transform = 'translateX(0)';
        }
        this.isAnimating = false;
        this.updateProgressBars();
      }, 800);
    }

    scrollBack() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const cards = this.carousel.querySelectorAll('.card');
      const cardWidth = cards[0].offsetWidth + 30;
      this.currentIndex--;

      if (this.currentIndex < 0) {
        this.currentIndex = this.data.length - 1;
        this.carousel.style.transition = 'none';
        this.carousel.style.transform = `translateX(-${cardWidth * this.data.length}px)`;
        setTimeout(() => {
          this.carousel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          this.carousel.style.transform = `translateX(-${cardWidth * this.currentIndex}px)`;
        }, 50);
      } else {
        this.carousel.style.transform = `translateX(-${cardWidth * this.currentIndex}px)`;
      }

      setTimeout(() => {
        this.isAnimating = false;
        this.updateProgressBars();
      }, 800);
    }
  }

  // Initialize the carousel
  const container = document.querySelector('.carousel-container');
  const carousel = new InfiniteCarousel(container, tourData);

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      carousel.updateProgressBars();
    }, 250);
  });
// NWRYUR
document.addEventListener('DOMContentLoaded', function() {
          const carousel = document.querySelector('.carrousel');
          const testimonials = document.querySelectorAll('.testimonial');
          const dots = document.querySelector('.navigation-dots');
          let currentIndex = 0;
          let isExpanded = false;
          let autoScrollInterval;

          // Create navigation dots
          testimonials.forEach((_, index) => {
              const dot = document.createElement('div');
              dot.classList.add('dot');
              dot.addEventListener('click', () => goToSlide(index));
              dots.appendChild(dot);
          });

          const allDots = document.querySelectorAll('.dot');

          // Initialize first slide and dot
          testimonials[0].classList.add('active');
          allDots[0].classList.add('active');

          // Set initial content heights and truncate text
          testimonials.forEach(testimonial => {
              const content = testimonial.querySelector('.testimonial-content');
              const text = testimonial.querySelector('.testimonial-text');
              content.style.maxHeight = '100px';
              testimonial.originalText = text.textContent;
              text.textContent = text.textContent.slice(0, 150) + '...';
          });

          // Handle Read More/Less buttons
          testimonials.forEach(testimonial => {
              const btn = testimonial.querySelector('.read-more-btn');
              const content = testimonial.querySelector('.testimonial-content');
              const text = testimonial.querySelector('.testimonial-text');

              btn.addEventListener('click', () => {
                  if (!isExpanded) {
                      stopAutoScroll();
                      content.style.maxHeight = '1000px';
                      text.textContent = testimonial.originalText;
                      btn.textContent = 'Read Less';
                      isExpanded = true;
                  } else {
                      content.style.maxHeight = '100px';
                      text.textContent = testimonial.originalText.slice(0, 150) + '...';
                      btn.textContent = 'Read More';
                      isExpanded = false;
                      startAutoScroll();
                  }
              });
          });

          function goToSlide(index) {
              testimonials[currentIndex].classList.remove('active');
              allDots[currentIndex].classList.remove('active');
              
              currentIndex = index;
              
              const offset = -currentIndex * 100;
              carousel.style.transform = `translateX(${offset}%)`;
              
              testimonials[currentIndex].classList.remove('sliding-in');
              void testimonials[currentIndex].offsetWidth; // Trigger reflow
              testimonials[currentIndex].classList.add('sliding-in', 'active');
              allDots[currentIndex].classList.add('active');
          }

          function nextSlide() {
              if (isExpanded) return;
              const nextIndex = (currentIndex + 1) % testimonials.length;
              goToSlide(nextIndex);
          }

          function startAutoScroll() {
              autoScrollInterval = setInterval(nextSlide, 3000);
          }

          function stopAutoScroll() {
              clearInterval(autoScrollInterval);
          }

          // Start auto-scrolling
          startAutoScroll();

          // Pause on hover
          carousel.addEventListener('mouseenter', stopAutoScroll);
          carousel.addEventListener('mouseleave', () => {
              if (!isExpanded) startAutoScroll();
          });
      });	
      const testimonialContainer = document.querySelector('.testimonial-container');
      const testimonials = document.querySelectorAll('.testimonial');
      let currentTestimonial = 0;
      let isExpanded = false;
      let autoScrollInterval;

      function showTestimonial(index) {
          testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
          testimonials.forEach((testimonial, i) => {
              testimonial.classList.toggle('active', i === index);
          });
      }

      function nextTestimonial() {
          if (!isExpanded) {
              currentTestimonial = (currentTestimonial + 1) % testimonials.length;
              showTestimonial(currentTestimonial);
          }
      }

      function startAutoScroll() {
          autoScrollInterval = setInterval(nextTestimonial, 5000);
      }

      function stopAutoScroll() {
          clearInterval(autoScrollInterval);
      }

      // Read More functionality
      document.querySelectorAll('.read-more').forEach(button => {
          button.addEventListener('click', () => {
              const content = button.previousElementSibling;
              content.classList.toggle('expanded');
              isExpanded = content.classList.contains('expanded');
              button.textContent = isExpanded ? 'Read Less' : 'Read More';
              
              if (isExpanded) {
                  stopAutoScroll();
              } else {
                  startAutoScroll();
              }
          });
      });

      // FAQ Functionality
      document.querySelectorAll('.faq-item').forEach(item => {
          item.addEventListener('click', () => {
              const wasActive = item.classList.contains('active');
              
              // Close all FAQ items
              document.querySelectorAll('.faq-item').forEach(otherItem => {
                  otherItem.classList.remove('active');
              });
              
              // Toggle clicked item
              if (!wasActive) {
                  item.classList.add('active');
              }
          });
      });

      // Start the carousel
      startAutoScroll();
      
      // Add scroll animation for team members
      const observerOptions = {
          threshold: 0.2,
          rootMargin: '0px'
      };

      const observerr = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.animation = 'fadeIn 0.5s forwards';
              }
          });
      }, observerOptions);

      document.querySelectorAll('.team-member').forEach(member => {
          observerr.observe(member);
      });

      // Add hover animation for team member images
      document.querySelectorAll('.team-member').forEach(member => {
          member.addEventListener('mouseenter', () => {
              member.querySelector('img').style.animation = 'float 3s ease-in-out infinite';
          });
          member.addEventListener('mouseleave', () => {
              member.querySelector('img').style.animation = 'none';
          });
      });	
      const swiper = new Swiper('.swiper', {
          loop: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          breakpoints: {
              320: {
                  slidesPerView: 1,
                  spaceBetween: 20
              },
              480: {
                  slidesPerView: 1.5,
                  spaceBetween: 30
              },
              640: {
                  slidesPerView: 2,
                  spaceBetween: 40
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 50
              }
          }
      });
      const animatedElements = document.querySelectorAll('.section-header h2, .section-header p, .step, .image-container, ');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        if(element.classList.contains('step')) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.classList.add('completed');
        } else {
          element.style.opacity = '1';
          element.style.transform = 'none';
        }
        
        // Special animation for image
        if(element.classList.contains('image-container')) {
          element.querySelector('img').style.animation = 'float 3s ease-in-out infinite';
        }
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(element => observer.observe(element));