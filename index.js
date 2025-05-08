        // Sticky Header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 50);
        });

        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Animate skill bars when in view
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const barWidth = bar.getAttribute('data-width');
                bar.style.width = barWidth + '%';
            });
        }

        // Add typewriter effect for hero
        const textElement = document.querySelector('#typewriter-text');
        const text = "Fachinformatiker für Anwendungsentwicklung";
        textElement.textContent = '';
        textElement.classList.add('visible');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }

        // Ersetze floating Animation mit einmaliger Reveal-Animation
        const projectsSection = document.querySelector('.projects');
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal-Animation der Projektkarten mit Verzögerung
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('reveal-card');
                        }, 150 * index); // Staffelung der Animationen
                    });
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Add shine effect to buttons on hover
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.classList.add('shimmer');
            });
            
            btn.addEventListener('mouseleave', function() {
                this.classList.remove('shimmer');
            });
        });

        // Intersection Observer for skill bars
        const skillsSection = document.querySelector('.skills');
        const experienceSection = document.querySelector('.experience');
        const projectCards = document.querySelectorAll('.project-card');
        const revealElements = document.querySelectorAll('.reveal');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill bars
                    skillBars.forEach(bar => {
                        const barWidth = bar.getAttribute('data-width');
                        bar.style.width = barWidth + '%';
                        
                        // Add shimmer animation to bars
                        setTimeout(() => {
                            bar.parentElement.classList.add('animated');
                        }, 500);
                    });
                    
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showTimelineItems();
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        // Animate timeline items when in view
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        function showTimelineItems() {
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 300 * index);
            });
        }

        // Reveal elements on scroll
        function reveal() {
            revealElements.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < heroSection.offsetHeight) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            }
        });

        // Initialize functions on page load
        window.addEventListener('DOMContentLoaded', () => {
            typeWriter();
            skillsObserver.observe(skillsSection);
            experienceObserver.observe(experienceSection);
            projectObserver.observe(projectsSection); // Projekt-Observer aktivieren
            
            // Observe all reveal elements
            revealElements.forEach(el => {
                revealObserver.observe(el);
            });
            
            // Add 'active' class to the first timeline item by default
            if (timelineItems.length > 0) {
                timelineItems[0].classList.add('visible');
            }
            
            // Create particles for hero section
            createParticles();
        });
        
        // Check for reveals on scroll
        window.addEventListener('scroll', reveal);
        
        // Add particle background (minimal version)
        const heroElement = document.querySelector('.hero');
        
        function createParticles() {
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                
                particle.style.position = 'absolute';
                particle.style.width = (Math.random() * 10 + 1) + 'px';
                particle.style.height = particle.style.width;
                
                // Use the updated color palette
                const colors = [
                    'rgba(66, 71, 105, 0.6)', // indigo
                    'rgba(45, 50, 80, 0.6)',  // navy
                    'rgba(255, 177, 122, 0.6)', // peach
                    'rgba(255, 255, 255, 0.3)', // white
                    'rgba(135, 143, 157, 0.4)'  // gray-blue
                ];
                
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 5 + 3}s linear infinite`;
                particle.style.opacity = Math.random() * 0.5;
                
                heroElement.appendChild(particle);
            }
        }
        
        // Initialisiere EmailJS
                (function() {
                    // EmailJS initialisieren mit deiner User ID
                    // HINWEIS: Ersetze 'YOUR_USER_ID' durch deine tatsächliche User ID von EmailJS
                    emailjs.init("T2m2PV4cSOEM6U2hm");
                })();

                // Handle contact form submission with EmailJS
                const contactForm = document.getElementById('contact-form');

                if (contactForm) {
                    contactForm.addEventListener('submit', function(e) {
                        e.preventDefault();

                        const formElements = this.elements;
                        const submitBtn = this.querySelector('button[type="submit"]');

                        // Button-Status aktualisieren
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Wird gesendet...';

                        // Sammle die Formulardaten
                        const formData = {
                            name: formElements.name ? formElements.name.value : '',
                            email: formElements.email ? formElements.email.value : '',
                            subject: formElements.subject ? formElements.subject.value : 'Kontaktanfrage von Portfolio',
                            message: formElements.message ? formElements.message.value : ''
                        };

                        // Parameter für EmailJS vorbereiten
                        const templateParams = {
                            from_name: formData.name,
                            from_email: formData.email,
                            subject: formData.subject,
                            message: formData.message
                        };

                        // E-Mail senden mit EmailJS
                        // HINWEIS: Ersetze 'YOUR_SERVICE_ID' und 'YOUR_TEMPLATE_ID' mit deinen IDs
                        emailjs.send('service_drwo4xn', 'template_1lnhe5h', templateParams)
                            .then(function(response) {
                                console.log('SUCCESS!', response.status, response.text);

                                // Formular zurücksetzen
                                for (let i = 0; i < formElements.length; i++) {
                                    if (formElements[i].type !== 'submit') {
                                        formElements[i].value = '';
                                    }
                                }

                                // Erfolgsanzeige
                                submitBtn.textContent = 'Gesendet!';
                                submitBtn.style.background = 'var(--accent)';

                                // Button nach 3 Sekunden zurücksetzen
                                setTimeout(() => {
                                    submitBtn.disabled = false;
                                    submitBtn.textContent = 'Nachricht senden';
                                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                                }, 3000);
                            })
                            .catch(function(error) {
                                console.log('FAILED...', error);

                                // Fehleranzeige
                                submitBtn.textContent = 'Fehler beim Senden!';
                                submitBtn.style.background = '#e74c3c'; // Rot als Fehlerfarbe

                                // Button nach 3 Sekunden zurücksetzen
                                setTimeout(() => {
                                    submitBtn.disabled = false;
                                    submitBtn.textContent = 'Nachricht senden';
                                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                                }, 3000);
                            });
                    });
                }

        // Update copyright year dynamically
        document.querySelector('.copyright p').textContent = `© ${new Date().getFullYear()} Robin Frank - Alle Rechte vorbehalten`;
