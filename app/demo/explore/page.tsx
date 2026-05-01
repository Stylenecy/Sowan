"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Star, Calendar, X, Clock, Video, CheckCircle } from "lucide-react";

var MENTORS = [
    { id: 1, name: "Opa Adriel", title: "Pakar Sejarah Jawa", city: "Yogyakarta", rating: "4.9", sessions: "24", price: "Rp 100.000", topics: ["Sejarah Jawa", "Bahasa Jawa"], bio: "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", online: true },
    { id: 2, name: "Kak Maya", title: "Ahli Bahasa Jawa", city: "Jakarta", rating: "4.7", sessions: "15", price: "Rp 80.000", topics: ["Bahasa Jawa", "Sastra Jawa"], bio: "Belajar bahasa Jawa dengan cara yang menyenangkan dan praktis.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", online: false },
    { id: 3, name: "Pak Budi", title: "Pakar Kearifan Lokal", city: "Bandung", rating: "4.8", sessions: "31", price: "Rp 120.000", topics: ["Kearifan Lokal", "Budaya Jawa"], bio: "Mengenal lebih dalam budaya dan kearifan lokal Jawa.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", online: true },
];

var TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function DemoExplorePage() {
    var router = useRouter();
    var auth = useAuth();
    var login = auth.login;
    var logout = auth.logout;
    var user = auth.user;
    var language = useLanguage().language;
    var hasRun = useRef(false);

    var STEPS_ID = [
        { icon: "1", title: "Cari Mentor", desc: "Ketik nama mentor di pencarian." },
        { icon: "2", title: "Filter Kota", desc: "Pilih kota untuk filter hasil." },
        { icon: "3", title: "Pilih Mentor", desc: "Klik kartu mentor untuk lihat profil." },
        { icon: "4", title: "Booking", desc: "Pilih waktu dan konfirmasi." },
        { icon: "5", title: "Ruang Sowan", desc: "Masuk ke ruang video call." },
        { icon: "6", title: "Apresiasi", desc: "Beri rating dan testimonial." },
    ];
    var STEPS_EN = [
        { icon: "1", title: "Search Mentor", desc: "Type mentor name in search." },
        { icon: "2", title: "Filter City", desc: "Select city to filter results." },
        { icon: "3", title: "Choose Mentor", desc: "Click mentor card to view profile." },
        { icon: "4", title: "Book", desc: "Select time and confirm." },
        { icon: "5", title: "Sowan Room", desc: "Enter the video call room." },
        { icon: "6", title: "Appreciation", desc: "Give rating and testimonial." },
    ];

    var isID = language === "id";
    var STEPS = isID ? STEPS_ID : STEPS_EN;

    var _useState = useState(0);
    var currentStep = _useState[0];
    var setCurrentStep = _useState[1];
    var _useState2 = useState("all");
    var activeFilter = _useState2[0];
    var setActiveFilter = _useState2[1];
    var _useState3 = useState("");
    var searchQuery = _useState3[0];
    var setSearchQuery = _useState3[1];
    var _useState4 = useState(null);
    var selectedMentor = _useState4[0];
    var setSelectedMentor = _useState4[1];
    var _useState5 = useState("time");
    var bookingStep = _useState5[0];
    var setBookingStep = _useState5[1];
    var _useState6 = useState(null);
    var selectedTime = _useState6[0];
    var setSelectedTime = _useState6[1];
    var _useState7 = useState(false);
    var showSidePanel = _useState7[0];
    var setShowSidePanel = _useState7[1];
    var _useState8 = useState(false);
    var showRoomEntry = _useState8[0];
    var setShowRoomEntry = _useState8[1];
    var _useState9 = useState(false);
    var showFeedback = _useState9[0];
    var setShowFeedback = _useState9[1];
    var _useState10 = useState(false);
    var showLogout = _useState10[0];
    var setShowLogout = _useState10[1];
    var _useState11 = useState(false);
    var showCongrats = _useState11[0];
    var setShowCongrats = _useState11[1];

    var stepData = STEPS[currentStep] || STEPS[0];

    useEffect(function() {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Dex");
    }, []);

    var filteredMentors = useMemo(function() {
        return MENTORS.filter(function(m) {
            var matchesCity = activeFilter === "all" || m.city === activeFilter;
            var q = searchQuery.toLowerCase();
            var matchesSearch = q === "" || m.name.toLowerCase().indexOf(q) >= 0 || m.city.toLowerCase().indexOf(q) >= 0 || m.title.toLowerCase().indexOf(q) >= 0;
            return matchesCity && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    function handleFilterClick(city) {
        setActiveFilter(city);
    }

    function handleCardClick(mentor) {
        setSelectedMentor(mentor);
        setShowSidePanel(true);
        setBookingStep("time");
        setSelectedTime(null);
        setCurrentStep(3);
    }

    function handleTimeSelect(time) {
        setSelectedTime(time);
        setBookingStep("confirm");
    }

    function handleConfirmBooking() {
        setBookingStep("success");
    }

    function handleClosePanel() {
        setShowSidePanel(false);
        setSelectedMentor(null);
        setBookingStep("time");
        setSelectedTime(null);
    }

    function handleResetExplore() {
        setCurrentStep(0);
        setActiveFilter("all");
        setSearchQuery("");
        setSelectedMentor(null);
        setBookingStep("time");
        setSelectedTime(null);
        setShowSidePanel(false);
        setShowRoomEntry(false);
        setShowFeedback(false);
        setShowLogout(false);
        setShowCongrats(false);
    }

    function handleNextStep() {
        if (currentStep === 0) {
            setSearchQuery("Opa Adriel");
            setCurrentStep(1);
            return;
        }
        if (currentStep === 1) {
            setCurrentStep(2);
            return;
        }
        if (currentStep === 2) {
            handleCardClick(MENTORS[0]);
            return;
        }
        if (currentStep === 3 && bookingStep === "success") {
            setShowSidePanel(false);
            setShowRoomEntry(true);
            setCurrentStep(4);
            return;
        }
        if (currentStep === 4) {
            setShowRoomEntry(false);
            setShowFeedback(true);
            setCurrentStep(5);
            return;
        }
        if (currentStep === 5) {
            setShowFeedback(false);
            setShowLogout(true);
            setCurrentStep(6);
            return;
        }
        if (currentStep === 6) {
            logout();
            router.push("/");
            return;
        }
    }

    function getBubbleText() {
        if (showSidePanel && bookingStep === "time") return isID ? "Pilih waktu sesi" : "Select session time";
        if (showSidePanel && bookingStep === "confirm") return isID ? "Konfirmasi booking Anda" : "Confirm your booking";
        if (showSidePanel && bookingStep === "success") return isID ? "Booking berhasil! Masuk ke ruang." : "Booking confirmed! Enter the room.";
        if (showRoomEntry) return isID ? "Masukkan kode booking" : "Enter booking code";
        if (showFeedback) return isID ? "Beri apresiasi untuk mentor" : "Give appreciation to mentor";
        return stepData.desc;
    }

    function getBubbleTitle() {
        if (showSidePanel) return isID ? "Booking" : "Book";
        if (showRoomEntry) return isID ? "Ruang Sowan" : "Sowan Room";
        if (showFeedback) return isID ? "Apresiasi" : "Appreciation";
        return stepData.title;
    }

    function getBubbleIcon() {
        if (showSidePanel) return "4";
        if (showRoomEntry) return "5";
        if (showFeedback) return "6";
        return stepData.icon;
    }

    return React.createElement("main", { className: "min-h-screen w-full bg-[#FAF9F6] pt-[72px]" },
        React.createElement("div", { className: "bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-4 px-6 sticky top-[72px] z-40" },
            React.createElement("div", { className: "max-w-7xl mx-auto flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("span", { className: "text-3xl" }, "Opa Adriel"),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "font-black text-primary" }, isID ? "Demo: Jelajahi Mentor" : "Demo: Explore Mentor"),
                        React.createElement("p", { className: "text-sm text-muted-foreground" }, isID ? "Ikuti panduan langkah demi langkah" : "Follow step by step guide")
                    )
                ),
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("div", { className: "flex gap-1" },
                        STEPS.map(function(_, i) {
                            return React.createElement("div", { key: i, className: "w-3 h-3 rounded-full " + (i <= currentStep ? "bg-accent" : "bg-primary/20") });
                        })
                    ),
                    React.createElement("span", { className: "text-sm font-bold text-muted-foreground" },
                        (isID ? "Langkah" : "Step") + " " + (currentStep + 1) + " / " + STEPS.length
                    )
                )
            )
        ),
        React.createElement("div", { className: "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500", style: { top: "calc(72px + 4rem)", maxWidth: "90vw" } },
            React.createElement("div", { className: "bg-accent text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4", style: { animation: "demoBounce 2.5s ease-in-out infinite" } },
                React.createElement("span", { className: "text-3xl shrink-0" }, getBubbleIcon()),
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "font-black text-base whitespace-nowrap" }, getBubbleTitle()),
                    React.createElement("p", { className: "text-sm opacity-80 whitespace-nowrap" }, getBubbleText())
                )
            )
        ),
        React.createElement("div", { className: "fixed bottom-8 right-8 z-50" },
            React.createElement("button", {
                onClick: handleNextStep,
                className: "bg-accent hover:bg-accent/90 text-white font-black px-6 py-3 rounded-2xl shadow-xl transition-all active:scale-95 " + (currentStep === 3 && bookingStep !== "success" ? "opacity-50 cursor-not-allowed" : ""),
                disabled: currentStep === 3 && bookingStep !== "success"
            },
                currentStep === 6 ? (isID ? "Logout & Kembali" : "Logout & Return") : (isID ? "Langkah Berikutnya" : "Next Step")
            )
        ),
        showSidePanel && selectedMentor ? React.createElement(SidePanel, {
            mentor: selectedMentor,
            bookingStep: bookingStep,
            selectedTime: selectedTime,
            isID: isID,
            onTimeSelect: handleTimeSelect,
            onConfirm: handleConfirmBooking,
            onClose: handleClosePanel,
            onEnterRoom: function() { setShowSidePanel(false); setShowRoomEntry(true); setCurrentStep(4); },
            setBookingStep: setBookingStep
        }) : null,
        showRoomEntry ? React.createElement(RoomModal, {
            isID: isID,
            code: "SW-284751",
            onJoin: function() { setShowRoomEntry(false); setShowFeedback(true); setCurrentStep(5); },
            onClose: function() { setShowRoomEntry(false); setCurrentStep(4); }
        }) : null,
        showFeedback ? React.createElement(FeedbackModal, {
            isID: isID,
            onClose: function() { setShowFeedback(false); setShowCongrats(true); },
            onSubmit: function() { setShowFeedback(false); setShowCongrats(true); }
        }) : null,
        showLogout ? React.createElement("div", { className: "fixed bottom-8 left-8 z-50" },
            React.createElement("button", { onClick: function() { logout(); router.push("/"); }, className: "bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95" },
                isID ? "Logout & Kembali" : "Logout & Return"
            )
        ) : null,
        showCongrats ? React.createElement("div", { className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm" },
            React.createElement("div", { className: "bg-white rounded-3xl p-10 max-w-lg w-full mx-4 shadow-2xl text-center" },
                React.createElement("div", { className: "text-7xl mb-4" }, "🎉"),
                React.createElement("h2", { className: "text-3xl font-black text-primary mb-2" }, isID ? "Selamat!" : "Congratulations!"),
                React.createElement("p", { className: "text-muted-foreground text-lg mb-6" },
                    isID ? "Anda telah menyelesaikan demo Jelajahi Mentor!" : "You have completed the Explore Mentor demo!"
                ),
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("button", { onClick: function() { logout(); router.push("/"); }, className: "w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all shadow-lg" },
                        isID ? "Logout & Kembali ke Home" : "Logout & Return to Home"
                    ),
                    React.createElement("button", { onClick: function() { setShowCongrats(false); handleResetExplore(); }, className: "w-full bg-slate-100 hover:bg-slate-200 text-primary font-bold py-4 rounded-2xl transition-all" },
                        "🔄 " + (isID ? "Mulai Ulang Demo" : "Restart Demo")
                    )
                )
            )
        ) : null,
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
            React.createElement("div", { className: "relative mb-8" },
                React.createElement(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-6 h-6" }),
                React.createElement("input", { type: "text", value: searchQuery, onChange: function(e) { setSearchQuery(e.target.value); }, placeholder: isID ? "Cari nama, topik, atau kota..." : "Search name, topic, or city...", className: "w-full h-16 pl-14 pr-6 bg-white border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg font-medium shadow-lg transition-all" }),
                searchQuery ? React.createElement("button", { onClick: function() { setSearchQuery(""); }, className: "absolute right-5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary" },
                    React.createElement(X, { className: "w-5 h-5" })
                ) : null
            ),
            React.createElement("div", { className: "flex gap-4 mb-8 overflow-x-auto pb-4" },
                [{ key: "all", label: isID ? "Semua Kota" : "All Cities" }, { key: "Yogyakarta", label: "Yogyakarta" }, { key: "Jakarta", label: "Jakarta" }, { key: "Bandung", label: "Bandung" }].map(function(f) {
                    return React.createElement("button", { key: f.key, onClick: function() { handleFilterClick(f.key); }, className: "px-6 py-3 bg-white rounded-full font-bold text-sm border-2 transition-all whitespace-nowrap " + (activeFilter === f.key ? "border-accent bg-accent/10 shadow-lg" : "border-primary/10 hover:border-primary/30") },
                        f.label
                    );
                })
            ),
            React.createElement("p", { className: "text-sm text-muted-foreground mb-4" },
                (isID ? "Menampilkan" : "Showing") + " " + filteredMentors.length + " " + (isID ? "mentor" : "mentors")
            ),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
                filteredMentors.length === 0 ?
                    React.createElement("div", { className: "col-span-full text-center py-12" },
                        React.createElement("p", { className: "text-4xl mb-4" }, "?"),
                        React.createElement("p", { className: "font-black text-primary text-xl" }, isID ? "Tidak ada mentor ditemukan" : "No mentors found")
                    ) :
                    filteredMentors.map(function(mentor) {
                        return React.createElement("button", { key: mentor.id, onClick: function() { handleCardClick(mentor); }, className: "relative rounded-[32px] overflow-hidden border-4 bg-white shadow-2xl text-left transition-all hover:shadow-xl hover:-translate-y-1 " + (currentStep === 2 ? "border-accent shadow-accent/30" : "border-transparent") },
                            React.createElement("div", { className: "relative h-72 bg-gradient-to-br from-amber-50 to-orange-50" },
                                React.createElement("img", { src: mentor.image, alt: mentor.name, className: "w-full h-full object-cover" }),
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }),
                                mentor.online ? React.createElement("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold" },
                                    React.createElement("span", { className: "w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" }),
                                    "Online"
                                ) : null,
                                React.createElement("div", { className: "absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold" },
                                    "★ " + mentor.rating
                                ),
                                React.createElement("div", { className: "absolute bottom-4 left-4 right-4" },
                                    React.createElement("div", { className: "bg-white/95 backdrop-blur rounded-xl px-4 py-2" },
                                        React.createElement("h3", { className: "font-black text-primary text-lg" }, mentor.name),
                                        React.createElement("p", { className: "text-xs text-muted-foreground" }, mentor.title)
                                    )
                                )
                            ),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                                    React.createElement(MapPin, { className: "w-4 h-4 text-primary/50" }),
                                    React.createElement("span", { className: "text-sm font-medium text-primary/70" }, mentor.city),
                                    React.createElement("span", { className: "text-primary/30" }, "|"),
                                    React.createElement(Star, { className: "w-4 h-4 text-amber-500", fill: "currentColor" }),
                                    React.createElement("span", { className: "text-sm font-bold" }, mentor.rating)
                                ),
                                React.createElement("p", { className: "text-sm text-muted-foreground mb-6 line-clamp-2" }, '"' + mentor.bio + '"'),
                                React.createElement("div", { className: "flex items-center justify-between" },
                                    React.createElement("span", { className: "text-xl font-black text-primary" }, mentor.price),
                                    React.createElement("span", { className: "text-xs text-primary/50" }, mentor.sessions + " " + (isID ? "sesi" : "sessions"))
                                )
                            )
                        );
                    })
            ),
            React.createElement("div", { className: "text-center mt-8 flex justify-center gap-6" },
                React.createElement("button", { onClick: function() { login("Opa Adriel"); router.push("/demo/mentor"); }, className: "text-sm text-blue-600 hover:underline font-medium" },
                    isID ? "Lihat Demo Mentor" : "See Mentor Demo"
                ),
                React.createElement("button", { onClick: function() { login("Dex"); router.push("/dashboard/customer"); }, className: "text-sm text-primary/60 hover:underline font-medium" },
                    isID ? "Dashboard Customer" : "Customer Dashboard"
                )
            )
        ),
        React.createElement("style", null, "@keyframes demoBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }")
    );
}

function SidePanel(props) {
    var mentor = props.mentor;
    var isID = props.isID;
    var bookingStep = props.bookingStep;
    var selectedTime = props.selectedTime;

    return React.createElement("div", { className: "fixed inset-0 z-50 flex justify-end", onClick: props.onClose },
        React.createElement("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm" }),
        React.createElement("div", { className: "relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl", onClick: function(e) { e.stopPropagation(); } },
            React.createElement("button", { onClick: props.onClose, className: "absolute top-4 right-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center z-10" },
                React.createElement(X, { className: "w-5 h-5 text-primary" })
            ),
            React.createElement("div", { className: "relative h-64 bg-gradient-to-br from-amber-50 to-orange-50" },
                React.createElement("img", { src: mentor.image, alt: mentor.name, className: "w-full h-full object-cover" }),
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
                React.createElement("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold" },
                    React.createElement("span", { className: "w-2 h-2 rounded-full inline-block mr-1 " + (mentor.online ? "bg-emerald-500" : "bg-slate-400") + " animate-pulse" }),
                    mentor.online ? (isID ? "Online" : "Online") : (isID ? "Offline" : "Offline")
                ),
                React.createElement("div", { className: "absolute bottom-4 left-4 right-4" },
                    React.createElement("div", { className: "bg-white/95 backdrop-blur rounded-xl px-4 py-2" },
                        React.createElement("h3", { className: "font-black text-primary text-xl" }, mentor.name),
                        React.createElement("p", { className: "text-xs text-muted-foreground" }, mentor.title)
                    )
                )
            ),
            React.createElement("div", { className: "p-6 space-y-6" },
                React.createElement("div", { className: "flex items-center gap-4 text-sm" },
                    React.createElement("span", { className: "flex items-center gap-1" },
                        React.createElement(Star, { className: "w-4 h-4 text-amber-500", fill: "currentColor" }),
                        React.createElement("strong", null, mentor.rating)
                    ),
                    React.createElement("span", { className: "text-primary/30" }, "|"),
                    React.createElement(MapPin, { className: "w-4 h-4 text-primary/50" }),
                    React.createElement("span", null, mentor.city),
                    React.createElement("span", { className: "text-primary/30" }, "|"),
                    React.createElement("span", null, mentor.sessions + " " + (isID ? "sesi" : "sessions"))
                ),
                React.createElement("p", { className: "text-sm text-muted-foreground" }, '"' + mentor.bio + '"'),
                React.createElement("div", { className: "flex gap-2 flex-wrap" },
                    mentor.topics.map(function(t) {
                        return React.createElement("span", { key: t, className: "bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold" }, t);
                    })
                ),
                React.createElement("div", { className: "flex items-center justify-between pt-4 border-t border-primary/10" },
                    React.createElement("span", { className: "text-2xl font-black text-primary" }, mentor.price),
                    React.createElement("span", { className: "text-sm text-primary/50" }, isID ? "/ sesi 60 menit" : "/ session 60 min")
                ),
                bookingStep === "time" ?
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("h4", { className: "font-black text-lg" }, isID ? "Pilih Waktu" : "Select Time"),
                        React.createElement("div", { className: "grid grid-cols-3 gap-3" },
                            TIME_SLOTS.map(function(time) {
                                return React.createElement("button", { key: time, onClick: function() { props.onTimeSelect(time); }, className: "px-4 py-3 bg-white border-2 border-primary/20 rounded-xl font-bold text-sm hover:border-accent hover:bg-accent/5 transition-all" }, time);
                            })
                        ),
                        React.createElement("p", { className: "text-xs text-muted-foreground text-center" }, isID ? "Waktu dalam WIB" : "Time in WIB")
                    ) : null,
                bookingStep === "confirm" && selectedTime ?
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("div", { className: "bg-amber-50 rounded-2xl p-4 border-2 border-amber-200" },
                            React.createElement("div", { className: "flex items-center gap-3 mb-3" },
                                React.createElement(Calendar, { className: "w-5 h-5 text-accent" }),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "font-black text-lg" }, isID ? "Jadwal Pemesanan" : "Booking Summary"),
                                    React.createElement("p", { className: "text-sm text-muted-foreground" }, isID ? "Hari ini" : "Today")
                                )
                            ),
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement(Clock, { className: "w-5 h-5 text-primary/50" }),
                                React.createElement("span", { className: "font-bold text-lg" }, selectedTime)
                            )
                        ),
                        React.createElement("div", { className: "flex items-center gap-3 text-sm text-muted-foreground mb-2" },
                            React.createElement(Video, { className: "w-4 h-4" }),
                            React.createElement("span", null, isID ? "Video call 60 menit via Sowan Room" : "60 min video call via Sowan Room")
                        ),
                        React.createElement("button", { onClick: props.onConfirm, className: "w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg" },
                            isID ? "Konfirmasi Booking" : "Confirm Booking"
                        ),
                        React.createElement("button", { onClick: function() { props.setBookingStep("time"); }, className: "w-full text-sm text-muted-foreground hover:underline py-2" },
                            isID ? "Pilih waktu lain" : "Choose different time"
                        )
                    ) : null,
                bookingStep === "success" ?
                    React.createElement("div", { className: "space-y-4 text-center" },
                        React.createElement("div", { className: "w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-4xl" },
                            React.createElement(CheckCircle, { className: "w-10 h-10 text-emerald-500" })
                        ),
                        React.createElement("div", null,
                            React.createElement("p", { className: "font-black text-xl text-emerald-600" }, isID ? "Booking Berhasil!" : "Booking Confirmed!"),
                            React.createElement("p", { className: "text-sm text-muted-foreground mt-1" },
                                (isID ? "Sesi dengan " : "Session with ") + mentor.name + " pada " + selectedTime + " " + (isID ? "telah dikonfirmasi." : "confirmed.")
                            )
                        ),
                        React.createElement("div", { className: "bg-slate-50 rounded-2xl p-4 text-left" },
                            React.createElement("p", { className: "text-xs text-muted-foreground mb-1" }, isID ? "Kode Booking" : "Booking Code"),
                            React.createElement("p", { className: "font-black text-2xl tracking-widest text-primary" }, "SW-284751")
                        ),
                        React.createElement("button", { onClick: props.onEnterRoom, className: "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2" },
                            React.createElement(Video, { className: "w-5 h-5" }),
                            isID ? "Masuk Ruang Sowan" : "Enter Sowan Room"
                        )
                    ) : null
            )
        )
    );
}

function RoomModal(props) {
    var isID = props.isID;
    return React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" },
        React.createElement("div", { className: "bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" },
            React.createElement("div", { className: "text-center mb-6" },
                React.createElement("div", { className: "w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4"}, "V"),
                React.createElement("h3", { className: "font-black text-2xl text-primary" }, isID ? "Ruang Sowan" : "Sowan Room"),
                React.createElement("p", { className: "text-muted-foreground text-sm mt-2" }, isID ? "Masukkan kode booking untuk bergabung" : "Enter booking code to join")
            ),
            React.createElement("div", { className: "bg-slate-50 rounded-2xl p-4 mb-4" },
                React.createElement("p", { className: "text-xs text-muted-foreground mb-1" }, isID ? "Kode Booking Anda" : "Your Booking Code"),
                React.createElement("p", { className: "font-black text-2xl tracking-widest text-center text-primary" }, props.code)
            ),
            React.createElement("button", { onClick: props.onJoin, className: "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2" },
                React.createElement(Video, { className: "w-5 h-5" }),
                isID ? "Gabung Ruang Sowan" : "Join Sowan Room"
            ),
            React.createElement("button", { onClick: props.onClose, className: "w-full text-sm text-muted-foreground hover:underline mt-4 py-2" },
                isID ? "Tutup" : "Close"
            )
        )
    );
}

function FeedbackModal(props) {
    var isID = props.isID;
    var _useState11 = useState(0);
    var selectedStars = _useState11[0];
    var setSelectedStars = _useState11[1];
    return React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" },
        React.createElement("div", { className: "bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl" },
            React.createElement("div", { className: "text-center mb-6" },
                React.createElement("div", { className: "w-20 h-20 bg-amber-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4" }, "*"),
                React.createElement("h3", { className: "font-black text-2xl text-primary" }, isID ? "Berikan Apresiasi" : "Give Appreciation"),
                React.createElement("p", { className: "text-muted-foreground text-sm mt-2" }, isID ? "Bagaimana pengalaman Anda dengan Opa Adriel?" : "How was your experience with Opa Adriel?")
            ),
            React.createElement("div", { className: "flex justify-center gap-2 mb-6" },
                [1, 2, 3, 4, 5].map(function(i) {
                    return React.createElement("button", { key: i, onClick: function() { setSelectedStars(i); }, className: "text-4xl hover:scale-110 transition-transform " + (i <= selectedStars ? "text-amber-500" : "text-amber-300") }, "*");
                })
            ),
            React.createElement("textarea", { className: "w-full p-4 border-2 border-primary/20 rounded-2xl text-sm mb-4 resize-none", rows: 3, placeholder: isID ? "Tulis testimonial Anda..." : "Write your testimonial..." }),
            React.createElement("button", { onClick: props.onSubmit, className: "w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all shadow-lg" },
                isID ? "Kirim Apresiasi" : "Submit Appreciation"
            ),
            React.createElement("button", { onClick: props.onClose, className: "w-full text-sm text-muted-foreground hover:underline mt-3 py-2" },
                isID ? "Lewati" : "Skip"
            )
        )
    );
}