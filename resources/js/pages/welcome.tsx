import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Preloader from "@/components/Preloader";
import { Head } from '@inertiajs/react';
import { TProject, TTechnology, TExperience, TCertificate, TTestimonial, TArticle } from "@/types";

interface WelcomeProps {
    data: {
        projects: TProject[];
        skills: TTechnology[];
        experiences: TExperience[];
        certificates: TCertificate[];
        testimonials: TTestimonial[];
        blogs: TArticle[];
        resumePath: string;
        contactEmail: string;
        location: string;
    };
}

export default function Welcome({ data }: WelcomeProps) {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ilhamhatta.my.id';
    const canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://ilhamhatta.my.id';
    const profileImageUrl = `${siteUrl}/images/profile.webp`;

    return (
        <>
            <Head title="Ilham Hatta Manggala | Portofolio & Personal Website">
                <meta name="description" content="Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru." />
                <meta name="keywords" content="Ilham Hatta Manggala, IHM, Portofolio Ilham Hatta Manggala, Full Stack Developer, Flutter Developer, Laravel Developer, Web Developer, Mobile Developer, Indonesia" />
                <meta name="author" content="Ilham Hatta Manggala" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content="Ilham Hatta Manggala | Portofolio & Personal Website" />
                <meta property="og:description" content="Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru." />
                <meta property="og:image" content={profileImageUrl} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content="Ilham Hatta Manggala | Portofolio & Personal Website" />
                <meta name="twitter:description" content="Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru." />
                <meta name="twitter:image" content={profileImageUrl} />
            </Head>
            <div className="flex flex-col min-h-screen">
                <Preloader />
                <Navbar resumePath={data.resumePath} />

                <main className="flex-grow">
                    <HeroSection />
                    <AboutSection technologies={data.skills} projects={data.projects} />

                    {data.experiences && data.experiences.length > 0 && (
                        <ExperienceSection experiences={data.experiences} />
                    )}
                    
                    <ProjectSection projects={data.projects} />
                    
                    {data.certificates && data.certificates.length > 0 && (
                        <GallerySection certificates={data.certificates} />
                    )}
                    
                    {data.testimonials && (
                        <TestimonialsSection testimonials={data.testimonials} />
                    )}
                    
                    {data.blogs && data.blogs.length > 0 && (
                        <BlogSection blogs={data.blogs} />
                    )}
                    
                    <ContactSection contactEmail={data.contactEmail} location={data.location} />
                </main>
                <Footer />
                
            </div>
        </>
    );
}
