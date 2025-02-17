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