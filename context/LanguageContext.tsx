'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageCode = 'id' | 'en' | 'ja' | 'ko' | 'zh';

interface Translations {
    shared: {
        sowan: string;
        explore: string;
        schedule: string;
        login: string;
        register: string;
        logout: string;
        hello: string;
        back: string;
        city: string;
        language: string;
        online: string;
        offline: string;
        welcomeModal: string;
        loginDesc: string;
        nameLabel: string;
        namePlaceholder: string;
        viewProfile: string;
        demoLabel: string;
    };
    home: {
        sparkle: string;
        headline1: string;
        headline2: string;
        headline3: string;
        welcome: string;
        welcomeHome: string;
        pagi: string;
        siang: string;
        sore: string;
        malam: string;
        desc: string;
        findBtn: string;
        scheduleBtn: string;
        friendsJoined: string;
        trustSignal: string;
        sessions: string;
        bottomQuote: string;
        maestroTitle: string;
        maestroDesc: string;
        viewProfile: string;
        seeAll: string;
        aboutTitle: string;
        aboutDesc: string;
        badgeSecure: string;
        badgeCurated: string;
        statsUsers: string;
        statsMaestros: string;
        statsLanguages: string;
        testimonialsTitle: string;
        testimonialsDesc: string;
        aboutExclusives: string;
        aboutExclusivesDesc: string;
        aboutFlexible: string;
        aboutFlexibleDesc: string;
        aboutImpact: string;
        aboutImpactDesc: string;
        trustLanguages: string;
        trustLanguagesSub: string;
        trustCurated: string;
        trustCuratedSub: string;
        trustEscrow: string;
        trustEscrowSub: string;
        slotsAvailable: string;
        sourceUnsplash: string;
        timezone: string;
        tryDemo?: string;
    };
    explore: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        filterLocation: string;
        filterLang: string;
        reset: string;
        bookBtn: string;
        allCities: string;
        allLangs: string;
        noResultsTitle: string;
        noResultsDesc: string;
        slotsAvailable: string;
        badgeTopRated: string;
        badgeCulturalExpert: string;
        badgeNew: string;
    };
    mentor: {
        exp: string;
        interests: string;
        about: string;
        bookingTitle: string;
        bookingSubtitle: string;
        bookingDesc: string;
        confirmBtn: string;
        reviews: string;
        selectTime: string;
        quote: string;
    };
    payment: {
        confirm: string;
        fee: string;
        appFee: string;
        total: string;
        pay: string;
        confirmPay: string;
        processing: string;
        success: string;
        secured: string;
        redirect: string;
        step1: string;
        step2: string;
        step3: string;
        bookingConfirmed: string;
    };
    dashboard: {
        customerTitle: string;
        mentorTitle: string;
        activeSession: string;
        history: string;
        points: string;
        hours: string;
        sessions: string;
        upcoming: string;
        today: string;
        tomorrow: string;
        earn: string;
        roomBtn: string;
        lastMessage: string;
        pendingDiscussion: string;
        achievementTitle: string;
        achievementDesc: string;
        payoutAvailable: string;
        payoutDesc: string;
        sessionTime: string;
        quoteCustomer: string;
        quoteMentor: string;
        lastMsgBodyCustomer: string;
        lastMsgBodyMentor: string;
        rating: string;
    };
    room: {
        stable: string;
        endCall: string;
        partner: string;
        self: string;
        cameraOff: string;
        cameraErr: string;
        sessionLabel: string;
    };
    feedback: {
        title: string;
        desc: string;
        rate: string;
        gratitude: string;
        gratitudeFrom: string;
        gratitudeMsg: string;
        earnings: string;
        duration: string;
        durationValue: string;
        backHome: string;
        placeholder: string;
    };
    agents: {
        badge: string; title: string; subtitle: string;
        tabCustomer: string; tabElder: string;
        slotsTitle: string; slotsDesc: string; noSlots: string; selected: string;
        bookingTitle: string; bookingDesc: string;
        nameLabel: string; topicLabel: string; dateLabel: string; timeLabel: string;
        submitBtn: string; sendingBtn: string; resetBtn: string;
        myBookings: string; responseLabel: string;
        historyTitle: string; historyId: string; historyTime: string; historyFrom: string; historyStatus: string; historyMsg: string;
        profileTitle: string; profileDesc: string; nameField: string; bioField: string;
        scheduleTitle: string; scheduleDesc: string; labelSlot: string; labelPagi: string; labelSiang: string; labelSore: string;
        addSlot: string; currentSlots: string; noSlotsElder: string;
        allBookings: string; markDone: string; cancel: string;
        counteredHint: string; cancelledHint: string; acceptedHint: string; completedHint: string;
        noDateTime: string; accepted: string; countered: string; resetDone: string; fail: string;
        slotAdded: string; slotRemoved: string; sessionDone: string; bookingCancelled: string;
        statsSlots: string; statsTotal: string; statsDone: string; statsActive: string;
        noBookingsElder: string;
    };
    admin: {
        badge: string; title: string; refresh: string; agentsLink: string;
        totalSlot: string; activeBooking: string; completed: string; totalSowan: string;
        usersTitle: string; customer: string; mentor: string; adminPlatform: string;
        allBookings: string; id: string; learner: string; topic: string; date: string; time: string; status: string;
        noBookings: string;
        agentsStatus: string; elderAgent: string; asiOne: string; pendopo: string;
        slotAvailable: string; booking: string;
        dignityGuardDesc: string; pendopoDesc: string;
    };
}

const dictionaries: Record<LanguageCode, Translations> = {
    id: {
        shared: {
            sowan: "Sowan.id", explore: "Jelajahi", schedule: "Jadwal Sowan", login: "Masuk", register: "Daftar Sekarang", logout: "Keluar", hello: "Halo, ", back: "Kembali", city: "Kota", language: "Bahasa", online: "Online", offline: "Offline",
            welcomeModal: "Selamat Datang!", loginDesc: "Masuk ke Sowan.id untuk mulai bersapa", nameLabel: "Siapa nama Anda?", namePlaceholder: "Ketik nama Anda di sini...", viewProfile: "Lihat Profil", demoLabel: "atau coba akun demo"
        },
home: {
            sparkle: "Belajar Langsung dari Para Maestro Lintas Generasi", headline1: "Belajar budaya.", headline2: "Dari yang pernah", headline3: "hidup di dalamnya.", welcome: "di", welcomeHome: "Selamat Datang", pagi: "Selamat Pagi", siang: "Selamat Siang", sore: "Selamat Sore", malam: "Selamat Malam",
            desc: "Wadah hangat untuk saling sapa, berbagi cerita, dan menyambung tali silaturahmi. Temukan teman baru dan bagikan pengalaman berharga Anda di sini.",
            findBtn: "Cari Teman Sowan", scheduleBtn: "Lihat Jadwal Saya", friendsJoined: "Teman Bergabung", trustSignal: "Dipercaya 500+ pengguna dari 12 negara", sessions: "Sesi Sowan", bottomQuote: "Saling Sapa, Saling Bercerita",
            maestroTitle: "Kenalan dengan Maestro Kami", maestroDesc: "Para lansia berpengalaman dengan beragam cerita, keahlian, dan kearifan lokal yang siap menjadi Teman Sowan Anda.",
            viewProfile: "Lihat Profil", seeAll: "Lihat Semua Maestro",
            aboutTitle: "Lebih dari Sekadar Panggilan Video.",
            aboutDesc: "SOWAN adalah platform Edutech eksklusif tempat Anda menyewa waktu para Maestro untuk sesi mentoring personal, belajar bahasa daerah, hingga konsultasi bisnis.",
            badgeSecure: "Sistem Escrow Aman 100%",
            badgeCurated: "Maestro Lulus Kurasi Pedagogi",
            statsUsers: "Pengguna Terdaftar", statsMaestros: "Maestro Terkurasi", statsLanguages: "Bahasa Pengantar",
            testimonialsTitle: "Kata Mereka yang Sudah Sowan", testimonialsDesc: "Cerita nyata dari pengguna yang telah merasakan manfaatnya",
            aboutExclusives: "Panggilan Video Eksklusif 1-on-1", aboutExclusivesDesc: "Belajar dan bercerita secara privat dan intensif.",
            aboutFlexible: "Jadwal Sangat Fleksibel", aboutFlexibleDesc: "Pilih waktu Sowan yang paling pas untuk Anda.",
            aboutImpact: "Dampak Sosial Nyata", aboutImpactDesc: "Mengurangi rasa kesepian pada lansia melalui Geronteknologi.",
            trustLanguages: "Berbagai Bahasa", trustLanguagesSub: "& Keahlian",
            trustCurated: "Kurasi Maestro", trustCuratedSub: "Ketat & Profesional",
            trustEscrow: "Transaksi Escrow", trustEscrowSub: "100% Aman & Terjamin",
            slotsAvailable: "slot tersedia minggu ini",
            sourceUnsplash: "Sumber: Unsplash",
            timezone: "WIB",
            tryDemo: "Coba Demo Interaktif"
        },
        explore: {
            title: "Jelajahi Kebijaksanaan", subtitle: "Temukan Teman Sowan yang paling cocok untuk berbagi cerita dan pengalaman hidup.",
            searchPlaceholder: "Cari nama atau topik...", filterLocation: "Asal Kota", filterLang: "Bahasa Pengantar", reset: "Atur Ulang Filter", bookBtn: "Buat Jadwal Sowan",
            allCities: "Semua Kota", allLangs: "Semua Bahasa",
            noResultsTitle: "Maestro-nya Lagi Sowan!", noResultsDesc: "Mungkin lagi istirahat di sawah. Coba filter lain dulu ya!",
            slotsAvailable: "slot tersedia minggu ini", badgeTopRated: "Top Rated", badgeCulturalExpert: "Ahli Budaya", badgeNew: "Baru"
        },
        mentor: {
            exp: "Pengalaman", interests: "Topik Keahlian", about: "Tentang", bookingTitle: "Jadwal Sowan", bookingSubtitle: "Sowan Bersama {name}", bookingDesc: "Pilih waktu yang tepat untuk berbincang santai.", confirmBtn: "Konfirmasi Jadwal", reviews: "ULASAN", selectTime: "Pilih Waktu", quote: "Mari berbagi cerita."
        },
        payment: {
            confirm: "Konfirmasi Sowan", fee: "Biaya Layanan", appFee: "Biaya Aplikasi", total: "Total", pay: "Bayar Aman", confirmPay: "Konfirmasi & Bayar", processing: "Memproses...", success: "Selesai!", secured: "Jadwal Anda bersama {name} telah berhasil diatur.", redirect: "Mengarahkan ke Dashboard...",
            step1: "Pilih Waktu", step2: "Review", step3: "Bayar", bookingConfirmed: "Sowan Telah Terjadwal!"
        },
        dashboard: {
            customerTitle: "Dasbor Saya", mentorTitle: "Dasbor Mentor", activeSession: "Sesi Aktif", history: "Riwayat Sowan", points: "Poin Loyalitas", hours: "Jam Belajar", sessions: "Sesi Selesai",
            upcoming: "Sesi Mendatang", today: "Hari Ini", tomorrow: "Besok", earn: "Pendapatan Sesi", roomBtn: "Masuk Ruang Sowan",
            lastMessage: "Pesan Terakhir", pendingDiscussion: "Diskusi Menunggu", achievementTitle: "Pencapaian Baru!", achievementDesc: "Anda telah Sowan ke 5 Maestro minggu ini.",
            payoutAvailable: "Penarikan Tersedia", payoutDesc: "Rp 1.250.000 siap dicairkan ke rekening Anda.", sessionTime: "18:00 - 19:00 WIB",
            quoteCustomer: "\"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa.\"",
            quoteMentor: "\"Ingin bertanya tentang sejarah Keraton Yogyakarta untuk tugas kuliah saya.\"",
            lastMsgBodyCustomer: "\"Sampai jumpa nanti sore ya, Mas!\"", lastMsgBodyMentor: "\"Mbah, nanti saya bawa buku catatan ya...\"",
            rating: "Rating"
        },
        room: {
            stable: "Stabil", endCall: "AKHIRI SOWAN", partner: "Teman Bicara", self: "Anda", cameraOff: "Kamera Mati", cameraErr: "Kamera Gagal", sessionLabel: "Sesi"
        },
        feedback: {
            title: "Sesi Selesai", desc: "Terima kasih telah berbagi cerita hari ini.", rate: "Berikan Rating", gratitude: "Terima Kasih Banyak", gratitudeFrom: "Apresiasi dari {name}", gratitudeMsg: "Mbah, terima kasih banyak ya atas ceritanya. Sangat membantu tugas akhir saya!", earnings: "Pendapatan Sesi", duration: "Durasi Belajar", durationValue: "60 Menit", backHome: "Kembali ke Dasbor", placeholder: "Tulis pesan apresiasi untuk Mbah..."
        },
        agents: {
            badge: "AI DIGNITY GUARD", title: "Pendopo Digital", subtitle: "Dua sisi pendopo — pembelajar dan sesepuh, dijembatani oleh ElderAgent.",
            tabCustomer: "Sowan — Saya Tamu", tabElder: "Kelola — Saya Sesepuh",
            slotsTitle: "Slot Tersedia", slotsDesc: "Klik slot untuk memilih. ElderAgent akan cek energi {name}.", noSlots: "Belum ada slot tersedia.", selected: "✓ Terpilih",
            bookingTitle: "Sampaikan Niat Sowan", bookingDesc: "ElderAgent akan cek energi {name} dan merespon.",
            nameLabel: "Namamu", topicLabel: "Ingin belajar", dateLabel: "Tanggal", timeLabel: "Jam",
            submitBtn: "Kirim Niat", sendingBtn: "Mengirim...", resetBtn: "Reset",
            myBookings: "Sowan Saya", responseLabel: "Respon ElderAgent:",
            historyTitle: "Riwayat Sowan", historyId: "ID", historyTime: "Waktu", historyFrom: "Dari", historyStatus: "Status", historyMsg: "Pesan",
            profileTitle: "Profil Sesepuh", profileDesc: "Identitas yang muncul di Pendopo Digital.", nameField: "Nama", bioField: "Bio",
            scheduleTitle: "Atur Jadwal", scheduleDesc: "Isi tanggal, jam, label → klik Tambah Slot.", labelSlot: "Label Waktu",
            labelPagi: "Pagi", labelSiang: "Siang", labelSore: "Sore",
            addSlot: "Tambah Slot", currentSlots: "Slot saat ini — arahkan kursor ke slot untuk menghapus:", noSlotsElder: "Belum ada slot. Isi form di atas lalu klik Tambah Slot.",
            allBookings: "Semua Booking", markDone: "Tandai Selesai", cancel: "Batalkan",
            counteredHint: "💡 Alternatif slot ditawarkan — cek slot tersedia dan kirim ulang niat.", cancelledHint: "✋ Sesi ditutup — pilih slot lain dan coba lagi.",
            acceptedHint: "✅ Sesi diterima! Datang sesuai jadwal ya.", completedHint: "🎉 Sesi selesai! Terima kasih sudah sowan.",
            noDateTime: "Pilih tanggal dan jam dulu", accepted: "Pintu dibuka!", countered: "Alternatif ditawarkan",
            resetDone: "Pendopo direset", fail: "Gagal", slotAdded: "Slot ditambahkan", slotRemoved: "Slot dihapus",
            sessionDone: "Sesi selesai", bookingCancelled: "Booking dibatalkan",
            statsSlots: "Slot Tersedia", statsTotal: "Total Sowan", statsDone: "Selesai", statsActive: "Aktif",
            noBookingsElder: 'Belum ada yang sowan. Customer bisa booking lewat tab "Sowan — Saya Tamu".'
        },
        admin: {
            badge: "ADMIN PANEL", title: "Platform Overview", refresh: "Refresh", agentsLink: "AI Agents",
            totalSlot: "Total Slot", activeBooking: "Booking Aktif", completed: "Selesai", totalSowan: "Total Sowan",
            usersTitle: "Users", customer: "Customer", mentor: "Mentor Lansia", adminPlatform: "Admin Platform",
            allBookings: "All Bookings", id: "ID", learner: "Learner", topic: "Topic", date: "Date", time: "Time", status: "Status",
            noBookings: "Belum ada booking. Customer bisa booking melalui AI Agents.",
            agentsStatus: "AI Agents Status", elderAgent: "ElderAgent", asiOne: "ASI:ONE", pendopo: "Pendopo Digital",
            slotAvailable: "slot tersedia", booking: "booking",
            dignityGuardDesc: "Dignity Guard — energy-aware negotiation, Bahasa Indonesia",
            pendopoDesc: "/agents — customer booking + elder management"
        }
    },
    en: {
        shared: {
            sowan: "Sowan.id", explore: "Explore", schedule: "Schedule", login: "Login", register: "Register Now", logout: "Logout", hello: "Hello, ", back: "Back", city: "City", language: "Language", online: "Online", offline: "Offline",
            welcomeModal: "Welcome Back!", loginDesc: "Login to Sowan.id to start connecting", nameLabel: "What is your name?", namePlaceholder: "Type your name here...", viewProfile: "View Profile", demoLabel: "or try a demo account"
        },
        home: {
            sparkle: "Learn Directly from Cross-Generational Maestros", headline1: "Learn culture.", headline2: "From those who have", headline3: "actually lived it.", welcome: "to", welcomeHome: "Welcome", pagi: "Good Morning", siang: "Good Afternoon", sore: "Good Evening", malam: "Good Night",
            desc: "A warm space to greet one another, share stories, and reconnect. Discover new friends and share your valuable experiences here.",
            findBtn: "Find a Sowan Friend", scheduleBtn: "My Schedule", friendsJoined: "Friends Joined", trustSignal: "Trusted by 500+ users from 12 countries", sessions: "Sowan Sessions", bottomQuote: "Greet Each Other, Share Stories",
            maestroTitle: "Meet Our Maestros", maestroDesc: "Experienced elders with diverse stories, skills, and local wisdom ready to be your Sowan Friend.",
            viewProfile: "View Profile", seeAll: "See All Maestros",
            aboutTitle: "More than Just a Video Call.",
            aboutDesc: "SOWAN is an exclusive Edutech platform where you rent the time of Maestros for personal mentoring sessions, learning local languages, to business consultations.",
            badgeSecure: "100% Secure Escrow System",
            badgeCurated: "Pedagogy-Curated Maestros",
            statsUsers: "Registered Users", statsMaestros: "Curated Maestros", statsLanguages: "Teaching Languages",
            testimonialsTitle: "What They Say", testimonialsDesc: "Real stories from users who have experienced the benefits",
            aboutExclusives: "1-on-1 Exclusive Video Call", aboutExclusivesDesc: "Learn and chat privately and intensively.",
            aboutFlexible: "Highly Flexible Schedule", aboutFlexibleDesc: "Choose the Sowan time that suits you best.",
            aboutImpact: "Real Social Impact", aboutImpactDesc: "Reducing loneliness in the elderly through Gerontechnology.",
            trustLanguages: "Multiple Languages", trustLanguagesSub: "& Expertise",
            trustCurated: "Maestro Curation", trustCuratedSub: "Strict & Professional",
            trustEscrow: "Escrow Transaction", trustEscrowSub: "100% Safe & Guaranteed",
            slotsAvailable: "slots available this week",
            sourceUnsplash: "Source: Unsplash",
            timezone: " WIB",
            tryDemo: "Try Interactive Demo"
        },
        explore: {
            title: "Explore Wisdom", subtitle: "Find the most suitable Sowan Friend to share life stories and experiences.",
            searchPlaceholder: "Search name or topic...", filterLocation: "Origin City", filterLang: "Instruction Language", reset: "Reset Filters", bookBtn: "Book a Sowan Session",
            allCities: "All Cities", allLangs: "All Languages",
            noResultsTitle: "Maestros Are Sowan-ing!", noResultsDesc: "Maybe they're taking a break in the rice field. Try different filters!",
            slotsAvailable: "slots available this week", badgeTopRated: "Top Rated", badgeCulturalExpert: "Cultural Expert", badgeNew: "New"
        },
        mentor: {
            exp: "Experience", interests: "Topics of Expertise", about: "About", bookingTitle: "Sowan Schedule", bookingSubtitle: "Sowan with {name}", bookingDesc: "Choose the perfect time for a casual chat.", confirmBtn: "Confirm Schedule", reviews: "REVIEWS", selectTime: "Select Time", quote: "Let's share stories."
        },
        payment: {
            confirm: "Confirm Sowan", fee: "Service Fee", appFee: "App Fee", total: "Total", pay: "Secure Payment", confirmPay: "Confirm & Pay", processing: "Processing...", success: "Done!", secured: "Your schedule with {name} has been successfully arranged.", redirect: "Redirecting to Dashboard...",
            step1: "Select Time", step2: "Review", step3: "Pay", bookingConfirmed: "Sowan Scheduled!"
        },
        dashboard: {
            customerTitle: "My Dashboard", mentorTitle: "Mentor Dashboard", activeSession: "Active Session", history: "Sowan History", points: "Loyalty Points", hours: "Learning Hours", sessions: "Completed Sessions",
            upcoming: "Upcoming Sessions", today: "Today", tomorrow: "Tomorrow", earn: "Session Earnings", roomBtn: "Enter Sowan Room",
            lastMessage: "Last Message", pendingDiscussion: "Pending Discussion", achievementTitle: "New Achievement!", achievementDesc: "You have Sowan with 5 Maestros this week.",
            payoutAvailable: "Payout Available", payoutDesc: "Rp 1,250,000 is ready for withdrawal.", sessionTime: "6:00 PM - 7:00 PM",
            quoteCustomer: "\"Let's have a casual chat about history, life experiences, or just practice Javanese.\"",
            quoteMentor: "\"I want to ask about the history of the Yogyakarta Palace for my college assignment.\"",
            lastMsgBodyCustomer: "\"See you this afternoon!\"", lastMsgBodyMentor: "\"Maestro, I'll bring my notebook later...\"",
            rating: "Rating"
        },
        room: {
            stable: "Stable", endCall: "END SOWAN", partner: "Talking Partner", self: "You", cameraOff: "Camera Off", cameraErr: "Camera Error", sessionLabel: "Session"
        },
        feedback: {
            title: "Session Finished", desc: "Thank you for sharing stories today.", rate: "Give Rating", gratitude: "Thank You So Much", gratitudeFrom: "Appreciation from {name}", gratitudeMsg: "Maestro, thank you very much for the stories. It really helped my final project!", earnings: "Session Earnings", duration: "Learning Duration", durationValue: "60 Minutes", backHome: "Back to Dashboard", placeholder: "Write an appreciation message for the Elder..."
        },
        agents: {
            badge: "AI DIGNITY GUARD", title: "Digital Pendopo", subtitle: "Two sides of the pendopo — learner and elder, bridged by ElderAgent.",
            tabCustomer: "Sowan — I'm a Guest", tabElder: "Manage — I'm an Elder",
            slotsTitle: "Available Slots", slotsDesc: "Click a slot to select. ElderAgent will check {name}'s energy.", noSlots: "No slots available yet.", selected: "✓ Selected",
            bookingTitle: "Submit Your Sowan Intent", bookingDesc: "ElderAgent will check {name}'s energy and respond.",
            nameLabel: "Your Name", topicLabel: "Want to learn", dateLabel: "Date", timeLabel: "Time",
            submitBtn: "Send Intent", sendingBtn: "Sending...", resetBtn: "Reset",
            myBookings: "My Sowan", responseLabel: "ElderAgent Response:",
            historyTitle: "Sowan History", historyId: "ID", historyTime: "Time", historyFrom: "From", historyStatus: "Status", historyMsg: "Message",
            profileTitle: "Elder Profile", profileDesc: "Identity shown on the Digital Pendopo.", nameField: "Name", bioField: "Bio",
            scheduleTitle: "Manage Schedule", scheduleDesc: "Enter date, time, label → click Add Slot.", labelSlot: "Time Label",
            labelPagi: "Morning", labelSiang: "Afternoon", labelSore: "Evening",
            addSlot: "Add Slot", currentSlots: "Current slots — hover over a slot to delete:", noSlotsElder: "No slots yet. Fill the form above and click Add Slot.",
            allBookings: "All Bookings", markDone: "Mark Complete", cancel: "Cancel",
            counteredHint: "💡 Alternative slot offered — check available slots and resubmit.", cancelledHint: "✋ Session closed — pick another slot and try again.",
            acceptedHint: "✅ Session accepted! See you on schedule.", completedHint: "🎉 Session completed! Thank you for sowan.",
            noDateTime: "Select date and time first", accepted: "Door opened!", countered: "Alternative offered",
            resetDone: "Pendopo reset", fail: "Failed", slotAdded: "Slot added", slotRemoved: "Slot removed",
            sessionDone: "Session completed", bookingCancelled: "Booking cancelled",
            statsSlots: "Available Slots", statsTotal: "Total Sowan", statsDone: "Completed", statsActive: "Active",
            noBookingsElder: 'No sowan yet. Customers can book via the "Sowan — I\'m a Guest" tab.'
        },
        admin: {
            badge: "ADMIN PANEL", title: "Platform Overview", refresh: "Refresh", agentsLink: "AI Agents",
            totalSlot: "Total Slots", activeBooking: "Active Bookings", completed: "Completed", totalSowan: "Total Sowan",
            usersTitle: "Users", customer: "Customer", mentor: "Elder Mentor", adminPlatform: "Admin Platform",
            allBookings: "All Bookings", id: "ID", learner: "Learner", topic: "Topic", date: "Date", time: "Time", status: "Status",
            noBookings: "No bookings yet. Customers can book via AI Agents.",
            agentsStatus: "AI Agents Status", elderAgent: "ElderAgent", asiOne: "ASI:ONE", pendopo: "Digital Pendopo",
            slotAvailable: "slots available", booking: "bookings",
            dignityGuardDesc: "Dignity Guard — energy-aware negotiation, Bahasa Indonesia",
            pendopoDesc: "/agents — customer booking + elder management"
        }
    },
    ja: {
        shared: {
            sowan: "Sowan.id", explore: "探索", schedule: "スケジュール", login: "ログイン", register: "今すぐ登録", logout: "ログアウト", hello: "こんにちは、", back: "戻る", city: "都市", language: "言語", online: "オンライン", offline: "オフライン",
            welcomeModal: "おかえりなさい！", loginDesc: "Sowan.idにログインして、つながりを始めましょう", nameLabel: "お名前は何ですか？", namePlaceholder: "ここにお名前を入力してください...", viewProfile: "プロフィールを見る", demoLabel: "またはデモアカウントを試す"
        },
home: {
            sparkle: "経験を共有しましょう", headline1: "文化を学ぶ。", headline2: "実際にそれを", headline3: "生きてきた人から。", welcome: "へようこそ", welcomeHome: "ようこそ", pagi: "おはようございます", siang: "こんにちは", sore: "こんばんは", malam: "おやすみなさい",
            desc: "お互いに挨拶し、物語を共有し、絆を深める温かい場所。在这里结交新朋友，分享您的宝贵经验。",
            findBtn: "友達を探す", scheduleBtn: "私のスケジュール", friendsJoined: "参加した友達", trustSignal: "12カ国500+ユーザーに信頼されています", sessions: "セッション数", bottomQuote: "挨拶し合い、物語を共有する",
            maestroTitle: "マエストロに会う", maestroDesc: "多様な物語、スキル、そして地域の知恵を持つ経験豊かな高齢者たちが、あなたのソワン・フレンドになる準備ができています。",
            viewProfile: "プロフィールを見る", seeAll: "すべてのマエストロを見る",
            aboutTitle: "単なるビデオ通話ではありません。",
            aboutDesc: "SOWANは、個人的なメンタリングセッション、現地語の学習からビジネスコンサルタントまで、マエストロの時間をレンタルできる独占的なエデュテックプラットフォームです。",
            badgeSecure: "100%安全なエスクローシステム",
            badgeCurated: "教育学的に選ばれたマエストロ",
            statsUsers: "登録ユーザー", statsMaestros: "厳選マエストロ", statsLanguages: "教授言語",
            testimonialsTitle: "を経験した人の声", testimonialsDesc: "その利点を実感しているユーザーからの実際のストーリー",
            aboutExclusives: "1対1の限定ビデオ通話", aboutExclusivesDesc: "プライベートで集中的に学び、話しましょう。",
            aboutFlexible: "非常に柔軟なスケジュール", aboutFlexibleDesc: "あなたに最適なSowan時間を選んでください。",
            aboutImpact: "実際の社会的影響", aboutImpactDesc: "老人技術を通じて高齢者の孤独を減らす。",
            trustLanguages: "複数の言語", trustLanguagesSub: "&専門知識",
            trustCurated: "マエストロ精選", trustCuratedSub: "厳格で専門的",
            trustEscrow: "エスクロー取引", trustEscrowSub: "100%安全で保証付き",
            slotsAvailable: "今週利用可能なスロット",
            sourceUnsplash: "ソース: Unsplash",
            timezone: " JST",
            tryDemo: "インタラクティブデモを試す"
        },
        explore: {
            title: "知恵を探索する", subtitle: "人生の物語や経験を共有するのに最適なソワン・フレンドを見つけてください。",
            searchPlaceholder: "名前やトピックを検索...", filterLocation: "出身都市", filterLang: "教授言語", reset: "フィルターをリセット", bookBtn: "セッションを予約する",
            allCities: "すべての都市", allLangs: "すべての言語",
            noResultsTitle: "マエストロはソワン中！", noResultsDesc: "たぶん田んぼで休憩中です。別のフィルターを試してください！",
            slotsAvailable: "スロット今週利用可", badgeTopRated: "トップレート", badgeCulturalExpert: "文化専門家", badgeNew: "新着"
        },
        mentor: {
            exp: "経験", interests: "専門分野", about: "概要", bookingTitle: "ソワンスケジュール", bookingSubtitle: "{name} とのソワン", bookingDesc: "カジュアルな会話に最適な時間を選んでください。", confirmBtn: "スケジュールを確定する", reviews: "レビュー", selectTime: "時間を選択", quote: "物語を共有しましょう。"
        },
        payment: {
            confirm: "ソワンを確認する", fee: "サービス料", appFee: "アプリ手数料", total: "合計", pay: "安全に支払う", confirmPay: "確認して支払う", processing: "処理中...", success: "完了！", secured: "{name} とのスケジュールが正常に設定されました。", redirect: "ダッシュボードにリダイレクトしています...",
            step1: "時間選択", step2: "確認", step3: "支払い", bookingConfirmed: "ソワン予約完了！"
        },
        dashboard: {
            customerTitle: "マイダッシュボード", mentorTitle: "メンターダッシュボード", activeSession: "アクティブセッション", history: "ソワン履歴", points: "ロイヤリティポイント", hours: "学習時間", sessions: "完了したセッション",
            upcoming: "今後のセッション", today: "今日", tomorrow: "明日", earn: "セッション収益", roomBtn: "ルームに入る",
            lastMessage: "最後のメッセージ", pendingDiscussion: "保留中のディスカッション", achievementTitle: "新しい実績！", achievementDesc: "今週、5人のマエストロとソワンしました。",
            payoutAvailable: "支払い可能", payoutDesc: "1,250,000ルピアを引き出す準備ができています。", sessionTime: "18:00 - 19:00 (日本時間)",
            quoteCustomer: "「歴史や人生経験、あるいはただのジャワ語の練習についてカジュアルに話しましょう。」",
            quoteMentor: "「大学の課題のためにジョグジャカルタ王宮の歴史について聞きたいです。」",
            lastMsgBodyCustomer: "「今日の午後にお会いしましょう！」", lastMsgBodyMentor: "「マエストロ、後でノートを持ってきますね...」",
            rating: "評価"
        },
        room: {
            stable: "安定", endCall: "ソワンを終了", partner: "話し相手", self: "あなた", cameraOff: "カメラオフ", cameraErr: "カメラエラー", sessionLabel: "セッション"
        },
        feedback: {
            title: "セッション終了", desc: "今日は物語を共有してくれてありがとう。", rate: "評価する", gratitude: "本当にありがとうございました", gratitudeFrom: "{name} からの感謝", gratitudeMsg: "マエストロ、お話を聞かせていただきありがとうございました。私の卒業制作に本当に役立ちました！", earnings: "セッション収益", duration: "学習時間", durationValue: "60 分", backHome: "ダッシュボードに戻る", placeholder: "高齢者への感謝のメッセージを書いてください..."
        },
        agents: {
            badge: "AI DIGNITY GUARD", title: "デジタル Pendopo", subtitle: "Pendopoの両側 — 学習者と長老、ElderAgentが橋渡し。",
            tabCustomer: "Sowan — ゲスト", tabElder: "管理 — 私は長老",
            slotsTitle: "利用可能スロット", slotsDesc: "スロットをクリックして選択。ElderAgentが{name}のエネルギーを確認します。", noSlots: "まだ利用可能なスロットはありません。", selected: "✓ 選択済み",
            bookingTitle: "Sowanの意向を送信", bookingDesc: "ElderAgentが{name}のエネルギーをチェックして応答します。",
            nameLabel: "あなたの名前", topicLabel: "学びたいこと", dateLabel: "日付", timeLabel: "時間",
            submitBtn: "意向を送信", sendingBtn: "送信中...", resetBtn: "リセット",
            myBookings: "マイSowan", responseLabel: "ElderAgentの応答:",
            historyTitle: "Sowan履歴", historyId: "ID", historyTime: "時間", historyFrom: "から", historyStatus: "ステータス", historyMsg: "メッセージ",
            profileTitle: "長老プロフィール", profileDesc: "デジタルPendopoに表示されるアイデンティティ。", nameField: "名前", bioField: "経歴",
            scheduleTitle: "スケジュール管理", scheduleDesc: "日付、時間、ラベルを入力 → スロット追加をクリック。", labelSlot: "時間ラベル",
            labelPagi: "朝", labelSiang: "午後", labelSore: "夕方",
            addSlot: "スロット追加", currentSlots: "現在のスロット — スロットにホバーして削除:", noSlotsElder: "まだスロットがありません。上のフォームに入力してスロット追加をクリック。",
            allBookings: "すべての予約", markDone: "完了", cancel: "キャンセル",
            counteredHint: "💡 代替スロットが提案されました — 利用可能なスロットを確認して再送信。", cancelledHint: "✋ セッション終了 — 別のスロットを選んで再試行。",
            acceptedHint: "✅ セッション受理！予定通りにお越しください。", completedHint: "🎉 セッション完了！Sowanありがとうございました。",
            noDateTime: "日付と時間を選択してください", accepted: "扉が開きました！", countered: "代替案を提案",
            resetDone: "Pendopoをリセット", fail: "失敗", slotAdded: "スロットを追加", slotRemoved: "スロットを削除",
            sessionDone: "セッション完了", bookingCancelled: "予約キャンセル",
            statsSlots: "利用可能スロット", statsTotal: "総Sowan", statsDone: "完了", statsActive: "アクティブ",
            noBookingsElder: '"Sowan — ゲスト"タブから予約できます。'
        },
        admin: {
            badge: "管理パネル", title: "プラットフォーム概要", refresh: "更新", agentsLink: "AIエージェント",
            totalSlot: "総スロット数", activeBooking: "アクティブ予約", completed: "完了", totalSowan: "総Sowan数",
            usersTitle: "ユーザー", customer: "カスタマー", mentor: "エルダーメンター", adminPlatform: "管理プラットフォーム",
            allBookings: "全予約", id: "ID", learner: "学習者", topic: "トピック", date: "日付", time: "時間", status: "ステータス",
            noBookings: "まだ予約はありません。AIエージェントから予約できます。",
            agentsStatus: "AIエージェントステータス", elderAgent: "ElderAgent", asiOne: "ASI:ONE", pendopo: "デジタルPendopo",
            slotAvailable: "利用可能スロット", booking: "予約",
            dignityGuardDesc: "Dignity Guard — エネルギー認識交渉、インドネシア語",
            pendopoDesc: "/agents — カスタマー予約・長老管理"
        }
    },
    ko: {
        shared: {
            sowan: "Sowan.id", explore: "탐색", schedule: "일정", login: "로그인", register: "지금 가입", logout: "로그아웃", hello: "안녕하세요, ", back: "뒤로", city: "도시", language: "언어", online: "온라인", offline: "오프라인",
            welcomeModal: "환영합니다!", loginDesc: "Sowan.id에 로그인하여 소통을 시작하세요", nameLabel: "이름이 무엇입니까?", namePlaceholder: "여기에 이름을 입력하세요...", viewProfile: "프로필 보기", demoLabel: "또는 데모 계정 시도"
        },
        home: {
            sparkle: "경험을 공유합시다", headline1: "문화를 배운다.", headline2: "실제로 그것을", headline3: "살아본 사람들로부터.", welcome: "에 오신 것을 환영합니다", welcomeHome: "환영합니다", pagi: "좋은 아침입니다", siang: "좋은 오후입니다", sore: "좋은 저녁입니다", malam: "안녕히 주무세요",
            desc: "서로 인사하고, 이야기를 나누며 인연을 맺는 따뜻한 공간. 새로운 친구를 찾고 소중한 경험을 나누세요.",
            findBtn: "친구 찾기", scheduleBtn: "내 일정", friendsJoined: "가입한 친구", trustSignal: "12개국 500+명의 사용자가 신뢰", sessions: "소완 세션", bottomQuote: "서로 인사하고 이야기 나누기",
            maestroTitle: "마에스트로를 만나보세요", maestroDesc: "다양한 이야기와 기술, 지역의 지혜를 가진 경험 많은 어르신들이 여러분의 소완 친구가 될 준비가 되어 있습니다.",
            viewProfile: "프로필 보기", seeAll: "모든 마에스트로 보기",
            aboutTitle: "단순한 화상 통화 그 이상입니다.",
            aboutDesc: "SOWAN은 개인 멘토링 세션, 현지 언어 학습, 비즈니스 상담을 위해 마에스트로의 시간을 대여할 수 있는 독점적인 에듀테크 플랫폼입니다.",
            badgeSecure: "100% 안전한 에스크로 시스템",
            badgeCurated: "교육학적으로 검증된 마에스트로",
            statsUsers: "등록된 사용자", statsMaestros: "검증된 마에스트로", statsLanguages: "교육 언어",
            testimonialsTitle: "경험자들의 말", testimonialsDesc: "그 장점을 느낀 사용자들의 실제 이야기",
            aboutExclusives: "1대1 전용 화상 통화", aboutExclusivesDesc: "개인적이고 집중적으로 배우고 대화합니다.",
            aboutFlexible: "매우 유연한 일정", aboutFlexibleDesc: "귀하에게 가장 적합한 소완 시간을 선택하세요.",
            aboutImpact: "실질적인 사회적 영향", aboutImpactDesc: "노인 기술을 통해 노인의 외로움을 줄입니다.",
            trustLanguages: "다양한 언어", trustLanguagesSub: "및 전문 지식",
            trustCurated: "마에스트로 선별", trustCuratedSub: "엄격하고 전문적",
            trustEscrow: "에스크로 거래", trustEscrowSub: "100% 안전 보장",
            slotsAvailable: "이번 주 이용 가능",
            sourceUnsplash: "출처: Unsplash",
            timezone: " WIB",
            tryDemo: "인터랙티브 데모 체험"
        },
        explore: {
            title: "지혜 탐구", subtitle: "인생 이야기와 경험을 나눌 가장 적합한 소완 친구를 찾아보세요.",
            searchPlaceholder: "이름 또는 주제 검색...", filterLocation: "출신 도시", filterLang: "교수 언어", reset: "필터 초기화", bookBtn: "세션 예약하기",
            allCities: "모든 도시", allLangs: "모든 언어",
            noResultsTitle: "마에스트로가 소완 중!", noResultsDesc: "아마도 들에서 쉬고 있을 겁니다. 다른 필터를 시도해 보세요!",
            slotsAvailable: "이번 주 이용 가능", badgeTopRated: "Top Rated", badgeCulturalExpert: "문화 전문가", badgeNew: "신규"
        },
        mentor: {
            exp: "경험", interests: "전문 분야", about: "소개", bookingTitle: "소완 일정", bookingSubtitle: "{name} 님과의 소완", bookingDesc: "가벼운 대화를 나누기에 완벽한 시간을 선택하세요.", confirmBtn: "일정 확정", reviews: "리뷰", selectTime: "시간 선택", quote: "이야기를 공유합시다."
        },
        payment: {
            confirm: "소완 확인", fee: "서비스 수수료", appFee: "앱 수수료", total: "합계", pay: "안전하게 결제", confirmPay: "확인 및 결제", processing: "처리 중...", success: "완료!", secured: "{name} 님과의 일정이 성공적으로 예약되었습니다.", redirect: "대시보드로 리다이렉트 중...",
            step1: "시간 선택", step2: "확인", step3: "결제", bookingConfirmed: "소완 예약 완료!"
        },
        dashboard: {
            customerTitle: "내 대시보드", mentorTitle: "멘토 대시보드", activeSession: "활성 세션", history: "소완 이력", points: "로열티 포인트", hours: "학습 시간", sessions: "완료된 세션",
            upcoming: "예정된 세션", today: "오늘", tomorrow: "내일", earn: "세션 수익", roomBtn: "방 입장",
            lastMessage: "마지막 메시지", pendingDiscussion: "대기 중인 토론", achievementTitle: "새로운 업적!", achievementDesc: "이번 주에 5명의 마에스트로와 소완했습니다.",
            payoutAvailable: "출금 가능", payoutDesc: "Rp 1,250,000를 출금할 준비가 되었습니다.", sessionTime: "18:00 - 19:00 (한국 시간)",
            quoteCustomer: "「역사, 인생 경험 또는 자바어 연습에 대해 편안하게 이야기해 봅시다.」",
            quoteMentor: "「대학 과제를 위해 요그야카르타 궁전의 역사에 대해 물어보고 싶습니다.」",
            lastMsgBodyCustomer: "「오늘 오후에 봬요!」", lastMsgBodyMentor: "「마에스트로님, 나중에 공책을 가져갈게요...」",
            rating: "등급"
        },
        room: {
            stable: "안정", endCall: "소완 종료", partner: "대화 상대", self: "나", cameraOff: "카메라 꺼짐", cameraErr: "카메라 오류", sessionLabel: "세션"
        },
        feedback: {
            title: "세션 종료", desc: "오늘 이야기를 나눠주셔서 감사합니다.", rate: "별점 주기", gratitude: "정말 감사합니다", gratitudeFrom: "{name} 님의 감사 인사", gratitudeMsg: "마에스트로님, 이야기를 들려주셔서 정말 감사합니다. 제 졸업 작품에 큰 도움이 되었습니다!", earnings: "세션 수익", duration: "학습 시간", durationValue: "60 분", backHome: "대시보드로 돌아가기", placeholder: "어르신께 감사의 메시지를 작성해주세요..."
        },
        agents: {
            badge: "AI DIGNITY GUARD", title: "디지털 Pendopo", subtitle: "Pendopo의 양면 — 학습자와 어르신, ElderAgent가 연결합니다.",
            tabCustomer: "Sowan — 게스트", tabElder: "관리 — 어르신",
            slotsTitle: "이용 가능 슬롯", slotsDesc: "슬롯을 클릭하여 선택하세요. ElderAgent가 {name}의 에너지를 확인합니다.", noSlots: "아직 이용 가능한 슬롯이 없습니다.", selected: "✓ 선택됨",
            bookingTitle: "Sowan 의향 제출", bookingDesc: "ElderAgent가 {name}의 에너지를 확인하고 응답합니다.",
            nameLabel: "이름", topicLabel: "배우고 싶은 것", dateLabel: "날짜", timeLabel: "시간",
            submitBtn: "의향 보내기", sendingBtn: "보내는 중...", resetBtn: "초기화",
            myBookings: "내 Sowan", responseLabel: "ElderAgent 응답:",
            historyTitle: "Sowan 기록", historyId: "ID", historyTime: "시간", historyFrom: "발신자", historyStatus: "상태", historyMsg: "메시지",
            profileTitle: "어르신 프로필", profileDesc: "디지털 Pendopo에 표시되는 신원 정보입니다.", nameField: "이름", bioField: "소개",
            scheduleTitle: "일정 관리", scheduleDesc: "날짜, 시간, 라벨 입력 → 슬롯 추가 클릭.", labelSlot: "시간 라벨",
            labelPagi: "아침", labelSiang: "오후", labelSore: "저녁",
            addSlot: "슬롯 추가", currentSlots: "현재 슬롯 — 슬롯 위에 마우스를 올리면 삭제:", noSlotsElder: "아직 슬롯이 없습니다. 위 양식을 작성하고 슬롯 추가를 클릭하세요.",
            allBookings: "모든 예약", markDone: "완료 표시", cancel: "취소",
            counteredHint: "💡 대체 슬롯 제안됨 — 이용 가능한 슬롯을 확인하고 다시 제출하세요.", cancelledHint: "✋ 세션 종료 — 다른 슬롯을 선택하고 다시 시도하세요.",
            acceptedHint: "✅ 세션 수락됨! 일정에 맞춰 방문해 주세요.", completedHint: "🎉 세션 완료! Sowan해 주셔서 감사합니다.",
            noDateTime: "날짜와 시간을 먼저 선택하세요", accepted: "문이 열렸습니다!", countered: "대안 제안됨",
            resetDone: "Pendopo 초기화됨", fail: "실패", slotAdded: "슬롯 추가됨", slotRemoved: "슬롯 제거됨",
            sessionDone: "세션 완료", bookingCancelled: "예약 취소됨",
            statsSlots: "이용 가능 슬롯", statsTotal: "총 Sowan", statsDone: "완료", statsActive: "활성",
            noBookingsElder: '"Sowan — 게스트" 탭에서 고객이 예약할 수 있습니다.'
        },
        admin: {
            badge: "관리 패널", title: "플랫폼 개요", refresh: "새로고침", agentsLink: "AI 에이전트",
            totalSlot: "총 슬롯", activeBooking: "활성 예약", completed: "완료", totalSowan: "총 Sowan",
            usersTitle: "사용자", customer: "고객", mentor: "어르신 멘토", adminPlatform: "관리 플랫폼",
            allBookings: "모든 예약", id: "ID", learner: "학습자", topic: "주제", date: "날짜", time: "시간", status: "상태",
            noBookings: "아직 예약이 없습니다. AI 에이전트를 통해 예약할 수 있습니다.",
            agentsStatus: "AI 에이전트 상태", elderAgent: "ElderAgent", asiOne: "ASI:ONE", pendopo: "디지털 Pendopo",
            slotAvailable: "슬롯 가능", booking: "예약",
            dignityGuardDesc: "Dignity Guard — 에너지 인식 협상, 인도네시아어",
            pendopoDesc: "/agents — 고객 예약 및 어르신 관리"
        }
    },
    zh: {
        shared: {
            sowan: "Sowan.id", explore: "探索", schedule: "日程", login: "登录", register: "立即注册", logout: "登出", hello: "你好, ", back: "返回", city: "城市", language: "语言", online: "在线", offline: "离线",
            welcomeModal: "欢迎回来！", loginDesc: "登录 Sowan.id 开始沟通", nameLabel: "您叫什么名字？", namePlaceholder: "在这里输入您的名字...", viewProfile: "查看详情", demoLabel: "或尝试演示帐户"
        },
home: {
            sparkle: "让我们分享经验", headline1: "学习文化。", headline2: "向那些", headline3: "真正经历过的人学习。", welcome: "欢迎来到", welcomeHome: "欢迎", pagi: "早上好", siang: "下午好", sore: "晚上好", malam: "晚安",
            desc: "一个互相问候、分享故事和交流感情的温馨空间。在这里结交新朋友，分享您的宝贵经验。",
            findBtn: "寻找朋友", scheduleBtn: "我的日程", friendsJoined: "加入的朋友", trustSignal: "获得12个国家500+用户的信赖", sessions: "疗程", bottomQuote: "互相问候，分享故事",
            maestroTitle: "结识我们的师匠", maestroDesc: "拥有丰富故事、技能和地方智慧的资深长者正等待成为您的 Sowan 之友。",
            viewProfile: "查看详细资料", seeAll: "查看所有师匠",
            aboutTitle: "不仅仅是视频通话。",
            aboutDesc: "SOWAN 是一个独家的教育科技平台，您可以租用大师的时间进行个人指导，学习当地方言，甚至进行商业咨询。",
            badgeSecure: "100% 安全的担保系统",
            badgeCurated: "经过教学评估的大师",
            statsUsers: "注册用户", statsMaestros: "精选师匠", statsLanguages: "教学语言",
            testimonialsTitle: "用户感言", testimonialsDesc: "来自真实用户的体验分享",
            aboutExclusives: "1对1专属视频通话", aboutExclusivesDesc: "私密且专注地学习和交流。",
            aboutFlexible: "灵活的时间安排", aboutFlexibleDesc: "选择最适合您的时间。",
            aboutImpact: "真实的社会影响", aboutImpactDesc: "通过老年技术减少老年人的孤独感。",
            trustLanguages: "多语言", trustLanguagesSub: "与专业知识",
            trustCurated: "师匠精选", trustCuratedSub: "严格且专业",
            trustEscrow: "托管交易", trustEscrowSub: "100%安全有保障",
            slotsAvailable: "本周可预约",
            sourceUnsplash: "来源：Unsplash",
            timezone: " WIB",
            tryDemo: "体验互动演示"
        },
        explore: {
            title: "探索智慧", subtitle: "寻找最合适的 Sowan 之友来分享生活故事和经验。",
            searchPlaceholder: "搜索姓名或主题...", filterLocation: "所属城市", filterLang: "教学语言", reset: "重置筛选", bookBtn: "预约疗程",
            allCities: "所有城市", allLangs: "所有语言",
            noResultsTitle: "师匠们正在交流中！", noResultsDesc: "也许他们在田里休息。试试其他筛选条件吧！",
            slotsAvailable: "本周可预约", badgeTopRated: "热门推荐", badgeCulturalExpert: "文化专家", badgeNew: "新加入"
        },
        mentor: {
            exp: "经验", interests: "专业领域", about: "关于", bookingTitle: "Sowan 日程", bookingSubtitle: "与 {name} 师匠 Sowan", bookingDesc: "选择适合闲聊的完美时间。", confirmBtn: "确认日程", reviews: "评论", selectTime: "选择时间", quote: "让我们分享故事。"
        },
        payment: {
            confirm: "确认 Sowan", fee: "服务费", appFee: "平台费", total: "总计", pay: "安全支付", confirmPay: "确认并支付", processing: "处理中...", success: "完成！", secured: "您与 {name} 的日程已成功安排。", redirect: "正在跳转到仪表板...",
            step1: "选择时间", step2: "确认", step3: "支付", bookingConfirmed: "Sowan预约成功！"
        },
        dashboard: {
            customerTitle: "我的仪表板", mentorTitle: "导师仪表板", activeSession: "活跃疗程", history: "Sowan 历史", points: "忠诚积分", hours: "学习时长", sessions: "完成疗程",
            upcoming: "即将进行的疗程", today: "今日", tomorrow: "明日", earn: "会话收入", roomBtn: "进入房间",
            lastMessage: "最后消息", pendingDiscussion: "待处理讨论", achievementTitle: "新成就！", achievementDesc: "您本周已与 5 位师匠进行过 Sowan。",
            payoutAvailable: "可提现", payoutDesc: "Rp 1,250,000 已准备好提现。", sessionTime: "18:00 - 19:00",
            quoteCustomer: "“让我们随性聊聊历史、人生经验，或者单纯练习爪哇语。”",
            quoteMentor: "“我想为大学作业咨询一下日惹皇宫的历史。”",
            lastMsgBodyCustomer: "“今天下午见！”", lastMsgBodyMentor: "“师匠，待会我会带笔记本……”",
            rating: "评分"
        },
        room: {
            stable: "稳定", endCall: "结束 SOWAN", partner: "对话伙伴", self: "您", cameraOff: "摄像头已关闭", cameraErr: "摄像头故障", sessionLabel: "疗程"
        },
        feedback: {
            title: "课程结束", desc: "感谢您今天的分享。", rate: "给出评分", gratitude: "非常感谢", gratitudeFrom: "来自 {name} 的感谢", gratitudeMsg: "师匠，非常感谢您的分享。这对我毕业项目很有帮助！", earnings: "本次收入", duration: "课程时长", durationValue: "60 分钟", backHome: "回到首页", placeholder: "给长者写一段感谢的话..."
        },
        agents: {
            badge: "AI DIGNITY GUARD", title: "数字 Pendopo", subtitle: "Pendopo的两面 — 学习者和长者，由 ElderAgent 连接。",
            tabCustomer: "Sowan — 我是访客", tabElder: "管理 — 我是长者",
            slotsTitle: "可用时段", slotsDesc: "点击时段选择。ElderAgent会检查{name}的能量状态。", noSlots: "暂无可用时段。", selected: "✓ 已选择",
            bookingTitle: "提交Sowan意向", bookingDesc: "ElderAgent会检查{name}的能量并回复。",
            nameLabel: "您的姓名", topicLabel: "想学习", dateLabel: "日期", timeLabel: "时间",
            submitBtn: "发送意向", sendingBtn: "发送中...", resetBtn: "重置",
            myBookings: "我的Sowan", responseLabel: "ElderAgent回复：",
            historyTitle: "Sowan记录", historyId: "ID", historyTime: "时间", historyFrom: "来自", historyStatus: "状态", historyMsg: "消息",
            profileTitle: "长者资料", profileDesc: "在数字Pendopo上显示的身份信息。", nameField: "姓名", bioField: "简介",
            scheduleTitle: "管理日程", scheduleDesc: "输入日期、时间、标签 → 点击添加时段。", labelSlot: "时段标签",
            labelPagi: "早上", labelSiang: "下午", labelSore: "傍晚",
            addSlot: "添加时段", currentSlots: "当前时段 — 悬停时段可删除：", noSlotsElder: "暂无时段。请填写上方表单并点击添加时段。",
            allBookings: "所有预约", markDone: "标记完成", cancel: "取消",
            counteredHint: "💡 已提供替代时段 — 查看可用时段并重新提交。", cancelledHint: "✋ 会话已关闭 — 选择其他时段重试。",
            acceptedHint: "✅ 会话已接受！按时赴约。", completedHint: "🎉 会话已完成！感谢您的Sowan。",
            noDateTime: "请先选择日期和时间", accepted: "门已打开！", countered: "已提供替代方案",
            resetDone: "Pendopo已重置", fail: "失败", slotAdded: "时段已添加", slotRemoved: "时段已移除",
            sessionDone: "会话已完成", bookingCancelled: "预约已取消",
            statsSlots: "可用时段", statsTotal: "总Sowan", statsDone: "已完成", statsActive: "进行中",
            noBookingsElder: '客户可通过"Sowan — 我是访客"标签进行预约。'
        },
        admin: {
            badge: "管理面板", title: "平台概览", refresh: "刷新", agentsLink: "AI Agents",
            totalSlot: "总时段数", activeBooking: "活跃预约", completed: "已完成", totalSowan: "总Sowan数",
            usersTitle: "用户", customer: "客户", mentor: "长者导师", adminPlatform: "管理平台",
            allBookings: "所有预约", id: "ID", learner: "学习者", topic: "主题", date: "日期", time: "时间", status: "状态",
            noBookings: "暂无预约。客户可通过AI Agents进行预约。",
            agentsStatus: "AI Agents状态", elderAgent: "ElderAgent", asiOne: "ASI:ONE", pendopo: "数字Pendopo",
            slotAvailable: "可用时段", booking: "预约",
            dignityGuardDesc: "Dignity Guard — 能量感知协商，印尼语",
            pendopoDesc: "/agents — 客户预约与长者管理"
        }
    }
};

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<LanguageCode>('id');

    useEffect(() => {
        const stored = localStorage.getItem('sowan_lang') as LanguageCode;
        if (stored && dictionaries[stored]) {
            setLanguage(stored);
        }
    }, []);

    const handleSetLanguage = (lang: LanguageCode) => {
        setLanguage(lang);
        localStorage.setItem('sowan_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: dictionaries[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
