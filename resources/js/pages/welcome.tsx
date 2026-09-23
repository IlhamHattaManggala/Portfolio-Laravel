import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import GallerySection from "@/components/sections/GallerySection";
import PackagesSection from "@/components/sections/PackagesSection";
import GithubSection from "@/components/sections/GithubSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Preloader from "@/components/Preloader";
import ResumeModal from "@/components/ResumeModal";
import { Head } from '@inertiajs/react';
import { TProject, TTechnology, TExperience, TCertificate, TPackage, TTestimonial, TArticle, TGithubStats } from "@/types";

interface WelcomeProps {
    data: {
        projects: TProject[];
        skills: TTechnology[];
        experiences: TExperience[];
        certificates: TCertificate[];
        packages?: TPackage[];
        githubStats?: TGithubStats;
        testimonials: TTestimonial[];
        blogs: TArticle[];
        resumePath: string;
        contactEmail: string;
        location: string;
        githubUrl?: string;
        linkedinUrl?: string;
        instagramUrl?: string;
        seo?: {
            title?: string;
            description?: string;
            keywords?: string;
            author?: string;
            ogImage?: string | null;
        };
    };
}

export default function Welcome({ data }: WelcomeProps) {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ilhamhatta.my.id';
    const canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://ilhamhatta.my.id';
    
    const seoTitle = data.seo?.title || "Ilham Hatta Manggala | Portofolio & Personal Website";
    const seoDescription = data.seo?.description || "Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru.";
    const seoKeywords = data.seo?.keywords || "Ilham Hatta Manggala, IHM, Portofolio Ilham Hatta Manggala, Full Stack Developer, Flutter Developer, Laravel Developer, Web Developer, Mobile Developer, Indonesia";
    const seoAuthor = data.seo?.author || "Ilham Hatta Manggala";
    const ogImageUrl = data.seo?.ogImage 
        ? (data.seo.ogImage.startsWith('http') ? data.seo.ogImage : `${siteUrl}${data.seo.ogImage}`) 
        : `${siteUrl}/images/profile.webp`;

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": seoAuthor,
        "url": siteUrl,
        "image": ogImageUrl,
        "jobTitle": "Full Stack Web & Mobile Developer",
        "sameAs": [
            data.githubUrl || "https://github.com/IlhamHattaManggala",
            data.linkedinUrl || "https://www.linkedin.com/in/ilham-hatta-manggala",
            data.instagramUrl || "https://www.instagram.com/runtahhhh__/"
        ],
        "knowsAbout": ["Laravel", "React", "TypeScript", "Flutter", "PHP", "Dart", "Tailwind CSS", "Web Development"]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ilham Hatta Manggala Portfolio",
        "url": siteUrl,
        "author": {
            "@type": "Person",
            "name": seoAuthor
        }
    };

    return (
        <>
            <Head title={seoTitle}>
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={seoKeywords} />
                <meta name="author" content={seoAuthor} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={ogImageUrl} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                {/* JSON-LD Schema Markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </Head>
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100">
                <Preloader />
                <Navbar 
                    resumePath={data.resumePath} 
                    onOpenResume={() => setIsResumeOpen(true)} 
                />

                <main className="flex-grow">
                    <HeroSection githubUrl={data.githubUrl} linkedinUrl={data.linkedinUrl} />
                    <AboutSection technologies={data.skills} projects={data.projects} />

                    {data.experiences && data.experiences.length > 0 && (
                        <ExperienceSection experiences={data.experiences} />
                    )}
                    
                    <ProjectSection projects={data.projects} />
                    
                    {data.certificates && data.certificates.length > 0 && (
                        <GallerySection certificates={data.certificates} />
                    )}

                    <PackagesSection packages={data.packages} />

                    <GithubSection stats={data.githubStats} />
                    
                    {data.testimonials && (
                        <TestimonialsSection testimonials={data.testimonials} />
                    )}
                    
                    {data.blogs && data.blogs.length > 0 && (
                        <BlogSection blogs={data.blogs} />
                    )}
                    
                    <ContactSection contactEmail={data.contactEmail} location={data.location} />
                </main>
                <Footer githubUrl={data.githubUrl} linkedinUrl={data.linkedinUrl} instagramUrl={data.instagramUrl} />
                
                <ResumeModal 
                    isOpen={isResumeOpen}
                    onClose={() => setIsResumeOpen(false)}
                    resumePath={data.resumePath}
                />
            </div>
        </>
    );
}
