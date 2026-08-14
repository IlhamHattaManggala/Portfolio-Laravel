<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->truncate();
        DB::table('skills')->truncate();
        DB::table('experiences')->truncate();
        DB::table('certificates')->truncate();
        DB::table('testimonials')->truncate();
        DB::table('blogs')->truncate();
        DB::table('settings')->truncate();
        // Settings
        \App\Models\Setting::updateOrCreate(['key' => 'resume_path', 'value' => '/CV - ILHAM HATTA MANGGALA.pdf']);

        // Projects
        $projects = [
            [
                'name' => 'Nightmare Hunter',
                'descriptions' => 'Game horor yang dibangun menggunakan Unity dan C#.',
                'tipe' => 'Game',
                'library' => ['Unity', 'C#'],
                'image' => '/assets/projects/Nightmare Hunter.webp',
                'link' => 'https://github.com/IlhamHattaManggala/Nighmare-Hunter',
                'video' => 'https://drive.google.com/file/d/1X8oeXUTnLxzvLkFlVfwlgetE8kveJRhu/view?usp=sharing',
            ],
            [
                'name' => 'Website Portofolio',
                'descriptions' => 'Website portofolio pribadi yang menampilkan informasi.',
                'tipe' => 'Website',
                'library' => ['HTML', 'CSS', 'JavaScript'],
                'image' => '/assets/projects/PortoLama.png',
                'link' => 'https://github.com/IlhamHattaManggala/portofolio-netlify',
                'video' => null,
            ],
            [
                'name' => 'FoodPlan Web AI',
                'descriptions' => 'Aplikasi berbasis web untuk merencanakan menu makanan bergizi dengan dukungan AI.',
                'tipe' => 'Website',
                'library' => ['Flask', 'Python', 'Tensorflow', 'Bootstrap', 'MySQL'],
                'image' => '/assets/projects/FoodPlan-Web.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'FoodPlan Mobile AI',
                'descriptions' => 'Versi mobile dari FoodPlan yang dibuat menggunakan Flutter.',
                'tipe' => 'Mobile',
                'library' => ['Flutter', 'Dart', 'Firebase', 'API'],
                'image' => '/assets/projects/FoodPlan-Mobile.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'Monitoring Belajar Tari',
                'descriptions' => 'Aplikasi edukasi budaya Jawa yang dibangun menggunakan Flutter.',
                'tipe' => 'Mobile',
                'library' => ['Flutter', 'Dart', 'GetX Patern', 'Firebase'],
                'image' => '/assets/projects/SenjaMobile.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'Rekomendasi Karakter Genshin',
                'descriptions' => 'Sistem rekomendasi karakter game menggunakan metode TOPSIS dan SAW.',
                'tipe' => 'Website',
                'library' => ['Laravel', 'PHP', 'Bootstrap', 'TOPSIS', 'SAW'],
                'image' => '/assets/projects/IhGamers!.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'Chatbot Obrolan Jawa',
                'descriptions' => 'Sebuah chatbot edukatif tentang kebudayaan dan kesenian Jawa.',
                'tipe' => 'Website',
                'library' => ['HTML', 'CSS', 'Bootstrap', 'Tensorflow'],
                'image' => '/assets/projects/ChattbotJawa.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'Sistem Reservasi Café',
                'descriptions' => 'Sistem reservasi café berbasis web interaktif.',
                'tipe' => 'Website',
                'library' => ['Laravel', 'PHP', 'React', 'Tailwind'],
                'image' => '/assets/projects/Caffeku.png',
                'link' => null,
                'video' => null,
            ],
            [
                'name' => 'Sample Company',
                'descriptions' => 'Website yang menampilkan informasi perusahaan, layanan, dan kontak.',
                'tipe' => 'Website',
                'library' => ['React', 'Tailwind'],
                'image' => '/assets/projects/Sample-Company.png',
                'link' => 'https://company-sample.vercel.app/',
                'video' => null,
            ],
            [
                'name' => 'Sample School Profile',
                'descriptions' => 'Website yang menampilkan informasi sekolah, layanan, dan kontak.',
                'tipe' => 'Website',
                'library' => ['React', 'Tailwind'],
                'image' => '/assets/projects/SampleSchoolProfile.png',
                'link' => 'https://school-profile-delta.vercel.app/',
                'video' => null,
            ],
        ];

        foreach ($projects as $project) {
            \App\Models\Project::updateOrCreate($project);
        }

        // Skills
        $skills = [
            ['name' => 'HTML 5', 'icon' => '/assets/skills/html.png'],
            ['name' => 'CSS 3', 'icon' => '/assets/skills/css.png'],
            ['name' => 'TypeScript', 'icon' => '/assets/skills/typescript.png'],
            ['name' => 'React JS', 'icon' => '/assets/skills/reactjs.png'],
            ['name' => 'Tailwind CSS', 'icon' => '/assets/skills/tailwind.png'],
            ['name' => 'Node JS', 'icon' => '/assets/skills/nodejs.png'],
            ['name' => 'MongoDB', 'icon' => '/assets/skills/mongodb.png'],
            ['name' => 'Git', 'icon' => '/assets/skills/git.png'],
            ['name' => 'Figma', 'icon' => '/assets/skills/figma.png'],
            ['name' => 'Flask', 'icon' => '/assets/skills/flask.png'],
            ['name' => 'Flutter', 'icon' => '/assets/skills/Flutter.png'],
            ['name' => 'MySQL', 'icon' => '/assets/skills/mysql.png'],
            ['name' => 'Python', 'icon' => '/assets/skills/python.png'],
            ['name' => 'PHP', 'icon' => '/assets/skills/php.png'],
            ['name' => 'Dart', 'icon' => '/assets/skills/dart.png'],
            ['name' => 'Unity', 'icon' => '/assets/skills/Unity.png'],
        ];

        foreach ($skills as $skill) {
            \App\Models\Skill::updateOrCreate($skill);
        }

        // Experiences
        $experiences = [
            [
                'title' => 'Divisi Kewirausahaan',
                'company_name' => 'Himpunan Mahasiswa Prodi Teknik Informatika',
                'icon' => '/assets/skills/github.png',
                'icon_bg' => '#E6DEDD',
                'date_range' => 'Jan 2023 - Jan 2024',
                'points' => ['Mengelola dan mengembangkan program kewirausahaan bagi anggota himpunan.', 'Mengelola keuangan bisnis dan melaporkan serta menyiapkan laporan keuangan sederhana.'],
            ],
            [
                'title' => 'Programmer Intern',
                'company_name' => 'IT Solution Yogyakarta',
                'icon' => '/assets/skills/reactjs.png',
                'icon_bg' => '#383E56',
                'date_range' => 'Agu 2025 - Nov 2025',
                'points' => ['Mengembangkan berbagai fitur web & mobile (CRUD, autentikasi, notifikasi, dashboard, UI/UX).', 'Merancang struktur database dan menyesuaikan alur aplikasi sesuai kebutuhan sistem.', 'Mengembangkan dan mengintegrasikan API untuk proses login, reset password, program, dan laporan.', 'Melakukan debugging, perbaikan bug, serta pengujian fungsional aplikasi.'],
            ],
        ];

        foreach ($experiences as $experience) {
            \App\Models\Experience::updateOrCreate($experience);
        }

        // Certificates
        $certificates = [
            ['title' => 'Juara 2 Software Development', 'issuer' => 'CODE 5.0', 'image' => '/assets/portfolio/Lomba/E Sertifikat Ilham Hatta Manggala -1.jpg', 'date_issued' => '2024'],
            ['title' => 'Programmer Internship', 'issuer' => 'IT Solution Yogyakarta', 'image' => '/assets/portfolio/Magang/Sertif IT.jpg', 'date_issued' => '2025'],
            ['title' => 'Belajar Dasar Pemograman Web', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Belajar Dasar Pemograman Web.png', 'date_issued' => '2024'],
            ['title' => 'Belajar Pemograman Dart', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Pemograman Dart.png', 'date_issued' => '2024'],
            ['title' => 'Belajar Dasar Manajement Proyek', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Belajar Dasar Manajement Proyek.png', 'date_issued' => '2024'],
            ['title' => 'Belajar Prinsip Pemograman SOLID', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Belajar Prinsip Pemograman SOLID.png', 'date_issued' => '2024'],
            ['title' => 'Memulai Pemograman Dengan C', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Memulai Pemograman Dengan C.png', 'date_issued' => '2024'],
            ['title' => 'Memulai Pemograman Dengan Java', 'issuer' => 'Dicoding', 'image' => '/assets/portfolio/Dicoding/Memulai Pemograman Dengan Java.png', 'date_issued' => '2024'],
            ['title' => 'Program Ormawa Membangun Negeri', 'issuer' => 'Kemendikbud', 'image' => '/assets/portfolio/POMN/POMN1.png', 'date_issued' => '2024'],
            ['title' => 'AI Basics', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/AI-Basics.png', 'date_issued' => '2024'],
            ['title' => 'Computer Network (CRA Training)', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/CN-CRA-Training-Program.png', 'date_issued' => '2024'],
            ['title' => 'Computer Network V1.0', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/CRA - Training-Program.png', 'date_issued' => '2024'],
            ['title' => 'AI Basics: Overview', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/Computer-Network.png', 'date_issued' => '2024'],
            ['title' => 'HCIA Datacom V1.0 Course', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/HCIA - Datacom.png', 'date_issued' => '2024'],
            ['title' => 'Python Programming Basics', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/Python-Programing-Basic.png', 'date_issued' => '2024'],
            ['title' => 'Search and AI', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/Search-and-AI.png', 'date_issued' => '2024'],
            ['title' => 'Search and AI (French)', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/Search-and-AI(French).png', 'date_issued' => '2024'],
            ['title' => 'HCIA Security V4.0 Course', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/HCIA-Security-V4.0-Course.png', 'date_issued' => '2024'],
            ['title' => 'NoSQL Big Data Management', 'issuer' => 'Huawei', 'image' => '/assets/portfolio/Huawei/The Basics of NoSQL and NewSQL Big Data Management Mechanism.png', 'date_issued' => '2024'],
            ['title' => 'Full Stack Web Development Bootcamp', 'issuer' => 'Udemy', 'image' => '/assets/portfolio/Udemy/Full Stack Web Development Bootcamp.jpg', 'date_issued' => '2024'],
            ['title' => 'Master Web Mobile Design Figma UI UX Essentials', 'issuer' => 'Udemy', 'image' => '/assets/portfolio/Udemy/Master Web Mobile Design Figma UI UX Essentials.jpg', 'date_issued' => '2024'],
            ['title' => 'Selenium Web Driver Java Basic', 'issuer' => 'Udemy', 'image' => '/assets/portfolio/Udemy/Sertifikat Udemy WebDriver.jpg', 'date_issued' => '2024'],
            ['title' => 'Selenium Python (Basic+Advance)', 'issuer' => 'Udemy', 'image' => '/assets/portfolio/Udemy/Sertifikat Udemy.jpg', 'date_issued' => '2024'],
            ['title' => 'Full PHP CRASH Course', 'issuer' => 'Udemy', 'image' => '/assets/portfolio/Udemy/Full PHP CRASH Course.jpg', 'date_issued' => '2024'],
        ];

        foreach ($certificates as $certificate) {
            \App\Models\Certificate::updateOrCreate($certificate);
        }

        // Testimonials
        $testimonials = [
            ['testimonial' => 'Komunikasi yang baik dan penyelesaian masalah yang cepat.', 'name' => 'Siti Rahmawati', 'designation' => 'Product Manager', 'company' => 'Freelance', 'image' => '/assets/my-profile.png'],
            ['testimonial' => 'Project selesai tepat waktu dengan kualitas code yang rapi.', 'name' => 'Ahmad Rizki', 'designation' => 'Project Manager', 'company' => 'IT Solution', 'image' => '/assets/my-profile.png'],
        ];

        foreach ($testimonials as $testimonial) {
            \App\Models\Testimonial::updateOrCreate($testimonial);
        }

        // Blogs
        $blogs = [
            [
                'title' => 'Memahami Dasar-Dasar React Hooks',
                'slug' => 'memahami-dasar-dasar-react-hooks',
                'excerpt' => 'Panduan lengkap untuk pemula memahami React Hooks.',
                'content' => '# Memahami Dasar-Dasar React Hooks\n\nReact Hooks adalah fitur baru di React 16.8...',
                'featured_image' => '/assets/blogs/react-header.png',
                'meta_title' => 'React Hooks',
                'meta_description' => 'Belajar React Hooks',
                'meta_keywords' => 'react, hooks',
                'is_published' => true,
                'published_at' => '2024-01-15 00:00:00',
            ],
            [
                'title' => 'Tutorial Tailwind CSS',
                'slug' => 'tutorial-tailwind-css-untuk-pemula',
                'excerpt' => 'Cara cepat membangun UI dengan Tailwind CSS.',
                'content' => '# Tutorial Tailwind CSS\n\nTailwind CSS adalah framework CSS utility-first...',
                'featured_image' => '/assets/blogs/tailwind-header.png',
                'meta_title' => 'Tailwind CSS',
                'meta_description' => 'Belajar Tailwind',
                'meta_keywords' => 'tailwind, css',
                'is_published' => true,
                'published_at' => '2024-02-01 00:00:00',
            ],
            [
                'title' => 'Mengapa TypeScript Penting',
                'slug' => 'mengapa-typescript-penting',
                'excerpt' => 'Manfaat TypeScript untuk pengembangan skala besar.',
                'content' => '# Mengapa TypeScript Penting?\n\nTypeScript menambahkan static typing ke JS...',
                'featured_image' => '/assets/blogs/typescript-header.png',
                'meta_title' => 'TypeScript',
                'meta_description' => 'Belajar TS',
                'meta_keywords' => 'typescript',
                'is_published' => true,
                'published_at' => '2024-03-10 00:00:00',
            ],
            [
                'title' => 'Juara 2 Software Development',
                'slug' => 'pengalaman-meraih-juara-2-software-development',
                'excerpt' => 'Kisah meriah Juara 2 di CODE 5.0 Competition.',
                'content' => 'Pada bulan Agustus lalu saya meraih Juara 2 Software Development...',
                'featured_image' => '/assets/blogs/juara2softdev.png',
                'meta_title' => 'Juara 2 SoftDev',
                'meta_description' => 'Lomba IT',
                'meta_keywords' => 'lomba, juara',
                'is_published' => true,
                'published_at' => '2025-12-30 00:00:00',
            ],
            [
                'title' => 'Pengalaman Magang di IT Solution',
                'slug' => 'pengalaman-magang-di-it-solution',
                'excerpt' => 'Pelajaran berharga tentang dunia kerja di IT Solution.',
                'content' => 'Salah satu momen paling membanggakan adalah saat angkatan magang kami terpilih menjadi yang terbaik...',
                'featured_image' => '/assets/blogs/magangIT.jpg',
                'meta_title' => 'Magang IT',
                'meta_description' => 'Internship',
                'meta_keywords' => 'magang, internship',
                'is_published' => true,
                'published_at' => '2025-12-30 00:00:00',
            ],
        ];

        foreach ($blogs as $blog) {
            \App\Models\Blog::updateOrCreate($blog);
        }

        // Admin User
        \App\Models\User::updateOrCreate(
            [
                'email' => 'ilhamhattamanggala123@gmail.com',
            ],
            [
                'name' => 'Ilham Hatta Manggala',
                'password' => Hash::make('password'),
            ]
        );
    }
}
