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
    };
    explore: {
        title: string;
        subtitle: string;
        filterLocation: string;
        filterLang: string;
        reset: string;
        bookBtn: string;
        allCities: string;
        allLangs: string;
        noResultsTitle: string;
        noResultsDesc: string;
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
}

const dictionaries: Record<LanguageCode, Translations> = {
    id: {
        shared: {
            sowan: "Sowan.id", explore: "Jelajahi", schedule: "Jadwal Sowan", login: "Masuk", register: "Daftar Sekarang", logout: "Keluar", hello: "Halo, ", back: "Kembali", city: "Kota", language: "Bahasa", online: "Online", offline: "Offline",
            welcomeModal: "Selamat Datang!", loginDesc: "Masuk ke Sowan.id untuk mulai bersapa", nameLabel: "Siapa nama Anda?", namePlaceholder: "Ketik nama Anda di sini...", viewProfile: "Lihat Profil", demoLabel: "atau coba akun demo"
        },
        home: {
            sparkle: "Belajar Langsung dari Para Maestro Lintas Generasi", welcome: "di", welcomeHome: "Selamat Datang", pagi: "Selamat Pagi", siang: "Selamat Siang", sore: "Selamat Sore", malam: "Selamat Malam",
            desc: "Wadah hangat untuk saling sapa, berbagi cerita, dan menyambung tali silaturahmi. Temukan teman baru dan bagikan pengalaman berharga Anda di sini.",
            findBtn: "Cari Teman Sowan", scheduleBtn: "Lihat Jadwal Saya", friendsJoined: "Teman Bergabung", sessions: "Sesi Sowan", bottomQuote: "Saling Sapa, Saling Bercerita",
            maestroTitle: "Kenalan dengan Maestro Kami", maestroDesc: "Para lansia berpengalaman dengan ragam cerita, keahlian, dan kearifan lokal yang siap menjadi Teman Sowan Anda.",
            viewProfile: "Lihat Profil", seeAll: "Lihat Semua Maestro",
            aboutTitle: "Lebih dari Sekadar Panggilan Video.",
            aboutDesc: "SOWAN adalah platform Edutech eksklusif tempat Anda menyewa waktu para Maestro untuk sesi mentoring personal, belajar bahasa daerah, hingga konsultasi bisnis.",
            badgeSecure: "Sistem Escrow Aman 100%",
            badgeCurated: "Maestro Lulus Kurasi Pedagogi"
        },
        explore: {
            title: "Jelajahi Kebijaksanaan", subtitle: "Temukan Teman Sowan yang paling cocok untuk berbagi cerita dan pengalaman hidup.",
            filterLocation: "Asal Kota", filterLang: "Bahasa Pengantar", reset: "Atur Ulang Filter", bookBtn: "Buat Jadwal Sowan",
            allCities: "Semua Kota", allLangs: "Semua Bahasa",
            noResultsTitle: "Tidak Menemukan Maestro?", noResultsDesc: "Coba ubah filter kota atau bahasa untuk menemukan Teman Sowan lainnya."
        },
        mentor: {
            exp: "Pengalaman", interests: "Topik Keahlian", about: "Tentang", bookingTitle: "Jadwal Sowan", bookingSubtitle: "Sowan Bersama {name}", bookingDesc: "Pilih waktu yang tepat untuk berbincang santai.", confirmBtn: "Konfirmasi Jadwal", reviews: "ULASAN", selectTime: "Pilih Waktu", quote: "Mari berbagi cerita."
        },
        payment: {
            confirm: "Konfirmasi Sowan", fee: "Biaya Layanan", appFee: "Biaya Aplikasi", total: "Total", pay: "Bayar Aman", confirmPay: "Konfirmasi & Bayar", processing: "Memproses...", success: "Selesai!", secured: "Jadwal Anda bersama {name} telah berhasil diatur.", redirect: "Mengarahkan ke Dashboard..."
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
        }
    },
    en: {
        shared: {
            sowan: "Sowan.id", explore: "Explore", schedule: "Schedule", login: "Login", register: "Register Now", logout: "Logout", hello: "Hello, ", back: "Back", city: "City", language: "Language", online: "Online", offline: "Offline",
            welcomeModal: "Welcome Back!", loginDesc: "Login to Sowan.id to start connecting", nameLabel: "What is your name?", namePlaceholder: "Type your name here...", viewProfile: "View Profile", demoLabel: "or try a demo account"
        },
        home: {
            sparkle: "Learn Directly from Cross-Generational Maestros", welcome: "to", welcomeHome: "Welcome", pagi: "Good Morning", siang: "Good Afternoon", sore: "Good Evening", malam: "Good Night",
            desc: "A warm space to greet one another, share stories, and reconnect. Discover new friends and share your valuable experiences here.",
            findBtn: "Find a Sowan Friend", scheduleBtn: "My Schedule", friendsJoined: "Friends Joined", sessions: "Sowan Sessions", bottomQuote: "Greet Each Other, Share Stories",
            maestroTitle: "Meet Our Maestros", maestroDesc: "Experienced elders with diverse stories, skills, and local wisdom ready to be your Sowan Friend.",
            viewProfile: "View Profile", seeAll: "See All Maestros",
            aboutTitle: "More than Just a Video Call.",
            aboutDesc: "SOWAN is an exclusive Edutech platform where you rent the time of Maestros for personal mentoring sessions, learning local languages, to business consultations.",
            badgeSecure: "100% Secure Escrow System",
            badgeCurated: "Pedagogy-Curated Maestros"
        },
        explore: {
            title: "Explore Wisdom", subtitle: "Find the most suitable Sowan Friend to share life stories and experiences.",
            filterLocation: "Origin City", filterLang: "Instruction Language", reset: "Reset Filters", bookBtn: "Book a Sowan Session",
            allCities: "All Cities", allLangs: "All Languages",
            noResultsTitle: "No Maestros Found?", noResultsDesc: "Try changing city or language filters to find other Sowan Friends."
        },
        mentor: {
            exp: "Experience", interests: "Topics of Expertise", about: "About", bookingTitle: "Sowan Schedule", bookingSubtitle: "Sowan with {name}", bookingDesc: "Choose the perfect time for a casual chat.", confirmBtn: "Confirm Schedule", reviews: "REVIEWS", selectTime: "Select Time", quote: "Let's share stories."
        },
        payment: {
            confirm: "Confirm Sowan", fee: "Service Fee", appFee: "App Fee", total: "Total", pay: "Secure Payment", confirmPay: "Confirm & Pay", processing: "Processing...", success: "Done!", secured: "Your schedule with {name} has been successfully arranged.", redirect: "Redirecting to Dashboard..."
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
        }
    },
    ja: {
        shared: {
            sowan: "Sowan.id", explore: "探索", schedule: "スケジュール", login: "ログイン", register: "今すぐ登録", logout: "ログアウト", hello: "こんにちは、", back: "戻る", city: "都市", language: "言語", online: "オンライン", offline: "オフライン",
            welcomeModal: "おかえりなさい！", loginDesc: "Sowan.idにログインして、つながりを始めましょう", nameLabel: "お名前は何ですか？", namePlaceholder: "ここにお名前を入力してください...", viewProfile: "プロフィールを見る", demoLabel: "またはデモアカウントを試す"
        },
        home: {
            sparkle: "経験を共有しましょう", welcome: "へようこそ", welcomeHome: "ようこそ", pagi: "おはようございます", siang: "こんにちは", sore: "こんにちは", malam: "こんばんは",
            desc: "お互いに挨拶し、物語を共有し、絆を深める温かい場所。ここで新しい友達を見つけ、貴重な経験を共有しましょう。",
            findBtn: "友達を探す", scheduleBtn: "私のスケジュール", friendsJoined: "参加した友達", sessions: "セッション数", bottomQuote: "挨拶し合い、物語を共有する",
            maestroTitle: "マエストロに会う", maestroDesc: "多様な物語、スキル、そして地域の知恵を持つ経験豊かな高齢者たちが、あなたのソワン・フレンドになる準備ができています。",
            viewProfile: "プロファイルを見る", seeAll: "すべてのマエストロを見る",
            aboutTitle: "単なるビデオ通話ではありません。",
            aboutDesc: "SOWANは、個人的なメンタリングセッション、現地語の学習からビジネスコンサルタントまで、マエストロの時間をレンタルできる独占的なエデュテックプラットフォームです。",
            badgeSecure: "100%安全なエスクローシステム",
            badgeCurated: "教育学的に選ばれたマエストロ"
        },
        explore: {
            title: "知恵を探索する", subtitle: "人生の物語や経験を共有するのに最適なソワン・フレンドを見つけてください。",
            filterLocation: "出身都市", filterLang: "教授言語", reset: "フィルターをリセット", bookBtn: "セッションを予約する",
            allCities: "すべての都市", allLangs: "すべての言語",
            noResultsTitle: "マエストロは見つかりませんでしたか？", noResultsDesc: "他のソワン・フレンドを見つけるために、都市や言語のフィルターを変更してみてください。"
        },
        mentor: {
            exp: "経験", interests: "専門分野", about: "概要", bookingTitle: "ソワンスケジュール", bookingSubtitle: "{name} とのソワン", bookingDesc: "カジュアルな会話に最適な時間を選んでください。", confirmBtn: "スケジュールを確定する", reviews: "レビュー", selectTime: "時間を選択", quote: "物語を共有しましょう。"
        },
        payment: {
            confirm: "ソワンを確認する", fee: "サービス料", appFee: "アプリ手数料", total: "合計", pay: "安全に支払う", confirmPay: "確認して支払う", processing: "処理中...", success: "完了！", secured: "{name} とのスケジュールが正常に設定されました。", redirect: "ダッシュボードにリダイレクトしています..."
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
        }
    },
    ko: {
        shared: {
            sowan: "Sowan.id", explore: "탐색", schedule: "일정", login: "로그인", register: "지금 가입", logout: "로그아웃", hello: "안녕하세요, ", back: "뒤로", city: "도시", language: "언어", online: "온라인", offline: "오프라인",
            welcomeModal: "환영합니다!", loginDesc: "Sowan.id에 로그인하여 소통을 시작하세요", nameLabel: "이름이 무엇입니까?", namePlaceholder: "여기에 이름을 입력하세요...", viewProfile: "프로필 보기", demoLabel: "또는 데모 계정 시도"
        },
        home: {
            sparkle: "경험을 공유합시다", welcome: "에 오신 것을 환영합니다", welcomeHome: "환영합니다", pagi: "좋은 아침입니다", siang: "좋은 오후입니다", sore: "좋은 저녁입니다", malam: "안녕히 주무세요",
            desc: "서로 인사하고, 이야기를 나누며 인연을 맺는 따뜻한 공간. 새로운 친구를 찾고 소중한 경험을 나누세요.",
            findBtn: "친구 찾기", scheduleBtn: "내 일정", friendsJoined: "가입한 친구", sessions: "소완 세션", bottomQuote: "서로 인사하고 이야기 나누기",
            maestroTitle: "마에스트로를 만나보세요", maestroDesc: "다양한 이야기와 기술, 지역의 지혜를 가진 경험 많은 어르신들이 여러분의 소완 친구가 될 준비가 되어 있습니다.",
            viewProfile: "프로필 보기", seeAll: "모든 마에스트로 보기",
            aboutTitle: "단순한 화상 통화 그 이상입니다.",
            aboutDesc: "SOWAN은 개인 멘토링 세션, 현지 언어 학습, 비즈니스 상담을 위해 마에스트로의 시간을 대여할 수 있는 독점적인 에듀테크 플랫폼입니다.",
            badgeSecure: "100% 안전한 에스크로 시스템",
            badgeCurated: "교육학적으로 검증된 마에스트로"
        },
        explore: {
            title: "지혜 탐구", subtitle: "인생 이야기와 경험을 나눌 가장 적합한 소완 친구를 찾아보세요.",
            filterLocation: "출신 도시", filterLang: "교수 언어", reset: "필터 초기화", bookBtn: "세션 예약하기",
            allCities: "모든 도시", allLangs: "모든 언어",
            noResultsTitle: "마에스트로를 찾을 수 없습니까?", noResultsDesc: "다른 소완 친구를 찾으려면 도시 또는 언어 필터를 변경해 보세요."
        },
        mentor: {
            exp: "경험", interests: "전문 분야", about: "소개", bookingTitle: "소완 일정", bookingSubtitle: "{name} 님과의 소완", bookingDesc: "가벼운 대화를 나누기에 완벽한 시간을 선택하세요.", confirmBtn: "일정 확정", reviews: "리뷰", selectTime: "시간 선택", quote: "이야기를 공유합시다."
        },
        payment: {
            confirm: "소완 확인", fee: "서비스 수수료", appFee: "앱 수수료", total: "합계", pay: "안전하게 결제", confirmPay: "확인 및 결제", processing: "처리 중...", success: "완료!", secured: "{name} 님과의 일정이 성공적으로 예약되었습니다.", redirect: "대시보드로 리다이렉트 중..."
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
        }
    },
    zh: {
        shared: {
            sowan: "Sowan.id", explore: "探索", schedule: "日程", login: "登录", register: "立即注册", logout: "登出", hello: "你好, ", back: "返回", city: "城市", language: "语言", online: "离线", offline: "离线",
            welcomeModal: "欢迎回来！", loginDesc: "登录 Sowan.id 开始沟通", nameLabel: "您叫什么名字？", namePlaceholder: "在这里输入您的名字...", viewProfile: "查看详情", demoLabel: "或尝试演示帐户"
        },
        home: {
            sparkle: "让我们分享经验", welcome: "欢迎来到", welcomeHome: "欢迎", pagi: "早上好", siang: "下午好", sore: "晚上好", malam: "晚安",
            desc: "一个互相问候、分享故事和交流感情的温馨空间。在这里结交新朋友，分享您的宝贵经验。",
            findBtn: "寻找朋友", scheduleBtn: "我的日程", friendsJoined: "加入的朋友", sessions: "疗程", bottomQuote: "互相问候，分享故事",
            maestroTitle: "结识我们的师匠", maestroDesc: "拥有丰富故事、技能和地方智慧的资深长者正等待成为您的 Sowan 之友。",
            viewProfile: "查看详细资料", seeAll: "查看所有师匠",
            aboutTitle: "不仅仅是视频通话。",
            aboutDesc: "SOWAN 是一个独家的教育科技平台，您可以租用大师的时间进行个人指导、学习当地方言，甚至进行商业咨询。",
            badgeSecure: "100% 安全的担保系统",
            badgeCurated: "经过教学评估的大师"
        },
        explore: {
            title: "探索智慧", subtitle: "寻找最合适的 Sowan 之友来分享生活故事和经验。",
            filterLocation: "所属城市", filterLang: "教学语言", reset: "重置筛选", bookBtn: "预约疗程",
            allCities: "所有城市", allLangs: "所有语言",
            noResultsTitle: "找不到师匠？", noResultsDesc: "尝试更改城市或语言筛选以查找其他 Sowan 之友。"
        },
        mentor: {
            exp: "经验", interests: "专业领域", about: "关于", bookingTitle: "Sowan 日程", bookingSubtitle: "与 {name} 师匠 Sowan", bookingDesc: "选择适合闲聊的完美时间。", confirmBtn: "确认日程", reviews: "评论", selectTime: "选择时间", quote: "让我们分享故事。"
        },
        payment: {
            confirm: "确认 Sowan", fee: "服务费", appFee: "平台费", total: "总计", pay: "安全支付", confirmPay: "确认并支付", processing: "处理中...", success: "完成！", secured: "您与 {name} 的日程已成功安排。", redirect: "正在跳转到仪表板..."
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
