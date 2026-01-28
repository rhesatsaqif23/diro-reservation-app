"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Court } from "@/src/domain/court";
import { TimeslotAvailability } from "@/src/domain/timeslot";
import { Class } from "@/src/domain/class";

import { SelectDate } from "@/src/components/booking/SelectDate";
import { SelectTimeslot } from "@/src/components/booking/SelectTimeslot";
import { SelectCourt } from "@/src/components/booking/SelectCourt";
import { BookingSummaryCard } from "@/src/components/booking/BookingSummary";

import { ClassService } from "@/src/services/class.service";
import { BookingService } from "@/src/services/booking.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { CourtService } from "@/src/services/court.service";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isProcessing, setIsProcessing] = useState(false);

  // DATA
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [timeslots, setTimeslots] = useState<TimeslotAvailability[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);

  // SELECTION (SINGLE SOURCE OF TRUTH)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] =
    useState<TimeslotAvailability | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  // LOADING STATE (PER SECTION)
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingTimeslots, setLoadingTimeslots] = useState(true);
  const [loadingCourts, setLoadingCourts] = useState(true);

  const requiredCourtType = selectedClass?.required_court_type;

  // FETCH CLASS
  useEffect(() => {
    if (!classId) return;
    ClassService.getByID(classId).then(setSelectedClass);
  }, [classId]);

  // FETCH DATES (INIT)
  useEffect(() => {
    if (!classId) return;

    let cancelled = false;

    (async () => {
      setLoadingDates(true);
      try {
        const res = await BookingService.getAvailableDates(classId);
        if (!cancelled) {
          setDates(res.data);
          setSelectedDate(res.data[0] ?? null);
        }
      } finally {
        if (!cancelled) setLoadingDates(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [classId]);

  // FETCH TIMESLOTS (BASED ON selectedDate)
  useEffect(() => {
    if (!classId || !selectedDate) return;

    let cancelled = false;

    (async () => {
      setLoadingTimeslots(true);
      setSelectedTimeslot(null);
      setCourts([]);

      try {
        const res = await BookingService.getAvailableTimeslots(
          classId,
          selectedDate,
        );
        if (!cancelled) {
          setTimeslots(res.data);
          setSelectedTimeslot(res.data[0] ?? null);
        }
      } finally {
        if (!cancelled) setLoadingTimeslots(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [classId, selectedDate]);

  // FETCH COURTS (BASED ON selectedDate + selectedTimeslot)
  useEffect(() => {
    if (!selectedDate || !selectedTimeslot || !requiredCourtType) return;

    let cancelled = false;

    (async () => {
      setLoadingCourts(true);
      try {
        const res = await CourtService.getWithAvailability(
          selectedDate,
          selectedTimeslot.start_time,
          requiredCourtType,
        );

        if (!cancelled) {
          setCourts(res);
          setSelectedCourt(null);
        }
      } finally {
        if (!cancelled) setLoadingCourts(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, selectedTimeslot, requiredCourtType]);

  // CONFIRM
  const handleConfirmBooking = async () => {
    if (isProcessing) return; // prevent double

    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    if (!classId || !selectedDate || !selectedTimeslot || !selectedCourt)
      return;

    setIsProcessing(true);

    try {
      const res = await BookingService.createDraft({
        class_id: classId,
        court_id: selectedCourt.id,
        date: selectedDate,
        start_time: selectedTimeslot.start_time,
      });

      router.push(`/booking/summary/${res.data.reservation_id}`);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat booking. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const dateOptions = dates.map((date) => ({
    date,
    label: new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
  }));

  return (
    <section className="container-page py-10 space-y-10">
      <SelectDate
        dates={dateOptions}
        selected={selectedDate}
        loading={loadingDates}
        onChange={(date) => {
          setSelectedDate(date);
          setSelectedCourt(null);
        }}
      />

      <SelectTimeslot
        timeslots={timeslots}
        selected={selectedTimeslot}
        loading={loadingTimeslots}
        onChange={(slot) => {
          setSelectedTimeslot(slot);
          setSelectedCourt(null);
        }}
      />

      <SelectCourt
        courts={courts}
        selected={selectedCourt}
        loading={loadingCourts}
        onChange={setSelectedCourt}
      />

      <BookingSummaryCard
        date={selectedDate}
        timeslot={selectedTimeslot}
        court={selectedCourt}
        amount={
          selectedClass
            ? `Rp ${selectedClass.price.toLocaleString("id-ID")}`
            : undefined
        }
        onConfirm={handleConfirmBooking}
        isAuthenticated={isAuthenticated}
        isProcessing={isProcessing}
      />
    </section>
  );
}
