// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    // Open menu
    hamburgerMenu.addEventListener('click', function() {
        slideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu
    function closeMenu() {
        slideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.slide-menu-links a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-widget');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects with animation
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            }, index * 50);
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
function initAnimations() {
    const elementsToAnimate = document.querySelectorAll('.kpi-card, .project-widget, .skill-widget, .contact-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations on page load
window.addEventListener('load', function() {
    initAnimations();
});

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalBody = document.getElementById('modalBody');

// Project data with detailed information
const projectData = {
    'world-life-expectancy': {
        title: 'World Life Expectancy Analysis',
        subtitle: 'Global Health Data Analysis',
        content: `
            <div class="modal-section">
                <h3>Project Overview</h3>
                <p>This project analyzes global life expectancy data spanning 15 years (2000-2015) across 193 countries. The analysis explores the relationships between life expectancy and various socioeconomic and health factors including GDP, BMI, immunization rates, mortality rates, and disease prevalence.</p>
            </div>
            
            <div class="modal-metrics">
                <div class="modal-metric">
                    <div class="modal-metric-value">193</div>
                    <div class="modal-metric-label">Countries Analyzed</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">2,941</div>
                    <div class="modal-metric-label">Data Records</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">15 Years</div>
                    <div class="modal-metric-label">Time Period</div>
                </div>
            </div>

            <div class="modal-section">
                <h3>Key Findings</h3>
                <ul>
                    <li><strong>Development Gap:</strong> Discovered a significant 13-year life expectancy gap between developed and developing nations</li>
                    <li><strong>Trend Analysis:</strong> Identified positive correlation between GDP and life expectancy across all income levels</li>
                    <li><strong>Health Indicators:</strong> Found strong relationships between immunization rates and improved life expectancy outcomes</li>
                    <li><strong>Regional Disparities:</strong> Analyzed geographic patterns showing higher life expectancy in Western Europe and East Asia</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Technical Approach</h3>
                <ul>
                    <li>Data cleaning and validation using MySQL to handle missing values and duplicates</li>
                    <li>Window functions (ROW_NUMBER, PARTITION BY) for ranking countries by life expectancy</li>
                    <li>Complex JOINs to merge multiple data tables for comprehensive analysis</li>
                    <li>Aggregate functions to calculate averages and trends over time periods</li>
                    <li>Statistical analysis to identify correlations between socioeconomic factors</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Tools & Technologies</h3>
                <div class="tech-stack">
                    <span class="tech-badge">MySQL</span>
                    <span class="tech-badge">Data Cleaning</span>
                    <span class="tech-badge">Window Functions</span>
                    <span class="tech-badge">Statistical Analysis</span>
                    <span class="tech-badge">Data Validation</span>
                </div>
            </div>

            <div class="modal-section">
                <h3>View on GitHub</h3>
                <a href="https://github.com/lukele1/Data--Analytics-Portfolio/tree/main/world-life-expectancy-project" class="action-btn primary" target="_blank" style="display: inline-block; text-decoration: none; margin-top: 0.5rem;">Visit Project Repository →</a>
            </div>
        `
    },
    'us-household-income': {
        title: 'US Household Income Analysis',
        subtitle: 'Geographic & Economic Patterns',
        content: `
            <div class="modal-section">
                <h3>Project Overview</h3>
                <p>Comprehensive exploratory data analysis of US Census data examining household income patterns across all 50 states, thousands of counties, and various community types. The analysis reveals substantial income disparities based on geographic location, urbanization level, and regional characteristics.</p>
            </div>
            
            <div class="modal-metrics">
                <div class="modal-metric">
                    <div class="modal-metric-value">32,000+</div>
                    <div class="modal-metric-label">Records Analyzed</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">50</div>
                    <div class="modal-metric-label">States Covered</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">3,000+</div>
                    <div class="modal-metric-label">Counties</div>
                </div>
            </div>

            <div class="modal-section">
                <h3>Key Findings</h3>
                <ul>
                    <li><strong>Urban-Rural Divide:</strong> Identified substantial income gaps between metropolitan and rural areas, with urban centers showing 40% higher median incomes</li>
                    <li><strong>Coastal vs. Inland:</strong> Revealed significant coastal-inland income disparities, particularly in Northeast and West Coast regions</li>
                    <li><strong>State Rankings:</strong> Maryland, New Jersey, and Massachusetts ranked highest in median household income</li>
                    <li><strong>Community Type Impact:</strong> CDP (Census Designated Place) areas showed distinct income patterns compared to incorporated cities</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Technical Approach</h3>
                <ul>
                    <li>Extensive data cleaning to standardize geographic naming conventions and handle NULL values</li>
                    <li>Advanced GROUP BY operations with multiple dimensions (state, county, type)</li>
                    <li>Aggregate functions (AVG, MEDIAN, MIN, MAX) to analyze income distributions</li>
                    <li>Geographic analysis using area and land size calculations</li>
                    <li>Comparative analysis across different community classification types</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Tools & Technologies</h3>
                <div class="tech-stack">
                    <span class="tech-badge">MySQL</span>
                    <span class="tech-badge">Data Cleaning</span>
                    <span class="tech-badge">Aggregate Functions</span>
                    <span class="tech-badge">Geographic Analysis</span>
                    <span class="tech-badge">Exploratory Data Analysis</span>
                </div>
            </div>

            <div class="modal-section">
                <h3>View on GitHub</h3>
                <a href="https://github.com/lukele1/Data--Analytics-Portfolio/tree/main/US-Household-Income-Analysis" class="action-btn primary" target="_blank" style="display: inline-block; text-decoration: none; margin-top: 0.5rem;">Visit Project Repository →</a>
            </div>
        `
    },
    'hr-analytics': {
        title: 'HR Analytics Dashboard',
        subtitle: 'Employee Attrition Analysis',
        content: `
            <div class="modal-section">
                <h3>Project Overview</h3>
                <p>Interactive Power BI dashboard analyzing employee attrition patterns across a fictional company with 1,470 employees. The dashboard provides actionable insights into turnover drivers across demographics, departments, job roles, and compensation levels to support HR decision-making.</p>
            </div>
            
            <div class="modal-metrics">
                <div class="modal-metric">
                    <div class="modal-metric-value">1,470</div>
                    <div class="modal-metric-label">Employees</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">16.1%</div>
                    <div class="modal-metric-label">Attrition Rate</div>
                </div>
                <div class="modal-metric">
                    <div class="modal-metric-value">238</div>
                    <div class="modal-metric-label">Employees Departed</div>
                </div>
            </div>

            <div class="modal-section">
                <h3>Key Findings</h3>
                <ul>
                    <li><strong>Salary Impact:</strong> Employees earning below $5K/month showed 3x higher attrition rates than higher earners</li>
                    <li><strong>Tenure Risk:</strong> First-year employees exhibited highest attrition (25%), highlighting onboarding importance</li>
                    <li><strong>Department Patterns:</strong> Sales and HR departments showed elevated turnover compared to R&D</li>
                    <li><strong>Age Demographics:</strong> Younger employees (18-35) demonstrated higher propensity to leave</li>
                    <li><strong>Distance Factor:</strong> Employees living farther from workplace showed increased attrition likelihood</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Dashboard Features</h3>
                <ul>
                    <li>Interactive filters for department, job role, education level, and demographics</li>
                    <li>KPI cards displaying total employees, active workforce, attrition rate, and average age</li>
                    <li>Attrition breakdown by salary bands, years at company, and age groups</li>
                    <li>Department-wise attrition analysis with visual comparisons</li>
                    <li>Job satisfaction correlation analysis with turnover rates</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Technical Approach</h3>
                <ul>
                    <li>DAX measures for calculating attrition rates, percentages, and aggregations</li>
                    <li>Power Query transformations for data cleaning and categorization</li>
                    <li>Data modeling with relationships between employee, department, and demographic tables</li>
                    <li>Advanced visualizations including treemaps, stacked columns, and conditional formatting</li>
                    <li>Dynamic filtering system for interactive exploration</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Tools & Technologies</h3>
                <div class="tech-stack">
                    <span class="tech-badge">Power BI</span>
                    <span class="tech-badge">DAX</span>
                    <span class="tech-badge">Power Query</span>
                    <span class="tech-badge">HR Analytics</span>
                    <span class="tech-badge">Data Visualization</span>
                </div>
            </div>

            <div class="modal-section">
                <h3>View on GitHub</h3>
                <a href="https://github.com/lukele1/Data--Analytics-Portfolio/tree/main/power-bi-hr-analytics" class="action-btn primary" target="_blank" style="display: inline-block; text-decoration: none; margin-top: 0.5rem;">Visit Project Repository →</a>
            </div>
        `
    }
};

// View Details button click handlers
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            modalTitle.textContent = project.title;
            modalSubtitle.textContent = project.subtitle;
            modalBody.innerHTML = project.content;
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', function() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});