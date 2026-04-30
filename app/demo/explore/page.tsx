"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Star, Calendar, X, Clock, Video } from "lucide-react";

var MENTORS = [
    { id: 1, name: "Opa Adriel", title: "Pakar Sejarah Jawa", city: "Yogyakarta", rating: "4.9", sessions: "24", price: "Rp 100.000", topics: ["Sejarah Jawa", "Bahasa Jawa"], bio: "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", online: true },
    { id: 2, name: "Kak Maya", title: "Ahli Bahasa Jawa", city: "Jakarta", rating: "4.7", sessions: "15", price: "Rp 80.000", topics: ["Bahasa Jawa", "Sastra Jawa"], bio: "Belajar bahasa Jawa dengan cara yang menyenangkan dan praktis.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", online: false },
    { id: 3, name: "Pak Budi", title: "Pakar Kearifan Lokal", city: "Bandung", rating: "4.8", sessions: "31", price: "Rp 120.000", topics: ["Kearifan Lokal", "Budaya Jawa"], bio: "Mengenal lebih dalam budaya dan kearifan lokal Jawa.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", online: true },
];

var TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function DemoExplorePage() {
    var router = useRouter();
    var login = useAuth().login;
    var user = useAuth().user;
    var language = useLanguage().language;
    var hasRun = useRef(false);
    var ref_currentStep = useState(0)[0];
    var ref_setCurrentStep = useState(0)[1];
    const [currentStep, setCurrentStep] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [bookingStep, setBookingStep] = useState("time");
    const [selectedTime, setSelectedTime] = useState(null);
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [showRoomEntry, setShowRoomEntry] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    var isID = language === "id";
    var STEPS_ID = [
        { icon: "1", title: "Cari Mentor", desc: "Ketik nama atau topik yang Anda minati." },
        { icon: "2", title: "Filter Kota", desc: "Pilih kota asal mentor." },
        { icon: "3", title: "Pilih Mentor", desc: "Klik kartu mentor untuk profil." },
        { icon: "4", title: "Buat Jadwal", desc: "Pilih waktu dan konfirmasi." },
        { icon: "5", title: "Masuk Ruang", desc: "Gunakan kode booking." },
    ];
    var STEPS_EN = [
        { icon: "1", title: "Search Mentor", desc: "Type name or topic." },
        { icon: "2", title: "Filter City", desc: "Select mentor city." },
        { icon: "3", title: "Choose Mentor", desc: "Click mentor card." },
        { icon: "4", title: "Book Schedule", desc: "Select time and confirm." },
        { icon: "5", title: "Join Room", desc: "Use booking code." },
    ];
    var STEPS = isID ? STEPS_ID : STEPS_EN;
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
        if (currentStep === 1) {
            setTimeout(function() { setCurrentStep(2); }, 500);
        }
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
        setCurrentStep(4);
    }

    function handleConfirmBooking() {
        setBookingStep("success");
        setTimeout(function() {}, 3000);
    }

    function handleNextStep() {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }

    function handleClosePanel() {
        setShowSidePanel(false);
        setSelectedMentor(null);
        setBookingStep("time");
        setSelectedTime(null);
    }

    var bubbleText = stepData.desc;
    var bubbleIcon = stepData.icon;

    if (showSidePanel && bookingStep === "success") {
        bubbleText = isID ? "Booking berhasil!" : "Booking confirmed!";
        bubbleIcon = "OK";
    } else if (showSidePanel) {
        bubbleText = bookingStep === "time" ? (isID ? "Pilih waktu" : "Select time") : (isID ? "Konfirmasi" : "Confirm");
        bubbleIcon = ">";
    }

    return React.createElement("main", { className: "min-h-screen w-full bg-[#FAF9F6] pt-[72px]" },
        React.createElement("div", { className: "bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-4 px-6 sticky top-[72px] z-40" },
            React.createElement("div", { className: "max-w-7xl mx-auto flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("span", { className: "text-3xl" }, "Opa Adriel"),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "font-black text-primary" }, isID ? "Demo: Jelajahi Mentor" : "Demo: Explore Mentor"),
                        React.createElement("p", { className: "text-sm text-muted-foreground" }, isID ? "Ikuti panduan" : "Follow guide")
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
                React.createElement("span", { className: "text-3xl shrink-0" }, bubbleIcon),
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "font-black text-base whitespace-nowrap" }, stepData.title),
                    React.createElement("p", { className: "text-sm opacity-80 whitespace-nowrap" }, bubbleText)
                )
            )
        ),
        React.createElement("div", { className: "fixed bottom-8 right-8 z-50" },
            React.createElement("button", { onClick: handleNextStep, className: "bg-accent hover:bg-accent/90 text-white font-black px-6 py-3 rounded-2xl shadow-xl transition-all active:scale-95" },
                currentStep < STEPS.length - 1 ? (isID ? "Langkah Berikutnya" : "Next Step") : "OK"
            )
        ),
        showSidePanel && selectedMentor ? React.createElement(SidePanel, { mentor: selectedMentor, bookingStep: bookingStep, selectedTime: selectedTime, isID: isID, onTimeSelect: handleTimeSelect, onConfirm: handleConfirmBooking, onClose: handleClosePanel, onEnterRoom: function() { handleClosePanel(); setShowRoomEntry(true); setCurrentStep(4); }, setBookingStep: setBookingStep }) : null,
        showRoomEntry ? React.createElement(RoomModal, { isID: isID, code: "SW-284751", onJoin: function() { setShowRoomEntry(false); setShowFeedback(true); }, onClose: function() { setShowRoomEntry(false); } }) : null,
        showFeedback ? React.createElement(FeedbackModal, { isID: isID, onClose: function() { setShowFeedback(false); }, onSubmit: function() { setShowFeedback(false); setCurrentStep(5); } }) : null,
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
            React.createElement("div", { className: "relative mb-8" },
                React.createElement(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-6 h-6" }),
                React.createElement("input", { type: "text", value: searchQuery, onChange: function(e) { setSearchQuery(e.target.value); if (currentStep === 0 && e.target.value.length > 0) { setTimeout(function() { setCurrentStep(1); }, 500); } }, placeholder: isID ? "Cari nama, topik, atau kota..." : "Search name, topic, or city...", className: "w-full h-16 pl-14 pr-6 bg-white border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg font-medium shadow-lg transition-all" }),
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
            React.createElement("div", { className: "mt-12 text-center" },
                React.createElement("button", { onClick: function() { if (selectedMentor) { setShowSidePanel(true); } else { handleCardClick(MENTORS[0]); } }, className: "bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-6 rounded-3xl shadow-xl transition-all active:scale-95" },
                    isID ? "Jelajahi & Booking Sekarang" : "Explore & Book Now"
                ),
                React.createElement("p", { className: "text-sm text-muted-foreground mt-4" }, isID ? "Klik kartu mentor untuk profil dan booking" : "Click mentor card to view profile and book")
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
                        React.createElement("div", { className: "w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-4xl" }, "OK"),
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
                React.createElement("div", { className: "w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4" }, "V"),
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
    return React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" },
        React.createElement("div", { className: "bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl" },
            React.createElement("div", { className: "text-center mb-6" },
                React.createElement("div", { className: "w-20 h-20 bg-amber-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4" }, "*"),
                React.createElement("h3", { className: "font-black text-2xl text-primary" }, isID ? "Berikan Apresiasi" : "Give Appreciation"),
                React.createElement("p", { className: "text-muted-foreground text-sm mt-2" }, isID ? "Bagaimana pengalaman Anda dengan Opa Adriel?" : "How was your experience with Opa Adriel?")
            ),
            React.createElement("div", { className: "flex justify-center gap-2 mb-6" },
                [1, 2, 3, 4, 5].map(function(i) {
                    return React.createElement("button", { key: i, className: "text-4xl hover:scale-110 transition-transform text-amber-400" }, "*");
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