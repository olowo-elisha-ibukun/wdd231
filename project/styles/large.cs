/* ===========================
   TABLET & DESKTOP LAYOUT
=========================== */

@media (min-width: 768px) {
    header {
        padding: 1.5rem 5%;
    }

    .header-container {
        width: 100%;
    }

    nav {
        display: block !important;
        position: static !important;
        width: auto;
        border: none;
    }

    nav ul {
        flex-direction: row;
        gap: 0;
    }

    nav li {
        border-bottom: none;
        border-right: 1px solid var(--border-color);
    }

    nav li:last-child {
        border-right: none;
    }

    nav a {
        display: inline-block;
        padding: 0.8rem 1.2rem;
        border: none;
        border-bottom: 3px solid transparent;
        transition: 0.3s;
    }

    nav a:hover,
    nav a.active {
        background: transparent;
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
        padding-left: 1.2rem;
    }

    .mobile-menu-toggle {
        display: none;
    }

    /* HERO SECTION */
    .hero {
        padding: 5rem 5%;
        margin: 2rem 5%;
        border-radius: 8px;
    }

    .hero h2 {
        font-size: 3rem;
    }

    /* FEATURED GRID */
    .featured {
        padding: 4rem 5%;
    }

    .cards {
        grid-template-columns: repeat(3, 1fr);
    }

    /* ABOUT PAGE */
    .about-container {
        max-width: 900px;
        margin: auto;
    }

    .about-section {
        text-align: left;
    }

    /* RESOURCES */
    .resources-container {
        max-width: 1000px;
    }

    .resource-card {
        padding: 2rem;
    }

    /* FOOTER */
    .footer-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1024px) {
    .cards {
        grid-template-columns: repeat(3, 1fr);
    }

    .hero h2 {
        font-size: 3.2rem;
    }
}

@media (min-width: 900px) {
    .hero {
        padding: 8rem 5%;
    }
}